import React, { Component } from 'react';
import CustomLayer from './custom-layers';

export default class index extends Component {
  state = {
    count: defaultCount,
    scale: 5e-8,
    gltfUrl: './static/a.gltf'
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
    const { scale, gltfUrl } = this.state;
    if (!gltfUrl) return;
    this._shouldRemove && _MAP_.removeLayer('model-');
    _MAP_.addLayer(
      new CustomLayer(117.0856, 36.6754, 0, 'model-', gltfUrl, scale),
      'GHYDPL_7L_NAME'
    );
    if (!this._shouldRemove) this._shouldRemove = true;
  };

  _changeCount = async e => {
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

  _changeScale = async w => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });
    this._loadModels();
  };

  _changeUrl = async e => {
    const { value } = e.target;
    this.setState({ gltfUrl: value });
  };
}

const defaultCount = 1;
