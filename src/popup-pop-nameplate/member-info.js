import React, { Component } from 'react';

import { FetchPersonDetail } from './webapi';

export default class MemberInfo extends Component {
  state = {
    birth: '暂无', // 出生日期
    tel: '暂无', //	联系电话
    location: '暂无', // 地址名称
    HouseholdReg: '暂无', // 户籍地, 户政户籍地
    IDCard: '暂无', // 身份证号码
    gender: '暂无', // 性别
    memberCode: '暂无', // 人口编码
    policeStation: '暂无', // 所属派出所
    countyBureau: '暂无', // 所属分县局
    responsibilityArea: '暂无', // 所属责任区
    name: '暂无', // 姓名
    popType: '暂无', // 人口类别 czrk:常口  ldrk:流口jwrk:境外  zdrk:重点
    cityBureau: '暂无' // 所属市局
  };

  static defaultProps = {
    memberCode: '',
    name: ''
  };

  componentWillReceiveProps = nextProps => {
    const { memberCode } = nextProps;
    memberCode && this._fetchPersonDetail(memberCode);
  };

  render() {
    const { memberCode } = this.props;
    if (!memberCode) return null;
    const {
      name = '暂无', // 姓名
      gender = '暂无', // 性别
      birth = '暂无', // 出生日期
      tel = '暂无', //	联系电话
      location = '暂无', // 地址名称
      IDCard = '暂无', // 身份证号码

      HouseholdReg = '暂无', // 户籍地, 户政户籍地
      cityBureau = '暂无', // 所属市局
      countyBureau = '暂无', // 所属分县局
      policeStation = '暂无', // 所属派出所
      responsibilityArea = '暂无', // 所属责任区
      popType = '暂无' // 人口类别 czrk:常口  ldrk:流口jwrk:境外  zdrk:重点
    } = this.state;
    return (
      <div className="member-info">
        <div className="member-title">人员信息</div>

        <div className="info-label">基本信息</div>

        <ul className="detail-box">
          <li className="info-detail">
            <div className="detail-label">姓名：</div>
            <div className="detail-value">{name}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">性别：</div>
            <div className="detail-value">{gender}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">出生日期：</div>
            <div className="detail-value">{birth}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">身份证：</div>
            <div className="detail-value">{IDCard}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">联系电话：</div>
            <div className="detail-value">{tel}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">人口类别：</div>
            <div className="detail-value">{popType}</div>
          </li>
        </ul>

        <div className="info-label">户籍信息</div>

        <ul className="detail-box">
          <li className="info-detail">
            <div className="detail-label">户籍地：</div>
            <div className="detail-value">{HouseholdReg}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">地址：</div>
            <div className="detail-value">{location}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">所属市局：</div>
            <div className="detail-value">{cityBureau}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">所属责任区：</div>
            <div className="detail-value">{responsibilityArea}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">所属分县局：</div>
            <div className="detail-value">{countyBureau}</div>
          </li>
          <li className="info-detail">
            <div className="detail-label">所属派出所：</div>
            <div className="detail-value">{policeStation}</div>
          </li>
        </ul>
      </div>
    );
  }

  _fetchPersonDetail = async memberCode => {
    const { res, err } = await FetchPersonDetail({ rkbm: memberCode });
    if (!res || err) return console.log('获取人口详情信息失败！');
    const {
      csrq,
      lxdh,
      dzmc,
      hjd,
      hz_hjd,
      sfzhm,
      xb,
      rkbm,
      sspcs,
      ssfxj,
      sszrq,
      xm,
      rklb,
      sssj
    } = res;
    this.setState({
      birth: (csrq && csrq.substr(0, 10)) || '暂无', // 出生日期
      tel: lxdh || '暂无', //	联系电话
      location: dzmc || '暂无', // 地址名称
      HouseholdReg: hjd || hz_hjd || '暂无', // 户籍地, 户政户籍地
      IDCard: sfzhm || '暂无', // 身份证号码
      gender: xb || '暂无', // 性别
      memberCode: rkbm || '暂无', // 人口编码
      policeStation: sspcs || '暂无', // 所属派出所
      countyBureau: ssfxj || '暂无', // 所属分县局
      responsibilityArea: sszrq || '暂无', // 所属责任区
      name: xm || '暂无', // 姓名
      popType: rklb || '暂无', // 人口类别 czrk:常口  ldrk:流口jwrk:境外  zdrk:重点
      cityBureau: sssj || '暂无' // 所属市局
    });
  };
}
