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

  _routeStartF = undefined;
  _roadIds = undefined;

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
    // return;
    _MAP_.on('mouseup', this._setStart);
    _MAP_.on('mouseup', 'POLICE_CAR_START', e => {
      console.log('e.features', e.features);
    });
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

  _setStart = async () => {
    if (this._routeStartF || _MAP_.getLayer('security_route_start')) return;
    const _bound = _MAP_.getBounds();
    // const _coord = e.lngLat;
    const _coord = { lng: 117.10342087995144, lat: 36.69238760389375 };
    this._routeStartF = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [_coord.lng, _coord.lat]
        },
        properties: {
          title: '点',
          icon: 'monument'
        }
      }
    ];
    this._drawStartPoint(_coord); // 绘制起始点
    console.log('%c ~~~~~~ 第 1 次请求 ~~~~~~', 'color: green');
    let { res, err } = await FetchRoadInfo({
      coord: _coord,
      bound: _bound,
      order: 'first'
    });
    if (err || !res) return; // 保护
    this._roadIds = res.ids;
    let _startPoint; // 起始点
    const _toSelectPoints = [],
      _toSelectFeatures = [];
    for (let item of res.points) {
      if (item.startPoint) {
        const _ind = item.userData.indexOf('true');
        item.userData.splice(_ind, 1);
        _startPoint = item;
      } else {
        _toSelectPoints.push(item);
      }
      const { coordinates } = item;
      _toSelectFeatures.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [coordinates[0].x, coordinates[0].y]
        },
        properties: {
          title: '点'
        }
      });
    }

    _MAP_.addLayer({
      id: 'security_route_start' + Math.random(),
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: _toSelectFeatures
        }
      },
      layout: {
        'icon-image': 'security_route'
      }
    });

    this._fetch({
      prev: _startPoint,
      suff: _toSelectPoints[0],
      ids: this._roadIds,
      order: 'firstPlus'
    });
  };

  // 获取当前屏幕内的 roadIds
  _fetchRoadIds = async () => {
    const _bound = _MAP_.getBounds();
    const { res, err } = await FetchRoadInfo({
      bound: _bound,
      order: 'switchScreen'
    });
    if (err) return;
    this._roadIds = res;
  };

  _loopCounts = 2;
  _fetch = async param => {
    // console.log( `%c ~~~~~~ 第 ${this._loopCounts} 次请求 ~~~~~~`, 'color: red' );

    await this._fetchRoadIds();

    let { res, err } = await FetchRoadInfo(param);
    if (err) return;

    const _toSelectFeatures = [];

    for (let item of res) {
      if (item.type !== 'LineString') {
        const { coordinates } = item;
        _toSelectFeatures.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coordinates[0].x, coordinates[0].y]
          },
          properties: {
            title: '点'
          }
        });
      }
    }

    _MAP_
      .addSource('security_route_start_source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: _toSelectFeatures
        }
      })
      .addLayer({
        id: 'security_route_start' + Math.random(),
        type: 'symbol',
        source: 'security_route_start_source',
        layout: {
          'icon-image': 'security_route_start'
        }
      });

    _MAP_
      .addSource('security_route_start_source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: _toSelectFeatures
        }
      })
      .addLayer({
        id: 'line-animation',
        type: 'line',
        source: 'security_route_start_source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#ed6498',
          'line-width': 5,
          'line-opacity': 0.8
        }
      });
    // this._fetch();
  };

  _drawStartPoint = coord => {
    // 组织点
    this._routeStartF = [
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
    // 绘制
    _MAP_.addLayer({
      id: 'security_route_start',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this._routeStartF
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
}

const options = [
  { value: 0, name: '重大安保路线', icon: <IoIosAddCircleOutline /> }
];
