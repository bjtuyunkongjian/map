import React, { Component } from 'react';
import { IoIosCar, IoIosAddCircleOutline } from 'react-icons/io';
import { TuyunTips } from 'tuyun-kit';
import Event from './event';
import MenuItem from './menu-item';
import { FetchRoadInfo } from './webapi';
import {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  CarLayers,
  CreatePointFeature,
  CreateLineFeature
} from './security-route-layer';

export default class PoliceCar extends Component {
  state = {
    curMenu: -1
  };

  _prevPoint = undefined;
  _roadFeatures = []; // 选中的路
  _lineRingFeatures = []; // 环形路
  _toSelectFeatures = []; // 待选择的点

  componentDidMount = () => this._init();

  render() {
    const { curMenu } = this.state;
    const _selected = curMenu === MenuItem.carOption;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectTrack}>
          <IoIosCar />
          <span>安保路线</span>
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }

  _init = () => {
    Event.on('change:curMenu', this._dealWithEvent); // 选择当前菜单
    _MAP_.on('click', this._setStartPoint); // 点击起点，起点可以随意设置
    _MAP_.on('click', CarLayers.toSelect, this._selectRoutePoint); // 点击选择路的点
    _MAP_.on('click', CarLayers.lineRingRoute, this._chooseLineRing); // 点击选择环形路
    _MAP_.on('contextmenu', this._setEndPoint);
    _MAP_.on('click', CarLayers.endRoute, this._setEnd);
  };

  _dealWithEvent = curMenu => {
    this.setState({ curMenu });
    this._prevPoint = undefined;
    this._roadFeatures = [];
    this._lineRingFeatures = [];
  };

  _selectTrack = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.carOption ? -1 : MenuItem.carOption
    );
  };

  _setStartPoint = async e => {
    const { curMenu } = this.state;
    const _selected = curMenu === MenuItem.carOption;
    // 如果有 routeStart 这个层级，说明设置了起点
    if (!_selected || _MAP_.getLayer(CarLayers.routeStart)) return;
    const _bound = _MAP_.getBounds(); // 获取屏幕边界
    const _coord = e.lngLat; // 获取点击的坐标点
    DrawStartPoint(_MAP_, _coord); // 绘制起始点
    let { res, err } = await FetchRoadInfo({
      coord: _coord,
      bound: _bound,
      order: 'first'
    });
    if (err || !res) return; // 保护
    let _startMappingF; // 起始点
    this._toSelectFeatures = []; // 要绘制的待选择的点
    for (let item of res.points) {
      const { coordinates } = item;
      if (item.startPoint) {
        const _ind = item.userData.indexOf('true'); // 删除 "true" 属性
        item.userData.splice(_ind, 1);
        this._prevPoint = item; // 起始点，点击第一个点后映射到路上的点
        _startMappingF = CreatePointFeature({
          coordinates: [coordinates[0].x, coordinates[0].y]
        });
      } else {
        const _feature = CreatePointFeature({
          coordinates: [coordinates[0].x, coordinates[0].y],
          properties: { coordInfo: item }
        });
        this._toSelectFeatures.push(_feature);
      }
    }
    // 绘制映射点
    DrawIconPoint(_MAP_, {
      id: CarLayers.startEndMapping,
      features: [_startMappingF],
      iconImage: 'security_route'
    });
    // 绘制待选择的点
    DrawIconPoint(_MAP_, {
      id: CarLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    });
  };

  _selectRoutePoint = async e => {
    const { properties } = e.features[0];
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _param = {
      prev: this._prevPoint,
      suff: JSON.parse(properties.coordInfo),
      ids: _roodIds,
      order: 'firstPlus'
    };
    const { res, err } = await FetchRoadInfo(_param);
    if (!res || err) return console.log('未返回当前道路和待选择的点'); // 保护
    const { isLineRing, coord } = res;
    this._lineRingFeatures = []; // 清空环形路
    this._prevPoint = _param.suff; // 请求参数的后一个点作为下次请求前一个点
    this._toSelectFeatures = []; // 绘制待选择的点的 features
    for (let item of coord) {
      const { coordinates } = item;
      if (item.type !== 'LineString') {
        const _feature = CreatePointFeature({
          coordinates: [coordinates[0].x, coordinates[0].y],
          properties: { coordInfo: item }
        });
        this._toSelectFeatures.push(_feature);
      } else if (isLineRing) {
        // 环形路
        const _ringCoords = coordinates.map(coordinate => [
          coordinate.x,
          coordinate.y
        ]);
        const _feature = CreateLineFeature({ coordinates: _ringCoords });
        this._lineRingFeatures.push(_feature);
      } else {
        const _coords = coordinates.map(coordinate => [
          coordinate.x,
          coordinate.y
        ]);
        const _feature = CreateLineFeature({ coordinates: _coords });
        this._roadFeatures.push(_feature);
      }
    }
    if (isLineRing) {
      // 绘制环形路
      DrawRoad(_MAP_, {
        id: CarLayers.lineRingRoute,
        features: this._lineRingFeatures,
        lineColor: '#800',
        lineWidth: 8
      });
      _MAP_.removeLayer(CarLayers.toSelect).removeSource(CarLayers.toSelect); // 删除待选择点的 layer
    } else {
      // 绘制整个路
      DrawRoad(_MAP_, {
        id: CarLayers.selectedRoute,
        features: this._roadFeatures,
        lineColor: '#888',
        lineWidth: 8
      });
      // 绘制待点击的点
      DrawIconPoint(_MAP_, {
        id: CarLayers.toSelect,
        features: this._toSelectFeatures,
        iconImage: 'security_route_start'
      });
    }
  };

  _chooseLineRing = async e => {
    const { coordinates } = e.features[0].geometry;
    const _feature = CreateLineFeature({ coordinates: coordinates });
    this._roadFeatures.push(_feature);
    DrawRoad(_MAP_, {
      id: CarLayers.selectedRoute,
      features: this._roadFeatures,
      lineColor: '#888',
      lineWidth: 8
    });
    // 绘制待点击的点
    DrawIconPoint(_MAP_, {
      id: CarLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    });
    _MAP_.removeLayer(CarLayers.lineRingRoute);
  };

  _setEndPoint = async () => {
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _param = {
      coord: this._prevPoint,
      ids: _roodIds,
      order: 'forLast'
    };
    let { res, err } = await FetchRoadInfo(_param);
    const _features = [];
    if (err) return;
    for (let item of res) {
      const { coordinates } = item;
      const _roadCoords = coordinates.map(coordinate => [
        coordinate.x,
        coordinate.y
      ]);
      _features.push(CreateLineFeature({ coordinates: _roadCoords }));
    }
    DrawRoad(_MAP_, {
      id: CarLayers.endRoute,
      features: _features,
      lineColor: '#099',
      lineWidth: 8
    });
    TuyunTips.show('请选择绿色道路上的点', { duration: 3000 });
  };

  _setEnd = async e => {
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _param = {
      order: 'last',
      prev: this._prevPoint,
      suff: e.lngLat
    };
    const { res, err } = await FetchRoadInfo(_param);
    if (!res || err) return;
    let _startMappingF;
    for (let item of res) {
      const { coordinates } = item;
      if (item.type === 'LineString') {
        const _roadCoords = coordinates.map(coordinate => [
          coordinate.x,
          coordinate.y
        ]);
        const _feature = CreateLineFeature({ coordinates: _roadCoords });
        this._roadFeatures.push(_feature);
      } else {
        _startMappingF = CreatePointFeature({
          coordinates: [coordinates[0].x, coordinates[0].y]
        });
      }
      DrawRoad(_MAP_, {
        id: CarLayers.selectedRoute,
        features: this._roadFeatures,
        lineColor: '#888',
        lineWidth: 8
      });
      DrawIconPoint(_MAP_, {
        id: CarLayers.startEndMapping + Math.random(),
        features: [_startMappingF],
        iconImage: 'security_route'
      });
      _MAP_.removeLayer(CarLayers.toSelect);
      _MAP_.removeLayer(CarLayers.endRoute);
    }
  };

  _fetchRoadIds = async () => {
    const _bound = _MAP_.getBounds(); // 获取当前屏幕内的 roadIds
    const { res, err } = await FetchRoadInfo({
      bound: _bound,
      order: 'switchScreen'
    });
    return err ? undefined : res;
  };
}
