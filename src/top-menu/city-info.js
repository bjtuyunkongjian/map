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
  IoIosArrowDown
} from 'react-icons/io';

export default class CityInfo extends Component {
  state = {
    curIndex: -1
  };

  render() {
    const _weatherIcon = this._selectIcon();
    return (
      <div className="city-info menu-item">
        {_weatherIcon}
        <span className="city-name">济南市</span>
        <IoIosArrowDown />
      </div>
    );
  }

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
}
