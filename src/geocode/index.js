import React, { Component } from 'react';
import { FetchGeoRes } from './webapi';

export default class LeftMenu extends Component {
  state = {
    animate: ''
  };

  componentDidMount = () => {
    _MAP_.on('load', async () => {
      const { err, res } = await FetchGeoRes({ type: 'jingqing' });
      if (err || !res) return;
      console.log(res);
    });
  };

  render() {
    const { animate } = this.state;
    const _slide = animate === 'menu-slide-in' ? '' : 'changed';
    return (
      <div className={`left-menu ${animate}`}>
        <div className="menu-box"></div>
        <button className="control" onClick={this._toggleLeftMenu}>
          <span className={`aspect-left ${_slide}`} />
        </button>
      </div>
    );
  }

  _toggleLeftMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'menu-slide-in' ? 'menu-slide-out' : 'menu-slide-in'
    });
  };
}
