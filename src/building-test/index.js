import React, { Component } from 'react';
// import { FetchRequest, Add3dLayer } from 'tuyun-utils';
import {
  point as TurfPoint,
  polygon as TurfPolygon,
  booleanPointInPolygon as PointInPolygon,
} from '@turf/turf';
import CustomLayer from './custom-layer';
export default class index extends Component {
  state = {
    scale: 8e-9,
  };

  _shouldRemove = false;
  _customLayer = undefined;
  _customLayerId = 'model-custom';
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
      return this._removeBuilding(this._customLayerId);
    }
    // 获取屏幕范围
    const _bounds = _MAP_.getBounds();
    // 切分规则，最大的经纬度
    const _maxLng = 180;
    const _maxLat = 85.05112878;
    // 生成要请求瓦片起始终止序列号
    const _sX = Math.floor(((_bounds._sw.lng + _maxLng) / _maxLng) * 2 ** 16);
    const _sY = Math.floor(((_bounds._sw.lat + _maxLat) / _maxLat) * 2 ** 16);
    const _eX = Math.ceil(((_bounds._ne.lng + _maxLng) / _maxLng) * 2 ** 16);
    const _eY = Math.ceil(((_bounds._ne.lat + _maxLat) / _maxLat) * 2 ** 16);
    // 添加模型
    const _modelArr = [];
    const _diffLng = _maxLng / 2 ** 16;
    const _diffLat = _maxLat / 2 ** 16;
    for (let x = _sX; x <= _eX; x++) {
      for (let y = _sY; y <= _eY; y++) {
        const _id = `${x}_${y}`;
        const _lng = (x + 0.5) * _diffLng - _maxLng; // 中心点经度
        const _lat = (y + 0.5) * _diffLat - _maxLat; // 中心点纬度
        _modelArr.push({
          url: `http://192.168.251.140:8081/tiles/${_id}.gltf`,
          lng: _lng,
          lat: _lat,
          altitude: 0,
          name: `tile-${_id}`,
        });
      }
    }
    // 获取可视区域的范围
    const { viewArea: vArea, viewCenter: vCenter } = this._getViewArea() || {};
    if (!vArea || !vCenter) return;
    const _viewModelArr = _modelArr.filter((item) => {
      let _pt;
      if (item.lng < vCenter.lng) {
        if (item.lat < vCenter.lat) {
          _pt = TurfPoint([item.lng + _diffLng / 2, item.lat + _diffLat / 2]);
        } else {
          _pt = TurfPoint([item.lng + _diffLng / 2, item.lat - _diffLat / 2]);
        }
      } else {
        if (item.lat < vCenter.lat) {
          _pt = TurfPoint([item.lng - _diffLng / 2, item.lat + _diffLat / 2]);
        } else {
          _pt = TurfPoint([item.lng - _diffLng / 2, item.lat - _diffLat / 2]);
        }
      }
      return PointInPolygon(_pt, vArea);
    });
    // 获取中心点坐标
    const _center = _MAP_.getCenter();
    // 添加模型
    if (!this._customLayer) {
      this._customLayer = new CustomLayer({
        center: [_center.lng, _center.lat],
        id: this._customLayerId,
        modelArr: _viewModelArr,
      });
      _MAP_.addLayer(this._customLayer);
    } else {
      this._customLayer.updateModel({
        center: [_center.lng, _center.lat],
        modelArr: _viewModelArr,
      });
    }
  };

  _getViewArea = () => {
    const _canvas = _MAP_.getCanvas();
    if (!_canvas) return;
    const {
      left: cvsL,
      top: cvsT,
      right: cvsR,
      bottom: cvsB,
    } = _canvas.getBoundingClientRect();
    const _center = [0, 0];
    const _viewArea = [
      [cvsL, cvsT],
      [cvsR, cvsT],
      [cvsR, cvsB],
      [cvsL, cvsB],
    ].map((xy) => {
      const { lng, lat } = _MAP_.unproject(xy);
      _center[0] += lng;
      _center[1] += lat;
      return [lng, lat];
    });
    // 中心点
    _center[0] /= _viewArea.length;
    _center[1] /= _viewArea.length;
    return {
      viewArea: TurfPolygon([[..._viewArea, _viewArea[0]]]),
      viewCenter: _center,
    };
  };

  _changeScale = async (w) => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });
  };

  _removeBuilding = (id) => _MAP_.getLayer(id) && _MAP_.removeLayer(id);
}
