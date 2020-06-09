import mapboxgl from 'mapbox-gl';

import { THREE } from 'tuyun-utils';

import CreateUid from './create-uid';

const {
  GLTFLoader,
  Camera,
  Scene,
  WebGLRenderer,
  Matrix4,
  AmbientLight,
  HemisphereLight,
} = THREE;

class CustomLayer {
  constructor({ center, id, modelArr, bounds }) {
    this.id = id;

    this.camera = new Camera();
    this.scene = new Scene();

    const ambientLight = new AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const hemisphereLight = new HemisphereLight(0x0000000, 0xffffff, 1);
    this.scene.add(hemisphereLight);

    this.updateModel({ center, modelArr, bounds });
  }

  type = 'custom';
  renderingMode = '3d';
  loader = new GLTFLoader();
  scale = 1 / 111000 / 360;
  uuid = undefined;

  onAdd = (map, gl) => {
    this.map = map;
    this.renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
    });
    this.renderer.autoClear = false;
  };

  updateModel = ({ modelArr, center, bounds }) => {
    this.uuid = CreateUid();
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
    // 批量获取 gltf
    this.groupLoad(modelArr);
  };

  groupLoad = async (modelArr) => {
    const start = new Date().getTime();
    const uuid = this.uuid;
    const perGroup = 300;
    const groupArr = [];
    let groupChild = [];
    for (let i = 0; i < modelArr.length; i++) {
      const item = modelArr[i];
      const { lng, lat, altitude = 0, name } = item;
      const gltfScene = this.scene.getObjectByName(name);
      if (gltfScene) {
        const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat(
          [lng, lat],
          altitude
        );
        gltfScene.position.set(
          x - this.modelTransform.x,
          y - this.modelTransform.y,
          z
        );
      } else {
        groupChild.push(item);
        if (groupChild.length < perGroup && i < modelArr.length - 1) continue;
        groupArr.push(groupChild);
        groupChild = [];
      }
    }
    // 批量获取 gltf
    for (let group of groupArr) {
      const promiseArr = [];
      for (let item of group) {
        const newPromise = this.loadModel(item);
        promiseArr.push(newPromise);
      }
      if (this.uuid !== uuid) return;
      await Promise.all(promiseArr);
      // for(let scene of sceneArr) {}
    }
    console.log('加载完毕', (new Date().getTime() - start) / 1000);
  };

  loadModel = ({ lng, lat, altitude = 0, url, name }) => {
    const uuid = this.uuid;
    const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat(
      [lng, lat],
      altitude
    );
    return new Promise((resolve) => {
      this.loader.load(
        url,
        (gltf) => {
          if (uuid !== this.uuid) return;
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
          resolve(gltf.scene);
        },
        () => {},
        () => {
          resolve();
        }
      );
    });
  };

  render = (_, matrix) => {
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
