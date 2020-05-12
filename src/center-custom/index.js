import React, { Component } from 'react';
import CustomLayer from './custom-layer';

export default class index extends Component {
  state = {
    scale: 5e-8,
    gltfUrl: [
      'low1',
      'low2',
      'low3',
      'low4',
      'low5',
      'high1',
      'high2',
      'high3',
      'high4',
      'glass1',
      'glass2',
      'glass3',
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

    for (let i = 0; i < gltfUrl.length; i++) {
      const index = Math.floor(Math.random() * gltfUrl.length);
      const model = gltfUrl[index];
      for (let j = gltfUrl.length; j > 0; j--) {
        modelArr.push({
          url: `${_prefix + model}.gltf`,
          lng: lng + 0.0005 * i,
          lat: lat + 0.001 * j,
          altitude: 0,
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
