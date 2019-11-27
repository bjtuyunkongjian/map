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
var modelOrigin = [117.0863161769069, 36.675497899184634]; // 中心点
var modelAltitude = 6; // 高度，海拔
var modelRotate = [Math.PI / 2, 0, 0]; // 旋转角度
var modelScale = 5.41843220338983e-8 / 3; // 缩放比例

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
  id: '3d-model',
  type: 'custom',
  renderingMode: '3d',
  minzoom: 15,
  onAdd: function(map, gl) {
    this.camera = new Camera();
    this.scene = new Scene();

    // create two three.js lights to illuminate the model
    var directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(0, -70, 100).normalize();
    this.scene.add(directionalLight);

    var directionalLight2 = new DirectionalLight(0xffffff);
    directionalLight2.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight2);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    var loader = new GLTFLoader();
    loader.load(
      'http://56.3.124.136:12808/static/radar/34M_17.gltf',
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
