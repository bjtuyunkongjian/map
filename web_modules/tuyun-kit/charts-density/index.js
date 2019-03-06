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
    data: [],
    // 选中的扇形
    selectedIndex: -1,
    onClick: () => {}
  };

  _canvasEl; // canvas 对象
  _ratio = 1; // canvas的实际渲染倍率
  // 标题
  _titleH = 0;
  _legendH = 0;
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
          onMouseMove={this._onMouseMove}
          onClick={this._onClick}
          onMouseLeave={this._onMouseLeave}
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
    this._canvasH = canvasHeight; // 赋值
    this._ctx = this._canvasEl.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(this._canvasEl, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    // 重置 _titleH 和 _legendH
    this._titleH = this._ratio * this._titleH;
    this._legendH = this._ratio * this._legendH;
    // 设置图表高度
    this._canvasW = this._chartW = this._xLabelW = this._titleW = this._legendW =
      canvasWidth * this._ratio; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    this._canvasH = this._chartBottom = canvasHeight * this._ratio; // 图表底部
    this._chartH = this._chartBottom - this._titleH - this._legendH; // 图表高度
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
      this._ctx.fillText(text, _textStart, _textMiddle - 0.5);
      this._ctx.fillText(text, _textStart - 0.5, _textMiddle);
      this._ctx.fillText(text, _textStart, _textMiddle + 0.5);
      this._ctx.fillText(text, _textStart + 0.5, _textMiddle);
    } else {
      this._ctx.fillText(text, _textStart, _textMiddle);
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
    this._ctx.fillText(text, _textStart, _textMiddle);
    this._ctx.restore();
  };

  _renderChart = () => {
    const { data, selectedIndex } = this.props;
    const _cellHeight = this._chartH / data.length; // 每一个数据的高度
    const _labelFontSize = Math.floor((_cellHeight / 3) * 0.62); // 字体大小
    const _circleRadius = Math.floor(_cellHeight / 8); // 圆的直径
    const _numFontSize = Math.floor((_cellHeight / 3) * 0.62); // 数字大小
    this._densityArr = data.map((item, index) => {
      const _densityCell = Object.assign({}, item);
      _densityCell.index = index; // 索引
      _densityCell.selected = selectedIndex === index; // 选中区域
      _densityCell.height = _cellHeight; // 高度
      _densityCell.width = this._chartW;
      // 上面 1/3 部分显示圆圈和名称
      _densityCell.topTop = _cellHeight * index + this._chartTop; // 顶部的顶部位置
      _densityCell.topBottom = _densityCell.topTop + _cellHeight / 3; // 顶部的底部位置
      _densityCell.topMiddle =
        (_densityCell.topTop + _densityCell.topBottom) / 2; // 顶部的中间位置
      _densityCell.circleRadius = _circleRadius; // 圆的半径
      _densityCell.circle = this._createCircle(_densityCell); // 圆
      _densityCell.labelFontSize = Math.min(_labelFontSize, 10 * this._ratio); // 字体大小
      // 中间 1/3 部分，显示条形
      _densityCell.centerTop = _densityCell.topBottom;
      _densityCell.centerBottom = _densityCell.centerTop + _cellHeight / 3; // 顶部的底部位置
      _densityCell.centerMiddle =
        (_densityCell.centerTop + _densityCell.centerBottom) / 2; // 顶部
      _densityCell.barPercentage = 2 / 3; // 矩形条占的比例
      _densityCell.bar = this._createBar(_densityCell); // 圆角矩形条
      _densityCell.triangle = this._createTriangle(_densityCell); // 三角形
      // 下面 1/3 部分
      _densityCell.bottomTop = _densityCell.centerBottom;
      _densityCell.bottomBottom = _densityCell.bottomTop + _cellHeight / 3; // 底部位置
      _densityCell.bottomMiddle =
        (_densityCell.bottomTop + _densityCell.bottomBottom) / 2; // 中间位置
      _densityCell.numFontSize = Math.min(_numFontSize, 10 * this._ratio); // 数字字体大小
      // 后面的矩形
      _densityCell.backRect = this._createBacRect(_densityCell); // 生成背景矩形
      return _densityCell;
    });
    this._drawDensityCells();
  };

  _onMouseMove = event => {
    const {
      top: canvasTop,
      left: canvasLeft
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    const _x = event.clientX - canvasLeft;
    const _y = event.clientY - canvasTop;
    const _ratioX = _x * this._ratio;
    const _ratioY = _y * this._ratio;
    let _shouldRedraw = false; // 需不需要重渲染
    for (let densityCell of this._densityArr) {
      if (this._ctx.isPointInPath(densityCell.backRect, _ratioX, _ratioY)) {
        if (!densityCell.hovered) {
          densityCell.hovered = true;
          _shouldRedraw = true;
        }
      } else if (densityCell.hovered) {
        densityCell.hovered = false;
        _shouldRedraw = true;
      }
    }
    _shouldRedraw && this._drawDensityCells();
  };

  _onClick = () => {
    const { onClick } = this.props;
    const {
      top: canvasTop,
      left: canvasLeft
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    const _x = event.clientX - canvasLeft;
    const _y = event.clientY - canvasTop;
    const _ratioX = _x * this._ratio;
    const _ratioY = _y * this._ratio;
    for (let index = 0; index < this._densityArr.length; index++) {
      const _densityCell = this._densityArr[index];
      if (this._ctx.isPointInPath(_densityCell.backRect, _ratioX, _ratioY)) {
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        onClick({ curIndex: index, curCell: _densityCell });
        break;
      }
    }
  };

  _onMouseLeave = () => {
    let _shouldRedraw = false; // 需要重绘
    for (let densityCell of this._densityArr) {
      if (!densityCell.selected) {
        densityCell.hovered = false;
        _shouldRedraw = true; // 需要重绘
      }
    }
    this.setState({ showPrompt: false });
    _shouldRedraw && this._drawDensityCells();
  };

  // 渲染选中区域
  _renderSelected = selectedIndex => {
    for (let index = 0; index < this._densityArr.length; index++) {
      const _densityCell = this._densityArr[index];
      _densityCell.hovered = false;
      _densityCell.selected = selectedIndex === index;
    }
    this._drawDensityCells(); // 重绘
  };

  _createBacRect = cell => {
    const { width, height, topTop } = cell;
    const _path2D = new Path2D();
    _path2D.rect(0, topTop, width, height);
    return _path2D;
  };

  _createCircle = cell => {
    const { circleRadius, topMiddle } = cell; // 解构
    const _path2D = new Path2D(); // 新建路径
    const _center = { x: circleRadius, y: topMiddle }; // 圆心
    _path2D.arc(_center.x, topMiddle, circleRadius, 0, 2 * Math.PI); // 绘制圆
    return _path2D;
  };

  _createBar = cell => {
    const { width, centerTop, centerBottom, barPercentage } = cell; // 解构
    const _totalH = (centerBottom - centerTop) * barPercentage;
    const _spaceH = _totalH / 3; // 空白部分的高度，占整个圆角矩形彩条高度的三分之一
    const _path2D = CreateRoundRect({
      x: 0,
      y: centerTop + _spaceH,
      width,
      height: _totalH - _spaceH
    });
    return _path2D;
  };

  _createTriangle = cell => {
    const {
      width,
      centerTop,
      centerBottom,
      value,
      start = 0,
      end = 10,
      barPercentage
    } = cell; // 解构
    const _triHeight = (centerBottom - centerTop) * (1 - barPercentage); // 正三角形的高
    const _triTopX = (value / (end - start)) * width; // 正三角形上顶点的横坐标
    const _path2D = new Path2D();
    _path2D.moveTo(_triTopX, centerBottom - _triHeight); // 正三角形上顶点
    _path2D.lineTo(_triTopX - _triHeight / Math.sqrt(3), centerBottom); // 正三角形左下角顶点
    _path2D.lineTo(_triTopX + _triHeight / Math.sqrt(3), centerBottom); // 正三角形右下角顶点
    return _path2D;
  };

  _drawDensityCells = () => {
    this._ctx.clearRect(0, this._chartTop, this._chartW, this._chartH); // 清空绘图区
    for (let densityCell of this._densityArr) {
      const {
        circleRadius,
        circle,
        topMiddle,
        start = 0,
        startColor = gradStartColor,
        end = 10,
        endColor = gradEndColor,
        labelFontSize,
        label,
        bottomMiddle,
        numFontSize,
        bar,
        selected,
        hovered,
        backRect,
        triangle
      } = densityCell; // 解构
      this._ctx.save();
      // 开始绘制
      // 背景
      if (selected) {
        this._ctx.fillStyle = '#ddd';
        this._ctx.fill(backRect);
      } else if (hovered) {
        this._ctx.fillStyle = '#eee';
        this._ctx.fill(backRect);
      }
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
      this._ctx.fillText(label, this._chartW, topMiddle);
      // 绘制圆角矩形
      const _barGrad = this._ctx.createLinearGradient(0, 0, this._chartW, 0); // 生成渐变色
      _barGrad.addColorStop(0, startColor); // 渐变起始色
      _barGrad.addColorStop(1, endColor); // 渐变终止色
      this._ctx.fillStyle = _barGrad;
      this._ctx.fill(bar); // 条形
      // 绘制小三角形
      this._ctx.fillStyle = LabelColor;
      this._ctx.fill(triangle);
      // 绘制圆角矩形下面的数字
      const _numBaseLine = bottomMiddle; //
      this._ctx.fillStyle = LabelColor;
      this._ctx.font = `${numFontSize}px '微软雅黑'`;
      this._ctx.textAlign = 'left';
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(start, 0, _numBaseLine);
      this._ctx.textAlign = 'right';
      this._ctx.fillText(end, this._chartW, _numBaseLine);
      this._ctx.restore();
    }
  };
}

const gradStartColor = '#FF00FF';
const gradEndColor = '#00FFFF';
