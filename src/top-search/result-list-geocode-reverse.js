import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';
import { GlobalConst, GloEventName, GlobalEvent } from 'tuyun-utils';

import Event, { EventName } from './event';
import { SearchValue } from './constant';

export default class CityList extends Component {
  state = {
    show: true,
    resArr: [],
    curNav: {}
  };

  _type = '';

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { show, resArr = [], curNav = {} } = this.state;
    if(curNav.value !== SearchValue.geocodeReverse) return null;
    if(resArr.length === 0) return null;
    return (
      <div
        className={`result-list ${show ? '' : 'hidden'}`}
      >
        <div className="list-header">
          <span>搜索结果</span>
          <IoIosClose
            className="close-icon"
            size={20}
            onClick={this._closeResultList}
          />
        </div>
        {/* 列表 */}
        {resArr.map((item, index) => {
          return (
            <ul
              className="list-row"
              key={`list_${index}`}
              onClick={() => this._selectItem(item)}
            >
              <li className="list-name">{item.name || '无对应信息'}</li>
              <li className="list-type">{item.type || '无类型信息'}</li>
              <li className="list-addr">{item.address || '无地址信息'}</li>
            </ul>
          );
        })}
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeSearchNav, nextNav => {
      const { curNav } = this.state;
      if (nextNav === curNav) return;
      this.setState({ curNav: nextNav });
    });
  };

  _closeResultList = () => {
    Event.emit(EventName.changeDropDown, { dropDown: '' });
  };

  _selectItem = async item => {
    if (!this._type) return;
    if (this._type === searchType.baseUnitName) {
      const { showPopupUnit } = GloEventName;
      const { x, y, zagldwbm } = item;
      const _lnglat = [x, y];
      _MAP_.flyTo({ center: [x, y], zoom: 10 });
      const { x: boxLeft, y: boxTop } = _MAP_.project(_lnglat);
      GlobalEvent.emit(showPopupUnit, {
        visible: true,
        boxLeft,
        boxTop,
        code: zagldwbm,
        lngLat: _lnglat
      });
    } else if (this._type === searchType.basePlaceName) {
      const { name, kind, x, y } = item;
      _MAP_.flyTo({ center: [x, y], zoom: 10 });
      GlobalEvent.emit(GloEventName.showSearchResult, {
        visible: true,
        detailInfo: { kind, name, x, y },
        type: this._type
      });
    } else if (this._type === searchType.baseCaseName) {
      const { x, y, ajbh } = item;
      const _lnglat = [x, y];
      const { x: boxLeft, y: boxTop } = _MAP_.project(_lnglat);
      _MAP_.flyTo({ center: [x, y], zoom: 10 });
      GlobalEvent.emit(GloEventName.showPopupCase, {
        visible: true,
        boxLeft,
        boxTop,
        code: ajbh,
        lngLat: _lnglat
      });
    }
  };
}

const { searchType } = GlobalConst;
