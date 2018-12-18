/**
 * @author sl204984
 * 视图
 */
import React, { Component } from 'react';
import { IoMdReorder } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';
import ThematicStyles from './thematic-styles';
import { ChangeLvStyle } from './change-lv-style';
import Event from './event';
import MenuItems from './menu-items';

export default class ViewOptions extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0
  };

  componentWillMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }

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

  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItems.viewOptions ? -1 : MenuItems.viewOptions
    );
  };

  _checkStyle = (index, theme, e) => {
    e.stopPropagation();

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
  { value: 0, name: '标准视图', theme: 'standard' },
  { value: 1, name: '天地图标准', theme: 'tiandi' },
  { value: 2, name: '欧标视图', theme: 'european' },
  { value: 3, name: '夜间视图', theme: 'night' }
];
