import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';
import ThematicStyles from './thematic-styles';
import { ChangeLvStyle } from './change-lv-style';

export default class ViewOption extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;

    const _optItems = viewOptions.map((item, index) => (
      <li
        className="option-item"
        key={`nav_option_${index}`}
        onClick={() => this._checkStyle(index, item.theme)}
      >
        {item.name}
        {selectedOpt === index ? <MdCheck /> : null}
      </li>
    ));

    return _optItems;
  }

  _checkStyle = (index, theme) => {
    const { onSelect } = this.props;
    this._setStyle(theme);
    onSelect(index);
  };

  _setStyle = theme => {
    for (let item of ThematicStyles) {
      if (!item.id || !item[theme]) continue;
      if (_MAP_.getLayer(item.id)) {
        if (item.type === 'background') {
          // background-color
          _MAP_.setPaintProperty(item.id, 'background-color', item[theme]);
        } else if (item.type === 'road ' || item.type === 'road-bg') {
          _MAP_.setPaintProperty(item.id, 'line-color', item[theme]);
        } else if (item.type && item.type === '3d') {
          _MAP_.setPaintProperty(item.id, 'fill-extrusion-color', item[theme]);
        } else if (item.type === 'fill') {
          _MAP_.setPaintProperty(item.id, 'fill-color', item[theme]);
        }
      } else {
        if (item.type === 'road ' || item.type === 'road-bg') {
          ChangeLvStyle({
            id: item.id,
            typeName: 'line-color',
            rgb: item[theme]
          });
        } else if (item.type && item.type === '3d') {
          ChangeLvStyle({
            id: item.id,
            typeName: 'fill-extrusion-color',
            rgb: item[theme]
          });
        } else if (item.type === 'fill') {
          ChangeLvStyle({
            id: item.id,
            typeName: 'fill-color',
            rgb: item[theme]
          });
        }
      }
    }
  };
}

const viewOptions = [
  { value: 0, name: '标准视图', theme: 'standard' },
  { value: 1, name: '天地图标准', theme: 'tiandi' },
  { value: 2, name: '欧标视图', theme: 'european' },
  { value: 3, name: '夜间视图', theme: 'night' }
];
