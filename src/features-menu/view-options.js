/**
 * @author sl204984
 * 视图
 */
import React, { Component } from 'react';
import { IoMdReorder } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import ThematicStyles from './thematic-styles';
import { ChangeLvStyle } from './change-lv-style';
import Event, { EventName } from './event';
import MenuItems from './menu-items';

export default class ViewOptions extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0
  };

  _prevIndex = 0; // 当前状态

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItems.viewOptions;
    return (
      <div
        className={`menu-item view-options ${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        <IoMdReorder />
        模板
        <ul className={`option-container ${_selected ? '' : 'hidden'}`}>
          {options.map((item, index) => (
            <li
              className={`option-item ${
                selectedOpt === index ? 'checked' : ''
              }`}
              key={`view_option_${index}`}
              onClick={e => this._checkStyle(index, item.theme, e)}
            >
              {item.name}
              {selectedOpt === index ? <MdCheck /> : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeCurMenu, curMenu => {
      this.setState({ curMenu });
    });
    GlobalEvent.on(GloEventName.changeMapTemplate, this._changeMapTemplate);
  };

  _changeMapTemplate = tempalte => {
    let _index = options.findIndex(item => item.name === tempalte);
    _index = _index < 0 ? 0 : _index;
    if (_index === this._prevIndex) return; // 重复渲染保护
    this._prevIndex = _index;
    const _opt = options[_index];
    this._checkStyle(_index, _opt.theme);
  };

  _selectMenu = e => {
    e.stopPropagation();
    const { curMenu } = this.state;
    Event.emit(
      EventName.changeCurMenu,
      curMenu === MenuItems.viewOptions ? -1 : MenuItems.viewOptions
    );
  };

  _checkStyle = (index, theme, e) => {
    e && e.stopPropagation();

    this.setState({ selectedOpt: index });
    for (let item of ThematicStyles) {
      if (!item.id || !item[theme]) continue;
      if (_MAP_.getLayer(item.id)) {
        if (item.type === 'background') {
          _MAP_.setPaintProperty(item.id, 'background-color', item[theme]);
        } else if (item.type === 'road' || item.type === 'road-bg') {
          _MAP_.setPaintProperty(item.id, 'line-color', item[theme]);
        } else if (item.type && item.type === '3d') {
          _MAP_.setPaintProperty(item.id, 'fill-extrusion-color', item[theme]);
        } else if (item.type === 'fill') {
          _MAP_.setPaintProperty(item.id, 'fill-color', item[theme]);
        }
      } else {
        if (item.type === 'road' || item.type === 'road-bg') {
          ChangeLvStyle({
            id: item.id,
            typeName: 'line-color',
            typeVal: item[theme]
          });
        } else if (item.type && item.type === '3d') {
          ChangeLvStyle({
            id: item.id,
            typeName: 'fill-extrusion-color',
            typeVal: item[theme]
          });
        } else if (item.type === 'fill') {
          ChangeLvStyle({
            id: item.id,
            typeName: 'fill-color',
            typeVal: item[theme]
          });
        }
      }
    }
  };
}

const options = [
  { name: '服务民生', theme: 'standard' },
  { name: '警务综合', theme: 'european' },
  { name: '执法监督', theme: 'serene' },
  { name: '反恐维稳', theme: 'calm' }, // calm
  { name: '社区民居', theme: 'serenity' }, // serenity
  { name: '侦察打击', theme: 'night' }
];
