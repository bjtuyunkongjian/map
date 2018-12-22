import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';
import MenuItems from './menu-items';
import Event from './event';

export default class CityList extends Component {
  state = {
    curMenu: -1,
    cityName: '济南市'
  };

  _curZoom = 0;

  componentWillMount() {
    this._dealWithEvent();
  }

  render() {
    const { curMenu, cityName } = this.state;
    return (
      <div
        className={`city-list ${
          curMenu === MenuItems.cityInfo ? '' : 'hidden'
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
          <div className="cur-city">当前城市：{cityName}</div>
          <div className="select-city">
            <div className="select-city-label">选择城市：</div>
            <ul className="cities">
              {cityList.map((item, index) => (
                <li
                  className="city-item"
                  key={`city_list_${index}`}
                  onClick={() => {
                    this._selectCity(item);
                  }}
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

  _dealWithEvent = () => {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
    Event.on('change:cityName', cityName => {
      this.setState({ cityName });
    });
  };

  _closeCityList = () => {
    Event.emit('change:curMenu', -1);
  };

  _selectCity = async cityInfo => {
    const { cityName } = this.state;
    this._curZoom = _MAP_.getZoom();
    // await new Promise(resolve => {
    //   this._zoomView(resolve);
    // });
    cityName !== cityInfo.name && Event.emit('change:cityName', cityInfo.name);
    _MAP_.flyTo({ center: cityInfo.center, zoom: 10 });
  };

  // _zoomView = resolve => {
  //   // 缩放视图，要保证缩放时间相同
  //   // 注释了这个动画过程，mapbox自带这个动画
  //   const _endZoom = 10; // 最终缩放层级
  //   const _zoomStep = 0.1; // 缩放step
  //   const _diffZoom = this._curZoom - _endZoom; // 当前缩放层级和最终缩放层级的差分
  //   if (_diffZoom > _zoomStep) {
  //     this._curZoom -= _zoomStep; // 如果 _diffZoom 大于 _zoomStep ， _curZoom 减少 _zoomStep
  //   } else if (_diffZoom + _zoomStep < 0) {
  //     this._curZoom += _zoomStep; // 如果 _diffZoom 小于负的 _zoomStep ， _curZoom 增加 _zoomStep
  //   } else if (this._curZoom !== _endZoom) {
  //     this._curZoom = 10; // 如果 _curZoom 和 _endZoom 不同，设置 _curZoom 的值为 _endZoom
  //   } else {
  //     resolve();
  //     return; // 如果 _curZoom 和 _endZoom 相同，返回
  //   }

  //   _MAP_.setZoom(this._curZoom); // 缩放

  //   if (Math.abs(_diffZoom) > _zoomStep) {
  //     requestAnimationFrame(() => {
  //       this._zoomView(resolve);
  //     });
  //   } else {
  //     resolve();
  //   }
  // };
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
