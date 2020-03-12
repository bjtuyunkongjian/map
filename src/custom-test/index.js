import React, { Component } from 'react';
import { FetchRequest } from 'tuyun-utils';
import CustomLayer from './custom-layer';

export default class index extends Component {
  state = {
    scale: 2e-8
  };

  _shouldRemove = false;
  _buildingArr = [];

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="add-custom">
        <div className="custom-row">
          缩放比例：
          <div className="custom-btn" onClick={() => this._changeScale(2)}>
            增加
          </div>
          <div className="custom-btn" onClick={() => this._changeScale(0.5)}>
            减小
          </div>
        </div>
      </div>
    );
  }

  _init = () => {
    _MAP_
      .on('style.load', () => {
        this._loadModels();
      })
      .on('moveend', () => {
        this._loadModels();
      });
  };

  _loadModels = async () => {
    const _zoom = _MAP_.getZoom();
    // 小于 16 级，删除所有 id
    if (_zoom < 16) {
      for (let item of this._buildingArr) {
        _MAP_.removeLayer('model-' + item.id);
      }
      return;
    }
    // 获取屏幕范围
    const _bounds = _MAP_.getBounds();
    // 获取新的建筑物
    const _url = `mod/getPointKey?minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}`;
    const { res, err } = await FetchRequest({ url: _url });
    if (err || !res) return console.error('没获取到返回数据');
    // 等请求结束删除不在屏幕范围之内的建筑物
    for (let item of this._buildingArr) {
      const { lnglat } = item;
      !(
        lnglat[0] < _bounds._ne.lng &&
        lnglat[0] > _bounds._sw.lng &&
        lnglat[1] < _bounds._ne.lat &&
        lnglat[1] > _bounds._sw.lat
      ) &&
        _MAP_.getLayer('model-' + item.id) &&
        _MAP_.removeLayer('model-' + item.id);
    }
    const { scale } = this.state;

    for (let item of res) {
      if (!_MAP_.getLayer('model-' + item.id)) {
        const { lnglat } = item;
        _MAP_.addLayer(
          new CustomLayer(
            lnglat[0],
            lnglat[1],
            0,
            'model-' + item.id,
            `http://47.110.135.245:12808/static/test/${item.id}.gltf`,
            scale
          ),
          'GHYDPL_7L_NAME'
        );
      }
    }

    // 赋予新值
    this._buildingArr = res;
  };

  _changeScale = async w => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });

    for (let item of this._buildingArr) {
      // 删除对应模型
      _MAP_.getLayer('model-' + item.id) &&
        _MAP_.removeLayer('model-' + item.id);
      // 重绘
      if (!_MAP_.getLayer('model-' + item.id)) {
        const { lnglat } = item;
        _MAP_.addLayer(
          new CustomLayer(
            lnglat[0],
            lnglat[1],
            0,
            'model-' + item.id,
            `http://47.110.135.245:12808/static/test/${item.id}.gltf`,
            w * scale
          ),
          'GHYDPL_7L_NAME'
        );
      }
    }
  };
}
