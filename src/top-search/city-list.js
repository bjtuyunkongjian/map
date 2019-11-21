import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';
import Event, { EventName } from './event';
import { DropDown } from './constant';

export default class CityList extends Component {
  state = {
    curDropDown: '',
    curCity: {}
  };

  _curZoom = 0;

  componentWillMount = () => this._init();

  render() {
    const { curDropDown, curCity } = this.state;
    return (
      <div
        className={`city-list ${
          curDropDown === DropDown.cityList ? '' : 'hidden'
        }`}
      >
        <div className="list-header">
          <span>城市列表</span>
          <IoIosClose
            className="close-icon"
            size={20}
            onClick={this._closeCityList}
          />
        </div>
        <div className="list-body">
          {/* <div className="cur-city">当前城市：{curCity.name}</div> */}
          <div className="select-city">
            <div className="select-city-label">选择城市：</div>
            <ul className="cities">
              {cityList.map((item, index) => (
                <li
                  className={`city-item${curCity === item ? ' selected' : ''}`}
                  key={`city_list_${index}`}
                  onClick={() => this._selectCity(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  _init = () => {
    Event.on(EventName.changeDropDown, dropDown => {
      this.setState({ curDropDown: dropDown, curCity: {} });
    });
    Event.on(EventName.changeCityName, curCity => {
      this.setState({ curCity });
    });
  };

  _closeCityList = () => {
    Event.emit(EventName.changeDropDown, '');
  };

  _selectCity = async cityInfo => {
    const { curCity } = this.state;
    this._curZoom = _MAP_.getZoom();
    curCity !== cityInfo && Event.emit(EventName.changeCityName, cityInfo);
    _MAP_.flyTo({ center: cityInfo.center, zoom: 10 });
  };
}

const cityList = [
  { name: '滨州', value: 'binzhou', center: [117.994584, 37.39252] },
  { name: '德州', value: 'dezhou', center: [116.340858, 37.452006] },
  { name: '东营', value: 'dongying', center: [118.67273, 37.452006] },
  { name: '菏泽', value: 'heze', center: [115.44856, 35.239107] },
  { name: '济南', value: 'jinan', center: [117.114183, 36.631092] },
  { name: '济宁', value: 'jining', center: [116.578804, 35.429464] },
  { name: '莱芜', value: 'laiwu', center: [117.673356, 36.226584] },
  { name: '聊城', value: 'liaocheng', center: [115.970614, 36.469289] },
  { name: '临沂', value: 'linqin', center: [118.351503, 35.132032] },
  { name: '青岛', value: 'qingdao', center: [120.385942, 36.071919] },
  { name: '日照', value: 'rizhao', center: [119.529336, 35.441362] },
  { name: '泰安', value: 'taian', center: [117.078491, 36.226584] },
  { name: '威海', value: 'weihai', center: [122.111051, 37.535287] },
  { name: '潍坊', value: 'weifang', center: [119.148622, 36.726271] },
  { name: '烟台', value: 'yantai', center: [121.444802, 37.487698] },
  { name: '枣庄', value: 'zaozhuang', center: [117.30454, 34.846496] },
  { name: '淄博', value: 'zibo', center: [118.042173, 36.821449] }
];
