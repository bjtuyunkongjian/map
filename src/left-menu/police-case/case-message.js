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
          <li>{_caseList.casetext[0]}</li>
          <li>{_caseList.casetext[1]}</li>
          <li>{_caseList.casetext[2]}</li>
          <li>{_caseList.casetext[3]}</li>
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
    casetext: [
      '案件名称：刑事案件',
      '案件内容：刑法分则规定的危害国家安全罪，危害公共安全罪',
      '侦查结果：交通肇事案件',
      '破案措施：立案侦察、审判并给予刑事制裁'
    ]
  },
  {
    title: 'B类案件',
    value: 'bCaseLst',
    casetext: [
      '案件名称：行政案件',
      '案件内容：公安机关依照法律、法规和规章的规定对违法行为人决定行政处罚以及强制戒毒、收容教育等强制措施的案件。',
      '侦查结果:治安行政案件',
      '破案措施:警告,单处罚款'
    ]
  },
  {
    title: 'C类案件',
    value: 'cCaseLst',
    casetext: [
      '案件名称：经济案件',
      '案件内容:刑法分则规定的破坏社会主义市场经济秩序罪',
      '侦查结果:侵犯知识产权罪',
      '破案措施:仲裁:双方当事人协议将争议提交第三方'
    ]
  },
  {
    title: 'D类案件',
    value: 'dCaseLst',
    casetext: [
      '案件名称：民事案件',
      '案件内容:法院依照法律规定，为方便审理和解决当事人之间的争议，根据法律关系的性质对受理案件所进行的分类',
      '侦查结果:婚姻家庭继承纠纷',
      '破案措施:自力救济(包括自决与和解)'
    ]
  }
];
