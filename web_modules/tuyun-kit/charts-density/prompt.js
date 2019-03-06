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
    return showPrompt ? (
      <div style={Object.assign({}, promptStyle, _xStyle, _yStyle)}>
        <div>{curData.label}</div>
        <div>数值：{curData.value || 0}</div>
      </div>
    ) : null;
  }
}

const promptStyle = {
  position: 'absolute',
  padding: '5px 10px',
  width: PromptWidth,
  borderRadius: 4,
  background: 'rgba(0, 0, 0, 0.65)',
  color: 'white'
};
