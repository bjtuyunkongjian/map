import React, { Component } from 'react';
import { PromptWidth } from './style-options';

export default class Prompt extends Component {
  static defaultProps = {
    showPrompt: false,
    curData: {},
    isLeft: false,
    promptLeft: 0,
    promptRight: 0,
    promptTop: 0,
    promptBottom: 0
  };

  render() {
    const {
      isLeft,
      promptLeft,
      promptRight,
      isTop,
      promptTop,
      promptBottom,
      showPrompt,
      curData
    } = this.props;
    const _xStyle = isLeft ? { left: promptLeft } : { right: promptRight };
    const _yStyle = isTop ? { top: promptTop } : { bottom: promptBottom };
    const _style = Object.assign({ width: PromptWidth }, _xStyle, _yStyle);
    return showPrompt ? (
      <div className="CanvasCharts_Prompt" style={_style}>
        <div>{curData.label}</div>
        <div>数值：{curData.value || 0}</div>
      </div>
    ) : null;
  }
}
