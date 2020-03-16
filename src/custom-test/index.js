import React, { Component } from 'react';
import { FetchRequest } from 'tuyun-utils';
import CustomLayer from './custom-layer';
import {
  featureCollection as FeatureCollection,
  point as turfPoint
} from '@turf/turf';

export default class index extends Component {
  state = {
    scale: 8e-9
  };

  _shouldRemove = false;
  _buildingArr = [];

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="add-custom">
        <div className="custom-row">
          模型缩放比例：
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
        this._removeBuilding(item);
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
      if (
        !(
          lnglat[0] < _bounds._ne.lng &&
          lnglat[0] > _bounds._sw.lng &&
          lnglat[1] < _bounds._ne.lat &&
          lnglat[1] > _bounds._sw.lat
        )
      ) {
        this._removeBuilding(item);
      }
    }
    const features = [];
    for (let item of res) {
      this._addBuilding(item);
      // features.push()
    }

    // 赋予新值
    this._buildingArr = res;
  };

  _changeScale = async w => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });

    for (let item of this._buildingArr) {
      // 删除对应模型
      this._removeBuilding(item);
      // 重绘
      this._addBuilding(item);
    }
  };

  _removeBuilding = item => {
    _MAP_.getLayer('model-' + item.id) && _MAP_.removeLayer('model-' + item.id);
    _MAP_.getLayer('model-top-' + item.id) &&
      _MAP_.removeLayer('model-top-' + item.id);
  };

  _addBuilding = item => {
    const { scale } = this.state;
    if (!_MAP_.getLayer('model-' + item.id)) {
      const { lnglat } = item;
      _MAP_.addLayer(
        new CustomLayer(
          lnglat[0],
          lnglat[1],
          0,
          'model-' + item.id,
          `http://47.110.135.245:12808/static/side/${item.id}.gltf`,
          scale
        ),
        'GHYDPL_7L_NAME'
      );
    }
    if (!_MAP_.getLayer('model-top-' + item.id)) {
      const { lnglat } = item;
      _MAP_.addLayer(
        new CustomLayer(
          lnglat[0],
          lnglat[1],
          0,
          'model-top-' + item.id,
          `http://47.110.135.245:12808/static/top/${item.id}top.gltf`,
          scale
        ),
        'GHYDPL_7L_NAME'
      );
    }
  };
}
