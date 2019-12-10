import React, { Component } from 'react';
import { TuyunModal, TuyunAsyncTree } from 'tuyun-kit';

import Event, { EventName } from './event';
import { DefaultArea, AreaList } from './constant';
import { DrawMultiPolygon, RemoveGeometries } from './draw-polygon';
import { RemoveLayer, LayerIds } from 'tuyun-utils';

export default class SelectArea extends Component {
  state = {
    visible: false,
    showModel: false,
    toSelectArea: [...DefaultArea],
    selectedArea: [...DefaultArea]
  };

  _selectedLeaf = []; // 选中的树节点
  // 记录选择的点

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { showModel, toSelectArea, selectedArea, visible } = this.state;
    if (!visible) return null;
    return (
      <div className="area-box">
        <ul className="area-content">
          {AreaList.map((item, index) => (
            <li className="area-item" key={index}>
              <div
                style={{
                  backgroundColor: item.rgb,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  margin: '3px 5px 0 0'
                }}
              />
              <div className="compare-name">{item.label}：</div>
              <div className="select-area-name">
                {selectedArea[index].label || ''}
              </div>
            </li>
          ))}
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
          {AreaList.map((item, index) => (
            <ul className="model-select-area" key={index}>
              <li className="area-select">
                <div className="area-label">{item.label}：</div>
                <div className="area-name">{toSelectArea[index].label}</div>
              </li>
            </ul>
          ))}
          <div className="select-area-box">
            {AreaList.map((item, index) => (
              <ul className="model-select-area" key={index}>
                <li className="area-select">
                  <div className="area-label">{`${item.label}选择`}</div>
                  <div
                    className="area-select-btn"
                    onClick={() => this._drawPolygon(item)}
                  >
                    {toSelectArea[index].type === 'custom'
                      ? '重绘多边形'
                      : '绘制多边形'}
                  </div>
                  {toSelectArea[index].type === 'custom' ? (
                    <div
                      className="area-select-btn"
                      onClick={() => this._removeMultiPolygon(item)}
                    >
                      删除
                    </div>
                  ) : null}
                </li>

                <li className="tree-item" key={`tree_item_${index}`}>
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
                    onSelect={leaf => this._storageTreeData(leaf, index)}
                  />
                </li>
              </ul>
            ))}
          </div>
        </TuyunModal>
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.toggleVisible, ({ visible }) => {
      const { selectedArea } = this.state;
      for (let i = 0; i < selectedArea.length; i++) RemoveGeometries(i, true); // 删除图层
      this.setState({ visible: visible });
    });
    Event.on(EventName.createFinalGeo, geoInfo => {
      const { geometry, index } = geoInfo;
      if (geometry) {
        const { toSelectArea } = this.state;
        toSelectArea[index] = {
          label: `自定义区域${index + 1}`,
          type: 'custom',
          value: geometry.coordinates,
          geometry
        };
        this.setState({ showModel: true, toSelectArea });
      } else {
        const { toSelectArea } = this.state;
        toSelectArea[index] = DefaultArea[index];
        this.setState({ showModel: true, toSelectArea });
      }
    });
  };

  _changeArea = () => {
    this.setState({ showModel: true });
  };

  _drawPolygon = async item => {
    await this.setState({ showModel: false });
    DrawMultiPolygon(item.color, item.index);
  };

  _removeMultiPolygon = item => {
    const { toSelectArea } = this.state;
    toSelectArea[item.index] = DefaultArea[item.index];
    this.setState({ toSelectArea });
    RemoveGeometries(item.index);
  };

  _storageTreeData = (leaf, index) => {
    const { toSelectArea } = this.state;
    toSelectArea[index] = Object.assign({ type: 'jurisdiction' }, leaf);
    this.setState({ toSelectArea });
  };

  _selectArea = () => {
    const { selectedArea, toSelectArea } = this.state;

    for (let i = 0; i < selectedArea.length; i++) RemoveGeometries(i, true); // 删除图层
    const [
      firstArea = selectedArea[0],
      secArea = selectedArea[1]
    ] = toSelectArea;
    if (firstArea === selectedArea[0] && secArea === selectedArea[1]) {
      this.setState({ showModel: false });
      Event.emit(EventName.drawPrevGeo); // 绘制原来的图层
      return; // 重复保护
    }
    this.setState({
      showModel: false,
      selectedArea: [firstArea, secArea],
      toSelectArea: [firstArea, secArea]
    });
    Event.emit(EventName.changeAreaRange, { firstArea, secArea });
  };

  _cancelModal = () => {
    const { selectedArea } = this.state;
    for (let i = 0; i < selectedArea.length; i++) RemoveGeometries(i, true); // 删除图层
    Event.emit(EventName.drawPrevGeo); // 绘制原来的图层
    this.setState({ showModel: false, toSelectArea: [...selectedArea] });
  };
}
