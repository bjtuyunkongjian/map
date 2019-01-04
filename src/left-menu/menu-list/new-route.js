import React, { Component } from 'react';
import {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  DrawNodePoint,
  RouteLayers,
  CreatePointFeature,
  CreateLineFeature
} from './security-route-layer';
import { FetchRoadInfo, SaveScurityRoute } from './webapi';
import { TuyunTips } from 'tuyun-kit';

export default class NewRoute extends Component {
  state = {};

  _enableStart = false;
  _roadFeatures = []; // 选中的路
  _roadNode = []; // 选中路的节点，撤销使用
  _lineRingFeatures = []; // 环形路
  _toSelectFeatures = []; // 待选择的点

  componentDidMount = () => this._init();
  componentWillUnmount = () => this._reset();

  render() {
    return (
      <div className="new-route">
        选择路线
        <div className="start-btn" onClick={() => (this._enableStart = true)}>
          设置起点
        </div>
        <div className="end-btn" onClick={this._selectEndPoint}>
          设置终点
        </div>
        <div className="cancel-btn">撤销</div>
        <div className="save-btn" onClick={this._saveSecurityRoute}>
          保存
        </div>
      </div>
    );
  }

  _init = () => {
    _MAP_.on('click', this._setStartPoint); // 点击起点，起点可以随意设置
    _MAP_.on('click', RouteLayers.toSelect, this._chooseRoutePoint); // 点击选择路的点
    _MAP_.on('click', RouteLayers.lineRingRoute, this._chooseLineRing); // 点击选择环形路
    _MAP_.on('click', RouteLayers.endRoute, this._setEndPoint); // 设置终点
  };

  _reset = () => {
    this._enableStart = false;
    _MAP_.off('click', this._setStartPoint); // 点击起点，起点可以随意设置
    _MAP_.off('click', RouteLayers.toSelect, this._chooseRoutePoint); // 点击选择路的点
    _MAP_.off('click', RouteLayers.lineRingRoute, this._chooseLineRing); // 点击选择环形路
    _MAP_.off('click', RouteLayers.endRoute, this._setEndPoint); // 设置终点
    Object.keys(RouteLayers).map(key => {
      const _val = RouteLayers[key];
      _MAP_.getLayer(_val) && _MAP_.removeLayer(_val).removeSource(_val); // 删除所有 layer 和 source
    });
  };

  _setStartPoint = async e => {
    // 如果有 routeStart 这个层级，说明设置了起点
    if (!this._enableStart || _MAP_.getLayer(RouteLayers.routeStart)) return;
    const _bound = _MAP_.getBounds(); // 获取屏幕边界
    const _coord = e.lngLat; // 获取点击的坐标点
    DrawStartPoint(_MAP_, _coord); // 绘制起始点
    const { res, err } = await FetchRoadInfo({
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
        this._roadNode.push(item); // 添加节点
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
      id: RouteLayers.startEndMapping,
      features: [_startMappingF],
      iconImage: 'security_route'
    });
    // 绘制待选择的点
    DrawIconPoint(_MAP_, {
      id: RouteLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    });
  };

  _chooseRoutePoint = async e => {
    const { properties } = e.features[0];
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1];
    const _suff = JSON.parse(properties.coordInfo); // 当前选中的点
    const _param = {
      prev: _prev,
      suff: _suff,
      ids: _roodIds,
      order: 'firstPlus'
    };
    const { res, err } = await FetchRoadInfo(_param);
    if (!res || err) return console.log('未返回当前道路和待选择的点'); // 保护
    const { isLineRing, coord } = res;
    this._lineRingFeatures = []; // 清空环形路
    this._roadNode.push(_suff); // 添加节点
    console.log('%c this._roadNode', 'color: green');
    console.log(this._roadNode);
    this._toSelectFeatures = []; // 绘制待选择的点的 features
    for (let item of coord) {
      const { coordinates } = item;
      if (item.type !== 'LineString') {
        // 点
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
        // 普通的路
        const _coords = coordinates.map(coordinate => [
          coordinate.x,
          coordinate.y
        ]);
        const _feature = CreateLineFeature({
          coordinates: _coords,
          properties: { roadMark: '箭头' }
        });
        this._roadFeatures.push(_feature);
      }
    }
    if (isLineRing) {
      // 绘制环形路
      DrawRoad(_MAP_, {
        id: RouteLayers.lineRingRoute,
        features: this._lineRingFeatures,
        lineColor: '#800',
        lineWidth: 8
      });
      _MAP_
        .removeLayer(RouteLayers.toSelect)
        .removeSource(RouteLayers.toSelect); // 删除待选择点的 layer 和
    } else {
      // 绘制整个路
      DrawRoad(_MAP_, {
        id: RouteLayers.selectedRoute,
        features: this._roadFeatures,
        lineColor: '#888',
        lineWidth: 8
      });
      // 绘制待点击的点
      DrawIconPoint(_MAP_, {
        id: RouteLayers.toSelect,
        features: this._toSelectFeatures,
        iconImage: 'security_route_start'
      });
    }
    DrawNodePoint(_MAP_, this._roadNode);
  };

  _chooseLineRing = async e => {
    const { coordinates } = e.features[0].geometry;
    const _feature = CreateLineFeature({
      coordinates: coordinates,
      properties: { roadMark: '箭头' }
    });
    this._roadFeatures.push(_feature);
    // 绘制整个路
    DrawRoad(_MAP_, {
      id: RouteLayers.selectedRoute,
      features: this._roadFeatures,
      lineColor: '#888',
      lineWidth: 8
    });
    // 绘制待点击的点
    DrawIconPoint(_MAP_, {
      id: RouteLayers.toSelect,
      features: this._toSelectFeatures,
      iconImage: 'security_route_start'
    });
    _MAP_
      .removeLayer(RouteLayers.lineRingRoute)
      .removeSource(RouteLayers.lineRingRoute);
  };

  _selectEndPoint = async () => {
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1]; // 最后一个点
    const _param = { coord: _prev, ids: _roodIds, order: 'forLast' }; // 参数
    let { res, err } = await FetchRoadInfo(_param);
    const _features = [];
    if (err) return;
    for (let item of res) {
      const { coordinates } = item;
      const _roadCoords = coordinates.map(coordinate => [
        coordinate.x,
        coordinate.y
      ]);
      _features.push(
        CreateLineFeature({
          coordinates: _roadCoords,
          properties: { roadMark: '箭头' }
        })
      );
    }
    console.log(JSON.stringify(_features));
    DrawRoad(_MAP_, {
      id: RouteLayers.endRoute,
      features: _features,
      lineColor: '#099',
      lineWidth: 8
    });
    TuyunTips.show('请选择绿色道路上的点', { duration: 3000 });
  };

  _setEndPoint = async e => {
    const _roodIds = await this._fetchRoadIds(); // 获取路的 ids
    if (!_roodIds) return console.log('未获取当前屏幕所有道路id'); // 保护
    const _prev = this._roadNode[this._roadNode.length - 1]; // 最后一个点
    const _param = { order: 'last', prev: _prev, suff: e.lngLat }; // 请求的参数
    const { res, err } = await FetchRoadInfo(_param); // 发送请求
    if (!res || err) return;
    // this._roadNode.push()
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
        id: RouteLayers.selectedRoute,
        features: this._roadFeatures,
        lineColor: '#888',
        lineWidth: 8
      });
      DrawIconPoint(_MAP_, {
        id: RouteLayers.startEndMapping + Math.random(),
        features: [_startMappingF],
        iconImage: 'security_route'
      });
      _MAP_.getLayer(RouteLayers.toSelect) &&
        _MAP_
          .removeLayer(RouteLayers.toSelect)
          .removeSource(RouteLayers.toSelect);
      _MAP_.getLayer(RouteLayers.endRoute) &&
        _MAP_
          .removeLayer(RouteLayers.endRoute)
          .removeSource(RouteLayers.endRoute);
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

  _saveSecurityRoute = async () => {
    const _now = new Date().getTime();
    const {} = await SaveScurityRoute({
      fileName: '',
      fileId: '' + _now,
      content: {}
    });
  };
}
