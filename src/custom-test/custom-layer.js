import mapboxgl from 'mapbox-gl';

import { THREE } from 'tuyun-utils';

const {
  GLTFLoader,
  Camera,
  Scene,
  WebGLRenderer,
  Matrix4,
  Vector3,
  AmbientLight
} = THREE;

class CustomLayer {
  constructor(x, y, z, id, url, scale = 5e-8) {
    this.id = id;
    this.url = url;
    this.modelOrigin = [x, y]; // 中心点
    this.modelAltitude = z || 0; // 高度，海拔
    this.modelScale = scale; // 缩放比例
    this.modelTransform = {
      translateX: mapboxgl.MercatorCoordinate.fromLngLat(
        this.modelOrigin,
        this.modelAltitude
      ).x,
      translateY: mapboxgl.MercatorCoordinate.fromLngLat(
        this.modelOrigin,
        this.modelAltitude
      ).y,
      translateZ: mapboxgl.MercatorCoordinate.fromLngLat(
        this.modelOrigin,
        this.modelAltitude
      ).z,
      rotateX: this.modelRotate[0],
      rotateY: this.modelRotate[1],
      rotateZ: this.modelRotate[2],
      scale: this.modelScale
    };
  }

  type = 'custom';
  renderingMode = '3d';
  modelRotate = [Math.PI / 2, Math.PI / 2, 0]; // 旋转角度

  onAdd = (map, gl) => {
    this.camera = new Camera();
    this.scene = new Scene();

    var directionalLight = new AmbientLight(0xffffff);
    directionalLight.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight);

    var loader = new GLTFLoader();
    loader.load(
      this.url,
      function(gltf) {
        this.scene.add(gltf.scene);
      }.bind(this)
    );

    this.map = map;

    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
    });

    this.renderer.autoClear = false;
  };

  render = (_, matrix) => {
    // if (this.map.getZoom() < 16) return;
    var rotationX = new Matrix4().makeRotationAxis(
      new Vector3(1, 0, 0),
      this.modelTransform.rotateX
    );
    var rotationY = new Matrix4().makeRotationAxis(
      new Vector3(0, 1, 0),
      this.modelTransform.rotateY
    );
    var rotationZ = new Matrix4().makeRotationAxis(
      new Vector3(0, 0, 1),
      this.modelTransform.rotateZ
    );

    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4()
      .makeTranslation(
        this.modelTransform.translateX,
        this.modelTransform.translateY,
        this.modelTransform.translateZ
      )
      .scale(
        new Vector3(
          this.modelTransform.scale,
          -this.modelTransform.scale,
          this.modelTransform.scale
        )
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    this.camera.projectionMatrix.elements = matrix;
    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  };
}

export default CustomLayer;
