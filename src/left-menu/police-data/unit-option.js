import React, { Component } from 'react';
import { TuyunMessage } from 'tuyun-kit';

import Event, { EventName } from '../event';

export default class UnitOption extends Component {
  state = {
    isChecked: false
  };

  componentDidMount = () => this._init();

  render() {
    const { isChecked } = this.state;
    return (
      <li
        className={`data-item ${isChecked ? 'checked' : ''}`}
        onClick={e => this._selectUnitData()}
      >
        {unitOption.name}
      </li>
    );
  }

  _init = () => {
    Event.on(EventName.changePoDataChecked, ({ clickedLabel }) => {
      const { isChecked } = this.state;
      let _isChecked;
      if (isChecked) {
        _isChecked = false; // 之前选中，当前设置为未选中
        this._removeSourceLayer(unitOption.layerId); // todo 删除之前显示的人口图层
      } else {
        _isChecked = optionName === clickedLabel; // 之前未选中，当前根据 clickedLabel 进行判断
      }
      this.setState({ isChecked: _isChecked });
    });
  };

  _selectUnitData = () => {
    const { isChecked } = this.state;
    Event.emit(EventName.changePoDataChecked, { clickedLabel: optionName });
    if (!isChecked) {
      return TuyunMessage.error('接口数据获取失败！'); // temp
      this._fetchUnit();
      _MAP_.on('moveend', this._fetchUnit);
    } else {
      _MAP_.off('moveend', this._fetchUnit);
    }
  };

  _fetchUnit = async () => {
    const _bounds = _MAP_.getBounds(); // 获取屏幕边界范围
    const _zoom = _MAP_.getZoom(); // 当前缩放层级
    // 大于 17.5 级：3d 建筑 + 数量标识
    // 小于 17.5 级：点的数据量在 200 以内，现有点的大小，需要有点击功能
    // 小于 17.5 级：点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
    // 小于 17.5 级：点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const unitOption = {
  value: 'unit',
  name: '单位',
  defaultZoom: 16,
  icon: 'landmark',
  layerId: 'POLICE_DATA_UNIT'
};

const optionName = 'unit';
