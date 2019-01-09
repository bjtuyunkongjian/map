import React, { Component } from 'react';
import Event from '../menu-list/event';
import { FaTimes } from 'react-icons/fa';

export default class CaseDetail extends Component {
  state = {
    visible: false,
    caseName: '',
    boxLeft: 0,
    boxTop: 0
  };

  componentDidMount() {
    this._init();
  }

  render() {
    const { visible, caseName, boxLeft, boxTop } = this.state;
    if (!visible) return null;
    const _caseList = caselists.filter(item => item.value === caseName)[0];
    console.log('_case', _caseList);
    return (
      <div style={{ top: boxTop, left: boxLeft }} className="case-box">
        <div className="case-title">
          <span>{_caseList.title}</span>
          <span className="close" onClick={this._closeCase}>
            <FaTimes />
          </span>
        </div>
        <ul className="case-list">
          <div className="splice" />
          <li>{_caseList.casetext[0]}:</li>
          <li>{_caseList.casetext[1]}:</li>
          <li>{_caseList.casetext[2]}:</li>
        </ul>
      </div>
    );
  }

  // 初始化
  _init = () => {
    Event.on('showCase', param => {
      const { left = 0, top = 0, value } = param;
      this.setState({
        boxLeft: left,
        boxTop: top,
        visible: true,
        caseName: value
      });
    });
  };
  _closeCase = () => {
    this.setState({
      visible: false
    });
  };
}

const caselists = [
  {
    title: 'A类案件',
    value: 'aCaseLst',
    casetext: ['A类案件名称', '案件内容', '侦查结果', '破案措施']
  },
  {
    title: 'B类案件',
    value: 'bCaseLst',
    casetext: ['B类案件名称', '案件内容', '侦查结果', '破案措施']
  },
  {
    title: 'C类案件',
    value: 'cCaseLst',
    casetext: ['C类案件名称', '案件内容', '侦查结果', '破案措施']
  },
  {
    title: 'D类案件',
    value: 'dCaseLst',
    casetext: ['D类案件名称', '案件内容', '侦查结果', '破案措施']
  }
];
