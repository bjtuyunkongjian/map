/**
 * @author sl
 * @name 重点人员的详细分类
 */

import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { FetchNameplateData, FetchHeatMapData, FetchDetailNum } from './webapi';

export default class KeyPopDetail extends Component {
  state = {
    visible: false,
    typeName: '',
    selectedIndex: -1
  };

  componentDidMount = () => this._init();

  render() {
    const { visible, typeName } = this.state;
    if (!visible) return null;
    const _typeArr = detailTypeMap[typeName];
    if (!_typeArr) return null;
    return (
      <div className="keypop-detail">
        {_typeArr.map((item, index) => {
          return (
            <div
              key={`menu_item_${index}`}
              className="menu-item"
              onClick={this._selectMenu}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }

  _init = () => {
    GlobalEvent.on(GloEventName.toggleKeyPopDetail, ({ visible, name }) => {
      this.setState({ visible, typeName: name });
      if (visible) {
        _MAP_.on('moveend', this._fetchData);
      } else {
        _MAP_.off('moveend', this._fetchData);
      }
    });
  };

  // 获取数据接口
  _fetchData = () => {
    const _zoom = _MAP_.getZoom();
    console.log('zoom', _zoom);
    this._fetchDetailMap();
    if (_zoom >= 16.5) {
      this._fetchNamePlate(); // 大于 16.5 级，用 铭牌 显示
    } else {
      this._fetchHeatMap(); // 小于 16.5 级，热力图 和 点位图
    }
  };

  // 获取铭牌数据
  _fetchNamePlate = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchNameplateData({
      points: _bounds,
      firtype: 1,
      thirtype: '304000000000'
    });
    console.log('res', res, err);
  };

  // 获取点的数据
  _fetchHeatMap = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchHeatMapData({
      points: _bounds,
      firtype: 1, // 人口
      sectype: ''
    });
    console.log('res', res, err);
  };

  _fetchDetailMap = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchDetailNum({
      points: _bounds,
      type: '304000000000' // 人口
    });
    console.log(res, err);
  };

  _selectMenu = e => {
    e.stopPropagation();
  };
}

const detailTypeMap = {
  wangan: [
    { label: 'A 级', name: 'caseA', code: '340100000000' },
    { label: 'B 级', name: 'caseB', code: '340200000000' },
    { label: 'C 级', name: 'caseC', code: '340300000000' }
  ],
  jingzhen: [
    { label: '假币', name: 'jiabi', code: '' },
    { label: '传销', name: 'chuanxiao', code: '' },
    { label: '贿赂', name: 'huilu', code: '' },
    { label: '涉稳', name: 'shewen', code: '' },
    { label: '集资', name: 'jizi', code: '' },
    { label: '洗钱', name: 'xiqian', code: '' },
    { label: '知识产权', name: 'zscq', code: '' },
    { label: '银行卡', name: 'yinhangka', code: '' }
  ],
  xingjing: [
    { label: '重点场所涉案', name: 'zdcssa', code: '' },
    { label: '黑恶犯罪涉案', name: 'hefzsa', code: '' },
    { label: '涉黑打击处理', name: 'shdjcl', code: '' }
  ],
  huzheng: [
    { label: '可能铤而走险', name: 'kntezx', code: '' },
    { label: '刑释不满五年', name: 'xsbmwn', code: '' },
    { label: '吸毒', name: 'xidu', code: '' },
    { label: '危害国家安全', name: 'whgjaq', code: '' },
    { label: '流动重点人员', name: 'ldzdry', code: '' },
    { label: '刑事犯罪嫌疑', name: 'xsfzxy', code: '' },
    { label: '其他刑释人员', name: 'qtxsry', code: '' }
  ]
};
