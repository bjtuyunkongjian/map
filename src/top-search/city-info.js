/**
 * @author sl204984
 * 警力一张图对之前右上角的导航的修改
 * 天气情况类型：
 * 晴(sunny)、多云(partly cloudy)、阴(cloudy)、雨(rain)、雪(Snowy)
 */

import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import Event, { EventName } from './event';
import { DropDown } from './constant';

export default class CityInfo extends Component {
  state = {
    curDropDown: '',
    curCity: {}
  };

  componentWillMount = () => this._init();

  render() {
    const { curDropDown } = this.state;
    const _selected = DropDown.cityList === curDropDown;
    return (
      <div className="city-info" onClick={this._selectDropDown}>
        <span className="city-name">城市</span>
        {_selected ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </div>
    );
  }

  _init = () => {
    Event.on(EventName.changeCityName, nextCity => {
      this.setState({ curCity: nextCity });
    });
    Event.on(EventName.changeDropDown, dropDown => {
      this.setState({ curDropDown: dropDown });
    });
  };

  _selectDropDown = () => {
    const { curDropDown } = this.state;
    Event.emit(
      EventName.changeDropDown,
      curDropDown === DropDown.cityList ? '' : DropDown.cityList
    );
  };
}
