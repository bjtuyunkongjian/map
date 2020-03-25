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
  }

  // parameters to ensure the model is georeferenced correctly on the map
  type = 'custom';
  renderingMode = '3d';
  sceneScale = 1e-6; //

  onAdd = (map, gl) => {
    this.camera = new Camera();
    this.scene = new Scene();
    this.scene.scale.setScalar(this.sceneScale);

    const ambientLight = new AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(
      this.url,
      function(gltf) {
        // gltf.scene.scale.setScalar(1e-7 / this.sceneScale);
        const { x, y, z } = mapboxgl.MercatorCoordinate.fromLngLat([0, 0], 0);

        console.log(gltf);
        gltf.scene.rotation.x = Math.PI / 2;
        gltf.scene.rotation.y = Math.PI / 2;
        gltf.scene.position.set(
          x / this.sceneScale,
          -y / this.sceneScale,
          z / this.sceneScale
        );
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
    var m = new Matrix4().fromArray(matrix);
    var l = new Matrix4().scale(new Vector3(1, -1, 1));

    // this.camera.projectionMatrix.elements = matrix;
    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  };
}

export default CustomLayer;
