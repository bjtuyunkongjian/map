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
      // { model: 'test1' },
      // { model: 'building1', scale: 3e-3 },
      // { model: 'building2', scale: 5e-3 },
      // { model: 'building3', scale: 3e-3 },
      // { model: 'building4', scale: 4e-3 },
      // { model: 'building5', scale: 4e-3 },
      { model: '1' }, //居民1
      { model: '2' }, //居民2
      { model: '3' }, //居民3 紫色
      { model: '4' }, //玻璃幕墙
      { model: '5' }, //玻璃幕墙
      { model: '6' }, //玻璃幕墙

      // { model: 'testui1' }, //居民楼1  1.1e-1
      // { model: 'testui2', scale: 10e-2 }, //紫色居民楼分层2
      // { model: 'testui3', scale: 10e-2 }, //玻璃幕墙1
      // { model: 'testui4' }, //玻璃幕墙2
      // { model: 'testui5' }, //横向玻璃幕墙3
      // { model: 'testui6', scale: 11e-2 }, //居民楼3
      // { model: 'testui7' }, //玻璃幕墙4
      // { model: 'testui8' }, //居民楼4
      // { model: 'testui9' }, //居民楼5
      // { model: 'testui10', scale: 2e-1 }, //居民楼6
      // { model: 'testui11' }, //玻璃幕墙6
      // { model: 'testui12', scale: 2e-1 }, //居民楼7
      // { model: 'testui13', scale: 2e-1 }, //居民楼8
      // { model: 'testui15' }, //玻璃大厦5 倒角
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

    const _halfLn = gltfUrl.length / 2;

    for (let i = 0; i < gltfUrl.length; i++) {
      for (let j = gltfUrl.length; j > 0; j--) {
        const index = Math.floor(Math.random() * gltfUrl.length);
        const { model, scale } = gltfUrl[index];

        modelArr.push({
          url: `${_prefix + model}.gltf`,
          lng: lng + 0.001 * (i - _halfLn),
          lat: lat + 0.001 * (j - _halfLn),
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
