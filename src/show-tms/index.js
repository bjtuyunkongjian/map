import React, { Component } from 'react';
import PoiLayers from '../map/map-styles/poi';

export default class index extends Component {
  state = { visible: true };

  render() {
    const { visible } = this.state;
    return (
      <div className="show-tms" onClick={this._toggleVisible}>
        {visible ? '隐藏 poi' : '显示 poi'}
      </div>
    );
  }

  _toggleVisible = () => {
    const { visible } = this.state;
    console.log(PoiLayers);
    const visibility = !visible ? 'visible' : 'none';
    // _MAP_.setPaintProperty(`siwei_${item}`, 'line-color', '#' + color);
    for (let i = 1; i < PoiLayers.length; i++) {
      const { id } = PoiLayers[i];
      _MAP_.setLayoutProperty(id, 'visibility', visibility);
    }
    this.setState({ visible: !visible });
  };
}
