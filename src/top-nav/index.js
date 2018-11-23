import React, { Component } from 'react';
import ViewOptions from './view-options';
import ColorOptions from './color-options';
import MeasureOptions from './measure-options';
import FilterOptions from './filter-options';
import { MeasureDistance } from './measure-distance';
import { MeasureArea } from './measure-area';
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
    const { selectedNav } = this.state;
    const optList = this._renderOptList();
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
}

const navList = [
  { type: 1, name: '视图' },
  { type: 1, name: '配色' },
  { type: 1, name: '测量' },
  { type: 1, name: '筛选' }
];
