/**
 * @author sl204984
 * tuyun-bar
 * 条形图
 */
import React, { Component } from 'react';
import { ResolveBlurry } from 'tuyun-utils';
// import BarPrompt from './bar-prompt';
import Prompt from './prompt';
import {
  LabelColor,
  Padding,
  Title,
  Legend,
  XLabel,
  PromptWidth,
  PromptGap
} from './style-options';

export default class CahrtsBar extends Component {
  state = {
    showPrompt: false,
    curCell: {},
    isLeft: false,
    promptLeft: 0,
    promptRight: 0,
    isTop: false,
    promptTop: 0,
    promptBottom: 0
  };

  static defaultProps = {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    padding: Padding,
    title: Title,
    // 图例，说明
    legend: Legend,
    // x 坐标轴，下面的文字
    xLabel: XLabel,
    // 数据
    data: [],
    dutyRatio: 0.6, // 占空比，每个单元内图像宽度占整个宽度的面积
    // 选中的柱状
    selectedIndex: -1,
    onClick: () => {}
  };

  // canvas 对象
  _canvasEl;
  // 标题
  _titleH = 0;
  _titleW = 0;
  // 图例说明
  _legendH = 0;
  _legendW = 0;
  // 图表
  _chartH = 0;
  _chartW = 0;
  _chartBottom = 0;
  // x轴标注
  _xLabelH = 0;
  _xLabelW = 0;
  // canvas的实际渲染倍率
  _ratio = 1;
  // 图标的 wrap
  _canvasW = 0;
  _canvasH = 0;

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
    const {
      showPrompt,
      curCell,
      promptLeft,
      promptRight,
      isLeft,
      isTop,
      promptTop,
      promptBottom
    } = this.state;
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
          onMouseLeave={this._onMouseLeave}
          onClick={this._onClick}
        />
        <Prompt
          showPrompt={showPrompt}
          curData={curCell}
          isLeft={isLeft}
          promptLeft={promptLeft}
          promptRight={promptRight}
          isTop={isTop}
          promptTop={promptTop}
          promptBottom={promptBottom}
        />
      </div>
    );
  }

  _convertProps = props => {
    const { padding, title, legend, xLabel } = props;
    // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(legend, Object.assign({}, Legend, legend));
    Object.assign(xLabel, Object.assign({}, XLabel, xLabel));
    // 设置初始值
    this._titleH = Math.ceil(title.fontSize / 0.62); // 0.62 黄金分割
    this._legendH = Math.ceil(legend.fontSize / 0.62); // 注释的高度
    this._xLabelH = Math.ceil(xLabel.fontSize / 0.62); // x标注高度
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
    // 重置 _titleH 和 _legendH
    this._titleH = this._ratio * this._titleH;
    this._legendH = this._ratio * this._legendH;
    // 设置图表高度
    this._chartW = this._xLabelW = this._titleW = this._legendW =
      canvasWidth * this._ratio; // 设置 x轴宽度/标题宽度/注释宽度/图表宽度，这几个宽度相同
    this._chartBottom = canvasHeight * this._ratio; // 图表底部
    this._chartH = this._chartBottom - this._titleH - this._legendH; // 图表高度
    this._chartTop = this._chartBottom - this._chartH; // 图标距离上面的距离
    this._renderBackground(); // 绘制背景
    this._renderTitle(); // 绘制标题
    this._renderLegend(); // 绘制
    this._renderChart(); // 绘制图表
  };

  // 绘制背景颜色
  _renderBackground = () => {
    const { backgroundColor } = this.props;
    this._ctx.save();
    this._ctx.fillStyle = backgroundColor || 'white';
    this._ctx.fillRect(0, 0, this._canvasW, this._canvasH);
    this._ctx.restore();
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
    const { data, dutyRatio, xLabel, selectedIndex } = this.props;
    const _maxData = Math.ceil(this._computeMaxVal() * 1.05);
    const _cellWidth = this._chartW / data.length; // 每一个单元格的宽度
    // x 轴坐标文字
    const _xLabelH = (xLabel.fontSize / 0.62) * this._ratio; // x 轴文字标注的高度
    const _xLabelTop = this._chartBottom - _xLabelH; // x 轴文字标注的顶部纵坐标
    // 彩条
    const _equalSize = (this._chartH - _xLabelH) / _maxData; // chart 高度方向等分成 _maxData 份，每份的大小
    const _barBottom = _xLabelTop; // 彩条的底部纵坐标
    this._barArr = data.map((item, index) => {
      const _barCell = Object.assign({}, item);
      _barCell.index = index;
      _barCell.max = _maxData;
      _barCell.selected = selectedIndex === index; // 是否被选中
      _barCell.dutyRatio = dutyRatio; // 占空比
      _barCell.xStart = index * _cellWidth; // 每个单元格的起始 x 坐标
      _barCell.xEnd = _barCell.xStart + _cellWidth; // 每个单元格的终止 x 坐标
      _barCell.xMiddle = (_barCell.xStart + _barCell.xEnd) / 2; // 每个单元格的中间 x 坐标
      _barCell.yStart = this._chartTop; // 每个单元格的起始 y 坐标
      _barCell.cellWidth = _cellWidth; // 每一个单元格的宽度
      _barCell.cellHeight = this._chartH; // 每一个单元格的高度
      // 矩形遮罩
      _barCell.modalRect = this._createModalRect(_barCell); // 矩形遮罩
      // 彩条
      _barCell.barWidth = _cellWidth * dutyRatio; // 每一个彩条的宽度
      _barCell.barHeight = _equalSize * item.value; // 每一个彩条的高度
      _barCell.barX = _barCell.xMiddle - _barCell.barWidth / 2; // 彩条的横坐标
      _barCell.barY = _barBottom - _barCell.barHeight; // 彩条的纵坐标
      _barCell.bar = this._createBar(_barCell); // 彩条
      // x 轴
      _barCell.xAxisY = _barBottom;
      _barCell.lineWidth = 1; // x 轴的宽度
      _barCell.xAxis = this._createXAxis(_barCell);
      // x 轴下文字
      _barCell.textX = _barCell.xMiddle; // x 轴下文本中心位置横坐标
      _barCell.textY = _xLabelTop + _xLabelH / 2; // x 轴下面文本中心位置纵坐标
      _barCell.textFontSize = xLabel.fontSize * this._ratio; // 文字大小
      return _barCell;
    });
    this._drawBarCells();
  };

  _onMouseMove = event => {
    const {
      top: canvasTop,
      left: canvasLeft,
      width: canvasWidth,
      height: canvasHeight
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    const _x = event.clientX - canvasLeft;
    const _y = event.clientY - canvasTop;
    const _ratioX = _x * this._ratio;
    const _ratioY = _y * this._ratio;
    let _shouldRedraw = false; // 需不需要重渲染
    // 提示框信息
    let _showPrompt = false; // 显示提示框
    let _curCell = {}; // 当前扇形
    let _isLeft = false; // 是否在左边
    let _promptLeft = 0; // 提示框距离左边的距离
    let _promptRight = 0; // 提示框距离右边的距离
    let _isTop = false; // 鼠标是否在图表的上半部分
    let _promptTop = 0;
    let _promptBottom = 0;
    for (let barCell of this._barArr) {
      if (this._ctx.isPointInPath(barCell.modalRect, _ratioX, _ratioY)) {
        if (!barCell.hovered) {
          barCell.hovered = true;
          _shouldRedraw = true;
        }
        _showPrompt = true; // 显示提示框
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        const { padding } = this.props;
        _curCell = barCell; // 当前鼠标所在扇形区间
        _isLeft = _x < canvasWidth + padding.right - PromptWidth - PromptGap;
        _promptLeft = _x + padding.left + PromptGap;
        _promptRight = canvasWidth + padding.right - _x + PromptGap;
        _isTop = _y < canvasHeight - this._chartH / this._ratio / 2;
        _promptTop = _y + padding.top;
        _promptBottom = canvasHeight + padding.bottom - _y; // (padding.top + this._chartH + padding.bottom) - (_y + padding.top)
      } else if (barCell.hovered) {
        barCell.hovered = false;
        _shouldRedraw = true;
      }
    }
    this.setState({
      showPrompt: _showPrompt,
      curCell: _curCell,
      isLeft: _isLeft,
      promptLeft: _promptLeft,
      promptRight: _promptRight,
      isTop: _isTop,
      promptTop: _promptTop,
      promptBottom: _promptBottom
    });
    _shouldRedraw && this._drawBarCells();
  };

  _onMouseLeave = () => {
    let _shouldRedraw = false; // 需要重绘
    for (let barCell of this._barArr) {
      if (!barCell.selected) {
        barCell.hovered = false;
        _shouldRedraw = true; // 需要重绘
      }
    }
    this.setState({ showPrompt: false });
    _shouldRedraw && this._drawBarCells();
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
    for (let index = 0; index < this._barArr.length; index++) {
      const _barCell = this._barArr[index];
      if (this._ctx.isPointInPath(_barCell.modalRect, _ratioX, _ratioY)) {
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        onClick({ curIndex: index, curCell: _barCell });
        break;
      }
    }
  };

  // 渲染选中区域
  _renderSelected = selectedIndex => {
    for (let index = 0; index < this._barArr.length; index++) {
      const _barCell = this._barArr[index];
      _barCell.hovered = false;
      _barCell.selected = selectedIndex === index;
    }
    this._drawBarCells(); // 重绘
  };

  _computeMaxVal = () => {
    const { data } = this.props;
    let _max = data[0].value;
    for (let item of data) {
      if (_max < item.value) _max = item.value;
    }
    return _max;
  };

  _createModalRect = barCell => {
    const { xStart, yStart, cellWidth, cellHeight } = barCell;
    const _path2D = new Path2D();
    _path2D.rect(xStart, yStart, cellWidth - 1, cellHeight); // 减 1 像素，避免同时选中两个背景的问题
    return _path2D;
  };

  _createBar = barCell => {
    const { barX, barY, barWidth, barHeight } = barCell;
    const _path2D = new Path2D();
    _path2D.rect(barX, barY, barWidth, barHeight);
    return _path2D;
  };

  _createXAxis = barCell => {
    const { xStart, xEnd, xAxisY, lineWidth } = barCell;
    const _path2D = new Path2D();
    _path2D.moveTo(xStart, xAxisY + lineWidth); // 起始位置
    _path2D.lineTo(xEnd, xAxisY + lineWidth); // 终止位置
    return _path2D;
  };

  _drawBarCells = () => {
    this._ctx.clearRect(0, this._chartTop, this._chartW, this._chartH); // 清空绘图区

    for (let barCell of this._barArr) {
      const {
        modalRect,
        bar,
        barY,
        barHeight,
        startColor = gradStartColor,
        endColor = gradEndColor,
        selected,
        hovered,
        xAxis,
        lineWidth,
        label,
        textX,
        textY,
        textFontSize
      } = barCell;
      this._ctx.save();

      // 绘制彩条
      const _yTop = barY,
        _yBottom = barY + barHeight;
      const _barGrad = this._ctx.createLinearGradient(0, _yTop, 0, _yBottom); // 渐变色
      _barGrad.addColorStop(0, startColor); // 渐变起始色
      _barGrad.addColorStop(1, endColor); // 渐变终止色
      this._ctx.fillStyle = _barGrad;
      this._ctx.fill(bar);
      // 绘制坐标轴
      this._ctx.lineWidth = lineWidth;
      this._ctx.stroke(xAxis);
      // 绘制文字
      this._ctx.fillStyle = LabelColor;
      this._ctx.font = `${textFontSize}px '微软雅黑'`;
      this._ctx.textAlign = 'center';
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(label, textX, textY);
      // 绘制矩形遮罩
      if (selected) {
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this._ctx.fill(modalRect);
      } else if (hovered) {
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this._ctx.fill(modalRect);
      }
      // restore
      this._ctx.restore();
    }
  };
}

const gradStartColor = '#FF00FF';
const gradEndColor = '#00FFFF';
