import mapboxgl from 'mapbox-gl';

import { THREE } from 'tuyun-utils';

const {
  GLTFLoader,
  Camera,
  Scene,
  WebGLRenderer,
  Matrix4,
  AmbientLight,
  DirectionalLight,
} = THREE;

class CustomLayer {
  constructor({ center, id, url, modelArr }) {
    this.id = id;
    this.url = url;
    this.modelArr = modelArr;

    this.camera = new Camera();
    this.scene = new Scene();

    // var ambientLight = new AmbientLight(0xffffff);
    // this.scene.add(ambientLight);

    var directionalLight1 = new DirectionalLight(0xffffff, 0.3);
    directionalLight1.position.set(100, 100, 100);
    this.scene.add(directionalLight1);
    var directionalLight2 = new DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(100, 100, -100);
    this.scene.add(directionalLight2);

    var directionalLight3 = new DirectionalLight(0xffffff, 0.3);
    directionalLight3.position.set(-100, 100, -100);
    this.scene.add(directionalLight3);

    var directionalLight4 = new DirectionalLight(0xffffff, 0.3);
    directionalLight4.position.set(-100, 100, 100);
    this.scene.add(directionalLight4);

    this.updateModel({ center, modelArr });
  }

  type = 'custom';
  renderingMode = '3d';
  loader = new GLTFLoader();
  scale = 1 / 111000 / 360;

  onAdd = (map, gl) => {
    this.map = map;

    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
    });

    this.renderer.autoClear = false;
  };

  updateModel = ({ modelArr, center }) => {
    this.modelTransform = mapboxgl.MercatorCoordinate.fromLngLat(center, 0);
    for (let item of modelArr) {
      this.loadModel(item);
    }
  };

  loadModel = ({ lng, lat, altitude = 0, url, scale = 1, rotate = 0 }) => {
    this.loader.load(url, (gltf) => {
      // 36.6754/117.0856 117.0856, 36.6754
      const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat(
        [lng, lat],
        altitude
      );
      gltf.scene.scale.setScalar(this.scale * scale);

      gltf.scene.position.set(
        x - this.modelTransform.x,
        y - this.modelTransform.y,
        z
      );
      // 旋转模型

      gltf.scene.rotation.x = Math.PI / 2;
      gltf.scene.rotation.y = rotate;
      // gltf.scene.rotation.y = Math.PI / 2;
      this.scene.add(gltf.scene);
    });
  };

  render = (_, matrix) => {
    // if (this.map.getZoom() < 16) return;

    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4().makeTranslation(
      this.modelTransform.x,
      this.modelTransform.y,
      0
    );

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  };
}

export default CustomLayer;
