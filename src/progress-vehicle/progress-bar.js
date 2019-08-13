/**
 * @author sl204984
 * @description 进度条显示部分
 * 设计缺陷：没有设计加载数组，导选中点击进度条中间位置或者进度条在中间位置拖动地图加载等待时间较长
 */

import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import {
  GlobalEvent,
  GloEventName,
  CreateUid,
  FormatDate,
  RemoveLayer,
  LayerIds,
  // AddCircleLayer,
  AddImageLayer
} from 'tuyun-utils';

import Event, { EventName } from './event';
import { FetchProgressData } from './webapi';
import {
  CreateUnitArr,
  ConvertDateList,
  ReqArrLen,
  DateMilliSecs
} from './constant';

export default class ProgressBar extends Component {
  state = {
    isPlay: false,
    curPlayIndex: 0, // 当前播放帧的索引
    showDetailBox: false,
    detailBoxLeft: 0,
    hoverDate: '',
    vehicleTypes: [] // 案件类型 0：刑事 1：行政 2：全部
  };

  _totalTime = 1; // 总的播放时间
  _timeList = []; // 用来存储时间
  _typeDataMap = {}; // 用来存储加载的数据，加载后端的数据 {[type]: {[startTime]: [[lng, lat]]}}
  _intervalHandle; // 定时器函数句柄
  _fps = 6; // 每秒播放的帧数
  _isLoading = false; // 是否正在加载
  _pauseFrame = -1; // 暂停的那帧
  _uuid = -1; // 动作唯一标识符
  _startMilliSec = 0; // 开始时间
  _endMilliSec = 0; // 结束时间
  _realInterval = 48 * 1000; // 每帧对应的实际时间间隔，单位毫秒
  _locationHash = {};
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
      vehicleTypes
    } = this.state;
    if (vehicleTypes.length <= 0) return null;
    const _percent = (curPlayIndex / (this._timeList.length || 1)) * 100;
    return (
      <div
        className="progress-bar"
        ref={el => (this._progressBar = el)}
        onMouseMove={this._onMouseMove}
        onMouseLeave={this._onMouseLeave}
        onClick={this._selectFrame}
      >
        <div className="total-time">
          <div className="expired-time" style={{ width: _percent + '%' }} />
        </div>

        {showDetailBox ? (
          <div
            className="detail-box"
            style={{ left: detailBoxLeft + 'px' }}
            onMouseMove={e => e.stopPropagation()}
          >
            <div className="detail-inner">
              <div className="detail-text">{hoverDate || '无'}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  _init = () => {
    _MAP_.on('moveend', this._dealWithMoveEnd); // 移动结束后重新加载
    this._onChangeFps({ fps: this._fps }); // 12 帧每秒
  };

  _dealWithEvent = () => {
    Event.on(EventName.togglePlay, this._togglePlay);
    const { changeProgressVehicle } = GloEventName;
    GlobalEvent.on(changeProgressVehicle, this._changeVehicleType);
  };

  _changeVehicleType = async ({ vehicleTypes }) => {
    // 重新开始播放
    Event.emit(EventName.togglePlay, false); // 设置播放状态为停止播放
    await this.setState({ vehicleTypes, curPlayIndex: 0 }); // 设置当前播放帧为第0帧
    RemoveLayer(_MAP_, LayerIds.vehicleTypes.point); // 删除图层
    // 重新生成 _typeDataMap
    this._createDateMap();
    if (!vehicleTypes.length) return (this._uuid = -1); // 如果没有 vehicleTypes，通过改变 uuid 来中断请求
    this._changeTime(); // 设置时间
    this._locationHash = window.location.hash;
  };

  _createDateMap = () => {
    const { vehicleTypes } = this.state;
    this._typeDataMap = {}; // 清空 DataMap
    for (let item of vehicleTypes) {
      const { rgb, rgbHex } = item;
      this._typeDataMap[item.type] = {
        rgbHex,
        rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
        rgb1: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`,
        rgb2: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.6)`,
        rgb3: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`,
        rgb4: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.2)`
      };
    }
  };

  _changeTime = () => {
    this._endMilliSec = new Date().getTime();
    this._startMilliSec = new Date(this._endMilliSec - DateMilliSecs).getTime();
    // this._endMilliSec = new Date('2019-07-18 12:30:00').getTime();
    // this._startMilliSec = new Date(
    //   this._endMilliSec - 2 * 3600 * 1000
    // ).getTime();
    const _totalLen = Math.ceil(
      (this._endMilliSec - this._startMilliSec) / this._realInterval
    );

    this._timeList = [];
    for (let i = 0; i <= _totalLen; i++) {
      const _time = i * this._realInterval + this._startMilliSec;
      if (_time > this._endMilliSec) {
        this._timeList.push(FormatDate(this._endMilliSec));
      } else {
        this._timeList.push(FormatDate(_time));
      }
    }
    this._totalTime = (this._timeList.length - 1) / this._fps; // 总共需要花的时间长度
    Event.emit(EventName.changeTotalTime, this._totalTime);
    Event.emit(EventName.changeExpiredTime, 0);
    this._fetchProgressData(); // 显示进度条就开始加载数据
  };

  _togglePlay = isPlay => {
    if (isPlay) {
      const { curPlayIndex } = this.state;
      if (curPlayIndex >= this._timeList.length - 1) {
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
    this._totalTime = this._timeList.length / this._fps; // 总共需要花的时间长度
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
    const _locationHash = window.location.hash;
    if (this._locationHash === _locationHash) return;
    this._locationHash = _locationHash;
    this._createDateMap(); // 清空已加载的数据
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
    if (_nextPlayIndex >= this._timeList.length) {
      Event.emit(EventName.togglePlay, false);
      this.setState({ curPlayIndex: this._timeList.length });
      Event.emit(EventName.changeExpiredTime, this._totalTime);
    } else {
      this.setState({ curPlayIndex: _nextPlayIndex });
      const _expiredPercentage = _nextPlayIndex / this._timeList.length;
      const _expiredTime = this._totalTime * _expiredPercentage;
      Event.emit(EventName.changeExpiredTime, _expiredTime);
    }
  };

  _renderFrame = () => {
    const { curPlayIndex } = this.state;
    const _curTime = this._timeList[curPlayIndex];
    // const _prevTime = [];
    // const _tailCounts = 4;
    // const _maxR = 2;
    // const _minR = 1;
    // for (let i = 0; i < _tailCounts; i++) {
    //   _prevTime.push(this._timeList[curPlayIndex - i - 1]);
    // }
    if (!_curTime) return false; // 如果超出范围，直接返回
    const _mapKeys = Object.keys(this._typeDataMap);
    const _features = [];
    for (let key of _mapKeys) {
      const _dataMap = this._typeDataMap[key];
      const _curArr = _dataMap[_curTime];
      if (!_curArr) {
        clearInterval(this._intervalHandle); // 清空定时器
        this._pauseFrame = _curTime; // 暂停帧
        this._isLoading = true; // 当前为加载状态
        GlobalEvent.emit(GloEventName.showGlobalLoading); // 显示 loading组件
        return false;
      } else {
        for (let coord of _curArr) {
          // if (coord[3] !== 0) console.log(coord);
          if (coord[2] === 0) {
            const _feature = {
              img: 'ic_map_dot_' + _dataMap.rgbHex,
              rotate: 0,
              offset: [0, 0]
            };
            _features.push(TurfPoint(coord, _feature)); // 设置 features
          } else {
            // console.log('coord[3]', coord[3]);
            const _feature = {
              img: 'ic_map_arrow_' + _dataMap.rgbHex,
              rotate: -coord[3],
              offset: [coord[4] * 10, coord[5] * 10]
            };
            _features.push(TurfPoint(coord, _feature)); // 设置 features
          }
        }
        // const _posFeature = {
        //   radius: _maxR,
        //   color: _dataMap.rgb,
        //   strokeWidth: 0
        // }; // 正向的 feature
        // const _negFeature = {
        //   radius: _maxR,
        //   color: 'rgb(255,255,255)',
        //   strokeWidth: 1,
        //   strokeColor: _dataMap.rgb
        // }; // 反向的 feature
        // for (let coord of _curArr) {
        //   if (coord[2] === 1) {
        //     _features.push(TurfPoint(coord, _posFeature)); // 设置 features
        //   } else {
        //     _features.push(TurfPoint(coord, _negFeature)); // 设置 features
        //   }
        // }
        // // 前面的帧
        // _prevTime.map((time, index) => {
        //   if (!time) return;
        //   const _prevArr = _dataMap[time];
        //   const _radius = _maxR - ((_maxR - _minR) / _tailCounts) * (index + 1);
        //   const _posFeature = {
        //     radius: _radius,
        //     color: _dataMap[`rgb${index + 1}`],
        //     strokeWidth: 0
        //   }; // 正向的 feature
        //   const _negFeature = {
        //     radius: _radius,
        //     color: `rgba(255,255,255,${0.8 - 0.2 * index})`,
        //     strokeWidth: 1,
        //     strokeColor: _dataMap[`rgb${index + 1}`]
        //   }; // 反向的 feature
        //   if (_prevArr) {
        //     for (let coord of _prevArr) {
        //       if (coord[2] === 1) {
        //         _features.push(TurfPoint(coord, _posFeature)); // 设置 features
        //       } else {
        //         _features.push(TurfPoint(coord, _negFeature)); // 设置 features
        //       }
        //     }
        //   }
        // });
      }
    }
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { vehicleTypes } = LayerIds;
    // const _opt = {
    //   radius: ['get', 'radius'],
    //   color: ['get', 'color'],
    //   strokeWidth: ['get', 'strokeWidth'],
    //   strokeColor: ['get', 'strokeColor']
    // };
    // AddCircleLayer(_MAP_, _geoJSONData, vehicleTypes.point, _opt); // 渲染对应图层
    const _opt = {
      iconImage: ['get', 'img'],
      iconRotate: ['get', 'rotate'],
      iconSize: 1,
      allowOverlap: true,
      iconOffset: ['get', 'offset']
    };
    AddImageLayer(_MAP_, _geoJSONData, vehicleTypes.point, _opt);
    return true;
  };

  _onMouseMove = e => {
    e.stopPropagation();
    const { left, width } = this._progressBar.getBoundingClientRect();
    const _detailBoxLeft = e.clientX - left;
    const _curIndex = Math.round(
      (_detailBoxLeft / width) * this._timeList.length
    );
    this.setState({
      showDetailBox: true,
      detailBoxLeft: _detailBoxLeft,
      hoverDate: this._timeList[_curIndex]
    });
  };

  _onMouseLeave = () => {
    this.setState({ showDetailBox: false, hoverDate: '' });
  };

  _selectFrame = async e => {
    e.stopPropagation();
    const { detailBoxLeft, isPlay } = this.state;
    const { width } = this._progressBar.getBoundingClientRect();
    const _curIndex = (detailBoxLeft / width) * this._timeList.length;
    await this.setState({ curPlayIndex: Math.round(_curIndex) });
    if (!isPlay) {
      this._renderFrame();
    }
  };

  _fetchProgressData = async () => {
    const { vehicleTypes } = this.state;
    if (vehicleTypes.length <= 0) return;
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _unitArr = CreateUnitArr(this._timeList, ReqArrLen);
    const _type = vehicleTypes.map(item => item.type + '');
    // 循环请求
    for (let item of _unitArr) {
      const _dateArr = ConvertDateList(
        item,
        this._realInterval,
        this._endMilliSec
      );
      const { res, err } = await FetchProgressData({
        points: _bounds,
        dates: _dateArr,
        type: _type,
        uuid: _uuid
      });
      if (!res || err) continue;
      if (_uuid !== this._uuid) return; // 如果重新请求，终止之前的请求
      const _mapKeys = Object.keys(this._typeDataMap);
      for (let key of _mapKeys) {
        Object.assign(this._typeDataMap[key], res[key]);
        if (Object.keys(res[key]).length < _dateArr.length)
          console.log(
            JSON.stringify({
              points: _bounds,
              dates: _dateArr,
              type: _type,
              uuid: _uuid,
              test: 'lkywHF'
            })
          );
      }
      if (this._isLoading) {
        const _isEmpty = _mapKeys.find(
          key => !this._typeDataMap[key][this._pauseFrame]
        );
        if (_isEmpty) {
          // 不存在当前帧的数据，更改加载顺序
          const _curLoadInd = _unitArr.indexOf(item);
          const _swapCount = this._computeSwapParam(_unitArr, _curLoadInd);
          if (!_swapCount) continue; // 不存在交换参数或者交换参数为 0，结束本次循环
          const _temp = _unitArr.splice(_curLoadInd + 1, _swapCount);
          _unitArr.push(..._temp);
        } else {
          this._continueRendering(); // 存在当前帧的数据，取消加载，继续播放
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
}
