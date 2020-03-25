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
  constructor(x, y, z, id, url) {
    this.id = id;
    this.url = url;
    this.modelOrigin = [x, y]; // 中心点
    this.modelAltitude = z || 0; // 高度，海拔
    const mercatorCoord = mapboxgl.MercatorCoordinate.fromLngLat(
      this.modelOrigin,
      this.modelAltitude
    );
    this.modelTransform = {
      translateX: mercatorCoord.x,
      translateY: mercatorCoord.y,
      translateZ: mercatorCoord.z
    };
  }

  // parameters to ensure the model is georeferenced correctly on the map
  type = 'custom';
  renderingMode = '3d';

  onAdd = (map, gl) => {
    this.camera = new Camera();
    this.scene = new Scene();

    var directionalLight = new AmbientLight(0xffffff);
    directionalLight.position.set(0, 70, 100).normalize();
    this.scene.add(directionalLight);

    // use the three.js GLTF loader to add the 3D model to the three.js scene
    var loader = new GLTFLoader();
    loader.load(
      this.url,
      function(gltf) {
        // 36.6754/117.0856 117.0856, 36.6754
        const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat([10, 10], 0);
        console.log(x, y, z);
        gltf.scene.scale.setScalar(1e-8);

        gltf.scene.position.set(
          x - this.modelTransform.translateX,
          this.modelTransform.translateY - y,
          z
        );
        // 旋转模型
        gltf.scene.rotation.x = Math.PI / 2;
        gltf.scene.rotation.y = Math.PI / 2;
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
  };

  render = (_, matrix) => {
    // if (this.map.getZoom() < 16) return;

    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4()
      .makeTranslation(
        this.modelTransform.translateX,
        this.modelTransform.translateY,
        this.modelTransform.translateZ
      )
      .scale(new Vector3(1, -1, 1));

    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  };
}

export default CustomLayer;
