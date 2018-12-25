import React, { Component } from 'react';
import { IoIosClose, IoIosResize } from 'react-icons/io';

export default class LibraryHeader extends Component {
  state = {};
  render() {
    return (
      <div className="library-header">
        <IoIosResize className="btn-text" width={20} />
        <span>元件库</span>
        <IoIosClose
          className="btn-text"
          size={20}
          onClick={this._closeElementLibrary}
        />
      </div>
    );
  }

  _closeElementLibrary = () => {};
}
