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
  constructor({ center, id, modelArr }) {
    this.id = id;

    this.camera = new Camera();
    this.scene = new Scene();

    const ambientLight = new AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const hemisphereLight = new HemisphereLight(0x000000, 0xffffff, 1);
    this.scene.add(hemisphereLight);

    this.updateModel({ center, modelArr });
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

  updateModel = ({ modelArr, center }) => {
    this.uuid = CreateUid();
    this.modelTransform = mapboxgl.MercatorCoordinate.fromLngLat(center, 0);
    const sceneModelCount = this.scene.children.length;
    // 复制一份
    const toLoadModelArr = [...modelArr];
    for (let i = sceneModelCount; i > 0; i--) {
      const item = this.scene.children[i - 1];
      const { isModel, name: modelName } = item;
      // 只遍历添加的模型
      if (!isModel) continue;
      // 判断现在要加载的模型里面有没有这个模型名称
      const modelIndex = toLoadModelArr.findIndex(
        (item) => item.name === modelName
      );
      // 没有这个模型，scene中删除对应模型
      // 有这个模型，修改模型对应场景中的位置，要从服务端加载的模型数组中删除这个对象
      if (modelIndex === -1) {
        this.scene.remove(item);
      } else {
        const { lng, lat, altitude = 0, name } = toLoadModelArr[modelIndex];
        const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat(
          [lng, lat],
          altitude
        );
        const gltfScene = this.scene.getObjectByName(name);
        gltfScene.position.set(
          x - this.modelTransform.x,
          y - this.modelTransform.y,
          z
        );
        // 删除不需要加载的对象
        toLoadModelArr.splice(modelIndex, 1);
        this.map.triggerRepaint(); // 重绘
      }
    }
    // 批量获取 gltf
    this.groupLoad(toLoadModelArr);
  };

  groupLoad = async (modelArr) => {
    const start = new Date().getTime();
    const uuid = this.uuid;
    const perGroup = 300;
    const groupArr = [];
    let groupChild = [];
    // 分批
    for (let i = 0; i < modelArr.length; i++) {
      const item = modelArr[i];
      groupChild.push(item);
      if (groupChild.length < perGroup && i < modelArr.length - 1) continue;
      groupArr.push(groupChild);
      groupChild = [];
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
          gltf.scene.isModel = true;
          gltf.scene.scale.setScalar(this.scale); // 3.6e-8
          gltf.scene.position.set(
            x - this.modelTransform.x,
            y - this.modelTransform.y,
            z
          );
          gltf.scene.rotation.x = Math.PI / 2;
          // gltf.scene.rotation.y = -Math.PI;
          this.scene.add(gltf.scene);
          this.map.triggerRepaint(); // 重绘
          resolve();
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
  };
}

export default CustomLayer;
