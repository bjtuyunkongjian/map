/**
 * 载入其他库
 */

import React, { Component } from 'react';
import Event from './event';
import { UploadImages } from './webapi';

export default class LoadLibrary extends Component {
  state = { visible: false };

  _el = undefined;

  componentDidMount() {
    this._init();
  }

  render() {
    const { visible } = this.state;
    if (!visible) return null;

    return (
      <div className="load-library" ref={el => (this._el = el)}>
        <div>载入本地库</div>
        <input
          multiple
          type="file"
          accept="image/*"
          onChange={this._uploadImage}
        />
        <div>上传</div>
      </div>
    );
  }

  _init = () => {
    Event.on('change:LoadLibrary:visible', () => {
      const { visible } = this.state;
      this.setState({ visible: !visible });
    });
  };

  _uploadImage = async () => {
    const _uploadFile = e.target.files;
    await UploadImages(_uploadFile);
  };
}
