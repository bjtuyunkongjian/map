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
  constructor({ center, id, modelArr, bounds }) {
    this.id = id;

    this.camera = new Camera();
    this.scene = new Scene();
    console.log(this.scene);

    var directionalLight = new AmbientLight(0xffffff);
    directionalLight.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight);
    this.updateModel({ center, modelArr, bounds });
  }

  type = 'custom';
  renderingMode = '3d';
  loader = new GLTFLoader();

  onAdd = (map, gl) => {
    this.map = map;
    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
    });
    this.renderer.autoClear = false;
  };

  updateModel = ({ modelArr, center, bounds }) => {
    this.modelTransform = mapboxgl.MercatorCoordinate.fromLngLat(center, 0);
    for (let item of modelArr) {
      const isInBounds =
        item.lng < bounds._ne.lng &&
        item.lng > bounds._sw.lng &&
        item.lat < bounds._ne.lat &&
        item.lat > bounds._sw.lat;
      if (isInBounds) {
        this.loadModel(item);
      } else {
        this.scene.remove(item.name);
      }
    }
  };

  loadModel = ({ lng, lat, altitude = 0, url, name }) => {
    const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat(
      [lng, lat],
      altitude
    );
    const gltfScene = this.scene.getObjectByName(name);
    if (this.scene.getObjectByName(name)) {
      gltfScene.position.set(
        x - this.modelTransform.x,
        this.modelTransform.y - y,
        z
      );
    } else {
      this.loader.load(url, gltf => {
        gltf.scene.name = name;
        gltf.scene.scale.setScalar(1e-8); // 3.6e-8
        gltf.scene.position.set(
          x - this.modelTransform.x,
          this.modelTransform.y - y,
          z
        );
        // 旋转模型
        gltf.scene.rotation.x = Math.PI / 2;
        gltf.scene.rotation.y = Math.PI / 2;
        this.scene.add(gltf.scene);
      });
    }
  };

  render = (_, matrix) => {
    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4()
      .makeTranslation(this.modelTransform.x, this.modelTransform.y, 0)
      .scale(new Vector3(1, -1, 1));

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  };
}

export default CustomLayer;
