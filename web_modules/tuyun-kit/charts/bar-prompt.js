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
    promptLeft: 0,
    promptTop: 0,
    curData: {}
  };

  render() {
    const { padding = {}, chartTop, data } = this.props;
    const { promptLeft, promptTop, showPrompt, maskLeft, curData } = this.state;
    const { left = 0, right = 0, top = 0, bottom = 0 } = padding;
    // 计算盒子宽度
    return (
      <div
        ref={_barPrompt => (this._barPrompt = _barPrompt)}
        style={{
          // 采用内联样式，更好的通过js控制
          position: 'absolute',
          top: chartTop,
          left: 0,
          width: '100%',
          height: `calc(100% - ${chartTop + padding.bottom}px)`,
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
              top: 0,
              width: `${100 / data.length}%`,
              height: '100%',
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
    const { padding = {}, chartTop, data } = this.props;
    const { left, right, bottom } = padding;

    const {
      width: _barPromptW,
      height: _barPromptH,
      left: _barPromptLeft,
      top: _barPromptTop
    } = this._barPrompt.getBoundingClientRect();

    const _x = e.pageX - _barPromptLeft;
    const _y = e.pageY - _barPromptTop;

    if (
      _x > left &&
      _x < _barPromptW - right &&
      _y > chartTop &&
      _y < _barPromptH - bottom
    ) {
      // 在 chart 范围之内
      const _boxWidth = _barPromptW - left - right;
      const _cellWidth = _boxWidth / data.length;
      const _index = Math.floor((_x - left) / _cellWidth);
      const _maskLeft = _index * _cellWidth + left;
      const _promptLeft = _x < _barPromptW - 100 ? _x + 20 : _barPromptW - 100;
      const _promptTop = _y + 10;
      this.setState({
        showPrompt: true,
        maskLeft: _maskLeft,
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
