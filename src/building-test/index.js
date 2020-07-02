import React, { Component } from 'react';
import { FetchRequest, Add3dLayer } from 'tuyun-utils';
import {
  point as TurfPoint,
  polygon as TurfPolygon,
  booleanPointInPolygon as PointInPolygon,
  featureCollection as FeatureCollection,
} from '@turf/turf';
import CustomLayer from './custom-layer';
export default class index extends Component {
  _shouldRemove = false;
  _customLayer = undefined;
  _customLayerId = 'model-custom';
  _visibleLv = 16.5;

  componentDidMount = () => this._init();

  render() {
    return <div></div>;
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
    // const res1 = await this._getShape('2049033');
    // const res2 = await this._getShape('2147769');
    // const res3 = await this._getShape('2147768');
    // const res4 = await this._getShape('2147767');
    // const _source = {
    //   type: 'geojson',
    //   data: FeatureCollection([
    //     TurfPolygon(res1.coordinates, { height: 10, color: '#00ff00' }),
    //     TurfPolygon(res2.coordinates, { height: 10, color: '#00f0f0' }),
    //     TurfPolygon(res3.coordinates, { height: 10, color: '#ff0f00' }),
    //     TurfPolygon(res4.coordinates, { height: 10, color: '#0000ff' }),
    //   ]),
    // };
    // console.log('_source', _source);
    // Add3dLayer(_MAP_, _source, 'afdajsasd', { color: ['get', 'color'] });
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
    const _sX = Math.floor((_bounds._sw.lng / _maxLng + 1) * 2 ** 16);
    const _sY = Math.floor((_bounds._sw.lat / _maxLat + 1) * 2 ** 16);
    const _eX = Math.ceil((_bounds._ne.lng / _maxLng + 1) * 2 ** 16);
    const _eY = Math.ceil((_bounds._ne.lat / _maxLat + 1) * 2 ** 16);
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
          url: `./static/models/testui4.gltf`,
          // url: './static/models/wintestui.gltf',
          // url: `http://192.168.251.140:8081/tiles/${_id}.gltf`,
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
    const _viewModelArr = [];
    for (const item of _modelArr) {
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
      PointInPolygon(_pt, vArea) && _viewModelArr.push(item);
    }
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
    const _center = { lng: 0, lat: 0 };
    const _viewArea = [
      [cvsL, cvsT],
      [cvsR, cvsT],
      [cvsR, cvsB],
      [cvsL, cvsB],
    ].map((xy) => {
      const { lng, lat } = _MAP_.unproject(xy);
      _center.lng += lng;
      _center.lat += lat;
      return [lng, lat];
    });
    // 中心点
    _center.lng /= _viewArea.length;
    _center.lat /= _viewArea.length;
    return {
      viewArea: TurfPolygon([[..._viewArea, _viewArea[0]]]),
      viewCenter: _center,
    };
  };

  _getShape = async (buildingId) => {
    const url = 'mod/getShpList?key=' + buildingId;
    const { res, err } = await FetchRequest({
      url,
      host: `http://47.97.230.212:8889/`,
    });
    if (!res || err) return location.reload(); // 刷新页面
    const { H, geometry, center, id, style } = res;
    if (!geometry) return null;
    return {
      coordinates: geometry.coordinates,
      floor: H + 1,
      center,
      buildingId: id,
      style,
    };
  };

  _removeBuilding = (id) => _MAP_.getLayer(id) && _MAP_.removeLayer(id);
}
