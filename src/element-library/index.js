import React, { Component } from 'react';
import LibraryHeader from './library-header';
import SelectOption from './select-option';
import ClassificationBox from './classification-box';
import { UploadImages } from './webapi';

export default class ElementLibrary extends Component {
  state = { visible: true };

  _curZoom = 0;

  componentWillMount() {
    this._dealWithEvent();
  }

  render() {
    const { visible } = this.state;
    return (
      <div className={`element-library ${visible ? '' : 'hidden'}`}>
        <LibraryHeader />
        <SelectOption />
        <ClassificationBox />
      </div>
    );
  }

  _dealWithEvent = () => {};

  _closeElementLibrary = () => {};

  _selectCity = async cityInfo => {};

  _uploadImage = async e => {
    const _uploadFile = e.target.files;
    await UploadImages(_uploadFile);
  };
}
