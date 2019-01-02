import React, { Component } from 'react';
import { IoIosCar, IoIosAddCircleOutline } from 'react-icons/io';
import Event from './event';
import MenuItem from './menu-item';
import { FetchRoadInfo } from './webapi';
import {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  CarLayers
} from './car-layer';

export default class PoliceCar extends Component {
  state = {
    curMenu: -1,
    selectedOpt: ''
  };

  _prevPoint = undefined;
  _roadCoords = [];
  _lineRingFeatures = [];

  componentDidMount = () => this._init();

  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItem.carOption;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    const _slide = _selected ? 'menu-apr' : 'menu-dis';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectTrack}>
          <IoIosCar />
          <span>车辆</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>
        <ul
          className={`track-container ${_selected ? '' : 'hidden'} ${_slide}`}
        >
          {options.map((item, index) => (
            <li
              className={`track-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._checkTrack(item, index, e)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _init = () => {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu, selectedOpt: '' });
      this._prevPoint = undefined;
      this._roadCoords = [];
    }); // 选择当前菜单
    _MAP_.on('click', this._setStartPoint); // 起点可以随意设置
    _MAP_.on('click', CarLayers.toSelect, this._selectRoutePoint);
    _MAP_.on('contextmenu', this._setEndPoint);
    _MAP_.on('click', CarLayers.endRoute, this._setEnd);
    _MAP_.on('click', CarLayers.lineRingRoute, e => {
      console.log(e.features, e);
      const { coordinates } = e.features[0].geometry;
      // _MAP_.removeSource(CarLayers.lineRingRoute);
      this._roadCoords = [...this._roadCoords, ...coordinates]; // 组织 coordinate
      DrawRoad(_MAP_, {
        id: CarLayers.selectedRoute,
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: this._roadCoords
            }
          }
        ],
        lineColor: '#888',
        lineWidth: 8
      });
    });
  };

  _cancelEmit = () => {};

  _selectTrack = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.carOption ? -1 : MenuItem.carOption
    );
  };

  _checkTrack = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
  };

  _setStartPoint = async e => {
    const { curMenu, selectedOpt } = this.state;
    const _selected =
      curMenu === MenuItem.carOption && selectedOpt.value === securityRoute;
    // 如果有 routeStart 这个层级，说明设置了起点
    if (_selected && _MAP_.getLayer(CarLayers.routeStart)) return;
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
    const _toSelectPoints = [], // 待选择的点
      _toSelectFeatures = []; // 要绘制的待选择的点
    for (let item of res.points) {
      const { coordinates } = item;
      if (item.startPoint) {
        const _ind = item.userData.indexOf('true');
        item.userData.splice(_ind, 1);
        this._prevPoint = item; // 起始点，点击第一个点后映射到路上的点
        _startMappingF = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coordinates[0].x, coordinates[0].y]
          }
        };
      } else {
        _toSelectPoints.push(item);
        _toSelectFeatures.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coordinates[0].x, coordinates[0].y]
          },
          properties: {
            coordInfo: JSON.stringify(item)
          }
        });
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
      features: _toSelectFeatures,
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
    const { isLineRing, coord } = res;
    this._lineRingFeatures = []; // 清空环形路
    this._prevPoint = _param.suff;
    if (err) return; // 保护
    const _toSelectPoints = [];
    const _toSelectFeatures = [];
    for (let item of coord) {
      const { coordinates } = item;
      if (item.type !== 'LineString') {
        // 点， 设置 coordinates 第 0 位
        _toSelectPoints.push(item);
        _toSelectFeatures.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coordinates[0].x, coordinates[0].y]
          },
          properties: {
            coordInfo: JSON.stringify(item)
          }
        });
      } else {
        if (isLineRing) {
          const _ringCoords = coordinates.map(coordinate => [
            coordinate.x,
            coordinate.y
          ]);
          this._lineRingFeatures.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: _ringCoords
            }
          });
        } else {
          coordinates.map((coordinate, index) => {
            // 如果当前道路不为空，将新的道路第一个点删除，拼接到原来的点当中
            if (this._roadCoords.length > 0) {
              index > 0 && this._roadCoords.push([coordinate.x, coordinate.y]); // 组织 coordinate
            } else {
              this._roadCoords.push([coordinate.x, coordinate.y]); // 组织 coordinate
            }
          });
        }
      }
    }
    // 绘制环形路
    DrawRoad(_MAP_, {
      id: CarLayers.lineRingRoute,
      features: this._lineRingFeatures,
      lineColor: '#800',
      lineWidth: 8
    });
    // 绘制整个路
    DrawRoad(_MAP_, {
      id: CarLayers.selectedRoute,
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: this._roadCoords
          }
        }
      ],
      lineColor: '#888',
      lineWidth: 8
    });
    // 绘制待点击的点
    DrawIconPoint(_MAP_, {
      id: CarLayers.toSelect,
      features: _toSelectFeatures,
      iconImage: 'security_route_start'
    });
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
      const _roadCoords = [];
      coordinates.map(coordinate => {
        _roadCoords.push([coordinate.x, coordinate.y]);
      });
      _features.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: _roadCoords
        }
      });
    }
    DrawRoad(_MAP_, {
      id: CarLayers.endRoute,
      features: _features,
      lineColor: '#099',
      lineWidth: 8
    });
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
    console.log(res, err);
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
    value: 'securityRoute',
    name: '重大安保路线',
    icon: <IoIosAddCircleOutline />
  }
];
