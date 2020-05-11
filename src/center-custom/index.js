import React, { Component } from 'react';
import CustomLayer from './custom-layer';

export default class index extends Component {
  state = {
    count: defaultCount,
    scale: 5e-8,
    gltfUrl: ['./static/models/test.gltf'],
  };

  _shouldRemove = false;

  componentDidMount = () => this._init();

  render() {
    const { count, gltfUrl } = this.state;
    return (
      <div className="add-custom">
        <div className="custom-row">
          模型数量：
          <input type="text" value={count} onChange={this._changeCount} />
          <div className="custom-btn" onClick={this._loadModels}>
            确定
          </div>
        </div>

        <div className="custom-row">
          缩放比例：
          <div className="custom-btn" onClick={() => this._changeScale(2)}>
            增加
          </div>
          <div className="custom-btn" onClick={() => this._changeScale(0.5)}>
            减小
          </div>
        </div>

        <div className="custom-row">
          模型地址：
          <input type="text" value={gltfUrl} onChange={this._changeCount} />
          <div className="custom-btn" onClick={this._loadModels}>
            确定
          </div>
        </div>
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
    this._shouldRemove && _MAP_.removeLayer('model-');
    const { lng, lat } = _MAP_.getCenter();
    const modelArr = [];
    const { _ne, _sw } = _MAP_.getBounds();
    const _maxLng = _ne.lng;
    const _minLng = _sw.lng;
    const _maxLat = _ne.lat;
    const _minLat = _sw.lat;
    const _diffLng = _maxLng - _minLng;
    const _diffLat = _maxLat - _minLat;

    for (let item of gltfUrl) {
      modelArr.push({
        url: item,
        lng: _minLng + _diffLng * Math.random(),
        lat: _minLat + _diffLat * Math.random(),
        altitude: 0,
      });
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

  _changeCount = async (e) => {
    const { value } = e.target;
    if (!value) {
      this.setState({ count: defaultCount });
      return;
    }
    const isNum = /^\d{1,}$/.test(value);
    if (!isNum) return;
    if (value === '0') return;
    this.setState({ count: parseInt(value) });
  };

  _changeScale = async (w) => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });
    this._loadModels();
  };

  _changeUrl = async (e) => {
    const { value } = e.target;
    this.setState({ gltfUrl: value });
  };
}

const defaultCount = 1;
