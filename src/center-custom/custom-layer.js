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

// configuration of the custom layer for a 3D model per the CustomLayerInterface
class CustomLayer {
  constructor(x, y, z = 0, id, url, scale = 5e-8) {
    this.id = id;
    this.url = url;
    this.modelScale = scale; // 缩放比例
    const mercatorCoord = mapboxgl.MercatorCoordinate.fromLngLat([x, y], z);
    this.modelTransform = {
      translateX: mercatorCoord.x,
      translateY: mercatorCoord.y,
      translateZ: mercatorCoord.z,
      rotateX: this.modelRotate[0],
      rotateY: this.modelRotate[1],
      rotateZ: this.modelRotate[2],
      scale: this.sceneScale
    };
  }

  // parameters to ensure the model is georeferenced correctly on the map
  type = 'custom';
  renderingMode = '3d';
  modelRotate = [Math.PI / 2, Math.PI / 2, 0]; // 旋转角度
  sceneScale = 1e-2; // 270.18025716224105  266.2919669508635  263.63270165929544  286.67217198701314

  onAdd = (map, gl) => {
    this.camera = new Camera();
    this.scene = new Scene();

    var ambientLight = new AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    // var loader = new GLTFLoader();
    // loader.load(
    //   this.url,
    //   function(gltf) {
    //     console.log(gltf);
    //     this.scene.add(gltf.scene);
    //   }.bind(this)
    // );

    // loader.load(
    //   this.url,
    //   function(gltf) {
    //     gltf.scene.scale.setScalar(5);
    //     gltf.scene.position.set(1000, 0, 100);
    //     this.scene.add(gltf.scene);
    //   }.bind(this)
    // );

    var geometry = new THREE.CubeGeometry(1, 0.01, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });

    const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat([10, 10], 0);
    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, 0, y);
    console.log(box);
    this.scene.add(box);

    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
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
