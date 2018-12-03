import React, { Component } from 'react';

export default class LeftMenu extends Component {
  state = {
    selectedMenu: -1,
    selectContene: -1,
    selectPoData: -1,
    selectCamera: -1,
    selectCase: -1,
    selectCall: -1,
    selectPolice: -1,
    selectCar: -1,
    selectFacility: -1,
    selectPalce: -1
  };

  render() {
    return <div className="left-menu">这里是左侧菜单页面</div>;
  }
}
