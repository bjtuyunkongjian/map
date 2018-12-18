/**
 * @author sl204984
 * 过滤
 */

import React, { Component } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

import Event from './event';
import MenuItems from './menu-items';
import { ChangeLvStyle } from './change-lv-style';
import {
  PoiLabelIds,
  RoadLabelIds,
  GrassLabelIds,
  WaterLabelIds,
  ResidentLabelIds,
  BoundaryLabelIds
} from './layer-ids';

export default class FilterOptions extends Component {
  state = {
    curMenu: -1,
    hiddenOpt: []
  };

  componentWillMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu, hiddenOpt } = this.state;
    const _selected = curMenu === MenuItems.filterOptions;
    return (
      <div
        className={`menu-item filter-options ${
          curMenu === _selected ? 'checked' : ''
        }`}
        onClick={this._selectMenu}
      >
        筛选
        <ul className={`option-container ${_selected ? '' : 'hidden'}`}>
          {options.map((item, index) => (
            <li
              className={`option-item ${!hiddenOpt[index] ? '' : 'disabled'}`}
              key={`filter_option_${index}`}
              onClick={e => this._checkStyle(index, e)}
            >
              {item.name}
              {!hiddenOpt[index] ? <IoMdEye /> : <IoMdEyeOff />}
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
      curMenu === MenuItems.filterOptions ? -1 : MenuItems.filterOptions
    );
  };

  _checkStyle = (index, e) => {
    e.stopPropagation();
    const { hiddenOpt } = this.state;
    hiddenOpt[index] = !hiddenOpt[index];
    this.setState({ hiddenOpt });

    this._toggleVisible(hiddenOpt[index], index);
  };

  _toggleVisible = (hidden, index) => {
    const _labelLayerIds = options[index].labelLayerIds;
    if (!_labelLayerIds) return;
    for (let item of _labelLayerIds) {
      if (!item.id) continue;
      if (_MAP_.getLayer(item.id)) {
        _MAP_.setLayoutProperty(
          item.id,
          'visibility',
          hidden ? 'none' : 'visible'
        );
      } else {
        ChangeLvStyle({
          id: item.id,
          typeName: 'visibility',
          typeVal: hidden ? 'none' : 'visible',
          prop: 'layout'
        });
      }
    }
  };
}

const options = [
  { value: 0, name: 'POI', labelLayerIds: PoiLabelIds },
  { value: 1, name: '交通', labelLayerIds: RoadLabelIds },
  { value: 2, name: '绿地', labelLayerIds: GrassLabelIds },
  { value: 3, name: '水系', labelLayerIds: WaterLabelIds },
  { value: 4, name: '居民地', labelLayerIds: ResidentLabelIds },
  { value: 5, name: '边界线', labelLayerIds: BoundaryLabelIds }
];
