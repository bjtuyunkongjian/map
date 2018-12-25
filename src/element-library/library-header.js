import React, { Component } from 'react';
import { IoIosClose, IoIosResize, IoMdMenu } from 'react-icons/io';
import { Event } from 'tuyun-utils';

export default class LibraryHeader extends Component {
  state = {};
  render() {
    return (
      <div className="library-header">
        <IoIosResize className="btn-text" width={20} />
        <div className="header-name">元件库</div>
        <IoMdMenu className="btn-text" />
        <IoIosClose
          className="btn-text"
          size={20}
          onClick={this._closeElementLibrary}
        />
      </div>
    );
  }

  _closeElementLibrary = () => {
    Event.emit('change:ElementLibrary:visible');
  };
}
