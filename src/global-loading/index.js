import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

export default class GlobalLoading extends Component {
  state = {
    loadingArr: []
  };

  componentDidMount = () => this._init();

  render() {
    const { loadingArr } = this.state;
    if (loadingArr.length <= 0) return null;

    return (
      <div className="global-loading">
        <div className="line-scale">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  _init = () => {
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.on(showGlobalLoading, () => {
      const { loadingArr } = this.state;
      loadingArr.push(true);
      this.setState({ loadingArr });
    });
    GlobalEvent.on(closeGlobalLoading, () => {
      const { loadingArr } = this.state;
      loadingArr.pop();
      this.setState({ loadingArr });
    });
  };
}
