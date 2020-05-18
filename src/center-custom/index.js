import React, { Component } from 'react';
import CustomLayer from './custom-layer';

export default class index extends Component {
  state = {
    // gltfUrl: [
    //   { model: 'low1' },
    //   { model: 'low2' },
    //   { model: 'low3' },
    //   { model: 'low4' },
    //   { model: 'low5' },
    //   { model: 'high1' },
    //   { model: 'high2' },
    //   { model: 'high3' },
    //   { model: 'high4' },
    //   { model: 'glass1' },
    //   { model: 'glass2' },
    //   { model: 'glass3' },
    // ],
    gltfUrl: [
      // { model: 'building1', scale: 3e-3 },
      // { model: 'building2', scale: 5e-3 },
      // { model: 'building3', scale: 3e-3 },
      // { model: 'building4', scale: 4e-3 },
      // { model: 'building5', scale: 4e-3 },
      { model: '1', scale: 1 },
      { model: '2', scale: 1 },
      { model: '3', scale: 5e-1 },
      { model: '4', scale: 5e-1 },
      { model: '5', scale: 1 },
    ],
  };

  _shouldRemove = false;

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="add-custom">
        <div className="custom-row">缩放比例：100%</div>
      </div>
    );
  }

  _init = () => {
    _MAP_.on('style.load', () => {
      this._loadModels();
    });
  };

  _loadModels = () => {
    const { gltfUrl } = this.state;
    if (!gltfUrl) return;
    const _prefix = './static/models/';
    this._shouldRemove && _MAP_.removeLayer('model-');
    const { lng, lat } = _MAP_.getCenter();
    const modelArr = [];
    const _rotate = _MAP_.getBearing();

    for (let i = 0; i < gltfUrl.length; i++) {
      for (let j = gltfUrl.length; j > 0; j--) {
        const index = Math.floor(Math.random() * gltfUrl.length);
        const { model, scale } = gltfUrl[index];
        modelArr.push({
          url: `${_prefix + model}.gltf`,
          lng: lng + 0.0015 * i,
          lat: lat + 0.003 * j,
          altitude: 0,
          scale: scale,
          rotate: _rotate,
        });
      }
    }

    _MAP_.addLayer(
      new CustomLayer({
        center: [lng, lat],
        id: 'model-',
        modelArr,
      })
      // 'GHYDPL_7L_NAME'
    );
    if (!this._shouldRemove) this._shouldRemove = true;
  };
}
