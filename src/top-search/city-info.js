/**
 * @author sl204984
 * 警力一张图对之前右上角的导航的修改
 * 天气情况类型：
 * 晴(sunny)、多云(partly cloudy)、阴(cloudy)、雨(rain)、雪(Snowy)
 */

import React, { Component } from 'react';
import {
  IoIosSunny,
  IoIosPartlySunny,
  IoIosCloudy,
  IoIosRainy,
  IoIosSnow,
  IoIosArrowDown,
  IoIosArrowUp
} from 'react-icons/io';
import { FetchCityInfo } from './webapi';
import Event from './event';

export default class CityInfo extends Component {
  state = {
    cityName: '济南市'
  };

  componentWillMount() {
    this._dealWithEvent();
  }

  componentDidMount() {
    this._changeCityInfo(); // 改变城市信息
  }

  render() {
    const _weatherIcon = this._selectIcon();
    const { cityName } = this.state;
    const _selected = false;
    return (
      <div className="city-info" onClick={this._selectMenu}>
        {_weatherIcon}
        <span className="city-name">{cityName}</span>
        {_selected ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on('change:cityName', cityName => {
      this.setState({ cityName });
    });
  };

  _selectIcon = () => {
    const { curWeather } = this.state;
    let _weather;
    switch (curWeather) {
      case 0:
        _weather = <IoIosSunny color="#fec50f" />;
        break;
      case 1:
        <IoIosPartlySunny color="#b2b3b5" />;
        break;
      case 2:
        _weather = <IoIosCloudy color="#b2b3b5" />;
        break;
      case 3:
        _weather = <IoIosRainy />;
        break;
      case 4:
        _weather = <IoIosSnow color="#5ab2ff" />;
        break;
      default:
        _weather = <IoIosSunny color="#fec50f" />;
        break;
    }
    return _weather;
  };

  _changeCityInfo = () => {
    this._fetchCityInfo(); // 获取城市信息
    document.addEventListener('mouseup', this._fetchCityInfo);
    _MAP_.on('zoomend', this._fetchCityInfo);
  };

  _fetchCityInfo = async () => {
    const _zoom = _MAP_.getZoom();
    if (_zoom < 8) {
      // 暂时将缩放层级小于8的计算放在前台
      Event.emit('change:cityName', '山东省');
      return;
    }
    const _bounds = _MAP_.getCenter(); // 获取边界信息

    const _param = {
      points: [_bounds.lng, _bounds.lat]
    };
    // const { res, err } = await FetchCityInfo(_param);
    // !err && Event.emit('change:cityName', res.city_name);
  };

  _selectMenu = () => {};
}
