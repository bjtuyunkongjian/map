import React, { Component } from 'react';
import Event from './event';
import { IoMdCheckmark } from 'react-icons/io';
import { TiUser } from 'react-icons/ti';
import MenuItem from './menu-item';
import { FetchGPSPolice } from './webapi';
import { lineString as LineString, point as TurfPoint } from 'turf';
import { DrawIconPoint } from './security-route-layer';
import { IsArray } from 'tuyun-utils';

export default class WorkContent extends Component {
  state = {
    curMenu: -1,
    datanum: {},
    selectedTasks: [],
    animate: 'hidden'
  };

  _intervalStart = []; // 记录起始定时时间，第 0 位是请求定时时间
  _intervalHandler = undefined;

  render() {
    const { curMenu, selectedTasks, animate } = this.state;
    const _selected = curMenu === MenuItem.policeForce;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <TiUser />
          <span>警力</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>

        <ul className={`police-force ${animate}`}>
          {options.map((item, index) => {
            const _isChecked = selectedTasks.indexOf(item) > -1;
            return (
              <li
                className={`work-item ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectPolice(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div
                  className="color-sign"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // 点击发射切换菜单事件
  _selectMenu = async () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.policeForce ? -1 : MenuItem.policeForce;
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 下一个状态
    if (curMenu === _nextMenu) return; // 重复点击不做任何操作
    let _animate;
    if (_nextMenu === MenuItem.policeForce) {
      _animate = 'menu-down';
    } else if (curMenu === MenuItem.policeForce) {
      _animate = 'menu-up';
    } else {
      _animate = 'hidden';
    }
    clearInterval(this._intervalHandler); // 关闭时清除定时器
    if (_nextMenu === -1) {
      _MAP_.off('zoomend', this._intervalSearch); // 注销事件
      _MAP_.off('mouseup', this._intervalSearch); // 注销事件
      this._removeSourceLayer(carLayerId); // 删除图层
      this._removeSourceLayer(manLayerId); // 删除图层
    } else {
      _MAP_.on('zoomend', this._intervalSearch); // 添加事件
      _MAP_.on('mouseup', this._intervalSearch); // 添加事件
    }
    await this.setState({ curMenu: _nextMenu, animate: _animate });
  };

  // 复选框选中多个列表
  _selectPolice = async (item, e) => {
    e.stopPropagation();
    const { selectedTasks } = this.state;
    const _taskInd = selectedTasks.indexOf(item);
    const _isSelected = _taskInd > -1; // 点击之前是否已选中
    _isSelected ? selectedTasks.splice(_taskInd, 1) : selectedTasks.push(item); // 点击之前已选中，取消选中；点击之前未选中，选中
    await this.setState({ selectedTasks });
    this._intervalSearch(); // 定时请求
  };

  _intervalSearch = () => {
    const { selectedTasks } = this.state;
    // console.log('selectedTasks', selectedTasks);
    if (selectedTasks.length === 0) {
      this._removeSourceLayer(carLayerId); // 删除图层
      this._removeSourceLayer(manLayerId); // 删除图层
      return; // 如果选中长度为0，返回
    }
    clearInterval(this._intervalHandler); // 清除定时器
    const _intervalSec = 5; // 定时请求时间，单位：秒
    this._fetchData(); // 向后台请求数据
    this._intervalHandler = setInterval(this._fetchData, 1000 * _intervalSec); // 定时器
  };

  _fetchData = () => {
    const { selectedTasks } = this.state;
    for (let item of options) {
      selectedTasks.indexOf(item) > -1 && this._fetchPolice(item);
    }
  };

  _fetchPolice = async () => {
    const _bound = _MAP_.getBounds(); // 获取边界范围
    const _duration = 500; // 动画时间
    const _zoom = _MAP_.getZoom();
    if (_zoom < 10) {
      _MAP_.flyTo({ zoom: 10, duration: _duration }); // 动画
      await new Promise(resolve =>
        setTimeout(() => resolve(), _duration * 1.01)
      ); // 设置定时器
    }
    const _param = { bound: _bound }; // 请求参数
    // console.log('_param', JSON.stringify(_param));
    const { res, err } = await FetchGPSPolice(_param); // 向后台请求数据
    // console.log(res);
    if (err || !IsArray(res)) return; // 保护
    const _features = res.map(item =>
      TurfPoint([item.longitude, item.latitude])
    ); // 生成 features
    // DrawIconPoint(_MAP_, {
    //   id: carLayerId,
    //   features: _features,
    //   iconImage: 'security-car'
    // }); // 绘制待点击的点
    if (!_MAP_.getSource(carLayerId)) {
      _MAP_.addLayer({
        id: carLayerId,
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: _features
          }
        },
        paint: {
          'circle-radius': {
            base: 10,
            stops: [[10, 10], [20, 30]]
          },
          'circle-color': '#e55e5e'
        }
      });
    } else {
      _MAP_.getSource(carLayerId).setData({
        type: 'FeatureCollection',
        features: _features
      });
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const manLayerId = 'MENU_LIST_POLICE_FORCE_MAN'; // 警力 id
const carLayerId = 'MENU_LIST_POLICE_FORCE_CAR'; // 汽车 id

const options = [
  { value: 'policman', name: '警员', color: '#EF9DA1' },
  { value: 'policecar', name: '警车', color: '#9B5C8B' }
];
