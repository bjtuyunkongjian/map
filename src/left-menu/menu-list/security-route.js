import React, { Component } from 'react';
import { IoIosCar } from 'react-icons/io';
import { TuyunTips } from 'tuyun-kit';
import MenuItem from './menu-item';
import Event from './event';
import { FetchRoadInfo, SaveScurityRoute, FetchAllRoutes } from './webapi';
import {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  DrawNodePoint,
  RouteLayers,
  CreatePointFeature,
  CreateLineFeature
} from './security-route-layer';

export default class PoliceCar extends Component {
  state = {
    curMenu: -1,
    selectedOpt: '',
    animate: 'hidden'
  };

  _roadFeatures = []; // 选中的路
  _roadNode = []; // 选中路的节点，撤销使用
  _lineRingFeatures = []; // 环形路
  _toSelectFeatures = []; // 待选择的点

  componentDidMount = () => this._init();

  render() {
    const { curMenu, selectedOpt, animate } = this.state;
    const _selected = curMenu === MenuItem.securityRoute;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosCar />
          <span>安保路线</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`route-container ${animate}`}>
          {options.map((item, index) => (
            <li
              ref={el => (this._el = el)}
              className={`route-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={() => this._selectMenuItem(index)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _init = () => {
    Event.on('change:curMenu', this._dealWithEvent); // 选择当前菜单
    _MAP_.on('click', this._setStartPoint); // 点击起点，起点可以随意设置
    _MAP_.on('click', RouteLayers.toSelect, this._chooseRoutePoint); // 点击选择路的点
    _MAP_.on('contextmenu', RouteLayers.routeNode, e =>
      console.log(e.features)
    );
    _MAP_.on('click', RouteLayers.lineRingRoute, this._chooseLineRing); // 点击选择环形路
    _MAP_.on('contextmenu', this._selectEndPoint);
    _MAP_.on('click', RouteLayers.endRoute, this._setEndPoint);
  };

  // 发送菜单改变事件
  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.securityRoute ? -1 : MenuItem.securityRoute
    );
  };

  _dealWithEvent = nextMenu => {
    const { curMenu } = this.state;
    if (curMenu === nextMenu) return; // 重复点击不做任何操作
    const _animate =
      nextMenu === MenuItem.securityRoute ? 'menu-down' : 'menu-up';
    this.setState({ curMenu: nextMenu, selectedOpt: '', animate: _animate });
    this._roadFeatures = [];
    this._roadNode = [];
    this._lineRingFeatures = [];
    this._toSelectFeatures = [];
    Object.keys(RouteLayers).map(key => {
      const _val = RouteLayers[key];
      _MAP_.getLayer(_val) && _MAP_.removeLayer(_val).removeSource(_val); // 删除所有 layer 和 source
    });
  };

  _selectMenuItem = index => {
    this.setState({ selectedOpt: index });
  };

  _setStartPoint = async e => {
    const { curMenu } = this.state;
    const _selected = true || curMenu === MenuItem.securityRoute;
    // 如果有 routeStart 这个层级，说明设置了起点
    if (!_selected || _MAP_.getLayer(RouteLayers.routeStart)) return;
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
        console.log('%c this._roadNode', 'color: green');
        console.log(this._roadNode);
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
      _MAP_
        .removeLayer(RouteLayers.toSelect)
        .removeSource(RouteLayers.toSelect);
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
}

const options = [
  {
    value: 'newRoute',
    name: '新建'
  },
  {
    value: 'view',
    name: '查看'
  }
];
