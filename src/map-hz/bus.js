import mapboxgl from 'mapbox-gl';

import { THREE } from 'tuyun-utils';

const {
  GLTFLoader,
  OBJLoader,
  Camera,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
  Vector3,
  Raycaster,
  Vector2
} = THREE;

// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = [117.0864455, 36.6751248]; // 中心点
var modelAltitude = 0; // 高度，海拔
var modelRotate = [Math.PI / 2, Math.PI / 2, 0]; // 旋转角度
var modelScale = 5.41843220338983e-8; // 缩放比例

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
  id: '3d-model-bus-obj',
  type: 'custom',
  renderingMode: '3d',
  minzoom: 15,
  onAdd: function(map, gl) {
    console.log('onAdd');
    // const aspect = window.innerWidth / window.innerHeight;
    // const frustumSize = 1000;
    // this.camera = new PerspectiveCamera(45, aspect, 0.25, 1000);
    this.camera = new Camera();
    this.scene = new Scene();

    // create two three.js lights to illuminate the model
    // var directionalLight = new AmbientLight(0x404040);
    // this.scene.add(directionalLight);

    var directionalLight2 = new DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight2);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    // var loader = new GLTFLoader();
    // loader.load(
    //   'http://56.3.124.136:12808/static/camera/camera.gltf',
    //   function(gltf) {
    //     this.scene.add(gltf.scene);
    //     this.childrenArr = this.scene.children[0].children.map(item => item);
    //     console.log('gltf.scene', gltf.scene);
    //   }.bind(this)
    // );

    // const loader = new OBJLoader();
    // loader.load(
    //   'http://56.3.124.136:12808/static/jeep/file.obj',
    //   function(model) {
    //     this.scene.add(model);
    //   }.bind(this)
    // );
    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
    });

    this.renderer.autoClear = false;

    window.addEventListener(
      'click',
      event => {
        const raycaster = new Raycaster();
        const mouse = new Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // raycaster.setFromCamera(mouse, this.camera);
        // const intersects = raycaster.intersectObjects(
        //   this.scene.children,
        //   true
        // );

        const cameraPosition = new Vector3(0, 0, 0).unproject(this.camera);
        const mousePos = new Vector3(mouse.x, mouse.y, 0.99).unproject(
          this.camera
        );

        const direction = mousePos
          .clone()
          .sub(cameraPosition)
          .normalize();

        raycaster.near = -1;
        raycaster.far = 5;
        raycaster.ray.set(mousePos, direction);

        const intersects = raycaster.intersectObjects(
          this.scene.children,
          true
        );

        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

        console.log('object', intersects, this.scene);
      },
      false
    );
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
