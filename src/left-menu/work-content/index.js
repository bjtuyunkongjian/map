/**
 * @author 郝艺红
 * @name 工作内容
 */

import React, { Component } from 'react';
import { IoIosPaper, IoMdCheckmark } from 'react-icons/io';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import { IsArray } from 'tuyun-utils';

import { FetchWorkContent } from './webapi';
import DailyWork from './daily-work';

import Event from '../event';

export default class WorkContent extends Component {
  state = {
    expanded: false,
    datanumMap: {},
    selectedTasks: [],
    animate: 'hidden'
  };

  componentDidMount = () => this._init();

  render() {
    const { datanumMap, selectedTasks, animate, expanded } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosPaper />
          <span>工作内容</span>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`work-container ${animate}`}>
          <li className="work-item" onClick={e => this._selectAll(e)}>
            全部显示
          </li>
          {options.map((item, index) => {
            const _isChecked = selectedTasks.indexOf(item) > -1;
            return (
              <li
                className={`work-item ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectWork(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div
                  className="color-sign"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
                {`(${datanumMap[item.datasum] || 0})`}
              </li>
            );
          })}
        </ul>
        {/* 具体任务详情 */}
        <DailyWork />
      </div>
    );
  }

  _init = () => {
    _MAP_.on('moveend', this._eventListener); // 添加 move 监听事件
    // 点击图标事件
    _MAP_.on('click', contentLayerId, e => {
      const { originalEvent, features, lngLat } = e;
      Event.emit('showModal', {
        left: originalEvent.offsetX,
        top: originalEvent.offsetY,
        value: features[0].properties.value,
        lngLat: lngLat
      });
    });
  };

  _eventListener = () => {
    const { expanded } = this.state;
    expanded && this._fetchDataNum(); // 展开时，获取各个类型工作的数量
    this._fetchWorkContent();
  };

  _selectMenu = () => {
    const { expanded } = this.state;
    const _animate = !expanded ? 'menu-down' : 'menu-up';
    this.setState({ expanded: !expanded, animate: _animate }); // 修改 state
    !expanded && this._fetchDataNum(); // 展开时，获取各个类型工作的数量
  };

  // 请求各个类型工作的数据量
  _fetchDataNum = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchWorkContent({
      points: _bounds
    });
    if (err || !res) return; // 保护
    this.setState({ datanumMap: res });
  };

  // 地图上"全部显示"工作内容
  _selectAll = async e => {
    e.stopPropagation();
    let { selectedTasks } = this.state;
    if (selectedTasks.length === options.length) {
      selectedTasks = [];
    } else {
      selectedTasks = options.map(item => item);
    }
    await this.setState({ selectedTasks });
    this._fetchWorkContent();
  };

  // 复选框选中多个列表
  _selectWork = async (item, e) => {
    e.stopPropagation();
    const { selectedTasks } = this.state;
    const _taskInd = selectedTasks.indexOf(item);
    const _isSelected = _taskInd > -1;
    _isSelected ? selectedTasks.splice(_taskInd, 1) : selectedTasks.push(item);
    await this.setState({ selectedTasks });
    this._fetchWorkContent();
  };

  // 后台请求列表对应的数组点
  _fetchWorkContent = async () => {
    const { selectedTasks } = this.state;
    if (selectedTasks.length === 0)
      return this._removeSourceLayer(contentLayerId); // 如果未选中任何待办任务，就不需要发请求，并删除对应的图层
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchWorkContent({
      points: _bounds,
      type: selectedTasks.map(item => item.value)
    });
    if (err || !res) return; // 错误保护，没有返回结果也保护
    let _features = [];
    for (let task of selectedTasks) {
      const _taskItems = res[task.value];
      if (!IsArray(_taskItems)) return console.log(`${task.value} 不是数组`); // 保护
      _taskItems.map(coord => {
        const _feature = TurfPoint([coord.lon, coord.lat], {
          value: task.value,
          color: task.color
        });
        _features.push(_feature);
      }); // 生成点的 features
    }
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    if (!_MAP_.getSource(contentLayerId)) {
      _MAP_.addLayer({
        id: contentLayerId,
        type: 'circle',
        source: _geoJSONData,
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': 6
        }
      });
    } else {
      _MAP_.getSource(contentLayerId).setData(_geoJSONData.data);
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const contentLayerId = 'WORK_CONTENT_LAYER';

const options = [
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
