import React, { Component } from 'react';
import { ResolveBlurry, CreateRoundRect } from 'tuyun-utils';
import { Padding, Title, Legend, LabelColor } from './style-options';
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
    const _cellHeight = (this._chartH / data.length) * this._ratio; // 每一个数据的高度
    const _labelFontSize = Math.floor((_cellHeight / 2) * 0.62); // 字体大小
    const _numFontSize = Math.floor((_cellHeight / 4) * 0.62); // 数字大小
    const _circleRadius = Math.floor((_cellHeight / 4) * 0.62); // 圆的直径
    this._densityArr = data.map((item, index) => {
      const _densityCell = Object.assign({}, item);
      _densityCell.index = index; // 索引
      // 上半部分
      _densityCell.topMiddle =
        _cellHeight * (index + 1 / 4) + this._chartTop * this._ratio; // 顶部
      _densityCell.height = _cellHeight; // 高度
      _densityCell.circleRadius = _circleRadius; // 圆的半径
      _densityCell.circle = this._createCircle(_densityCell); // 圆
      _densityCell.labelFontSize = Math.min(_labelFontSize, 10 * this._ratio); // 字体大小
      // 下半部分
      _densityCell.bottomMiddle =
        _cellHeight * (index + 3 / 4) + this._chartTop * this._ratio; // 顶部
      _densityCell.bar = this._createBar(_densityCell); // 圆角条形
      _densityCell.numFontSize = Math.min(_numFontSize, 10 * this._ratio); // 数字大小
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

  _createBar = cell => {
    const { bottomMiddle, height } = cell; // 解构
    const _path2D = CreateRoundRect({
      x: 0,
      y: bottomMiddle - height / 4,
      width: this._chartW * this._ratio,
      height: height / 4,
      r: height / 8
    });
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
        height,
        circleRadius,
        circle,
        topMiddle,
        start = 0,
        startColor = '#0f0',
        end = 10,
        endColor = '#00f',
        labelFontSize,
        label,
        bottomMiddle,
        numFontSize,
        bar,
        selected,
        hovered
      } = densityCell; // 解构
      // const _isHighLight = selected || hovered; // 是否高亮
      this._ctx.save();
      // 绘制圆形
      const _yTop = topMiddle - circleRadius,
        _yBottom = topMiddle + circleRadius;
      const _circleGrad = this._ctx.createLinearGradient(0, _yTop, 0, _yBottom); // 渐变色
      _circleGrad.addColorStop(0, startColor); // 渐变起始色
      _circleGrad.addColorStop(1, endColor); // 渐变终止色
      this._ctx.fillStyle = _circleGrad;
      this._ctx.fill(circle);
      // 绘制右上角文字
      this._ctx.fillStyle = LabelColor;
      this._ctx.font = `${labelFontSize}px '微软雅黑'`;
      this._ctx.textAlign = 'right';
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(label, this._chartW * this._ratio, topMiddle);
      // 绘制圆角矩形
      const _barGrad = this._ctx.createLinearGradient(
        0,
        0,
        this._chartW * this._ratio,
        0
      ); // 生成渐变色
      _barGrad.addColorStop(0, startColor); // 渐变起始色
      _barGrad.addColorStop(1, endColor); // 渐变终止色
      this._ctx.fillStyle = _barGrad;
      this._ctx.fill(bar); // 条形
      // 绘制小三角形
      // 绘制圆角矩形下面的数字
      const _numBaseLine = bottomMiddle + height / 8; //
      this._ctx.fillStyle = LabelColor;
      this._ctx.font = `${numFontSize}px '微软雅黑'`;
      this._ctx.textAlign = 'left';
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(start, 0, _numBaseLine);
      this._ctx.textAlign = 'right';
      this._ctx.fillText(end, this._chartW * this._ratio, _numBaseLine);
    }
  };
}

// const _topColor = _gradient[0] || '#f00';
// const _bottomColor = _gradient[1] || '#00f';
