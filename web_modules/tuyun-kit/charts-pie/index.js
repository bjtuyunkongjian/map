import React, { Component } from 'react';
import { ResolveBlurry } from 'tuyun-utils';
import { Padding, Title, Legend, XLabel } from './style-options';

export default class ChartsPie extends Component {
  static defaultProps = {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    padding: Padding,
    title: Title,
    // 图例，说明
    legend: Legend,
    // x 坐标轴
    xAxis: [],
    xLabel: XLabel,
    // 对应的渐变色
    xAxisGradient: {},
    // 数据
    data: [
      { value: 435, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ]
  };

  // canvas的实际渲染倍率
  _ratio = 1;
  // canvas 元素距离浏览器顶部和底部的距离
  _canvasTop = 0;
  _canvasLeft = 0;
  // 饼图

  componentWillMount() {
    this._convertProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._convertProps(nextProps);
  }

  render() {
    const { width, height, padding, xAxis, data, backgroundColor } = this.props;
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
          ref={_el => this._renderCanvas(_el)}
          style={{ width: '100%', height: '100%' }}
          height={height}
          onMouseMove={this._onMouseMove}
        />
      </div>
    );
  }

  _convertProps = props => {
    const { padding, title, legend, xLabel } = props;
    // // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    // Object.assign(title, Object.assign({}, Title, title));
    // Object.assign(legend, Object.assign({}, Legend, legend));
    // Object.assign(xLabel, Object.assign({}, XLabel, xLabel));
    // // 设置初始值
    this._titleH = Math.ceil(title.fontSize / 0.62); // 0.62 黄金分割
    // this._legendH = Math.ceil(legend.fontSize / 0.62); // 注释的高度
    // this._xLabelH = Math.ceil(xLabel.fontSize / 0.62); // x标注高度
  };

  _renderCanvas = _canvas => {
    if (!_canvas) return;
    const { padding } = this.props;
    const {
      width: canvasWidth,
      height: canvasHeight,
      top: canvasTop,
      left: canvasLeft
    } = _canvas.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._canvasW = canvasWidth; // 赋值
    this._canvasH = canvasHeight; // 赋值
    this._canvasTop = canvasTop; // 赋值
    this._canvasLeft = canvasLeft; // 赋值
    this._ctx = _canvas.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(_canvas, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    const {
      top: paddingTop,
      right: paddingRight,
      bottom: paddingBottom,
      left: paddingLeft
    } = padding;
    this._chartW = this._xLabelW = this._titleW = this._legendW =
      canvasWidth - paddingRight - paddingLeft; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    this._renderTitle(); // 绘制标题
    this._renderLegend(); // 绘制
  };

  _renderTitle = () => {
    // this._circle = new Path2D();
    // this._circle.arc(
    //   150 * this._ratio,
    //   75 * this._ratio,
    //   50 * this._ratio,
    //   0,
    //   2 * Math.PI
    // );
    // this._ctx.fillStyle = 'red';
    // this._ctx.fill(this._circle);

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

  _renderLegend = () => {};

  _renderChart = () => {};

  _onMouseMove = event => {
    const _x = event.clientX - this._canvasLeft;
    const _y = event.clientY - this._canvasTop;
    console.log(`(x: ${_x}, y: ${_y})`);
    if (
      this._ctx.isPointInPath(this._circle, _x * this._ratio, _y * this._ratio)
    ) {
      this._ctx.fillStyle = 'green';
    } else {
      this._ctx.fillStyle = 'red';
    }
    // Draw circle
    this._ctx.clearRect(0, 0, this._canvasW, this._canvasH);
    this._ctx.fill(this._circle);
  };
}
