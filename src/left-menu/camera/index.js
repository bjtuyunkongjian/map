import React, { Component } from 'react';
import { IoIosCamera } from 'react-icons/io';
import { GetCameraData } from './webapi';
import {
  LayerIds,
  AddImageLayer,
  RemoveLayer,
  GlobalEvent,
  GloEventName
} from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

export default class Camera extends Component {
  state = { selected: false };

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={this._showCamera}>
          <IoIosCamera />
          <div className="label-text">摄像头</div>
        </div>
      </div>
    );
  }

  _showCamera = () => {
    const { selected: curSelect } = this.state;
    const _selected = !curSelect;
    this.setState({ selected: _selected });
    if (_selected) {
      this._addListener(); // 添加监听
      this._fetchCameraData(); // 获取摄像头数据
    } else {
      RemoveLayer(_MAP_, LayerIds.cameraDetail.point);
      this._removeListener();
    }
  };

  // minX=&maxX=&minY=&maxY=
  _fetchCameraData = async () => {
    const _bounds = _MAP_.getBounds();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}`;
    const { res, err } = await GetCameraData(_param);
    if (!res || err) return;
    const _features = res.map(item => {
      const { latitude: y, longitude: x, kdid, url, name } = item;
      return TurfPoint([x, y], {
        code: kdid,
        url: url,
        name: name
      });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddImageLayer(_MAP_, _geoJSONData, LayerIds.cameraDetail.point, {
      iconImage: 'camera_important',
      rotationAlignment: 'viewport',
      pitchAlignment: 'viewport'
    });
  };

  _showDetail = e => {
    const { x, y } = e.point;
    const { geometry, properties } = e.features[0];
    const { code, url, name } = properties;
    GlobalEvent.emit(GloEventName.showCamera, {
      visible: true,
      boxTop: y,
      boxLeft: x,
      lngLat: geometry.coordinates,
      code: code,
      name: name,
      cameraurl: url
    });
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchCameraData);
    _MAP_.on('click', LayerIds.cameraDetail.point, this._showDetail);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchCameraData);
    _MAP_.off('click', LayerIds.cameraDetail.point, this._showDetail);
  };
}
