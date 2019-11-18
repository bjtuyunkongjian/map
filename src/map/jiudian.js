import mapboxgl from 'mapbox-gl';

import { THREE } from 'tuyun-utils';

const {
  GLTFLoader,
  Camera,
  Scene,
  DirectionalLight,
  WebGLRenderer,
  Matrix4,
  Vector3
} = THREE;

// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = [120.20918, 30.24488]; // 中心点
var modelAltitude = 0; // 高度，海拔
var modelRotate = [Math.PI / 2, -Math.PI / 4.8, 0]; // 旋转角度
var modelScale = 8.5e-9; // 缩放比例

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
  translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude)
    .x,
  translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude)
    .y,
  translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude)
    .z,
  rotateX: modelRotate[0],
  rotateY: modelRotate[1],
  rotateZ: modelRotate[2],
  scale: modelScale
};

// configuration of the custom layer for a 3D model per the CustomLayerInterface
const CustomLayer = {
  id: '3d-model-jiudian-obj',
  type: 'custom',
  renderingMode: '3d',
  onAdd: function(map, gl) {
    this.camera = new Camera();
    this.scene = new Scene();

    var directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    var loader = new GLTFLoader();
    loader.load(
      'http://47.110.135.245:12808/static/hangzhou-1.gltf',
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
  },
  render: function(_, matrix) {
    if (this.map.getZoom() < 15) return;
    var rotationX = new Matrix4().makeRotationAxis(
      new Vector3(1, 0, 0),
      modelTransform.rotateX
    );
    var rotationY = new Matrix4().makeRotationAxis(
      new Vector3(0, 1, 0),
      modelTransform.rotateY
    );
    var rotationZ = new Matrix4().makeRotationAxis(
      new Vector3(0, 0, 1),
      modelTransform.rotateZ
    );

    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
      )
      .scale(
        new Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale
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
};

export default CustomLayer;
