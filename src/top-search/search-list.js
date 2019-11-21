import React, { Component } from 'react';
import { IoIosClose } from 'react-icons/io';
import Event, { EventName } from './event';
import { DropDown } from './constant';
export default class SearchList extends Component {
  state = {
    // visible:false,
    curDropDown: '',
    searchList: '',
    curRes: {}
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();
  render() {
    const { curDropDown, searchList } = this.state;
    return (
      <div
        className={`city-list ${
          curDropDown === DropDown.seearchList ? '' : 'hidden'
        }`}
      >
        <div className="list-header">
          <span>结果列表</span>
          <IoIosClose
            className="close-icon"
            size={20}
            onClick={this._closeSearchList}
          />
        </div>
        <div className="list-body">
          {searchList.map((item, index) => {
            <li
              className={`search-item${curRes === item ? 'selected' : ''}`}
              key={`search_list_${index}`}
              onClick={() => this._selectResult(item)}
            >
              {searchList.name}
            </li>;
          })}
        </div>
      </div>
    );
  }

  _init = () => {
    Event.on(EventName.changeDropDown, dropDown => {
      this.setState({ curDropDown: dropDown, curRes: {} });
    });
    Event.on(EventName);
  };

  _dealWithEvent = () => {};

  _closeSearchList = () => {
    Event.emit(EventName.changeDropDown, '');
  };
}
