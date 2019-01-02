import React, { Component } from 'react';
import Event from './event';
import { IoIosPaper, IoMdCheckmark } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchWorkContent } from './webapi';
import LayerIds from './layers-id';
import { IsArray } from 'tuyun-utils';
// import { DailyWork } from '../list-option/daily-work'; fix ====> 苹果手机 input 文字错乱

export default class WorkContent extends Component {
  state = {
    curMenu: -1,
    datanum: {},
    selectedTasks: []
  };
  componentDidMount() {
    this._init();
  }

  render() {
    const { curMenu, datanum, selectedTasks } = this.state;
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
          <li className={`work-item`} onClick={e => this._selectAll(e)}>
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
                {`(${datanum[item.datasum] || 0})`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // 点击事件，包括点击切换菜单和点击弹出具体任务框
  _init = () => {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
      if (_MAP_.getSource('dailySource')) {
        for (let item of options) {
          _MAP_.removeLayer(item.value);
        }
        _MAP_.removeSource('dailySource');
      }
    });
    _MAP_.on('click', 'taskLst', e => {
      console.log(e.features);
    });
  };

  // 点击发射切换菜单事件
  _selectMenu = async () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.workContent ? -1 : MenuItem.workContent
    );

    // 点击工作内容向后台请求各个工作的数据量
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchWorkContent({
      points: _bounds
    });

    if (err) return;
    this.setState({ datanum: res });
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
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchWorkContent({
      points: _bounds,
      type: selectedTasks.map(item => item.value)
    });

    // 保护

    if (err) return;
    const _features = [];
    for (let task of selectedTasks) {
      if (!IsArray(res[task.value]))
        return console.log(`${task.value} 不是数组`);
      res[task.value].map(coord => {
        _features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coord.lon, coord.lat]
          },
          properties: {
            value: task.value
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
