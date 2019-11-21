import React, { Component } from 'react';
import { ResolveBlurry, DrawRoundRect } from 'tuyun-utils';
import {
  Padding,
  Title,
  SubTitle,
  PromptWidth,
  PromptGap,
  BarColors
} from './style-options';
import Prompt from './prompt';

export default class ChartsMultiBar extends Component {
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
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    padding: Padding,
    title: Title,
    // 图例，说明
    subTitle: SubTitle,
    // 图例
    showLegend: true,
    // 横坐标，必传
    xAxis: [
      { name: '全部', code: '2' },
      { name: '刑事', code: '0' },
      { name: '行政', code: '1' },
      { name: '其他', code: '9' }
    ],
    showXAxisText: true,
    // 数据，必传
    series: [
      { name: '系列1', code: 'x1', data: [44, 95, 143, 15] },
      { name: '系列2', code: 'x2', data: [32, 36, 89, 13] }
    ],
    // 选中的索引
    selectedKey: '', // 根据 key/value 来判断选中的选项，必传
    selectedValue: '1', // 根据 key/value 来判断选中的选项
    dutyRatio: 0.6, // 占空比，每个单元内图像宽度占整个宽度的面积
    basePercent: 0.02,
    hslColorArr: [],
    onClick: () => {}
  };

  _canvasEl; // canvas 元素

  _ratio = 1; // _ratio 为 canvas 的实际渲染倍率

  _curHeight = 0; // 当前位置的高度
  // canvas 元素距离浏览器顶部和底部的距离
  _canvasW = 0;
  _canvasH = 0;
  _chartH = 0;
  // 总的数据
  _maxData = 1; // 最大值
  // 图例
  _legendArr = [];
  // 条状数组
  _barsArr = [];
  // 遮罩数组
  _maskArr = [];
  // 图表属性
  _chartBottom = 0;
  _xAxisH = 0;

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
    const { xAxis, series, padding, title, subTitle, hslColorArr } = props;
    // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(subTitle, Object.assign({}, SubTitle, subTitle));
    // 重置
    this._legendArr = [];
    this._barsArr = [];
    this._maskArr = [];
    this._curHeight = 0;
    // 预处理坐标轴
    for (let item of xAxis) {
      item.label = item.name;
    }
    // 计算最大值，预处理 series
    let _max = 1;
    for (let i = 0; i < series.length; i++) {
      const _item = series[i];
      const { data } = _item;
      const _legendItem = Object.assign({}, _item);
      _legendItem.label = _legendItem.name;
      const _color = hslColorArr[i] || BarColors[i % BarColors.length];
      _legendItem.color = _color;
      _legendItem.hue = _color[0]; // 色调
      _legendItem.saturation = _color[1]; // 饱和度
      _legendItem.lightness = _color[2]; // 亮度
      const _barItem = Object.assign({}, _legendItem); // 坐标数组和图例数组一致
      this._legendArr.push(_legendItem); // 图例数组
      this._barsArr.push(_barItem); // 坐标数组
      // 计算最大值
      const _itemMax = Math.max(...data);
      _max = Math.max(_max, _itemMax);
      // 生成 _maskArr
      if (i === 0) {
        for (let i = 0; i < data.length; i++) {
          this._maskArr.push({
            cellInfo: xAxis[i],
            data: [{ label: _item.name, count: data[i] }]
          });
        }
      } else {
        for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
          const _dataItem = data[dataIndex];
          this._maskArr[dataIndex].data.push({
            label: _item.name,
            count: _dataItem
          });
        }
      }
    }
    this._maxData = _max; // 生成最大值
  };

  _renderCanvas = () => {
    if (!this._canvasEl) return;
    const {
      width: canvasWidth,
      height: canvasHeight
    } = this._canvasEl.getBoundingClientRect(); // 获取 canvas 元素的宽和高
    this._ctx = this._canvasEl.getContext('2d'); // 赋值
    this._ratio = ResolveBlurry(this._canvasEl, this._ctx, {
      width: canvasWidth,
      height: canvasHeight
    }); // 解决高倍屏变模糊问题
    this._ctx.scale(this._ratio, this._ratio); // _ratio 为 canvas 的实际渲染倍率
    this._canvasW = canvasWidth; // canvas 宽度
    this._canvasH = canvasHeight; // canvas 高度
    this._chartBottom = canvasHeight - pointMargin; // 图表底部
    this._renderTitle(); // 绘制标题
    this._renderSubTitle(); // 绘制标注
    this._renderLegend(); // 绘制图例
    this._renderChart(); // 绘制折线
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
    this._ctx.textBaseline = 'middle'; // 文字是按中线对齐
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
    const { showLegend } = this.props;
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
    for (let item of this._legendArr) {
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
      // 计算 legend 小方块各个属性
      item.legendX = item.x;
      item.legendY = item.y + (item.height - item.legendH) / 2;
      item.legendCenter = {
        x: item.legendX + item.legendW / 2,
        y: item.legendY + item.legendH / 2
      };
      // 计算悬浮和选中属性
      item.hovered = false;
      // 计算
      item.backRect = this._createLegendBackRect(item); // 绘制 一块元素对应的背景，方便点击和悬浮
      item.legend = this._createLegendUnit(item); // 圆角矩形
    }
    const _marginBottom = 10; // _marginBottom 是图例和charts之间的间隔
    this._curHeight = _curY + _unitH + _marginBottom; // 增加当前高度
    this._ctx.restore();
    this._drawLegend();
  };

  _createLegendBackRect = unit => {
    const { x, y, width, height } = unit;
    const _path2D = new Path2D(); // 路径
    _path2D.rect(x, y, width, height);
    return _path2D;
  };

  _createLegendUnit = unit => {
    const { legendX, legendY, legendW, legendH, legendRadius } = unit;
    const _path2D = new Path2D(); // 路径
    DrawRoundRect(_path2D, {
      x: legendX,
      y: legendY,
      width: legendW,
      height: legendH,
      r: legendRadius,
      fill: true
    });
    return _path2D;
  };

  _drawLegend = () => {
    for (let unit of this._legendArr) {
      const {
        selected,
        hovered,
        hue,
        saturation,
        lightness,
        legend,
        font,
        x,
        y,
        legendW,
        legendMR,
        width,
        height,
        label
      } = unit;
      this._ctx.clearRect(x, y, width, height); // 清空绘图区
      const _isHighLight = selected || hovered; // 是否高亮
      const _highlightColor = this._createHighLight(hue, saturation, lightness);
      const _originColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
      const _color = _isHighLight ? _highlightColor : _originColor; // 设置颜色是否高亮
      this._ctx.save();
      // 绘制圆角矩形
      this._ctx.fillStyle = _color;
      this._ctx.fill(legend);
      // 绘制文字
      this._ctx.fillStyle = _color;
      this._ctx.font = font; // fontSize
      this._ctx.textBaseline = 'middle';
      const _textX = x + legendW + legendMR;
      const _textY = y + height / 2;
      this._ctx.fillText(label, _textX, _textY);
      this._ctx.restore();
    }
  };

  // 绘制条形图
  _renderChart = () => {
    this._ctx.clearRect(
      0,
      this._curHeight,
      this._canvasW,
      this._canvasH - this._curHeight
    ); // 清空绘图区
    this._drawAxis(); // 坐标轴
    this._renderBarCell();
    this._drawBarCell(); // 条块
    this._renderMask();
    this._drawMask(); // 遮罩层
  };

  _redrawChart = () => {
    this._ctx.clearRect(
      0,
      this._curHeight,
      this._canvasW,
      this._canvasH - this._curHeight
    ); // 清空绘图区
    this._drawAxis(); // 坐标轴
    this._drawBarCell(); // 条块
    this._drawMask(); // 遮罩层
  };

  _drawAxis = () => {
    const { showXAxisText } = this.props;
    const _textFont = showXAxisText ? 10 : 0;
    this._xAxisH = _textFont / goldenRatio;
    // 绘制坐标轴
    const _xPath2D = new Path2D(); // x 轴坐标
    const _xAxisTop = this._chartBottom - this._xAxisH;
    _xPath2D.moveTo(0, _xAxisTop);
    _xPath2D.lineTo(this._canvasW, _xAxisTop);
    const _yPath2D = new Path2D(); // y 轴坐标
    _yPath2D.moveTo(0, this._curHeight);
    _yPath2D.lineTo(0, _xAxisTop);
    this._ctx.save(); // 绘制 x 轴， y 轴
    this._ctx.strokeWidth = 1; // 线条宽度
    this._xAxisH += this._ctx.strokeWidth; // x 轴线条的宽度
    this._ctx.strokeStyle = '#000';
    this._ctx.stroke(_yPath2D);
    this._ctx.stroke(_xPath2D);
    this._ctx.restore();
    // 绘制水平线
    const _lineCount = 3; // 水平线条数
    const _chartH = _xAxisTop - this._curHeight;
    const _equalheight = (_chartH - 1) / _lineCount; // 等分的高度，减去 1 是重绘时清空绘图区有一条线清除不了
    for (let i = 1; i <= _lineCount; i++) {
      const _y = _xAxisTop - _equalheight * i;
      this._ctx.save();
      const _path2D = new Path2D();
      _path2D.moveTo(0, _y);
      _path2D.lineTo(this._canvasW, _y);
      this._ctx.strokeStyle = hintColor;
      this._ctx.stroke(_path2D);
      this._ctx.restore();
    }
    // 绘制文字
    if (!showXAxisText) return;
    const { xAxis } = this.props;
    this._ctx.save();
    this._ctx.font = _textFont; // fontSize
    this._ctx.fillStyle = 'black';
    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'middle';
    const _cellWidth = this._canvasW / xAxis.length;
    const _textMiddle = _xAxisTop + this._xAxisH / 2;
    for (let item of xAxis) {
      const _ind = xAxis.indexOf(item);
      const _textCenter = (_ind + 0.5) * _cellWidth;
      this._ctx.fillText(item.label, _textCenter, _textMiddle);
    }
    this._ctx.restore();
  };

  _renderBarCell = () => {
    const {
      selectedKey,
      selectedValue,
      dutyRatio,
      series,
      basePercent
    } = this.props;
    const _cellWidth = this._canvasW / this._maskArr.length;
    const _barWidth = (_cellWidth * dutyRatio) / series.length;
    const _barLeft = (_cellWidth * (1 - dutyRatio)) / 2;
    const _chartH = this._chartBottom - this._xAxisH - this._curHeight;
    this._chartH = _chartH;
    const _maxData = Math.ceil(this._maxData * 1.1) || 1; // 最大值，不能为零
    const _equalSize = _chartH / _maxData;
    const _baseH = _maxData * basePercent * _equalSize;
    // 相同条状相同颜色
    for (let item of this._barsArr) {
      const _ind = this._barsArr.indexOf(item);
      const { data } = item;
      item.dutyRatio = dutyRatio;
      item.x = [];
      item.y = [];
      item.width = _barWidth;
      item.height = [];
      item.selected = item[selectedKey] === selectedValue;
      for (let dataInd = 0; dataInd < data.length; dataInd++) {
        const _val = data[dataInd];
        item.x.push(_ind * _barWidth + _barLeft + dataInd * _cellWidth);
        const _height = _val * _equalSize;
        const _viewH = _height === 0 ? 0 : Math.max(_baseH, _height);
        item.y.push(this._curHeight + _chartH - _viewH);
        item.height.push(_viewH);
      }
      // 生成路径
      item.barPath = this._createBarPath(item);
    }
  };

  _createBarPath = unit => {
    const { x, y, width, height } = unit;
    const _path2D = new Path2D();
    for (let i = 0; i < x.length; i++) {
      _path2D.moveTo(x[i], y[i]);
      _path2D.rect(x[i], y[i], width, height[i]);
    }
    return _path2D;
  };

  _drawBarCell = () => {
    for (let item of this._barsArr) {
      const { barPath, hue, saturation, lightness, selected, hovered } = item;
      const _isHighLight = selected || hovered; // 是否高亮
      const _highlightColor = this._createHighLight(hue, saturation, lightness);
      const _originColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
      const _color = _isHighLight ? _highlightColor : _originColor; // 设置颜色是否高亮
      this._ctx.save();
      // 绘制圆角矩形
      this._ctx.fillStyle = _color;
      this._ctx.fill(barPath);
      this._ctx.restore();
    }
  };

  _renderMask = () => {
    const { selectedKey, selectedValue } = this.props;
    const _chartH = this._canvasH - this._curHeight;
    this._chartH = _chartH;
    const _cellWidth = this._canvasW / this._maskArr.length; // 每一小份遮罩的宽度
    for (let item of this._maskArr) {
      const _index = this._maskArr.indexOf(item);
      item.x = _index * _cellWidth;
      item.y = this._curHeight;
      item.width = _cellWidth;
      item.height = _chartH;
      item.hovered = false;
      if (selectedKey) {
        item.selected = item.cellInfo[selectedKey] === selectedValue;
      } else {
        item.selected = false;
      }
      item.maskPath = this._createMaskUnit(item);
    }
  };

  _createMaskUnit = unit => {
    const { x, y, width, height } = unit;
    const _path2D = new Path2D(); // 路径
    _path2D.rect(x, y, width, height);
    return _path2D;
  };

  _drawMask = () => {
    for (let item of this._maskArr) {
      const { hovered, maskPath, selected } = item;
      // 悬浮显示遮罩层
      if (hovered || selected) {
        this._ctx.save();
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this._ctx.fill(maskPath);
        this._ctx.restore();
      }
    }
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
    let _redrawLegend = false; // 需不需要重渲染
    let _cursor = 'default';
    // 悬浮在图例区域
    for (let unit of this._legendArr) {
      const _index = this._legendArr.indexOf(unit);
      const { backRect, selected, hovered } = unit;
      if (!backRect) break;
      if (this._ctx.isPointInPath(backRect, _ratioX, _ratioY)) {
        unit.hovered = true; // 鼠标在该图例区间内
        _cursor = 'pointer';
        // 折线
        this._barsArr[_index].hovered = true;
        _redrawLegend = true; // 需要重绘
      } else if (hovered && !selected) {
        // 不在该区间内，该区间已扩展并未被选中，取消悬浮
        unit.hovered = false; // 没有扩展
        // 折线
        this._barsArr[_index].hovered = false;
        _redrawLegend = true; // 需要重绘
      }
    }
    if (_redrawLegend) {
      this._drawLegend();
      this._redrawChart();
      return;
    }
    // 悬浮在条形图区域
    let _redrawMask = false;
    let _showPrompt = false; // 显示提示框
    let _curMask = {}; // 当前遮罩
    let _isLeft = false; // 提示框是否在左边
    let _promptLeft = 0; // 提示框距离左边的距离
    let _promptRight = 0; // 提示框距离有变动距离
    let _isTop = false; // 鼠标是否在图表的上半部分
    let _promptTop = 0; // 提示框距离上边的距离
    let _promptBottom = 0; // 提示框距离底部
    for (let maskItem of this._maskArr) {
      const { maskPath, hovered } = maskItem;
      if (this._ctx.isPointInPath(maskPath, _ratioX, _ratioY)) {
        if (!hovered) {
          // 鼠标在该区域内，并且该区域未做扩展
          maskItem.hovered = true; // 扩展
          _redrawMask = true; // 需要重绘
        }
        _cursor = 'pointer'; // 鼠标类型
        const { padding } = this.props;
        _showPrompt = true; // 显示提示框
        _curMask = maskItem; // 当前所在区间的对应点信息
        _isLeft = _x < canvasWidth + padding.right - PromptWidth - PromptGap;
        _promptLeft = _x + padding.left + PromptGap;
        _promptRight = canvasWidth + padding.right - _x + PromptGap;
        _isTop = _y < canvasHeight - this._chartH / 2;
        _promptTop = _y + padding.top;
        _promptBottom = canvasHeight + padding.bottom - _y;
      } else {
        maskItem.hovered = false; // 扩展
        _redrawMask = true;
      }
    }
    const { xAxis } = this.props;
    const _xInfo = xAxis[this._maskArr.indexOf(_curMask)];
    _curMask.label = _xInfo ? _xInfo._label : '';
    this.setState({
      showPrompt: _showPrompt,
      curCell: _curMask,
      isLeft: _isLeft,
      promptLeft: _promptLeft,
      promptRight: _promptRight,
      isTop: _isTop,
      promptTop: _promptTop,
      promptBottom: _promptBottom
    });
    this._canvasEl.style.cursor = _cursor;
    _redrawMask && this._redrawChart();
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
    for (let index = 0; index < this._maskArr.length; index++) {
      const unit = this._maskArr[index];
      if (this._ctx.isPointInPath(unit.maskPath, _ratioX, _ratioY)) {
        // 计算提示框信息，prompt 是相对 canvas 父元素定位，要计算 padding
        onClick({ curIndex: index, curSeries: unit });
        break;
      }
    }
  };

  // 防止鼠标移动过快未检测到在 _canvasEl 元素上移动的过程
  _onMouseLeave = () => {
    let _redrawLegend = false; // 需要重绘图例
    let _redrawMask = false; // 需要重绘遮罩
    for (let unit of this._legendArr) {
      const _index = this._legendArr.indexOf(unit);
      if (!unit.selected && unit.hovered) {
        unit.hovered = false;
        this._barsArr[_index].hovered = false;
        _redrawLegend = true;
      }
    }
    if (_redrawLegend) {
      this._drawLegend();
      this._redrawChart();
    }
    for (let maskItem of this._maskArr) {
      if (maskItem.hovered) {
        maskItem.hovered = false;
        _redrawMask = true;
      }
    }
    if (_redrawMask) {
      this._redrawChart();
      this.setState({ showPrompt: false });
    }
    this._canvasEl.style.cursor = 'default'; // 将鼠标变为默认
  };

  _createHighLight = (hue, saturation, lightness) =>
    `hsla(${hue}, ${saturation * 12}%, ${lightness / 1.2}%, 1)`;
}

const goldenRatio = 0.62; // 黄金分割率
const pointR = 3; // 圆的半径
const pointMargin = pointR + 1; // + 1 像素是圆圈的线宽
const hintColor = 'rgba(0,0,0,0.3)';
