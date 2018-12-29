import React, { Component } from 'react';
export default class DailyWork extends Component() {
  constructor() {
    super();
    state = {
      visible: false,
      itemTask: {}
    };
  }
  showModal = itemTask => {
    this.setState({
      visible: true,
      itemTask
    });
  };
  changeStatus = status => {
    this.setState({
      visible: status
    });
  };
}

const columns = [
  { title: '待办任务', value: 0, key: 'taskLst', width: 100 },
  { title: '情报线索', value: 1, key: 'cluesLst', width: 100 },
  { title: '将到期案件', value: 2, key: 'casesLst', width: 100 },
  { title: '居住证到期', value: 3, key: 'residenceLst', width: 100 },
  { title: '常口迁入', value: 4, key: 'immigrationLst', width: 100 },
  { title: '群众求助', value: 5, key: 'helpLst', width: 100 },
  { title: '治安防范', value: 6, key: 'publicPreLst', width: 100 }
];
