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
          车辆
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

  _setStart = async e => {
    if (this._routeStartF || _MAP_.getLayer('security_route_start')) return;
    const _bound = _MAP_.getBounds();
    // const _coord = e.lngLat;
    const _coord = { lng: 117.10338726989903, lat: 36.69236306153957 };

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

    console.log('%c ~~~~~~~~~~~~~~~ 第 1 次请求 ~~~~~~~~~~~~~~~', 'color: red');
    let { res, err } = await FetchRoadInfo({
      coord: _coord,
      bound: _bound,
      order: 'first'
    });
    console.log('_fetchRes', { res, err });
    if (err || !res) return;
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
        _toSelectFeatures.push({});
      }
    }
    console.log(_startPoint, _toSelectPoints);
    this._fetch({
      prev: _startPoint,
      suff: _toSelectPoints[0],
      ids: this._roadIds,
      order: 'firstPlus'
    });
  };

  _loopCounts = 1;
  _fetch = async param => {
    console.log(
      `%c ~~~~~~~~~~~~~~~ 第 ${2} 次请求 ~~~~~~~~~~~~~~~`,
      'color: red'
    );
    let { res, err } = await FetchRoadInfo(param);
    console.log('{ res, err }', { res, err });
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
    //
    _MAP_.addLayer({
      id: 'security_route_start',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this._routeStartF
        }
      },
      layout: {
        'text-field': '',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 16,
        'text-padding': 4,
        'icon-image': 'security_route_start',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.5, 0],
        'text-font': ['黑体'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 1)', // ['get', ['get', 'KIND'], ['literal', FontColor]]
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    });
  };
}

const options = [
  { value: 0, name: '重大安保路线', icon: <IoIosAddCircleOutline /> }
];
