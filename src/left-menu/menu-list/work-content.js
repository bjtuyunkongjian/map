import React, { Component } from 'react';
import Event from './event';
import { IoIosPaper, IoMdCheckmark } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchWorkContent } from './webapi';
import { IsArray } from 'tuyun-utils';
import DailyWork from '../list-option/daily-work';
import { point as TurfPoint } from 'turf';

export default class WorkContent extends Component {
  state = {
    curMenu: -1,
    datanumMap: {},
    selectedTasks: [],
    animate: 'hidden'
  };
  componentDidMount() {
    this._init();
  }

  render() {
    const { curMenu, datanumMap, selectedTasks, animate } = this.state;
    const _selected = curMenu === MenuItem.workContent;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosPaper />
          <span>工作内容</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
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

  // 点击事件，包括点击切换菜单和点击弹出具体任务框
  _init = () => {
    Event.on('change:curMenu', nextMenu => {
      const { curMenu } = this.state;
      if (curMenu === nextMenu) return; // 重复点击不做任何操作
      let _animate;
      if (nextMenu === MenuItem.workContent) {
        _animate = 'menu-down';
      } else if (curMenu === MenuItem.workContent) {
        _animate = 'menu-up';
      } else {
        _animate = 'hidden';
      }
      this.setState({ curMenu: nextMenu, animate: _animate });
      // 清空所有图层
      if (_MAP_.getSource('dailySource')) {
        for (let item of options) {
          _MAP_.removeLayer(item.value);
        }
        _MAP_.removeSource('dailySource');
      }
      if (nextMenu !== MenuItem.workContent) {
        // 未选中工作内容
        Event.emit('closeModal'); // 关闭弹框
        this._reset(); // 重置
        _MAP_.off('zoomend', this._eventListener); // 删除 zoomend 事件
        _MAP_.off('mouseup', this._eventListener); // 删除 mouseup 事件
      } else {
        // 选中工作内容
        _MAP_.on('zoomend', this._eventListener); // 添加 zoomend 事件
        _MAP_.on('mouseup', this._eventListener); // 添加 mouseup 事件
      }
    });
    // 点击图标事件
    options.map(item => {
      _MAP_.on('click', item.value, e => {
        const { originalEvent, features } = e;
        Event.emit('showModal', {
          left: originalEvent.offsetX,
          top: originalEvent.offsetY,
          value: features[0].properties.value
        });
      });
    });
  };

  _eventListener = () => {
    this._fetchDataNum();
    this._fetchWorkContent();
  };

  _reset = async () => {
    this.setState({
      datanumMap: {},
      selectedTasks: []
    }); // 重置 state
  };

  // 点击发射切换菜单事件
  _selectMenu = async () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.workContent ? -1 : MenuItem.workContent;
    Event.emit('change:curMenu', _nextMenu);
    if (_nextMenu !== MenuItem.workContent) return; // 如果当前点击的不是工作内容，不需要发送请求
    // 点击工作内容向后台请求各个工作的数据量
    this._fetchDataNum();
  };

  _fetchDataNum = async () => {
    // 点击工作内容向后台请求各个工作的数据量
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
    if (selectedTasks.length === 0) return; // 如果未选中任何代办任务，就不需要发请求
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
      data: {
        type: 'FeatureCollection',
        features: _features
      }
    };
    if (!_MAP_.getSource('dailySource')) {
      _MAP_.addSource('dailySource', _geoJSONData);
      for (let item of options) {
        _MAP_.addLayer({
          id: item.value,
          type: 'circle',
          source: 'dailySource',
          paint: {
            'circle-color': item.color,
            'circle-radius': 6
          },
          filter: ['==', 'value', item.value]
        });
      }
    } else {
      _MAP_.getSource('dailySource').setData(_geoJSONData.data);
    }
  };
}

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
