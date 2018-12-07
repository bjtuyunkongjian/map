import React, { Component } from 'react';

export default class BarPrompt extends Component {
  static defaultProps = {
    width: 300,
    height: 300,
    padding: {},
    chartTop: 0,
    data: []
  };

  state = {
    showPrompt: false,
    maskLeft: 0,
    maskTop: 0,
    promptLeft: 0,
    promptTop: 0,
    curData: {}
  };

  render() {
    const { width, height, padding = {}, chartTop, data } = this.props;
    const {
      promptLeft,
      promptTop,
      showPrompt,
      maskLeft,
      maskTop,
      curData
    } = this.state;
    const { left, right, top, bottom } = padding;
    // 计算盒子宽度
    const _boxWidth = width - left - right;
    return (
      <div
        ref={_barPrompt => (this._barPrompt = _barPrompt)}
        style={{
          // 采用内联样式，更好的通过js控制
          position: 'absolute',
          top: 0,
          left: 0,
          width: width,
          height: height,
          paddingLeft: left || 0,
          paddingRight: right || 0,
          paddingTop: top || 0,
          paddingBottom: bottom || 0
        }}
        onClick={this._onClick}
        onMouseOver={this._onMouseOver}
        onMouseMove={this._onMouseMove}
        onMouseLeave={this._onMouseLeave}
      >
        {showPrompt ? ( // mask 是否显示
          <div
            style={{
              // 采用内联样式，更好的通过js控制
              position: 'absolute',
              left: maskLeft,
              top: maskTop,
              width: _boxWidth / data.length,
              height: height - chartTop - bottom,
              backgroundColor: 'rgba(102, 102, 102, 0.4)'
            }}
          />
        ) : null}

        {showPrompt ? ( // prompt 是否显示
          <div
            style={{
              position: 'absolute',
              left: promptLeft,
              top: promptTop,
              padding: 5,
              width: 100,
              borderRadius: 4,
              background: 'rgba(0, 0, 0, 0.65)',
              color: 'white'
            }}
          >
            <div>{curData.label}</div>
            <div>数值：{curData.count || 0}</div>
          </div>
        ) : null}
      </div>
    );
  }

  _onClick = e => {
    console.log('e', e);
  };

  _onMouseOver = e => {};

  _onMouseMove = e => {
    const { width, height, padding = {}, chartTop, data } = this.props;
    const { left, right, bottom } = padding;

    const _x = e.pageX - this._barPrompt.getBoundingClientRect().left;
    const _y = event.pageY - this._barPrompt.getBoundingClientRect().top;

    if (
      _x > left &&
      _x < width - right &&
      _y > chartTop &&
      _y < height - bottom
    ) {
      // 在 chart 范围之内
      const _boxWidth = width - left - right;
      const _cellWidth = _boxWidth / data.length;
      const _index = Math.floor((_x - left) / _cellWidth);
      const _maskLeft = _index * _cellWidth + left;
      const _promptLeft = _x < width - 100 ? _x + 20 : width - 100;
      const _promptTop = _y + 10;
      this.setState({
        showPrompt: true,
        maskLeft: _maskLeft,
        maskTop: chartTop,
        promptLeft: _promptLeft, // 提示的位置
        promptTop: _promptTop,
        curData: data[_index]
      });
    }
  };

  _onMouseLeave = e => {
    this.setState({ showPrompt: false });
  };
}
