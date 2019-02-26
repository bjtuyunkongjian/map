import React, { Component } from 'react';

export default class BarPrompt extends Component {
  state = {
    showPrompt: false,
    maskLeft: 0,
    promptLeft: 0,
    promptTop: 0,
    promptBottom: 0,
    isTop: true, // 判断 prompt 是按照top显示还是按照 bottom 显示
    curData: {}
  };

  render() {
    const { padding = {}, chartTop = 0 } = this.props;
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
          height: `calc(100% - ${chartTop + bottom}px)`,
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
        {this._createMask()}
        {this._createPrompt()}
      </div>
    );
  }

  _createMask = () => {
    const { data = [] } = this.props;
    const { showPrompt, maskLeft } = this.state;

    return showPrompt ? ( // mask 是否显示
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
    ) : null;
  };

  _createPrompt = () => {
    const {
      promptLeft,
      promptTop,
      promptBottom,
      isTop,
      showPrompt,
      curData
    } = this.state;
    const _style = isTop
      ? { left: promptLeft, top: promptTop }
      : { left: promptLeft, bottom: promptBottom };

    return showPrompt ? ( // prompt 是否显示
      <div
        style={Object.assign(
          {
            position: 'absolute',
            padding: '5px 10px',
            width: 100,
            borderRadius: 4,
            background: 'rgba(0, 0, 0, 0.65)',
            color: 'white'
          },
          _style
        )}
      >
        <div>{curData.label}</div>
        <div>数值：{curData.count || 0}</div>
      </div>
    ) : null;
  };

  _onClick = e => {};

  _onMouseOver = e => {};

  _onMouseMove = e => {
    const { padding = {}, chartTop = 0, data = [] } = this.props;
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
      const _promptLeft = _x < _barPromptW - 100 ? _x + 15 : _barPromptW - 100;
      const _promptTop = _y;
      const _promptBottom = _barPromptH - _y;
      const _isTop = _y < _barPromptH / 2; // 判断按 top 显示还是按照 bottom 显示
      this.setState({
        showPrompt: true,
        maskLeft: _maskLeft,
        promptLeft: _promptLeft, // 提示的位置
        promptTop: _promptTop,
        promptBottom: _promptBottom,
        isTop: _isTop,
        curData: data[_index]
      });
    }
  };

  _onMouseLeave = e => {
    this.setState({ showPrompt: false });
  };
}
