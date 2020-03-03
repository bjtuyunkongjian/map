import React, { Component } from 'react';
import { TuyunModal, TuyunAsyncTree } from 'tuyun-kit';

import Event, { EventName } from './event';
import { DefaultArea } from './constant';

export default class SelectArea extends Component {
  state = {
    visible: false,
    showModel: false,
    toSelectArea: DefaultArea,
    selectedArea: DefaultArea,
    center: []
  };

  _selectedLeaf = []; // 选中的树节点

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { showModel, toSelectArea, selectedArea, visible } = this.state;
    if (!visible) return null;
    return (
      <div className="area-box">
        <ul className="area-content">
          <li className="area-item">
            <div className="jurisdiction-name">当前辖区：</div>
            <div className="select-area-name">{selectedArea.label || ''}</div>
          </li>
        </ul>
        <div className="select-area-btn" onClick={() => this._changeArea()}>
          选择区域
        </div>

        {/* 模态框 */}
        <TuyunModal
          visible={showModel}
          onCancel={() => this._cancelModal()}
          onOk={() => this._selectArea()}
        >
          <ul className="model-select-area">
            <li className="area-select">
              当前选中：
              <div className="area-name">{toSelectArea.label}</div>
            </li>

            <li className="tree-item">
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
                onSelect={leaf => this._storageTreeData(leaf)}
              />
            </li>
          </ul>
        </TuyunModal>
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.toggleVisible, ({ visible }) => {
      this.setState({ visible: visible });
    });
  };

  _changeArea = () => {
    const { selectedArea } = this.state;
    this.setState({ showModel: true, toSelectArea: selectedArea });
  };

  _cancelModal = () => {
    const { selectedArea } = this.state;
    this.setState({ showModel: false, toSelectArea: selectedArea });
  };

  _selectArea = () => {
    const { selectedArea, toSelectArea } = this.state;
    if (selectedArea.value === toSelectArea.value) {
      this.setState({ showModel: false });
      return;
    }
    this.setState({ showModel: false, selectedArea: toSelectArea });
    Event.emit(EventName.changeAreaRange, { area: toSelectArea });
  };

  _storageTreeData = leaf => {
    const { toSelectArea } = this.state;
    const { label, value, detail } = leaf;
    if (toSelectArea.value === value) return;
    this.setState({ toSelectArea: { label, value, level: detail.level } });
  };

  _fetchCurArea = async () => {
    const { res, err } = await GetCurArea();
    if (!res || err) return;
  };
}
