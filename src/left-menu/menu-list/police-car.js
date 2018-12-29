import React, { Component } from 'react';
import Event from './event';
import { IoIosCar } from 'react-icons/io';
import MenuItem from './menu-item';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FetchRoadInfo } from './webapi';

export default class PoliceCar extends Component {
  state = {
    curMenu: -1,
    selectedOpt: ''
  };

  _prevPoint = undefined;
  _roadCoords = [];

  componentDidMount() {
    this._init();
  }

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
    }); // 选择当前菜单
    _MAP_.on('click', this._setStartPoint); // 起点可以随意设置
    _MAP_.on('click', 'SECURITY_ROUTE_POINT', this._selectRoutePoint);
    _MAP_.on('contextmenu', this._setEndPoint);
    _MAP_.on('click', 'SECURITY_END_ROUTE', this._setEnd);
  };

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
    // 如果有 SECURITY_ROUTE_START 这个层级，说明设置了起点
    if (_MAP_.getLayer('SECURITY_ROUTE_START')) return;
    const _bound = _MAP_.getBounds(); // 获取屏幕边界

    const _coord = e.lngLat; // 获取点击的坐标点
    this._drawStartPoint(_coord); // 绘制起始点
    let { res, err } = await FetchRoadInfo({
      coord: _coord,
      bound: _bound,
      order: 'first'
    });
    if (err || !res) return; // 保护
    // this._roadIds = res.ids; // 将 ids 保存 ============> 第一次不需要计算 _roodIds
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
    this._drawIconPoint({
      id: 'SECURITY_SELECT_START_MAPPING',
      features: [_startMappingF],
      iconImage: 'security_route'
    });
    // 绘制待选择的点
    this._drawIconPoint({
      id: 'SECURITY_ROUTE_POINT',
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
    let { res, err } = await FetchRoadInfo(_param);
    this._prevPoint = _param.suff;
    if (err) return; // 保护
    const _toSelectPoints = [];
    const _toSelectFeatures = [];
    for (let item of res) {
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
    // 绘制整个路
    this._drawRoad({
      id: 'SECURITY_ROUTE',
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
    this._drawIconPoint({
      id: 'SECURITY_ROUTE_POINT',
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
    this._drawRoad({
      id: 'SECURITY_END_ROUTE',
      features: _features,
      lineColor: '#099',
      lineWidth: 8
    });
  };

  _setEnd = async e => {
    console.log(e);
  };

  _fetchRoadIds = async () => {
    const _bound = _MAP_.getBounds(); // 获取当前屏幕内的 roadIds
    const { res, err } = await FetchRoadInfo({
      bound: _bound,
      order: 'switchScreen'
    });
    return err ? undefined : res;
  };

  _drawStartPoint = coord => {
    // 绘制起始点
    const _features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [coord.lng, coord.lat]
        },
        properties: {
          title: '点',
          icon: 'monument'
        }
      }
    ];
    _MAP_.addLayer({
      id: 'SECURITY_ROUTE_START',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: _features
        }
      },
      paint: {
        'circle-radius': {
          base: 5,
          stops: [[10, 5], [20, 20]]
        },
        'circle-color': '#e55e5e'
      }
    });
  };

  _drawIconPoint = ({ id, features, iconImage }) => {
    if (!_MAP_.getSource(id)) {
      _MAP_.addLayer({
        id: id,
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        },
        layout: {
          'icon-image': iconImage || 'security_route_start'
        }
      });
    } else {
      _MAP_.getSource(id).setData({
        type: 'FeatureCollection',
        features: features
      });
    }
  };

  _drawRoad = ({ id, features, lineColor = '#888', lineWidth = 8 }) => {
    if (!_MAP_.getSource(id)) {
      _MAP_.addLayer({
        id: id,
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': lineColor,
          'line-width': lineWidth
        }
      });
    } else {
      _MAP_.getSource(id).setData({
        type: 'FeatureCollection',
        features: features
      });
    }
  };
}

const options = [
  { value: 0, name: '重大安保路线', icon: <IoIosAddCircleOutline /> }
];
