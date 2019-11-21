import React, { Component } from 'react';

import { TuyunModal, TuyunAsyncTree } from 'tuyun-kit';
export default class RangeType extends Component {
  state = {
    selectedType: navOptions[0].value,
    currentArea: {
      label: '济南市公安局',
      value: '370100000000'
    },
    areaVisible: false
  };

  _selectedLeaf = {}; // 选中的树节点

  render() {
    const { selectedType, currentArea, areaVisible } = this.state;
    return (
      <div className="range-type">
        <ul className="range-nav">
          {navOptions.map((item, index) => {
            return (
              <li
                className={`nav-item${
                  selectedType === item.value ? ' selected' : ''
                }`}
                key={`range_nav_${index}`}
                onClick={() => this._clickOpt(item)}
              >
                <div className="nav-text">{item.label}</div>
              </li>
            );
          })}
        </ul>

        {selectedType === navOptions[1].value ? (
          <div className="correspond-area">
            <div className="current-area">当前辖区：{currentArea.label}</div>
            <div className="change-area" onClick={() => this._changeArea()}>
              切换辖区
            </div>
          </div>
        ) : null}

        <TuyunModal
          visible={areaVisible}
          onCancel={() => this._closeModel()}
          onOk={() => this._selectArea()}
        >
          <div className="change-area">
            <ul className="model-current-area">
              <li className="label">当前辖区：</li>
              <li className="value">{currentArea.label}</li>
            </ul>
            <div className="tree-container">
              <TuyunAsyncTree
                rootUrl="mapServer/organization/getRoot"
                childUrl="mapServer/organization/getSubOrgs"
                childUrlParam={[
                  { key: 'code', childProp: 'code' },
                  { key: 'level', childProp: 'level' }
                ]}
                labelKey="name"
                valueKey="code"
                hasChildKey="hasSubNodes"
                onSelect={this._storageTreeData}
              />
            </div>
          </div>
        </TuyunModal>
      </div>
    );
  }

  _clickOpt = item => {
    const { selectedType } = this.state;
    this.setState({
      selectedType: selectedType === item.value ? '' : item.value
    });
  };

  _changeArea = () => {
    this.setState({ areaVisible: true });
  };

  _closeModel = () => {
    this.setState({ areaVisible: false });
  };

  _selectArea = () => {
    this.setState({ currentArea: this._selectedLeaf, areaVisible: false });
  };

  _storageTreeData = leaf => (this._selectedLeaf = leaf);
}

const navOptions = [
  { label: '当前屏幕', value: 'screen' },
  { label: '对应辖区', value: 'area' }
];
