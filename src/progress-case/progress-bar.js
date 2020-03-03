/**
 * @author sl204984
 * @description 进度条显示部分
 */

import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import { GlobalEvent, GloEventName, CreateUid, FormatDate } from 'tuyun-utils';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Event, { EventName } from './event';
import { GetProgressData } from './webapi';
import {
  AddHeatMapLayer,
  RemoveLayer,
  CaseLayerId,
  CaseLayerLightId
} from './layer-control';

export default class ProgressBar extends Component {
  state = {
    isPlay: false,
    curPlayIndex: 0, // 当前播放帧的索引
    showDetailBox: false,
    detailBoxLeft: 0,
    hoverDate: '',
    caseType: '' // 案件类型 0：刑事 1：行政 2：全部
  };

  _totalTime = 1; // 总的播放时间
  _dateInterval = 1; // 划分的时间间隔
  _dateList = []; // 用来存储天数
  _dateMap = {}; // 用来存储加载的天数，加载后端的数据
  _intervalHandle; // 定时器函数句柄
  _fps = 1; // 每秒播放的帧数
  _isLoading = false; // 是否正在加载
  _pauseFrame = -1; // 暂停的那帧
  _uuid = -1; // 动作唯一标识符
  _startMilliSec = 0; // 开始时间
  _endMilliSec = 0; // 结束时间
  // 条形元素
  _progressBar;

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const {
      showDetailBox,
      curPlayIndex,
      detailBoxLeft,
      hoverDate,
      caseType,
      isPlay
    } = this.state;
    if (!caseType) return null;
    const _percent = (curPlayIndex / (this._dateList.length || 1)) * 100;
    const _curDate = this._dateList[curPlayIndex];
    return (
      <div
        className="progress-bar"
        ref={el => (this._progressBar = el)}
        onMouseMove={this._onMouseMove}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <div className="total-time">
          <div className="expired-time" style={{ width: _percent + '%' }} />
        </div>

        <div
          className="detail-box"
          style={{ left: _percent + '%' }}
          onClick={e => e.stopPropagation()}
          onMouseMove={e => e.stopPropagation()}
        >
          <div className="detail-inner">
            {!isPlay ? (
              <MdKeyboardArrowLeft onClick={this._goToPrevFrame} />
            ) : null}
            <div className="detail-text">{_curDate}</div>
            {!isPlay ? (
              <MdKeyboardArrowRight onClick={this._goToNextFrame} />
            ) : null}
          </div>
        </div>

        {showDetailBox ? (
          <div
            className="detail-box"
            style={{ left: detailBoxLeft + 'px' }}
            // onClick={e => e.stopPropagation()}
            onMouseMove={e => e.stopPropagation()}
          >
            <div className="detail-inner">
              <div className="detail-text">{hoverDate}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  _init = () => {
    _MAP_.on('moveend', this._dealWithMoveEnd); // 移动结束后重新加载
  };

  _dealWithEvent = () => {
    const { changeSelectedCaseTendency, changeCaseDate } = GloEventName;
    GlobalEvent.on(changeCaseDate, this._changeCaseDate);
    GlobalEvent.on(changeSelectedCaseTendency, this._changeCaseType);
    Event.on(EventName.togglePlay, this._togglePlay);
    Event.on(EventName.changeSettingsSpeed, this._onChangeFps);
  };

  _changeCaseDate = async param => {
    // 重新开始播放
    Event.emit(EventName.togglePlay, false);
    await this.setState({ curPlayIndex: 0 });
    RemoveLayer(_MAP_, CaseLayerId);
    RemoveLayer(_MAP_, CaseLayerLightId);
    const {
      endYear,
      endMonth,
      endDate,
      startYear,
      startMonth,
      startDate
    } = param;
    this._endMilliSec = new Date(endYear, endMonth, endDate).getTime();
    this._startMilliSec = new Date(startYear, startMonth, startDate).getTime();
    const _totalDays =
      (this._endMilliSec - this._startMilliSec) / dateMilliSecs;
    const _totalLen = Math.ceil(_totalDays / this._dateInterval);
    this._dateList = [];
    for (let i = 0; i <= _totalLen; i++) {
      const _startDate = i * this._dateInterval + startDate;
      const _date = new Date(startYear, startMonth, _startDate);
      if (_date.getTime() > this._endMilliSec) {
        this._dateList.push(
          FormatDate(new Date(endYear, endMonth, endDate), fmtType)
        );
      } else {
        this._dateList.push(FormatDate(_date, fmtType));
      }
    }
    this._totalTime = this._dateList.length / this._fps; // 总共需要花的时间长度
    Event.emit(EventName.changeTotalTime, this._totalTime);
    this._dateMap = {}; // 清空 _dateMap
    this._fetchProgressData(); // 显示进度条就开始加载数据
  };

  _changeCaseType = async caseType => {
    // 重新开始播放
    Event.emit(EventName.togglePlay, false);
    await this.setState({ caseType, curPlayIndex: 0 });
    RemoveLayer(_MAP_, CaseLayerId);
    RemoveLayer(_MAP_, CaseLayerLightId);
    this._fetchProgressData();
  };

  _togglePlay = isPlay => {
    if (isPlay) {
      const { curPlayIndex } = this.state;
      if (curPlayIndex >= this._dateList.length - 1) {
        this.setState({ isPlay, curPlayIndex: 0 });
      } else {
        this.setState({ isPlay });
      }
      this._intervalHandle = setInterval(
        this._dealWithInterval,
        1000 / this._fps
      ); // 按帧播放，一秒播放多少帧
    } else {
      this.setState({ isPlay });
      clearInterval(this._intervalHandle);
    }
  };

  _onChangeFps = ({ fps }) => {
    const { isPlay } = this.state;
    this._fps = fps;
    this._totalTime = this._dateList.length / this._fps; // 总共需要花的时间长度
    if (isPlay) {
      clearInterval(this._intervalHandle);
      this._intervalHandle = setInterval(
        this._dealWithInterval,
        1000 / this._fps
      );
    }
    Event.emit(EventName.changeTotalTime, this._totalTime);
  };

  _dealWithMoveEnd = () => {
    this._dateMap = {}; // 清空已加载的数据
    const { isPlay, curPlayIndex } = this.state;
    this._fetchProgressData(); // 重新加载数据
    if (!isPlay && curPlayIndex !== 0) {
      this._renderFrame();
    }
  };

  _dealWithInterval = () => {
    const { curPlayIndex } = this.state;
    if (!this._renderFrame()) return; // 如果当前无可渲染数据，返回
    const _nextPlayIndex = curPlayIndex + 1;
    if (_nextPlayIndex >= this._dateList.length) {
      Event.emit(EventName.togglePlay, false);
      this.setState({ curPlayIndex: this._dateList.length });
      Event.emit(EventName.changeExpiredTime, this._totalTime);
    } else {
      this.setState({ curPlayIndex: _nextPlayIndex });
      const _expiredPercentage = _nextPlayIndex / this._dateList.length;
      const _expiredTime = this._totalTime * _expiredPercentage;
      Event.emit(EventName.changeExpiredTime, _expiredTime);
    }
  };

  _renderFrame = () => {
    const { curPlayIndex } = this.state;
    const _curDate = this._dateList[curPlayIndex];
    if (!_curDate) return false; // 如果超出范围，直接返回
    const _curArr = this._dateMap[_curDate];
    if (!_curArr) {
      // TODO 清空定时器，显示 loading组件，加载数据
      clearInterval(this._intervalHandle); // 清空定时器
      this._pauseFrame = _curDate; // 暂停帧
      this._isLoading = true; // 当前为加载状态
      GlobalEvent.emit(GloEventName.showGlobalLoading);
      return false;
    } else {
      // TODO 渲染对应图层
      const _features = _curArr.map(item => {
        return TurfPoint([item.x, item.y]); // 生成点数据
      });
      const _geoJSONData = {
        type: 'geojson',
        data: FeatureCollection(_features)
      };
      AddHeatMapLayer(_MAP_, _geoJSONData);
      // 渲染前一帧数据
      // const _zoom = _MAP_.getZoom();
      // _zoom >= 10 &&
      this._renderPrevFrame(); // 层级大于 10 时渲染前一帧数据
    }
    return true;
  };

  _renderPrevFrame = () => {
    const { curPlayIndex } = this.state;
    const _preDate = this._dateList[curPlayIndex - 1];
    const _preArr = this._dateMap[_preDate];
    if (!_preArr) return; // 没有前一帧数据，返回
    const _features = _preArr.map(item => {
      return TurfPoint([item.x, item.y]); // 生成点数据
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddHeatMapLayer(_MAP_, _geoJSONData, true);
  };

  _onMouseMove = e => {
    e.stopPropagation();
    const { left, width } = this._progressBar.getBoundingClientRect();
    const _detailBoxLeft = e.clientX - left;
    const _curIndex = Math.round(
      (_detailBoxLeft / width) * this._dateList.length
    );
    this.setState({
      showDetailBox: true,
      detailBoxLeft: _detailBoxLeft,
      hoverDate: this._dateList[_curIndex]
    });
  };

  _onMouseLeave = () => {
    this.setState({ showDetailBox: false });
  };

  _onClick = async e => {
    e.stopPropagation();
    const { detailBoxLeft, isPlay } = this.state;
    const { width } = this._progressBar.getBoundingClientRect();
    const _curIndex = (detailBoxLeft / width) * this._dateList.length;
    await this.setState({ curPlayIndex: Math.round(_curIndex) });
    if (!isPlay) {
      this._renderFrame();
    }
  };

  _goToPrevFrame = async e => {
    e.stopPropagation();
    const { curPlayIndex, isPlay } = this.state;
    if (!isPlay) {
      const _nextPlayIndex =
        curPlayIndex - 1 < 0 ? this._dateList.length - 1 : curPlayIndex - 1;
      await this.setState({ curPlayIndex: _nextPlayIndex });
      this._renderFrame();
    }
  };

  _goToNextFrame = async e => {
    e.stopPropagation();
    const { curPlayIndex, isPlay } = this.state;
    if (!isPlay) {
      const _nextPlayIndex =
        curPlayIndex + 1 > this._dateList.length - 1 ? 0 : curPlayIndex + 1;
      await this.setState({ curPlayIndex: _nextPlayIndex });
      this._renderFrame();
    }
  };

  _fetchProgressData = async () => {
    const { caseType } = this.state;
    if (!caseType) return;
    const _uuid = (this._uuid = CreateUid());
    const _zoom = _MAP_.getZoom();
    const _bounds = _MAP_.getBounds();
    const _unitDateArr = [];
    const _unitCount = Math.ceil(this._dateList.length / reqArrLen); // 不满一次算一次
    for (let i = 0; i < _unitCount; i++) {
      const _start = i * reqArrLen;
      const _end = Math.min(_start + reqArrLen, this._dateList.length); // 取最小值
      const _unitDate = this._dateList.slice(_start, _end);
      _unitDateArr.push(_unitDate);
    }
    // 循环请求
    // minX=&maxX=&minY=&maxY=&startTime=&endTime=&intervals=&type=
    for (let item of _unitDateArr) {
      // const _dateArr = this._convertDateList(item);
      const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
        _bounds._sw.lat
      }&maxY=${_bounds._ne.lat}&startTime=${item[0]}&endTime=${
        item[item.length - 1]
      }&intervals=${item.length}&type=${caseType}&level=${_zoom}`;
      const { res, err } = await GetProgressData(_param);

      if (!res || err) continue;
      if (_uuid !== this._uuid) return; // 如果重新请求，终止之前的请求
      Object.assign(this._dateMap, res);
      if (this._isLoading) {
        if (!this._dateMap[this._pauseFrame]) {
          // 不存在当前帧的数据，更改加载顺序
          const _curLoadInd = _unitDateArr.indexOf(item);
          const _swapCount = this._computeSwapParam(_unitDateArr, _curLoadInd);
          if (!_swapCount) continue; // 不存在交换参数或者交换参数为 0，结束本次循环
          const _temp = _unitDateArr.splice(_curLoadInd + 1, _swapCount);
          _unitDateArr.push(..._temp);
        } else {
          // 存在当前帧的数据，取消加载，继续播放
          this._continueRendering();
        }
      }
    }
  };

  // 计算交换参数，swapArr 是要交换的数组，curLoadInd 是当前的索引
  _computeSwapParam = (swapArr, curLoadInd) => {
    if (curLoadInd < 0 || curLoadInd > swapArr.length - 1) return false;
    // 循环找出当前停止帧
    for (let index = 0; index < swapArr.length; index++) {
      const _unit = swapArr[index];
      // 存在当前停止帧的时间
      if (_unit.indexOf(this._pauseFrame) > -1) {
        if (curLoadInd < index) return index - curLoadInd - 1;
        // 如果当前停止帧大于
        else return false;
      }
    }
  };

  _continueRendering = () => {
    this._isLoading = false; // 取消加载
    GlobalEvent.emit(GloEventName.closeGlobalLoading); // 关闭弹窗
    const { isPlay } = this.state;
    if (isPlay) {
      this._intervalHandle = setInterval(
        this._dealWithInterval,
        1000 / this._fps
      ); // 如果正在播放，继续播放
    } else {
      this._renderFrame(); // 如果暂停状态，播放该帧
    }
  };

  _convertDateList = (dateList = []) => {
    const _dateArr = [];
    for (let i = 0; i < dateList.length; i++) {
      const _start = dateList[i];
      const _startMilliSec = new Date(_start).getTime();
      const _endMilliSec = Math.min(
        _startMilliSec + 86400000 * this._dateInterval,
        this._endMilliSec
      );
      const _endDate = new Date(_endMilliSec); // 86400000 是一天的毫秒数
      const _end = FormatDate(_endDate, fmtType);
      if (_start !== _end) {
        _dateArr.push({ start: _start, end: _end });
      }
    }
    return _dateArr;
  };
}

const reqArrLen = 30; // 每次请求的分段数量
const dateMilliSecs = 24 * 3600 * 1000; // 一天的毫秒数
const fmtType = 'xxxx-xx-xx';
