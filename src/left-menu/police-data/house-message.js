import React, { Component } from 'react';
import Event from '../event';
import { FaPeriscope } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
export default class HouseMessage extends Component {
  state = {
    visible: false,
    boxLeft: 0,
    boxTop: 0
  };

  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    this._reset();
  }

  render() {
    const { visible, boxLeft, boxTop } = this.state;
    if (!visible) return null;
    return (
      <div style={{ top: boxTop, left: boxLeft }} className="dialog-box">
        <div className="dialog-title">
          <span>
            {messages[0].icon} {messages[0].title}
          </span>
          <span className="close" onClick={this._clostHouse}>
            <FaTimes />
          </span>
        </div>
        <ul className="dialog-list">
          <li>
            {messages[0].itemicon[0]}
            {messages[0].itemdes[0]}
          </li>
          <li>
            {messages[0].itemicon[1]}
            {messages[0].itemdes[1]}
          </li>
          <li className="list-pop">
            {messages[0].itemicon[2]}
            {messages[0].itemdes[2]}
          </li>
        </ul>
        <div className="space" />
        <div>
          <span>选择单元房间号码，查看房间基本信息</span>
          <ul className="describe">
            <li>
              <div className="nth-first" />
              <span>常住</span>
            </li>
            <li>
              <div className="nth-second" />
              <span>流动</span>
            </li>
            <li>
              <div className="nth-third" />
              <span>重点人员</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  _init = () => {
    console.log('init');
    // Event.on('showMessage', this._dealWithEvent);
  };

  _reset = () => {
    console.log('reset!');
    // Event.removeListener('showMessage', this._dealWithEvent);
  };

  _dealWithEvent = param => {
    const { left = 0, top = 0, value } = param;
    this.setState({
      boxLeft: left,
      boxTop: top,
      visible: true,
      information: value
    });
  };

  _clostHouse = () => {
    this.setState({
      visible: false
    });
  };
}

const messages = [
  {
    icon: <FaPeriscope />,
    title: '地点 济南市历下区草山岭小区',
    value: 'house',
    itemicon: [<MdLocationCity />, <TiHomeOutline />, <MdPeopleOutline />],
    itemdes: [
      '楼栋信息 该楼共1单元 34层',
      '建筑地址 济南市历下区草山岭小区9栋1单元',
      '常住人口1220      流动人口223       重点人员5'
    ]
  }
];
