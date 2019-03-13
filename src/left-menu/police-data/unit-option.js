import React, { Component } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

export default class UnitOption extends Component {
  state = {
    isChecked: false
  };

  render() {
    const { isChecked } = this.state;
    return (
      <li
        className={`data-item ${isChecked ? 'checked' : ''}`}
        onClick={e => this._selectUnitData()}
      >
        <div className={`checkbox ${isChecked ? 'checked' : ''}`}>
          {isChecked ? <IoMdCheckmark /> : null}
        </div>
        {unitOption.name}
      </li>
    );
  }

  _selectUnitData = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
    if (!isChecked) {
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
