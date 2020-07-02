import React, { Component } from 'react';

export default class index extends Component {
  state = { visible: true, rdColor, bgColor };

  render() {
    const { rdColor, bgColor } = this.state;
    return (
      <div className="show-tms">
        中线：
        <input
          value={rdColor}
          type="text"
          maxLength="6"
          placeholder="六位十六进制 ffffff"
          onChange={this._changeRdColor}
        />
        底色：
        <input
          value={bgColor}
          type="text"
          placeholder="六位十六进制 ffffff"
          maxLength="6"
          onChange={this._changeBgColor}
        />
      </div>
    );
  }

  _changeRdColor = (e) => {
    const color = e.target.value;
    this.setState({ rdColor: color });
    if (!reg.test(color)) return;
    for (let item of roads) {
      _MAP_.setPaintProperty(`siwei_${item}`, 'line-color', '#' + color);
    }
  };

  _changeBgColor = (e) => {
    const color = e.target.value;
    this.setState({ bgColor: color });
    if (!reg.test(color)) return;
    for (let item of roads) {
      _MAP_.setPaintProperty(`siwei_${item}_bg`, 'line-color', '#' + color);
    }
  };
}
const reg = /^([a-f]|[A-F]|\d){6}$/;

const rdColor = 'ffffff';
const bgColor = 'aaaaaa';

const roads = [
  'dushigaosulu',
  'gaosugonglu',
  'guodao',
  'jiujilu',
  'qitadaolu',
  'shengdao',
  'xiandao',
  'xiangzhendaolu',
];
