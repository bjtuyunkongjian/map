import React, { Component } from 'react';
import { DrawRoundRect, ResolveBlurry } from 'tuyun-utils';
import { Padding } from './style-options';

export default class SliderCanvas extends Component {
  static defaultProps = {
    width: 300,
    height: 100,
    padding: Padding,
    gradColor: ['#ff0', '#0ff'],
    bar: {
      color: ['#ff0', '#0ff'],
      height: 10
    },
    step: 0.1,
    start: 0,
    stop: 10,
    circle: {
      r: 5
    }
  };

  _ratio = 1; // canvas的实际渲染倍率

  render() {
    const { width, height } = this.props;
    return (
      <div style={{ position: 'relative', width, height }}>
        <canvas ref={_el => this._renderCanvas(_el)} />
      </div>
    );
  }

  _renderCanvas = _canvas => {
    if (!_canvas) return;
    const { width, height } = this.props;

    this._canvas = _canvas;
    this._ctx = _canvas.getContext('2d');
    this._ratio = ResolveBlurry(this._canvas, this._ctx, { width, height }); // 解决模糊问题
    this._renderCircle(); // 绘制圆圈

    this._renderBar(); // 绘制彩条
  };

  _renderCircle = () => {
    const { circle = {}, gradColor = ['#ff0', '#0ff'] } = this.props;
    const { r = 5 } = circle;
    const _x = 10 * this._ratio;
    const _y = 10 * this._ratio;
    const _r = r * this._ratio;
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.arc(_x, _y, _r, 0, Math.PI * 2, true);
    this._ctx.closePath();
    // 填充
    const _grad = this._ctx.createRadialGradient(_x, _y, 0, _x, _y, _r);
    _grad.addColorStop(0, gradColor[0]);
    _grad.addColorStop(1, gradColor[1]);
    this._ctx.fillStyle = _grad;
    this._ctx.fill();
    this._ctx.restore();
  };

  _renderBar = () => {
    const {
      width,
      padding,
      bar = {},
      gradColor = ['#ff0', '#0ff']
    } = this.props;
    const { top, right, left } = padding;
    const { height: barHeight = 0 } = bar;
    // 设置绘制属性
    const _xStart = left * this._ratio;
    const _yStart = top * this._ratio;
    const _barWidth = (width - left - right) * this._ratio;
    const _barHeight = barHeight * this._ratio;
    // 填充位置
    const _fillRect = [
      _xStart,
      _yStart,
      _xStart + _barWidth,
      _yStart + _barHeight
    ];
    const _grad = this._ctx.createLinearGradient(..._fillRect); // 创建一个渐变色线性对象
    _grad.addColorStop(0, gradColor[0]); // 定义渐变色开始的颜色
    _grad.addColorStop(1, gradColor[1]); // 定义渐变色结束的颜色
    DrawRoundRect(this._ctx, {
      x: _xStart,
      y: _yStart,
      width: _barWidth,
      height: _barHeight,
      r: Math.min(_barHeight, _barWidth) / 2,
      fill: true,
      fillStyle: _grad
    });
  };
}
