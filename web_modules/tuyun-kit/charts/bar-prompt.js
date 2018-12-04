import React, { Component } from 'react';

export default class BarPrompt extends Component {
  static defaultProps = {
    width: 300,
    height: 300,
    padding: {},
    top: 0,
    data: []
  };

  state = {
    promptLeft: 0,
    promptTop: 0
  };

  render() {
    const { width, height, padding = {}, top, data } = this.props;
    const { left, right } = padding;
    const _boxWidth = width - left - right;
    const { promptLeft, promptTop } = this.state;
    return (
      <div
        ref={_barPrompt => (this._barPrompt = _barPrompt)}
        style={{
          // 采用内联样式，更好的通过js控制
          position: 'absolute',
          top,
          left: 0,
          width: width,
          height,
          paddingLeft: left || 0,
          paddingRight: right || 0
        }}
        onClick={this._onClick}
        onMouseOver={this._onMouseOver}
        onMouseMove={this._onMouseMove}
        onMouseLeave={this._onMouseLeave}
      >
        {data.map((item, index) => (
          <div
            key={item.value + index}
            className="hover-dark"
            style={{
              display: 'inline-block',
              width: _boxWidth / data.length,
              height: height
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: promptLeft,
            top: promptTop,
            width: 100,
            height: 100,
            background: 'lightblue'
          }}
        />
      </div>
    );
  }

  _onClick = e => {
    console.log('e', e);
  };

  _onMouseOver = e => {
    console.log('mouseOver');
    const x = e.pageX - this._barPrompt.getBoundingClientRect().left;
    const y = event.pageY - this._barPrompt.getBoundingClientRect().top;
    console.log(x, y);
  };

  _onMouseMove = e => {
    const _promptLeft = e.pageX - this._barPrompt.getBoundingClientRect().left;
    const _promptTop =
      event.pageY - this._barPrompt.getBoundingClientRect().top;
    this.setState({ promptLeft: _promptLeft, promptTop: _promptTop });
  };

  _onMouseLeave = e => {
    console.log('mouseLeave');
  };
}
