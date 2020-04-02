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

    const light = new AmbientLight(0xffffff);
    this.scene.add(light);
    this.updateModel({ center, modelArr, bounds });
  }

  type = 'custom';
  renderingMode = '3d';
  loader = new GLTFLoader();
  scale = 1 / 111000 / 360;

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
    const modelCount = this.scene.children.length;
    for (let i = modelCount; i > 0; i--) {
      const item = this.scene.children[i - 1];
      const isInBounds =
        item.lng < bounds._ne.lng &&
        item.lng > bounds._sw.lng &&
        item.lat < bounds._ne.lat &&
        item.lat > bounds._sw.lat;
      if (!isInBounds && item.name) {
        this.scene.remove(item);
      }
    }
    for (let item of modelArr) {
      this.loadModel(item);
    }
  };

  loadModel = ({ lng, lat, altitude = 0, url, name }) => {
    const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat(
      [lng, lat],
      altitude
    );
    const gltfScene = this.scene.getObjectByName(name);
    if (gltfScene) {
      gltfScene.position.set(
        x - this.modelTransform.x,
        y - this.modelTransform.y,
        z
      );
    } else {
      this.loader.load(url, gltf => {
        gltf.scene.lng = lng;
        gltf.scene.lat = lat;
        gltf.scene.name = name;
        gltf.scene.scale.setScalar(this.scale); // 3.6e-8
        gltf.scene.position.set(
          x - this.modelTransform.x,
          y - this.modelTransform.y,
          z
        );
        gltf.scene.rotation.x = Math.PI / 2;
        // gltf.scene.rotation.y = -Math.PI;
        this.scene.add(gltf.scene);
      });
    }
  };

  render = (_, matrix) => {
    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4()
      .makeTranslation(this.modelTransform.x, this.modelTransform.y, 0)
      .scale(new Vector3(1, 1, 1));

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  };
}

export default CustomLayer;
