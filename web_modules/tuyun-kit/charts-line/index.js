/**
 * @author 郝义红
 * @description 折线图组件
 */

import React, { Component } from 'react';
import { ResolveBlurry, DrawRoundRect, CreateRoundRect } from 'tuyun-utils';
import {
  Padding,
  Title,
  SubTitle,
  PromptWidth,
  PromptGap,
  LineColors
} from './style-options';
import Prompt from './prompt';

export default class ChartsLine extends Component {
  state = {
    showPrompt: false,
    curSector: {},
    isLeft: false,
    promptLeft: 0,
    promptRight: 0,
    isTop: false,
    promptTop: 0,
    promptBottom: 0
  };

  static defaultProps = {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    padding: Padding,
    title: Title,
    // 图例，说明
    subTitle: SubTitle,
    // 图例
    showLegend: true,
    // 数据
    series: [
      { name: '全部案件', code: '2', data: [44, 95, 143] },
      { name: '行政案件', code: '1', data: [32, 36, 89] },
      { name: '刑事案件', code: '0', data: [12, 59, 54] }
    ],
    // 选中的索引
    selectedKey: 'code', // 根据 key/value 来判断选中的选项
    selectedValue: '1', // 根据 key/value 来判断选中的选项
    onClick: () => {}
  };

  _canvasEl; // canvas 元素

  _curHeight = 0; // 各个元素的高度
  // canvas 元素距离浏览器顶部和底部的距离
  _canvasW = 0;
  _canvasH = 0;
  // 总的数据
  _totalData = 1;
  _maxData = 1; // 最大值
  // 图例
  _legends = [];
  // 图表属性
  _chartBottom = 0;

  _rerender = false;

  componentWillMount() {
    this._convertProps(this.props);
  }

  componentDidMount() {
    this._renderCanvas(this._canvasEl);
  }

  componentWillReceiveProps(nextProps) {
    this._convertProps(nextProps);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this._renderCanvas(this._canvasEl); // props更新时才重新渲染 canvas
    }
  }

  render() {
    const {
      showPrompt,
      curSector,
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
        className="CanvasCharts"
        style={{
          width,
          height,
          backgroundColor,
          paddingLeft: padding.left,
          paddingRight: padding.right,
          paddingTop: padding.top,
          paddingBottom: padding.bottom
        }}
      >
        <canvas
          ref={_el => (this._canvasEl = _el)}
          className="CanvasCharts_Canvas"
          height={height}
          // onMouseMove={this._onMouseMove}
          // onMouseLeave={this._onMouseLeave}
          // onClick={this._onClick}
        />
        <Prompt
          showPrompt={showPrompt}
          curData={curSector}
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
    const { series, padding, title, subTitle } = props;
    // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(subTitle, Object.assign({}, SubTitle, subTitle));
    // 计算最大值，预处理 series
    let _max = 1;
    for (let i = 0; i < series.length; i++) {
      const _item = Object.assign({}, series[i]);
      const _color = LineColors[i % LineColors.length];
      _item.label = _item.name;
      _item.color = _color;
      _item.hue = _color[0]; // 色调
      _item.saturation = _color[1]; // 饱和度
      _item.lightness = _color[2]; // 亮度
      const _itemMax = Math.max(..._item.data);
      _max = Math.max(_max, _itemMax);
      this._legends.push(_item);
    }
    this._maxData = _max || 1; // 生成最大值
  };

  _renderCanvas = () => {
    if (!this._canvasEl) return;
    const {
      width: canvasWidth,
      height: canvasHeight
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._ctx = this._canvasEl.getContext('2d'); // 赋值
    const _ratio = ResolveBlurry(this._canvasEl, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    this._ctx.scale(_ratio, _ratio); // _ratio 为 canvas 的实际渲染倍率
    this._canvasW = canvasWidth; // canvas 宽度
    this._canvasH = canvasHeight; // canvas 高度
    this._chartBottom = canvasHeight; // 图表底部
    this._renderTitle(); // 绘制标题
    this._renderSubTitle(); // 绘制标注
    this._renderLegend(); // 绘制图例
    // this._renderChart(); // 绘制图表
  };

  _renderTitle = () => {
    const { title } = this.props;
    const { text, align, fontSize, fontWeight, color, fontFamily } = title;
    if (!text) return;
    const _titleH = Math.ceil(fontSize / goldenRatio); // 黄金分割
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._curHeight + _titleH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = 0;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._canvasW;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = this._canvasW / 2;
    }
    this._ctx.textBaseline = 'middle';
    if (fontWeight === 'blod') {
      this._ctx.fillText(text, _textStart, _textMiddle - 0.25);
      this._ctx.fillText(text, _textStart - 0.25, _textMiddle);
      this._ctx.fillText(text, _textStart, _textMiddle + 0.25);
      this._ctx.fillText(text, _textStart + 0.25, _textMiddle);
    } else {
      this._ctx.fillText(text, _textStart, _textMiddle);
    }
    this._ctx.restore();
    this._curHeight += _titleH; // 增加当前高度
  };

  _renderSubTitle = () => {
    const { subTitle } = this.props;
    const { text, align, fontSize, color, fontFamily } = subTitle;
    if (!text) return;
    const _subTitleH = Math.ceil(fontSize / goldenRatio); // 副标题的高度
    this._ctx.save();
    this._ctx.fillStyle = color;
    this._ctx.font = `${fontSize}px '${fontFamily}'`;
    let _textStart;
    const _textMiddle = this._curHeight + _subTitleH / 2; // 文字位置上下居中
    /* 文字靠左 */ if (align === 'left') {
      this._ctx.textAlign = 'start';
      _textStart = 0;
    } /* 文字靠右 */ else if (align === 'right') {
      this._ctx.textAlign = 'end';
      _textStart = this._canvasW;
    } /* 默认是居中 */ else {
      this._ctx.textAlign = 'center';
      _textStart = this._canvasW / 2;
    }
    this._ctx.fillText(text, _textStart, _textMiddle);
    this._ctx.restore();
    this._curHeight += _subTitleH; // 增加当前高度
  };

  _renderLegend = () => {
    const { series, showLegend, selectedKey, selectedValue } = this.props;
    if (!showLegend) return;
    let _curX = 0; // start X
    let _xInc = 0; // X 方向的增量
    let _curY = this._curHeight; // start Y
    let _yInc = this._curHeight; // Y 方向的增量
    const _fontH = 11;
    const _unitH = _fontH * 1.2; // 每个元素的高度
    const _font = `${_fontH}px '微软雅黑'`;
    this._ctx.save();
    this._ctx.font = _font;
    for (let item of this._legends) {
      item.legendW = 20; // 图例宽度
      item.legendH = _fontH; // 图例高度
      item.legendRadius = 2; // 圆角
      item.legendMR = 1; // 图例右侧 margin 大小， MR： margin right
      item.font = _font; // 字体
      item.fontW = this._ctx.measureText(item.label).width; // 字体宽度
      item.fontMR = 2; // 字体 右侧 margin 大小， MR： margin right
      item.width = item.legendW + item.legendMR + item.fontW + item.fontMR; // 整个的宽度
      item.height = _unitH; // 整个的高度
      // 计算当前的 x 和 y
      if (item.width > this._canvasW) {
        /**
         * 元素宽度 > canvasW，
         * 1. 如果是当前行第一个元素（判断标准：_startX === 0），不换行：
         *      _curX = 0; _curY += 0;
         *    下一个元素换行：
         *      _yInc = item.height; _xInc = 0;
         * 2. 如果不是当前行的第一个元素，换行：
         *      _curX = 0; _curY += item.height;
         *    下一个元素换行：
         *      _yInc = item.height; _xInc = 0;
         */
        _curY += _curX === 0 ? 0 : item.height; // 如果当前宽度为0
        _curX = 0; // startX 置为 0
        _xInc = 0; // x 方向的增量
        _yInc = item.height; // y 方向的增量
      } else if (item.width + _curX > this._canvasW) {
        /**
         * 元素宽度 + 已有宽度 > canvasW，该行放不下当前元素，当前元素换行:
         *   _curY += item.height;
         *   _curX = 0;
         * 下一个元素紧随其后:
         *   _xInc = item.width;
         *   _yInc = 0;
         */
        _curY += item.height; // 换行，增加 startY 的高度
        _curX = 0; // 换行，startX 置为 0
        _xInc = item.width;
        _yInc = 0;
      } else {
        /**
         * 该行放的下当前元素，当前元素不换行:
         *   _curY += 0;
         *   _curX += 0;
         * 下一个元素紧随其后:
         *   _xInc = item.width;
         *   _yInc = 0;
         */
        _xInc = item.width;
        _yInc = 0;
      }
      item.x = _curX; // 当前起始位置，X
      item.y = _curY; // 当前起始位置，Y
      // 计算下一次的 X 和 Y
      _curX += _xInc;
      _curY += _yInc;
      item.selected = item[selectedKey] === selectedValue;
      item.hovered = false;
      console.log(item);
      item.legend = this._createLegendUnit(item);
    }
    this._curHeight = _curY + _unitH;
    this._ctx.restore();
    this._drawLegend();
  };

  _createLegendUnit = unit => {
    const { x, y, legendW, height, legendH, legendRadius } = unit;
    const _startY = y + (height - legendH) / 2; // 起始
    const _path2D = new Path2D(); // 路径
    DrawRoundRect(_path2D, {
      x,
      y: _startY,
      width: legendW,
      height: legendH,
      r: legendRadius,
      fill: true
    });
    return _path2D;
  };

  _drawLegend = () => {
    for (let legend of this._legends) {
      const _isHighLight = legend.selected || legend.hovered; // 是否高亮
      const _highlightColor = `hsla(${legend.hue}, ${legend.saturation *
        1.2}%, ${legend.lightness * 1.2}%, 1)`;
      const _originColor = `hsla(${legend.hue}, ${legend.saturation}%, ${
        legend.lightness
      }%, 1)`;
      const _color = _isHighLight ? _highlightColor : _originColor; // 设置颜色是否高亮
      this._ctx.save();
      // 绘制扇形
      this._ctx.fillStyle = _color;
      this._ctx.fill(legend.legend);
      // 绘制文字
      // 绘制文字
      this._ctx.font = legend.font; // fontSize
      this._ctx.textBaseline = 'middle';
      const _textX = legend.x + legend.legendW + legend.legendMR;
      const _textY = legend.y + legend.height / 2;
      this._ctx.fillText(legend.label, _textX, _textY);
      this._ctx.restore();
    }
  };

  // 绘制饼图
  _renderChart = () => {
    const { selectedIndex, selectedKey, selectedValue } = this.props;
    const _chartH = this._canvasH - this._curHeight;
    const _center = {
      x: this._canvasW / 2,
      y: this._chartBottom - _chartH / 2
    };
    console.log('_center', _center);
    return;

    const _radius = (Math.min(this._chartH, this._chartW) / 2) * 0.8; // 长宽较小值的一半的百分之八十
    let _addedPercentage = 0; // 已经计算的百分比
    const _scLength = LineColors.length; // 扇区长度
    this._sectorArr = data.map((item, index) => {
      const _sector = Object.assign({}, item); // 扇形
      _sector.x = _center.x; // 圆心 x 坐标
      _sector.y = _center.y; // 圆心 y 坐标
      _sector.originRadius = _radius; // 原始半径 和 显示半径
      if (selectedKey) {
        _sector.selected = _sector[selectedKey] === selectedValue; // 是否被选中
      } else {
        _sector.selected = selectedIndex === index; // 是否被选中
      }
      _sector.hue = LineColors[index % _scLength][0]; // 色调
      _sector.saturation = LineColors[index % _scLength][1]; // 饱和度
      _sector.lightness = LineColors[index % _scLength][2]; // 亮度
      _sector.percentage = item.value / this._totalData; // 占的百分比
      _sector.startAngle = _addedPercentage * Math.PI * 2; // 起始角
      _sector.endAngle = (_addedPercentage + _sector.percentage) * Math.PI * 2; // 终止角
      _sector.sectorPath = this._createSectorPath(_sector); // 扇形区域
      _sector.indicator = indicator; // 指示线
      _sector.textAlign = textAlign; // 文字对齐方向
      _sector.textStart = textStart; // 文字起始位置
      // todo 绘制指向的线
      _addedPercentage += _sector.percentage; // 计算下一个百分比的起始值
      return _sector;
    });
    this._drawSector();
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
    let _shouldRedraw = false; // 需不需要重渲染
    // 提示框信息
    let _showPrompt = false; // 显示提示框
    let _curSector = {}; // 当前扇形
    let _isLeft = false; // 是否在左边
    let _promptLeft = 0; // 提示框距离左边的距离
    let _promptRight = 0; // 提示框距离右边的距离
    let _isTop = false; // 鼠标是否在图表的上半部分
    let _promptTop = 0;
    let _promptBottom = 0;
    for (let sector of this._sectorArr) {
      if (this._ctx.isPointInPath(sector.sectorPath, _x, _y)) {
        if (!sector.hovered) {
          // 鼠标在该扇形区域内，并且该扇形区域扩展了，不做任何操作
          sector.hovered = true; // 扩展
          sector.sectorPath = this._createSectorPath(sector);
          _shouldRedraw = true; // 需要重绘
        }
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        const { padding } = this.props;
        _showPrompt = true; // 显示提示框
        _curSector = sector; // 当前鼠标所在扇形区间
        _isLeft = _x < canvasWidth + padding.right - PromptWidth - PromptGap;
        _promptLeft = _x + padding.left + PromptGap;
        _promptRight = canvasWidth + padding.right - _x + PromptGap;
        _isTop = _y < canvasHeight - this._chartH / 2;
        _promptTop = _y + padding.top;
        _promptBottom = canvasHeight + padding.bottom - _y; // (padding.top + this._chartH + padding.bottom) - (_y + padding.top)
      } else if (sector.hovered && !sector.selected) {
        // 不在该扇形区间内，该扇形区间已做扩展并且未被选中
        sector.hovered = false; // 没有扩展
        sector.sectorPath = this._createSectorPath(sector);
        _shouldRedraw = true; // 需要重绘
      }
    }
    this.setState({
      showPrompt: _showPrompt,
      curSector: _curSector,
      isLeft: _isLeft,
      promptLeft: _promptLeft,
      promptRight: _promptRight,
      isTop: _isTop,
      promptTop: _promptTop,
      promptBottom: _promptBottom
    });
    _shouldRedraw && this._drawSector();
  };

  _onMouseLeave = () => {
    let _shouldRedraw = false; // 需要重绘
    for (let sector of this._sectorArr) {
      if (!sector.selected) {
        sector.hovered = false; // 没有扩展
        sector.sectorPath = this._createSectorPath(sector);
        _shouldRedraw = true; // 需要重绘
      }
    }
    this.setState({ showPrompt: false });
    _shouldRedraw && this._drawSector();
  };

  _onClick = () => {
    const { onClick } = this.props;
    const {
      top: canvasTop,
      left: canvasLeft
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    const _x = event.clientX - canvasLeft;
    const _y = event.clientY - canvasTop;
    for (let index = 0; index < this._sectorArr.length; index++) {
      const sector = this._sectorArr[index];
      if (this._ctx.isPointInPath(sector.sectorPath, _x, _y)) {
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        onClick({ curIndex: index, curSector: sector });
        break;
      }
    }
  };

  // 渲染选中区域
  _renderSelected = selectedIndex => {
    for (let index = 0; index < this._sectorArr.length; index++) {
      const sector = this._sectorArr[index];
      sector.hovered = false;
      sector.selected = selectedIndex === index;
      sector.sectorPath = this._createSectorPath(sector); // 扇形区域
    }
    this._drawSector(); // 重绘
  };

  _createSectorPath = sector => {
    const {
      x,
      y,
      originRadius,
      startAngle,
      endAngle,
      selected,
      hovered
    } = sector;
    const _path2D = new Path2D(); // 路径
    const _isHighLight = selected || hovered; // 是否高亮
    const _radius = _isHighLight ? originRadius * 1.08 : originRadius; // 半径
    _path2D.arc(x, y, _radius, startAngle, endAngle); // 该扇形区间的面积
    _path2D.lineTo(x, y); // 回到圆心
    return _path2D;
  };

  _drawSector = () => {
    this._ctx.clearRect(
      0,
      this._chartBottom - this._chartH,
      this._chartW,
      this._chartH
    ); // 清空绘图区
    for (let sector of this._sectorArr) {
      const _isHighLight = sector.selected || sector.hovered; // 是否高亮
      const _highlightColor = `hsla(${sector.hue}, ${sector.saturation *
        1.2}%, ${sector.lightness * 1.2}%, 1)`;
      const _originColor = `hsla(${sector.hue}, ${sector.saturation}%, ${
        sector.lightness
      }%, 1)`;
      const _color = _isHighLight ? _highlightColor : _originColor; // 设置颜色是否高亮
      this._ctx.save();
      // 绘制指示线
      this._ctx.strokeStyle = _originColor;
      this._ctx.stroke(sector.indicator);
      // 绘制扇形
      this._ctx.fillStyle = _color;
      this._ctx.fill(sector.sectorPath);
      // 绘制文字
      // this._ctx.fillStyle = _originColor;
      this._ctx.font = `${8}px '微软雅黑'`; // fontSize
      this._ctx.textAlign = sector.textAlign;
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(sector.label, ...sector.textStart);
      this._ctx.restore();
    }
  };
}

const goldenRatio = 0.62;
