import React, { Component } from 'react';
// import { FetchRequest, Add3dLayer } from 'tuyun-utils';
// import {
//   polygon as TurfPolygon,
//   featureCollection as FeatureCollection,
// } from 'turf';
import CustomLayer from './custom-layer';
export default class index extends Component {
  state = {
    scale: 8e-9,
  };

  _shouldRemove = false;
  _customLayer = undefined;
  _visibleLv = 16.5;

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
    // 小于 _visibleLv 级，删除对应图层
    if (_zoom < this._visibleLv) {
      this._customLayer = undefined;
      return this._removeBuilding('model-custom');
    }
    // 获取屏幕范围
    const _maxLng = 180;
    const _maxLat = 85.05112878;
    const _bounds = _MAP_.getBounds();
    // 生成要请求瓦片起始终止序列号
    const _sX = Math.floor(((_bounds._sw.lng + _maxLng) / _maxLng) * 2 ** 16);
    const _sY = Math.floor(((_bounds._sw.lat + _maxLat) / _maxLat) * 2 ** 16);
    const _eX = Math.ceil(((_bounds._ne.lng + _maxLng) / _maxLng) * 2 ** 16);
    const _eY = Math.ceil(((_bounds._ne.lat + _maxLat) / _maxLat) * 2 ** 16);
    // 添加模型
    const _modelArr = [];
    for (let x = _sX; x <= _eX; x++) {
      for (let y = _sY; y <= _eY; y++) {
        const _id = `${x}_${y}`;
        const _lng = ((x + 0.5) / 2 ** 16) * _maxLng - _maxLng;
        const _lat = ((y + 0.5) / 2 ** 16) * _maxLat - _maxLat;
        _modelArr.push({
          url: `http://47.97.230.212:8082/tiles/${_id}.gltf`,
          lng: _lng,
          lat: _lat,
          altitude: 0,
          name: `tile-${_id}`,
        });
      }
    }
    console.log(_modelArr);

    // 添加模型
    const _center = _MAP_.getCenter();
    if (!this._customLayer) {
      this._customLayer = new CustomLayer({
        center: [_center.lng, _center.lat],
        id: 'model-custom',
        modelArr: _modelArr,
        bounds: _bounds,
      });
      _MAP_.addLayer(this._customLayer);
    } else {
      this._customLayer.updateModel({
        center: [_center.lng, _center.lat],
        modelArr: _modelArr,
        bounds: _bounds,
      });
    }
  };

  _changeScale = async (w) => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });
  };

  _removeBuilding = (id) => _MAP_.getLayer(id) && _MAP_.removeLayer(id);
}
