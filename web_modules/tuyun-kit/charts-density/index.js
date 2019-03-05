import React, { Component } from 'react';
import { DrawRoundRect, ResolveBlurry } from 'tuyun-utils';
import { Padding, Title, Legend } from './style-options';
// import { Prompt } from './prompt';

export default class ChartsDensity extends Component {
  static defaultProps = {
    width: 300,
    height: 100,
    padding: Padding,
    title: Title,
    gradColor: ['#ff0', '#0ff'],
    step: 0.1,
    start: 0,
    stop: 10,
    backgroundColor: 'white',
    data: []
  };

  _canvasEl; // canvas 对象
  _ratio = 1; // canvas的实际渲染倍率
  // 密度图
  _chartW = 0;
  _chartH = 0;
  _chartTop = 0;
  _chartBottom = 0;

  componentWillMount() {
    this._convertProps(this.props);
  }

  componentDidMount() {
    this._renderCanvas(this._canvasEl);
  }

  componentWillReceiveProps(nextProps) {
    this._convertProps(nextProps);
    const { selectedIndex } = this.props;
    if (nextProps.selectedIndex !== selectedIndex) {
      this._renderSelected(nextProps.selectedIndex);
    }
  }

  render() {
    const { width, height, padding, backgroundColor } = this.props;
    return (
      <div
        style={{
          position: 'relative',
          width,
          height,
          overflow: 'hidden',
          backgroundColor,
          cursor: 'pointer',
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingTop: padding.top,
          paddingBottom: padding.bottom
        }}
      >
        <canvas
          ref={_el => (this._canvasEl = _el)}
          style={{ width: '100%', height: '100%' }}
          height={height}
        />
      </div>
    );
  }

  _convertProps = props => {
    const { padding, title, legend } = props;
    // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(legend, Object.assign({}, Legend, legend));
    // 设置初始值
    this._titleH = Math.ceil(title.fontSize / 0.62); // 0.62 黄金分割
    this._legendH = Math.ceil(legend.fontSize / 0.62); // 注释的高度
  };

  _renderCanvas = _canvas => {
    if (!this._canvasEl) return;
    const {
      width: canvasWidth,
      height: canvasHeight
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._canvasW = canvasWidth; // 赋值
    this._canvasH = canvasHeight; // 赋值
    this._ctx = this._canvasEl.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(this._canvasEl, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    this._chartW = this._xLabelW = this._titleW = this._legendW = canvasWidth; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    this._chartH = canvasHeight - this._titleH - this._legendH; // 图表高度
    this._chartBottom = canvasHeight; // 图表底部
    this._chartTop = this._chartBottom - this._chartH; // 图标距离上面的距离
    this._renderTitle(); // 绘制标题
    this._renderLegend(); // 绘制
    this._renderChart(); // 绘制图表
  };

  _renderTitle = () => {
    const { title } = this.props;
    const { text, align, fontSize, fontWeight, color, fontFamily } = title;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._titleH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = 0;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._titleW;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = this._titleW / 2;
    }
    this._ctx.textBaseline = 'middle';
    if (fontWeight === 'blod') {
      this._ctx.fillText(
        text,
        _textStart * this._ratio,
        (_textMiddle - 0.5) * this._ratio
      );
      this._ctx.fillText(
        text,
        (_textStart - 0.5) * this._ratio,
        _textMiddle * this._ratio
      );
      this._ctx.fillText(
        text,
        _textStart * this._ratio,
        (_textMiddle + 0.5) * this._ratio
      );
      this._ctx.fillText(
        text,
        (_textStart + 0.5) * this._ratio,
        _textMiddle * this._ratio
      );
    } else {
      this._ctx.fillText(
        text,
        _textStart * this._ratio,
        _textMiddle * this._ratio
      );
    }
    this._ctx.restore();
  };

  _renderLegend = () => {
    const { legend } = this.props;
    const { text, align, fontSize, color, fontFamily } = legend;
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize * this._ratio}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._titleH + this._legendH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = 0;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._titleW;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = this._titleW / 2;
    }
    this._ctx.fillText(
      text,
      _textStart * this._ratio,
      _textMiddle * this._ratio
    );
    this._ctx.restore();
  };

  _renderChart = () => {
    const { data, selectedIndex } = this.props;
    const _cellHeight = this._chartH / data.length; // 每一个数据的高度
    const _fontsize = _cellHeight * 0.31; // 字体大小 0.62 / 2
    const _circleRadius = (_fontsize / 2) * this._ratio; // 圆的直径
    this._densityArr = data.map((item, index) => {
      const _densityCell = Object.assign({}, item);
      _densityCell.index = index; // 索引
      _densityCell.topMiddle =
        (_cellHeight * (index + 1 / 4) + this._chartTop) * this._ratio; // 顶部
      _densityCell.height = _cellHeight; // 高度
      _densityCell.circleRadius = _circleRadius; // 圆的半径
      _densityCell.fontSize = _fontsize; // 字体大小
      _densityCell.circle = this._createCircle(_densityCell); // 圆
      return _densityCell;
    });
    this._drawDensityCells();
  };

  _createCircle = cell => {
    const { circleRadius, topMiddle } = cell; // 解构
    const _path2D = new Path2D(); // 新建路径
    const _center = { x: circleRadius, y: topMiddle }; // 圆心
    _path2D.arc(_center.x, _center.y, circleRadius, 0, 2 * Math.PI); // 绘制圆
    return _path2D;
  };

  _drawDensityCells = () => {
    this._ctx.clearRect(
      0,
      this._chartTop * this._ratio,
      this._chartW * this._ratio,
      this._chartH * this._ratio
    ); // 清空绘图区
    for (let densityCell of this._densityArr) {
      const {
        circleRadius,
        topMiddle,
        startColor = '#0f0',
        endColor = '#00f',
        selected,
        hovered
      } = densityCell; // 解构
      // const _isHighLight = selected || hovered; // 是否高亮
      this._ctx.save();
      // 绘制圆形
      const _yTop = topMiddle - circleRadius,
        _yBottom = topMiddle + circleRadius;
      const _grad = this._ctx.createLinearGradient(0, _yTop, 0, _yBottom); // 渐变色
      _grad.addColorStop(0, startColor); // 渐变起始色
      _grad.addColorStop(1, endColor); // 渐变终止色
      this._ctx.fillStyle = _grad;
      this._ctx.fill(densityCell.circle);

      // this._ctx.strokeStyle = _originColor;
      // this._ctx.stroke(sector.indicator);
      // // 绘制扇形
      // this._ctx.fillStyle = _color;
      // this._ctx.fill(densityCell.circle);
      // 绘制文字
      // this._ctx.fillStyle = _originColor;
      // this._ctx.font = "16px '微软雅黑'";
      // this._ctx.textAlign = sector.textAlign;
      // this._ctx.textBaseline = 'middle';
      // this._ctx.fillText(sector.name, ...sector.textStart);
      // this._ctx.restore();
    }
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

// const _topColor = _gradient[0] || '#f00';
// const _bottomColor = _gradient[1] || '#00f';
