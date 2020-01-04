/**
 * @author sl204984
 * @description 布控显示
 */

import React, { Component } from 'react';
import { IoMdBus, IoMdCheckmark } from 'react-icons/io';
import {
  GlobalEvent,
  GloEventName,
  AddCircleLayer,
  RemoveLayer,
  LayerIds
} from 'tuyun-utils';

import { TypeOptions, BayonetOpt, IcafeOpt, HotelOpt } from './constant';
import {
  GetBayonetPosition,
  GetIcafePosition,
  GetHotelPosition
} from './webapi';

export default class DistributeControl extends Component {
  state = {
    expanded: false,
    selectedTypes: [],
    animate: 'hidden'
  };

  componentWillMount = this._dealWithEvent;
  componentDidMount = this._init;

  _bayonetIntervalId = undefined; // 卡口的定时
  _hotelIntervalId = undefined; // 宾馆的定时
  _icafeIntervalId = undefined; // 网吧的定时

  render() {
    const { selectedTypes, animate, expanded } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    const _labelCls = `item-label${expanded ? ' selected' : ''}`;
    return (
      <div className="menu-item content">
        <div className={_labelCls} onClick={this._selectMenu}>
          <IoMdBus />
          <div className="label-text">布控显示</div>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`vehicle-type ${animate}`}>
          {TypeOptions.map((item, index) => {
            const _isChecked = selectedTypes.indexOf(item) > -1;
            const { rgb } = item;
            return (
              <li
                className={`item-cell ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectOption(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div className="cell-label-text">{item.name}</div>
                <div
                  className="cell-color-sign"
                  style={{
                    backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _dealWithEvent = () => {};

  _init = () => {};

  _selectMenu = async () => {
    const { expanded: curExpanded } = this.state;
    const _expanded = !curExpanded;
    const _animate = _expanded ? 'menu-down' : 'menu-up';
    await this.setState({
      expanded: _expanded,
      animate: _animate,
      selectedTypes: []
    }); // 修改 state
    // 增/删监听
    if (_expanded) {
      this._addListener();
    } else {
      this._removeAllLayers();
      this._removeListener();
    }
  };

  _selectOption = async (item, e) => {
    e.stopPropagation();
    const { selectedTypes } = this.state;
    const _taskInd = selectedTypes.indexOf(item);
    _taskInd > -1
      ? selectedTypes.splice(_taskInd, 1)
      : selectedTypes.push(item);
    await this.setState({ selectedTypes });
    this._loadData(); // 加载数据
  };

  _loadData = async () => {
    const { selectedTypes } = this.state;
    if (selectedTypes.length === 0) return this._removeAllLayers();
    const _bounds = _MAP_.getBounds();
    // minX=116.98261&maxX=118.98261&minY=36.64974&maxY=37.64974
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}`;
    // 卡口
    if (selectedTypes.indexOf(BayonetOpt) > -1) {
      const { rgbHex, rgbHex2 } = BayonetOpt;
      GlobalEvent.emit(GloEventName.showGlobalLoading);
      const { res, err } = await GetBayonetPosition(_param, rgbHex, rgbHex2);
      GlobalEvent.emit(GloEventName.closeGlobalLoading);
      if (!res || err) return;
      const { geo, geo2 } = res;
      const { bayonet } = LayerIds;
      let _odd = false;
      clearInterval(this._bayonetIntervalId);
      const _opt = { color: ['get', 'color'], radius: 5 };
      AddCircleLayer(_MAP_, geo, bayonet.point, _opt); // 可以点击，显示点位图
      this._bayonetIntervalId = setInterval(() => {
        _odd = !_odd;
        if (_odd) {
          AddCircleLayer(_MAP_, geo2, bayonet.point);
        } else {
          AddCircleLayer(_MAP_, geo, bayonet.point);
        }
      }, 1000);
    } else {
      const { bayonet } = LayerIds;
      clearInterval(this._bayonetIntervalId);
      RemoveLayer(_MAP_, bayonet.point);
    }
    // 网吧 maxX=118.09357909623746&minY=36.96251473211209&maxY=38.96251473211209
    if (selectedTypes.indexOf(IcafeOpt) > -1) {
      const { rgbHex, rgbHex2 } = IcafeOpt;
      GlobalEvent.emit(GloEventName.showGlobalLoading);
      const { res, err } = await GetIcafePosition(_param, rgbHex, rgbHex2);
      GlobalEvent.emit(GloEventName.closeGlobalLoading);
      if (!res || err) return;
      const { geo, geo2 } = res;
      const { icafe } = LayerIds;
      let _odd = false;
      clearInterval(this._icafeIntervalId);
      const _opt = { color: ['get', 'color'], radius: 5 };
      AddCircleLayer(_MAP_, geo, icafe.point, _opt);
      this._icafeIntervalId = setInterval(() => {
        _odd = !_odd;
        if (_odd) {
          AddCircleLayer(_MAP_, geo2, icafe.point);
        } else {
          AddCircleLayer(_MAP_, geo, icafe.point);
        }
      }, 1000);
    } else {
      const { icafe } = LayerIds;
      clearInterval(this._icafeIntervalId);
      RemoveLayer(_MAP_, icafe.point);
    }
    // 宾馆
    if (selectedTypes.indexOf(HotelOpt) > -1) {
      const { rgbHex, rgbHex2 } = HotelOpt;
      GlobalEvent.emit(GloEventName.showGlobalLoading);
      const { res, err } = await GetHotelPosition(_param, rgbHex, rgbHex2);
      GlobalEvent.emit(GloEventName.closeGlobalLoading);
      if (!res || err) return;
      const { geo, geo2 } = res;
      const { hotel } = LayerIds;
      let _odd = false;
      clearInterval(this._hotelIntervalId);
      const _opt = { color: ['get', 'color'], radius: 5 };
      AddCircleLayer(_MAP_, geo, hotel.point, _opt);
      this._hotelIntervalId = setInterval(() => {
        _odd = !_odd;
        if (_odd) {
          AddCircleLayer(_MAP_, geo2, hotel.point);
        } else {
          AddCircleLayer(_MAP_, geo, hotel.point);
        }
      }, 1000);
    } else {
      const { hotel } = LayerIds;
      clearInterval(this._hotelIntervalId);
      RemoveLayer(_MAP_, hotel.point);
    }
  };

  _addListener = () => {
    const { bayonet, hotel, icafe } = LayerIds;
    _MAP_.on('moveend', this._onMoveEnd); // 重新加载数据
    _MAP_.on('click', bayonet.point, this._clickBayonet);
    _MAP_.on('click', hotel.point, this._clickHotel);
    _MAP_.on('click', icafe.point, this._clickIcafe);
  };

  _removeAllLayers = () => {
    const { bayonet, hotel, icafe } = LayerIds;
    clearInterval(this._bayonetIntervalId);
    clearInterval(this._hotelIntervalId);
    clearInterval(this._icafeIntervalId);
    RemoveLayer(_MAP_, bayonet.point);
    RemoveLayer(_MAP_, hotel.point);
    RemoveLayer(_MAP_, icafe.point);
    GlobalEvent.emit(GloEventName.closeControlPop);
  };

  _removeListener = () => {
    const { bayonet, hotel, icafe } = LayerIds;
    _MAP_.off('moveend', this._onMoveEnd);
    _MAP_.off('click', bayonet.point, this._clickBayonet);
    _MAP_.off('click', hotel.point, this._clickHotel);
    _MAP_.off('click', icafe.point, this._clickIcafe);
  };

  _onMoveEnd = () => {
    this._loadData();
  };

  _clickBayonet = e => {
    const _isControl = e.features[0].properties.has;
    const _name = e.features[0].properties.name;
    const { x, y } = _MAP_.project(e.lngLat);
    if (!_isControl) {
      const { showPopupBayonet } = GloEventName;
      GlobalEvent.emit(showPopupBayonet, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        lngLat: e.lngLat,
        code: e.features[0].properties.code
      });
    } else {
      GlobalEvent.emit(GloEventName.showControlPop, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        lngLat: e.lngLat,
        code: e.features[0].properties.code,
        name: _name,
        type: 'bayonet'
      });
    }
  };

  _clickHotel = e => {
    const _isControl = e.features[0].properties.has;
    const { x, y } = _MAP_.project(e.lngLat);
    if (!_isControl) {
      const { showHotel } = GloEventName;
      GlobalEvent.emit(showHotel, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        lngLat: e.lngLat,
        code: e.features[0].properties.code
      });
    } else {
      GlobalEvent.emit(GloEventName.showControlPop, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        lngLat: e.lngLat,
        code: e.features[0].properties.code,
        type: 'hotel'
      });
    }
  };

  _clickIcafe = e => {
    const _isControl = e.features[0].properties.has;
    const { x, y } = _MAP_.project(e.lngLat);
    if (!_isControl) {
      const { showIcafe } = GloEventName;
      GlobalEvent.emit(showIcafe, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        lngLat: e.lngLat,
        yycsdm: e.features[0].properties.yycsdm
      });
    } else {
      GlobalEvent.emit(GloEventName.showControlPop, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        lngLat: e.lngLat,
        code: e.features[0].properties.code,
        type: 'icafe'
      });
    }
  };
}
