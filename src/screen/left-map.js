import React, { Component } from 'react';

export default class LeftMap extends Component {
  state = {};
  render() {
    return (
      <div className="left-map">
        <div className="img-container">
          <img className="map-img" src="./static/map.png" alt="" />
        </div>
      </div>
    );
  }
}
