import React, { Component } from 'react';

import Event from './event';
import { IoIosPeople } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchString } from './webapi';

export default class PoliceData extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0
  };

  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      console.log(curMenu);
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItem.dataOption;
    const _slide = _selected ? 'menu-down' : 'menu-top';
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item police-data">
        <div className="item-label data" onClick={this._selectMenu}>
          <IoIosPeople />
          一标三实
          <span className={`arrow ${_arrow}`} />
        </div>
        <ul className={`data-container ${_selected ? '' : 'hidden'} ${_slide}`}>
          {options.map((item, index) => (
            <li
              className={`data-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._checkMap(item, index, e)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.dataOption ? -1 : MenuItem.dataOption
    );
  };
  _checkMap = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
    this._fetchPeopleData(item);
    // for (let item of MapTypes) {
    //   if (!item.id || !item[map]) continue;
    //   if (_MAP_.getLayer(item.id)) {
    //     if (item.map === 'people') {
    //       _MAP_.getSource();
    //     }
    //   }
    // }
  };

  _fetchPeopleData = async option => {
    this._curZoom = _MAP_.getZoom();
    // const { res } = await FetchString({ data: [] });
    // _MAP_.addLayer({});
    await new Promise(resolve => {
      this._zoomView(resolve, { endZoom: option.defaultZoom });
    });
  };

  _zoomView = (resolve, { endZoom }) => {
    // 缩放视图，要保证缩放时间相同
    // endZoom 为最终缩放层级
    const _zoomStep = 0.1; // 缩放step
    const _diffZoom = this._curZoom - endZoom; // 当前缩放层级和最终缩放层级的差分
    if (_diffZoom > _zoomStep) {
      this._curZoom -= _zoomStep; // 如果 _diffZoom 大于 _zoomStep ， _curZoom 减少 _zoomStep
    } else if (_diffZoom + _zoomStep < 0) {
      this._curZoom += _zoomStep; // 如果 _diffZoom 小于负的 _zoomStep ， _curZoom 增加 _zoomStep
    } else if (this._curZoom !== endZoom) {
      this._curZoom = endZoom; // 如果 _curZoom 和 endZoom 不同，设置 _curZoom 的值为 endZoom
    } else {
      resolve();
      return; // 如果 _curZoom 和 endZoom 相同，返回
    }

    _MAP_.setZoom(this._curZoom); // 缩放

    if (Math.abs(_diffZoom) > _zoomStep) {
      requestAnimationFrame(() => {
        this._zoomView(resolve); // 自循环
      });
    } else {
      resolve();
    }
  };
}

const options = [
  {
    value: 0,
    name: '人口',
    defaultZoom: 10
    // map: 'people'
  },
  {
    value: 1,
    name: '房屋',
    defaultZoom: 15
    // map: 'house'
  },
  {
    value: 2,
    name: '单位',
    defaultZoom: 12
    // map: 'unit'
  }
];
