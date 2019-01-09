import React, { Component } from 'react';
import Event from '../menu-list/event';
import { FaPeriscope, Fa500px } from 'react-icons/fa';
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
        <HouseInfo />
      </div>
    );
  }

  _init = () => {
    Event.on('showMessage', this._dealWithEvent);
  };

  _reset = () => {
    Event.removeListener('showMessage', this._dealWithEvent);
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

class HouseInfo extends Component {
  render() {
    return (
      <div>
        {floors.map((floorItem, floorInd) => (
          <ul key={`floor_${floorInd}`} className="floor">
            {doors.map((doorItem, doorInd) => (
              <li
                key={'door_' + doorInd}
                onClick={this._houseRegist}
                className="household"
              >
                {people.map((peopleItem, peopleInd) => (
                  <div key={'people_' + peopleInd} className="family">
                    {peopleItem}
                  </div>
                ))}
                {selected ? <HouseHold /> : nill}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }
  _houseRegist = () => {
    // <div className="doorInfo">
    //   <div>1-3-1006</div>
    //   <ul>
    //     <li>张三</li>
    //     <li>李四</li>
    //     <li>王五</li>
    //     <li>孙六</li>
    //   </ul>
    // </div>;
  };
}

const fllorCounts = 5;
const floors = [];
for (let i = 0; i < fllorCounts; i++) {
  floors.push(i);
}
// 户
const doorCounts = 4;
const doors = [];
for (let i = 0; i < doorCounts; i++) {
  doors.push(i);
}
// 人
const peopleCount = 3;
const people = [];
for (let i = 0; i < peopleCount; i++) {
  people.push(i);
}

class HouseHold extends Component {
  render() {
    const { visible, boxLeft, boxTop } = this.state;
    return (
      <div className="doorInfo" style={{ top: boxTop, left: boxLeft }}>
        <div>1-3-1006</div>
        <ul>
          <li>张三</li>
          <li>李四</li>
          <li>王五</li>
          <li>孙六</li>
        </ul>
      </div>
    );
  }
}

class PeopleInfo extends Component {
  render() {
    const { visible, boxLeft, boxTop } = this.state;
    return (
      <div className="people-box">
        <div className="people-title">
          人员信息<span className="last" />
        </div>
        <span>基础信息</span>
        <div className="splice" />
        <ul>
          <li>姓名：李伟</li>
          <li>性别：男</li>
          <li>生日：1979-10-03</li>
          <li>身份证：420103019791008912</li>
          <li>地址：济南市市中区魏家庄16号</li>
          <li>手机号：18967789167，17789896657</li>
          <li>车辆：鲁A78995Z , 鲁 A7765G </li>
        </ul>
        <div className="splice" />
        <span>相册</span>
        <div className="splice" />
        <div>
          <image />
          <image />
        </div>
        <div className="splice" />
        <span>房产信息</span>
        <div className="splice" />
        2017-10-18 帝景苑B区6栋 1-3005购房
        <div className="splice" />
        <span>业务进度</span>
        <div className="splice" />
        <ul>
          <li>身份证：</li>
          <li>魏家庄配出所(已办理邮寄出)</li>
          <li>护照办理：</li>
          <li>公安局出入境大厅(待审核)</li>
        </ul>
        <div className="splice" />
        <span>购票信息</span>
        <div className="splice" />
        <ul>
          <li>2018-03-05 购买飞机票</li>
          <li>济南-上海 SC4934</li>
          <li>2017-03-07 11:50出发</li>

          <li>2018-03-10 购买火车票</li>
          <li>济南-北京 G178</li>
          <li>2018-03-11 09:50出发</li>
        </ul>
      </div>
    );
  }
}
