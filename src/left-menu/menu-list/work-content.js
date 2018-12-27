import React, { Component } from 'react';
import Event from './event';
import { IoIosPaper } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchWorkContent } from './webapi';
import LayerIds from './layers-id';
import { IsArray } from 'tuyun-utils';

export default class WorkContent extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0,
    datanum: {}
    // checked:[],
  };
  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }
  render() {
    const { curMenu, selectedOpt, datanum } = this.state;
    const _selected = curMenu === MenuItem.workContent;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    const _slide = _selected ? 'menu-in' : 'menu-out';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosPaper />
          <span>工作内容</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>
        <ul className={`work-container ${_selected ? '' : 'hidden'} ${_slide}`}>
          {options.map((item, index) => (
            <li
              className={`work-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`work_option_${index}`}
              onClick={e => this._selectWork(item, index, e)}
            >
              <label>
                <input
                  type="checkbox"
                  value={item.value}
                  className="check-circle"
                  onClick={this._selectTask()}
                />
              </label>
              <div
                className="color-sign"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
              {`(${datanum[item.datasum] || 0})`}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _selectMenu = async () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.workContent ? -1 : MenuItem.workContent
    );

    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchWorkContent({
      points: _bounds
    });

    if (err) return;
    this.setState({ datanum: res });
  };

  _selectWork = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
    console.log('item', item);
    this._fetchWorkContent(item);
  };

  _selectTask = (item, index, value) => {
    const { curMenu } = this.state;
  };
  _fetchWorkContent = async option => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchWorkContent({
      points: _bounds,
      type: option.value
    });
    console.log(res);
    if (err || !IsArray(res[option.value])) return;
    const _features = res[option.value].map(item => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: item
        }
      };
    });
    const _geoJSONData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: _features
      }
    };
    if (!_MAP_.getSource(LayerIds.workContent.source)) {
      _MAP_.addSource(LayerIds.workContent.source, _geoJSONData).addLayer({
        id: LayerIds.workContent.layer,
        type: 'symbol',
        source: LayerIds.workContent.source,
        layout: {
          'text-field': '',
          visibility: 'visible',
          'symbol-placement': 'point',
          'text-font': ['黑体'],
          'icon-image': option.color.substring(1)
        }
        // filter: ['==', 'value', option.value]
      });
    } else {
      _MAP_.getSource(LayerIds.workContent.source).setData(_geoJSONData.data);
      _MAP_.setLayoutProperty(
        LayerIds.workContent.layer,
        'icon-image',
        option.color.substring(1)
      );
    }
    Object.keys(LayerIds).map(key => {
      const item = LayerIds[key];
      if (item === LayerIds.workContent) return;
      if (_MAP_.getLayer(item.layer)) {
        _MAP_.removeLayer(item.layer);
      }
      if (_MAP_.getSource(item.source)) {
        _MAP_.removeSource(item.source);
      }
    });
  };
}

const options = [
  { value: 0, name: '全部显示' },
  { value: 'taskLst', name: '待办任务', color: '#EF9DA1', datasum: 'taskNum' },
  {
    value: 'cluesLst',
    name: '情报线索',
    color: '#9B5C8B',
    datasum: 'cluesNum'
  },
  {
    value: 'casesLst',
    name: '将到期案件',
    color: '#3886CC',
    datasum: 'casesNum'
  },
  {
    value: 'residenceLst',
    name: '居住证到期',
    color: '#FAF575',
    datasum: 'residenceNum'
  },
  {
    value: 'immigrationLst',
    name: '常口迁入',
    color: '#EECE98',
    datasum: 'immigrationNum'
  },
  { value: 'helpLst', name: '群众求助', color: '#8AC89A', datasum: 'helpNum' },
  {
    value: 'publicPreLst',
    name: '治安防范',
    color: '#837EB4',
    datasum: 'publicPreNum'
  }
];
