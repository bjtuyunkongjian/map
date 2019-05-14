/**
 * @author 郝义红
 * @description 折线图组件
 */

import React, { Component } from 'react';
import { ResolveBlurry, DrawRoundRect } from 'tuyun-utils';
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
    // 横坐标
    xAxis: [
      '2017-01-02 至 2017-01-03',
      '2017-01-03 至 2017-01-04',
      '2017-01-04 至 2017-01-05',
      '2017-01-05 至 2017-01-06'
    ],
    // 数据
    series: [
      { name: '全部案件', code: '2', data: [44, 95, 143, 165] },
      { name: '行政案件', code: '1', data: [32, 36, 89, 75] },
      { name: '刑事案件', code: '0', data: [12, 59, 54, 90] }
    ],
    // 选中的索引
    selectedKey: '', // 根据 key/value 来判断选中的选项
    selectedValue: '1', // 根据 key/value 来判断选中的选项
    onClick: () => {}
  };

  _canvasEl; // canvas 元素

  _ratio = 1; // _ratio 为 canvas 的实际渲染倍率

  _curHeight = 0; // 各个元素的高度
  // canvas 元素距离浏览器顶部和底部的距离
  _canvasW = 0;
  _canvasH = 0;
  // 总的数据
  _totalData = 1;
  _maxData = 1; // 最大值
  // 图例
  _legendArr = [];
  // 坐标数组
  _pointsArr = [];
  // 遮罩数组
  _maskArr = [];
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
    const { series, padding, title, subTitle } = props;
    // 融入默认属性
    Object.assign(padding, Object.assign({}, Padding, padding));
    Object.assign(title, Object.assign({}, Title, title));
    Object.assign(subTitle, Object.assign({}, SubTitle, subTitle));
    // 重置
    this._legendArr = [];
    this._pointsArr = [];
    this._maskArr = [];
    this._curHeight = 0;
    // 计算最大值，预处理 series
    let _max = 1;
    for (let i = 0; i < series.length; i++) {
      const _item = series[i];
      const { data } = _item;
      const _legendItem = Object.assign({}, _item);
      _legendItem.label = _legendItem.name;
      const _color = LineColors[i % LineColors.length];
      _legendItem.color = _color;
      _legendItem.hue = _color[0]; // 色调
      _legendItem.saturation = _color[1]; // 饱和度
      _legendItem.lightness = _color[2]; // 亮度
      const _pointItem = Object.assign({}, _legendItem); // 坐标数组和图例数组一致
      this._legendArr.push(_legendItem); // 图例数组
      this._pointsArr.push(_pointItem); // 坐标数组
      // 计算最大值
      const _itemMax = Math.max(...data);
      _max = Math.max(_max, _itemMax);
      // 生成 _maskArr
      if (i === 0) {
        for (let dataItem of data) {
          this._maskArr.push({
            data: [{ label: _item.name, count: dataItem }]
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
    this._maxData = Math.ceil(_max * 1.05) || 1; // 生成最大值
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
    this._chartBottom = canvasHeight; // 图表底部
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
    const { showLegend, selectedKey, selectedValue } = this.props;
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
      item.selected = item[selectedKey] === selectedValue;
      item.hovered = false;
      item.legend = this._createLegendUnit(item);
    }
    this._curHeight = _curY + _unitH; // 增加当前高度
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
      this._ctx.font = font; // fontSize
      this._ctx.textBaseline = 'middle';
      const _textX = x + legendW + legendMR;
      const _textY = y + height / 2;
      this._ctx.fillText(label, _textX, _textY);
      this._ctx.restore();
    }
  };

  // 绘制折线
  _renderChart = () => {
    this._renderLinePoint();
    this._renderMask();
    this._drawChart();
  };

  _drawChart = () => {
    this._ctx.clearRect(
      0,
      this._curHeight,
      this._canvasW,
      this._canvasH - this._curHeight
    ); // 清空绘图区
    this._renderAxis();
    this._drawLinePoint();
    this._drawMask();
  };

  _renderAxis = () => {
    const _xPath2D = new Path2D(); // x 轴坐标
    _xPath2D.moveTo(pointMargin, this._chartBottom);
    _xPath2D.lineTo(this._canvasW, this._chartBottom);
    // const _yPath2D = new Path2D();
    // _yPath2D.moveTo(pointMargin, this._curHeight);
    // _yPath2D.lineTo(pointMargin, this._chartBottom);
    this._ctx.save();
    this._ctx.strokeStyle = '#000';
    // this._ctx.stroke(_yPath2D);
    this._ctx.stroke(_xPath2D);
    this._ctx.restore();
  };

  _renderLinePoint = () => {
    const { selectedKey, selectedValue } = this.props;
    const _pIntreval =
      (this._canvasW - pointMargin * 2) / (this._maskArr.length - 1); // 相邻两个点之间的距离
    const _chartH = this._canvasH - this._curHeight;
    const _equalSize = _chartH / this._maxData; // 按 _maxData 均分，每一份的大小
    for (let item of this._pointsArr) {
      const { data } = item;
      item.x = [];
      item.y = [];
      item.height = [];
      item.selected = item.selected = item[selectedKey] === selectedValue;
      for (let dataItem of data) {
        const _index = data.indexOf(dataItem);
        item.x.push(_index * _pIntreval + pointMargin);
        const _height = dataItem * _equalSize;
        item.y.push(this._chartBottom - _height); // y 值
        item.height.push(_height); // 高度
      }
      item.linePath = this._createLinePath(item);
      item.pointPath = this._createPointPath(item);
    }
  };

  _createLinePath = unit => {
    const { x, y } = unit;
    const _path2D = new Path2D();
    for (let i = 0; i < x.length; i++) {
      if (i === 0) {
        _path2D.moveTo(x[i], y[i]);
      } else {
        _path2D.lineTo(x[i], y[i]);
      }
    }
    return _path2D;
  };

  _createPointPath = unit => {
    const { x, y, selected, hovered } = unit;
    const _path2D = new Path2D();
    const _isHighLight = selected || hovered; // 是否高亮
    const _radius = _isHighLight ? pointR : pointR / 1.5;
    for (let i = 0; i < x.length; i++) {
      _path2D.moveTo(x[i], y[i]);
      _path2D.arc(x[i], y[i], _radius, 0, 2 * Math.PI);
    }
    return _path2D;
  };

  _drawLinePoint = () => {
    for (let item of this._pointsArr) {
      const {
        linePath,
        hue,
        saturation,
        lightness,
        selected,
        hovered,
        pointPath
      } = item;
      const _isHighLight = selected || hovered; // 是否高亮
      const _highlightColor = this._createHighLight(hue, saturation, lightness);
      const _originColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
      const _color = _isHighLight ? _highlightColor : _originColor; // 设置颜色是否高亮
      const _lineWidth = _isHighLight ? 1.5 : 1;
      this._ctx.save();
      // 绘制圆角矩形
      this._ctx.strokeStyle = _color;
      this._ctx.lineWidth = _lineWidth;
      this._ctx.stroke(linePath);
      if (!_isHighLight) {
        this._ctx.fillStyle = _color;
        this._ctx.fill(pointPath);
      } else {
        this._ctx.strokeStyle = _color;
        this._ctx.stroke(pointPath);
        this._ctx.fillStyle = 'white';
        this._ctx.fill(pointPath);
      }
      this._ctx.restore();
    }
  };

  _renderMask = () => {
    const _chartH = this._canvasH - this._curHeight;
    const _unitWidth =
      (this._canvasW - pointMargin * 2) / (this._maskArr.length - 1) / 2; // 每一小份遮罩的宽度
    for (let item of this._maskArr) {
      const _index = this._maskArr.indexOf(item);
      item.y = this._curHeight;
      item.height = _chartH;
      item.hovered = false;
      if (_index === 0) {
        item.x = pointMargin;
        item.width = _unitWidth;
        item.lineX = item.x;
      } else if (_index === this._maskArr.length - 1) {
        item.x = (_index * 2 - 1) * _unitWidth + pointMargin;
        item.width = _unitWidth;
        item.lineX = item.x + item.width;
      } else {
        item.x = (_index * 2 - 1) * _unitWidth + pointMargin;
        item.width = _unitWidth * 2;
        item.lineX = item.x + item.width / 2;
      }
      item.center = item.x + item.width / 2;
      item.maskPath = this._createMaskUnit(item);
      item.linePath = this._createCenterLine(item);
    }
  };

  _createMaskUnit = unit => {
    const { x, y, width, height } = unit;
    const _path2D = new Path2D(); // 路径
    _path2D.rect(x, y, width, height);
    return _path2D;
  };

  _createCenterLine = unit => {
    const { y, lineX, height } = unit;
    const _path2D = new Path2D(); // 路径
    _path2D.moveTo(lineX, y);
    _path2D.lineTo(lineX, height + y);
    return _path2D;
  };

  _drawMask = () => {
    for (let item of this._maskArr) {
      const { hovered, linePath } = item;
      // 悬浮显示遮罩层
      if (hovered) {
        this._ctx.save();
        // this._ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        // this._ctx.fill(maskPath);
        this._ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this._ctx.stroke(linePath);
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
    for (let unit of this._legendArr) {
      const _index = this._legendArr.indexOf(unit);
      const { legend, selected, hovered } = unit;
      if (this._ctx.isPointInPath(legend, _ratioX, _ratioY)) {
        unit.hovered = true; // 鼠标在该图例区间内
        _cursor = 'pointer';
        // 折线
        this._pointsArr[_index].hovered = true;
        _redrawLegend = true; // 需要重绘
      } else if (hovered && !selected) {
        // 不在该区间内，该区间已扩展并未被选中，取消悬浮
        unit.hovered = false; // 没有扩展
        // 折线
        this._pointsArr[_index].hovered = false;
        _redrawLegend = true; // 需要重绘
      }
    }
    if (_redrawLegend) {
      this._drawLegend();
      this._drawChart();
    }
    // 悬浮在折线区域
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
        _promptBottom = canvasHeight + padding.bottom - _y; // (padding.top + this._chartH + padding.bottom) - (_y + padding.top)
      } else {
        maskItem.hovered = false; // 扩展
        _redrawMask = true;
      }
    }
    const { xAxis } = this.props;
    const _label = xAxis[this._maskArr.indexOf(_curMask)];
    _curMask.label = _label;
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
    _redrawMask && this._drawChart();
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
    for (let index = 0; index < this._legendArr.length; index++) {
      const unit = this._legendArr[index];
      if (this._ctx.isPointInPath(unit.legend, _ratioX, _ratioY)) {
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
        this._pointsArr[_index].hovered = false;
        _redrawLegend = true;
      }
    }
    if (_redrawLegend) {
      this._drawLegend();
      this._drawChart();
    }
    for (let maskItem of this._maskArr) {
      if (maskItem.hovered) {
        maskItem.hovered = false;
        _redrawMask = true;
      }
    }
    if (_redrawMask) {
      this._drawChart();
      this.setState({ showPrompt: false });
    }
    this._canvasEl.style.cursor = 'default'; // 将鼠标变为默认
  };

  _createHighLight = (hue, saturation, lightness) =>
    `hsla(${hue}, ${saturation * 12}%, ${lightness * 1.2}%, 1)`;
}

const goldenRatio = 0.62;
const pointR = 3;
const pointMargin = pointR + 1; // + 1 像素是圆圈的线宽
