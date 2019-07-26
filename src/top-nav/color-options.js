import React, { Component } from 'react';
import { MdCheck, MdClear } from 'react-icons/md';
import ThematicStyles from './thematic-styles';
import { ChangeLvStyle } from './change-lv-style';

export default class ColorOptions extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;

    const _optItems = colorOptions.map((item, index) => (
      <li
        className="option-item"
        key={`nav_option_${index}`}
        onClick={() => this._checkStyle(index)}
      >
        {item.name}
        {selectedOpt === index ? <MdCheck /> : null}
      </li>
    ));

    _optItems.push(
      <li
        className="option-cancel"
        key={`nav_option_cancel`}
        onClick={this._reverse}
      >
        还原
        <MdClear />
      </li>
    );

    return _optItems;
  }

  _checkStyle = index => {
    const { onSelect } = this.props;
    onSelect(index);
  };

  _reverse = () => {
    const theme = 'standard';
    for (let item of ThematicStyles) {
      if (!item.id || !item[theme]) continue;
      if (_MAP_.getLayer(item.id)) {
        if (item.type === 'background') {
          // background-color
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
    const { onSelect } = this.props;
    onSelect(-1);
  };
}

const colorOptions = [
  { value: 0, name: '交通' },
  { value: 1, name: '绿地' },
  { value: 2, name: '水系' },
  { value: 3, name: '居民地' }
];
