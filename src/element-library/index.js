import React, { Component } from 'react';
import LibraryHeader from './library-header';
import SelectOption from './select-option';
import ClassificationBox from './classification-box';
import { Event } from 'tuyun-utils';

export default class ElementLibrary extends Component {
  state = { visible: true };

  _curZoom = 0;

  componentWillMount() {
    this._init();
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

  _init = () => {
    Event.on('change:ElementLibrary:visible', () => {
      const { visible } = this.state;
      this.setState({ visible: !visible });
    });
  };
}
