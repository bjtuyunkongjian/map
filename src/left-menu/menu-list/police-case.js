import React, { Component } from 'react';
import Event from './event';
import { IoIosMail, IoMdCheckmark } from 'react-icons/io';
import { IsArray } from 'tuyun-utils';
import { FetchCase } from './webapi';
import MenuItem from './menu-item';
<CaseDetail />;
import CaseDetail from '../list-option/case-message';

export default class PoliceCase extends Component {
  state = {
    curMenu: -1,
    casenum: {},
    selectedCase: [],
    animate: 'hidden'
  };
  componentDidMount() {
    this._init();
  }
  render() {
    const { curMenu, casenum, selectedCase, animate } = this.state;
    const _selected = curMenu === MenuItem.caseOption;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosMail />
          <span>案件</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>
        <ul className={`case-container ${animate}`}>
          <li className={`case-item`} onClick={e => this._selectAll(e)}>
            全部显示
          </li>
          {options.map((item, index) => {
            const _isCheck = selectedCase.indexOf(item) > -1;
            return (
              <li
                className={`case-item ${_isCheck ? 'checked' : ''}`}
                key={`case_option_${index}`}
                onClick={e => {
                  this._selectCase(item, e);
                }}
              >
                <div className={`checkbox ${_isCheck ? 'checked' : ''}`}>
                  {_isCheck ? <IoMdCheckmark /> : null}
                </div>
                <div
                  className="case-sign"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
                {`(${casenum[item.casesum] || 0})`}
              </li>
            );
          })}
        </ul>
        {/* 案件详情 */}
        <CaseDetail />
      </div>
    );
  }

  // 点击事件 切换菜单以及弹出框
  _init = () => {
    Event.on('change:curMenu', nextMenu => {
      const { curMenu } = this.state;
      if (curMenu === nextMenu) return;
      let _animate;
      if (nextMenu === MenuItem.caseOption) {
        _animate = 'menu-down';
      } else if (curMenu === MenuItem.caseOption) {
        _animate = 'menu-up';
      } else {
        _animate = 'hidden';
      }
      this.setState({ curMenu: nextMenu, animate: _animate });

      if (_MAP_.getSource('caseSource')) {
        for (let item of options) {
          _MAP_.removeLayer(item.value);
        }
        _MAP_.removeSource('caseSource');
      }
      if (nextMenu === MenuItem.caseOption) {
        _MAP_.on('mouseup', this._eventListener);
        _MAP_.on('zoomend', this._eventListener);
      } else {
        _MAP_.off('mouseup', this._eventListener);
        _MAP_.off('zoomend', this._eventListener);
      }
    });
    options.map(item => {
      _MAP_.on('click', item.value, e => {
        const { originalEvent, features } = e;
        Event.emit('showCase', {
          left: originalEvent.offsetX,
          top: originalEvent.offsetY,
          value: features[0].properties.value
        });
      });
    });
  };

  _eventListener = () => {
    this._fetchCaseNum();
    this._fetchCase();
  };

  // 触发切换菜单
  _selectMenu = async () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.caseOption ? -1 : MenuItem.caseOption
    );
    this._fetchCaseNum();
  };

  _fetchCaseNum = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchCase({
      points: _bounds
    });
    if (err || !res) return;
    this.setState({ casenum: res });
  };

  // 全部显示
  _selectAll = async e => {
    e.stopPropagation();
    let { selectedCase } = this.state;
    if (selectedCase.length === options.length) {
      selectedCase = [];
    } else {
      selectedCase = options.map(item => item);
    }
    await this.setState({ selectedCase });
    this._fetchCase();
  };

  // 复选框功能，多次请求数据
  _selectCase = async (item, e) => {
    e.stopPropagation();
    const { selectedCase } = this.state;
    const _caseInd = selectedCase.indexOf(item);
    const _isChecked = _caseInd > -1;
    _isChecked ? selectedCase.splice(_caseInd, 1) : selectedCase.push(item);
    await this.setState({ selectedCase });
    this._fetchCase();
  };

  // 请求数据
  _fetchCase = async () => {
    const { selectedCase } = this.state;
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchCase({
      points: _bounds,
      type: selectedCase.map(item => item.value)
    });

    // 保护
    if (err) return;
    const _features = [];
    for (let plcase of selectedCase) {
      if (!IsArray(res[plcase.value]))
        return console.log(`${plcase.value} 不是数组`);
      res[plcase.value].map(coord => {
        _features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coord.lon, coord.lat]
          },
          properties: {
            value: plcase.value
          }
        });
      });
    }
    const _geoJSONData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: _features
      }
    };
    if (!_MAP_.getSource('caseSource')) {
      _MAP_.addSource('caseSource', _geoJSONData);
      for (let item of options) {
        _MAP_.addLayer({
          id: item.value,
          type: 'circle',
          source: 'caseSource',
          paint: {
            'circle-color': item.color,
            'circle-radius': 5
          },
          filter: ['==', 'value', item.value]
        });
      }
    } else {
      _MAP_.getSource('caseSource').setData(_geoJSONData.data);
    }
  };
}

const options = [
  { value: 'aCaseLst', name: 'A类案件', color: '#EE2C2C', casesum: 'aCaseNum' },
  { value: 'bCaseLst', name: 'B类案件', color: '#EE9572', casesum: 'bCaseNum' },
  { value: 'cCaseLst', name: 'C类案件', color: '#C6E2FF', casesum: 'cCaseNum' },
  { value: 'dCaseLst', name: 'D类案件', color: '#B3EE3A', casesum: 'dCaseNum' }
];
