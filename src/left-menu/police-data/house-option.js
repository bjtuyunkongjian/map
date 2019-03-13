import React, { Component } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

export default class HouseOption extends Component {
  state = { isChecked: false };

  componentDidMount = () => this._init();

  render() {
    const { isChecked } = this.state;
    return (
      <li
        className={`data-item ${isChecked ? 'checked' : ''}`}
        onClick={e => this._selectPopData()}
      >
        <div className={`checkbox ${isChecked ? 'checked' : ''}`}>
          {isChecked ? <IoMdCheckmark /> : null}
        </div>
        {popOption.name}
      </li>
    );
  }

  _init = () => {
    _MAP_.on('click', popOption.layerId, e => {
      const { lngLat, originalEvent, features } = e;
      _MAP_.flyTo({ center: [lngLat.lng, lngLat.lat], duration: 500 });
    });
  };

}
