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
    pName: '',
    pCode: '',
    selectedIndex: -1
  };

  componentDidMount = () => this._init();

  render() {
    const { visible, pName } = this.state;
    if (!visible) return null;
    const _typeArr = detailTypeMap[pName];
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
    GlobalEvent.on(
      GloEventName.toggleKeyPopDetail,
      ({ visible, name, code }) => {
        this.setState({ visible, pName: name, pCode: code });
        if (visible) {
          _MAP_.on('moveend', this._fetchData);
        } else {
          _MAP_.off('moveend', this._fetchData);
        }
      }
    );
  };

  // 获取数据接口
  _fetchData = () => {
    const _zoom = _MAP_.getZoom();
    console.log('zoom', _zoom);
    this._fetchDetailMap(); // 获取详细数字
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
    const { pCode } = this.state;
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchDetailNum({
      points: _bounds,
      type: pCode
    });
    console.log(res, err);
  };

  _selectMenu = e => {
    e.stopPropagation();
  };
}

const detailTypeMap = {
  wangan: [
    { label: 'A 级', name: 'wanganA', code: '340100000000' },
    { label: 'B 级', name: 'wanganB', code: '340200000000' },
    { label: 'C 级', name: 'wanganC', code: '340300000000' }
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
  ],
  jindu: [
    { label: '目标案件嫌疑', name: 'mbajxy', code: '' },
    { label: '一般案件嫌疑', name: 'ybajxy', code: '' },
    { label: '其他嫌疑人员', name: 'qtxyry', code: '' }
  ],
  qingbao: [
    { label: '管控对象', name: 'gkdx', code: '' },
    { label: '关注对象', name: 'gzdx', code: '' },
    { label: '知悉对象', name: 'zxdx', code: '' },
    { label: '前科人员', name: 'qkry', code: '' },
    { label: '其他重点人员', name: 'qtzdry', code: '' },
    { label: '涉毒人员', name: 'sdry', code: '' },
    { label: '重点上访人员', name: 'zdsfry', code: '' },
    { label: '涉恐人员', name: 'skry', code: '' },
    { label: '涉稳人员', name: 'swry', code: '' },
    { label: '在逃人员', name: 'ztry', code: '' },
    { label: '精神病员', name: 'jsby', code: '' }
  ],
  fanxiejiao: [
    { label: '有害气功组织', name: 'yhqgzz', code: '' },
    { label: '法轮功人员', name: 'flgry', code: '' },
    { label: '邪教组织人员', name: 'xjzzry', code: '' }
  ],
  fankong: [
    { label: '列控', name: 'liekong', code: '' },
    { label: '重点人', name: 'zdr', code: '' },
    { label: '准重点人', name: 'zzdr', code: '' },
    { label: '基础群体', name: 'jcqt', code: '' }
  ],
  jiaojing: [
    { label: '关注人员', name: 'gzry', code: '' },
    { label: '管控人员', name: 'gkry', code: '' }
  ],
  zeyu: [
    { label: '持卡人', name: 'ckr', code: '' },
    { label: '供货人', name: 'ghr', code: '' },
    { label: '投资人', name: 'tzr', code: '' },
    { label: '关系人', name: 'gxr', code: '' },
    { label: '员工', name: 'yg', code: '' },
    { label: '其他', name: 'qt', code: '' }
  ]
};
