import React, { Component } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import {
  PoiLabelIds,
  RoadLabelIds,
  GrassLabelIds,
  WaterLabelIds,
  ResidentLabelIds,
  BoundaryLabelIds
} from './layer-ids';
import { ChangeLvStyle } from './change-lv-style';

export default class FilterOptions extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    hiddenOpt: [],
    onSelect: () => {}
  };

  render() {
    const { hiddenOpt } = this.props;

    const _optItems = filterOptions.map((item, index) => (
      <li
        className="option-item"
        key={`nav_option_${index}`}
        onClick={() => this._checkStyle(index)}
      >
        {item.name}
        {!hiddenOpt[index] ? <IoMdEye /> : <IoMdEyeOff />}
      </li>
    ));

    return _optItems;
  }

  _checkStyle = index => {
    const { onSelect, hiddenOpt } = this.props;
    hiddenOpt[index] = !hiddenOpt[index];

    this._toggleVisible(hiddenOpt[index], index);
    onSelect(hiddenOpt);
  };

  _toggleVisible = (hidden, index) => {
    const _labelLayerIds = filterOptions[index].labelLayerIds;
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

const filterOptions = [
  { value: 0, name: 'POI', labelLayerIds: PoiLabelIds },
  { value: 1, name: '交通', labelLayerIds: RoadLabelIds },
  { value: 2, name: '绿地', labelLayerIds: GrassLabelIds },
  { value: 3, name: '水系', labelLayerIds: WaterLabelIds },
  { value: 4, name: '居民地', labelLayerIds: ResidentLabelIds },
  { value: 5, name: '边界线', labelLayerIds: BoundaryLabelIds }
];
