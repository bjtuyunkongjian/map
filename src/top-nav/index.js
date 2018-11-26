/**
 * @author sl204984
 */

import React, { Component } from 'react';
import ViewOptions from './view-options';
import ColorOptions from './color-options';
import MeasureOptions from './measure-options';
import FilterOptions from './filter-options';
import ColorModal from './color-modal';
import { MeasureDistance } from './measure-distance';
import { MeasureArea } from './measure-area';
import {
  RoadLabelIds,
  GrassLabelIds,
  WaterLabelIds,
  ResidentLabelIds
} from './layer-ids';
import { RegRgb } from 'tuyun-utils';

export default class TopNav extends Component {
  state = {
    selectedNav: -1,
    selectedView: -1,
    selectedColor: -1,
    selectedMeasure: -1,
    hiddenFilter: []
  };

  _measureDistance = MeasureDistance;
  _measureArea = MeasureArea;

  componentDidMount() {
    _MAP_.on('mouseup', () => {
      this.setState({ selectedNav: -1 });
    });
    this._measureDistance();
    this._measureArea();
  }

  render() {
    const { selectedNav, selectedColor } = this.state;
    const optList = this._renderOptList();
    const showModal = selectedNav === 1 && selectedColor > -1;
    return (
      <div className="top-nav">
        {navList.map((item, index) => (
          <div
            className="nav-item"
            key={`top_nav_${index}`}
            onClick={e => this._selectIndex(e, index)}
          >
            {item.name}
            {item.type === 1 ? <span className="arrow-down" /> : null}
            {index === selectedNav ? optList : null}
          </div>
        ))}
        <ColorModal
          visible={showModal}
          onSelect={rgb => this._changeColor(rgb)}
          onCancel={() => this.setState({ selectedNav: -1, selectedColor: -1 })}
        />
      </div>
    );
  }

  _selectIndex = (e, index) => {
    e.stopPropagation();
    const { selectedNav } = this.state;
    selectedNav === index
      ? this.setState({
          selectedNav: -1
        })
      : this.setState({
          selectedNav: index
        });
  };

  _renderOptList = () => {
    let _optItems = null,
      _selectedOpt;
    const {
      selectedNav,
      selectedView,
      selectedColor,
      selectedMeasure,
      hiddenFilter
    } = this.state;
    switch (selectedNav) {
      case 0:
        _optItems = ViewOptions;
        _selectedOpt = selectedView;
        break;
      case 1:
        _optItems = ColorOptions;
        _selectedOpt = selectedColor;
        break;
      case 2:
        _optItems = MeasureOptions;
        _selectedOpt = selectedMeasure;
        break;
      case 3:
        _optItems = FilterOptions;
        _selectedOpt = hiddenFilter;
        break;
      default:
        _optItems = null;
        _selectedOpt = -1;
        break;
    }
    return _optItems ? (
      <ul className="nav-option" onClick={e => e.stopPropagation()}>
        <_optItems selectedOpt={_selectedOpt} onSelect={this._setSelectedOpt} />
      </ul>
    ) : null;
  };

  _setSelectedOpt = val => {
    const { selectedNav } = this.state;

    switch (selectedNav) {
      case 0:
        this.setState({ selectedView: val });
        break;
      case 1:
        this.setState({ selectedColor: val });
        break;
      case 2:
        this.setState({ selectedMeasure: val });
        break;
      case 3:
        this.setState({ hiddenFilter: val });
        break;
      default:
    }
  };

  _changeColor = rgb => {
    if (!RegRgb.test(rgb)) {
      this.setState({ selectedNav: -1, selectedColor: -1 });
      return;
    }
    const { selectedColor } = this.state;
    for (let item of colorLabelIdArr[selectedColor]) {
      if (!item.id || item.type === 'POI' || !_MAP_.getLayer(item.id)) continue;
      if (item.type && item.type.startsWith('road')) {
        item.type === 'road' &&
          _MAP_.setPaintProperty(item.id, 'line-color', rgb);
      } else {
        _MAP_.setPaintProperty(item.id, 'fill-color', rgb);
      }
    }
    this.setState({ selectedNav: -1, selectedColor: -1 });
  };
}

const navList = [
  { type: 1, name: '视图' },
  { type: 1, name: '配色' },
  { type: 1, name: '测量' },
  { type: 1, name: '筛选' }
];

const colorLabelIdArr = [
  RoadLabelIds,
  GrassLabelIds,
  WaterLabelIds,
  ResidentLabelIds
];
