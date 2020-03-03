import mapboxgl from 'mapbox-gl';

import { THREE } from 'tuyun-utils';

const {
  GLTFLoader,
  OrthographicCamera,
  Scene,
  DirectionalLight,
  WebGLRenderer,
  Matrix4,
  Vector3
} = THREE;

// parameters to ensure the model is georeferenced correctly on the map
const modelRotate = [Math.PI / 2, Math.PI / 2, 0]; // 旋转角度
const modelScale = 2e-8; // 缩放比例

class CustomLayer {
  constructor({ center, id, height }) {
    this.id = id;
    this.type = 'custom';
    this.renderingMode = '3d';
    this.modelTransform = {
      translateX: mapboxgl.MercatorCoordinate.fromLngLat(center, height).x,
      translateY: mapboxgl.MercatorCoordinate.fromLngLat(center, height).y,
      translateZ: mapboxgl.MercatorCoordinate.fromLngLat(center, height).z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelScale
    };
  }

  onAdd(map, gl) {
    this.camera = new OrthographicCamera();
    this.scene = new Scene();

    var directionalLight = new DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    var loader = new GLTFLoader();
    loader.load(
      'http://56.3.124.136:12808/static/policeman/file.gltf',
      function(gltf) {
        this.scene.add(gltf.scene);
      }.bind(this)
    );

    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
    });

    this.renderer.autoClear = false;
  }

  render(_, matrix) {
    if (this.map.getZoom() < 17) return;
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
  }
}

export default CustomLayer;
