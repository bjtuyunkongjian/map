/**
 * @author hao
 * @description 警情多发区域
 */

import React, { Component } from 'react';
import {
  FormatDate,
  GlobalEvent,
  GloEventName,
  CreateUid,
  LayerIds,
  AddPolygonLayer,
  AddTextLayer,
  RemoveLayer
} from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection,
  convex as TurfConvex,
  intersect as TurfIntersect
  // area as TurfArea
} from 'turf';
import { TuyunMessage } from 'tuyun-kit';

import { GetAreaAggregation } from './webapi';
import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './chart-info';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class MultipleArea extends Component {
  state = {
    curBar: DefaultTab,
    checkedOpt: '',
    checkedBtn: ''
  };

  _start = FormatDate(new Date(StartYear, StartMonth, StartDate), fmtType);
  _end = FormatDate(new Date(EndYear, EndMonth, EndDate), fmtType);
  _uuid = -1;

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { checkedOpt, checkedBtn, curBar } = this.state;
    if (curBar !== TabValue.posituation) return null;
    return (
      <ul className="multiple-area">
        <li className="multiple-label">多发区域</li>
        {multipleOpts.map((item, index) => (
          <li className="multiple-option" key={`multiple_opt_${index}`}>
            {item.label}
            <div className={`multiple-btn-arr btn-arr-${index + 1}`}>
              <div
                className={`multiple-btn-item${
                  checkedOpt === item.value && checkedBtn === staticBtn
                    ? ' checked'
                    : ''
                }`}
                onClick={() => this._onClickStatic(item)}
              >
                静态
              </div>
              <div
                className={`multiple-btn-item${
                  checkedOpt === item.value && checkedBtn === dynamicBtn
                    ? ' checked'
                    : ''
                }`}
                onClick={() => this._onClickDynamic(item)}
              >
                动态
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
    GlobalEvent.on(GloEventName.changeSituationDate, this._onChangePoliceDate);
    Event.on(EventName.changePosituationTendency, this._onCancelSelect); // 更改案件趋势选中项，取消选中
    Event.on(EventName.changePosituationDensity, this._onCancelSelect); // 更改选中的案件平均密度，取消选中
  };

  _init = () => {};

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    await this.setState({ curBar: nextBar });
    this._onCancelSelect();
  };

  _onClickStatic = async item => {
    const { checkedOpt, checkedBtn } = this.state;
    if (!checkedBtn) {
      /** 之前未选中，重新加载 */
      await this.setState({ checkedOpt: item.value, checkedBtn: staticBtn });
      this._fetchAreaAggregation(); // 获取数据
    } else if (checkedOpt === item.value && checkedBtn === dynamicBtn) {
      /** 之前选中的相同类型，动态，移除监听，不需要重新加载 */
      await this.setState({ checkedBtn: staticBtn });
      this._removeListener();
    } else if (checkedOpt !== item.value && checkedBtn === dynamicBtn) {
      /** 之前不同类型，动态，移除监听，重新加载 */
      await this.setState({ checkedOpt: item.value, checkedBtn: staticBtn });
      this._removeListener();
      this._fetchAreaAggregation(); // 获取数据
    } else if (checkedOpt === item.value && checkedBtn === staticBtn) {
      /** 之前相同相同类型，静态，取消选中 */
      this._onCancelSelect();
    } else if (checkedOpt !== item.value && checkedBtn === staticBtn) {
      /** 之前不同类型，静态，重新加载 */
      await this.setState({ checkedOpt: item.value });
      this._fetchAreaAggregation(); // 获取数据
    }
    Event.emit(EventName.changePosituationMulti);
  };

  _onClickDynamic = async item => {
    const { checkedOpt, checkedBtn } = this.state;
    if (!checkedBtn) {
      /** 之前未选中，添加监听，重新加载 */
      await this.setState({ checkedOpt: item.value, checkedBtn: dynamicBtn });
      this._fetchAreaAggregation(); // 获取数据
      this._addListener(); // 添加监听
    } else if (checkedOpt === item.value && checkedBtn === dynamicBtn) {
      /** 之前选中的相同类型，动态，取消选中 */
      this._onCancelSelect();
    } else if (checkedOpt !== item.value && checkedBtn === dynamicBtn) {
      /** 之前不同类型，动态，重新加载 */
      await this.setState({ checkedOpt: item.value });
      this._fetchAreaAggregation(); // 获取数据
    } else if (checkedOpt === item.value && checkedBtn === staticBtn) {
      /** 之前相同相同类型，静态，添加监听，重新加载 */
      await this.setState({ checkedBtn: dynamicBtn });
      this._fetchAreaAggregation(); // 获取数据
      this._addListener(); // 添加监听
    } else if (checkedOpt !== item.value && checkedBtn === staticBtn) {
      /** 之前不同类型，静态，重新加载，添加监听 */
      await this.setState({ checkedOpt: item.value, checkedBtn: dynamicBtn });
      this._fetchAreaAggregation(); // 获取数据
      this._addListener(); // 添加监听
    }
    Event.emit(EventName.changePosituationMulti);
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    this._onCancelSelect();
    await this.setState({ curBar: nextBar });
  };

  _onCancelSelect = () => {
    const { checkedOpt } = this.state;
    if (!checkedOpt) return;
    this._uuid = -1;
    RemoveLayer(_MAP_, LayerIds.police.multipleArea);
    RemoveLayer(_MAP_, LayerIds.police.multipleText);
    this._removeListener();
    this.setState({ checkedOpt: '', checkedBtn: '' });
  };

  _onChangePoliceDate = param => {
    const { curBar, checkedBtn } = this.state;
    const {
      endDate,
      endMonth,
      endYear,
      startDate,
      startMonth,
      startYear
    } = param;
    this._start = FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    );
    this._end = FormatDate(new Date(endYear, endMonth, endDate), fmtType);
    if (TabValue.posituation !== curBar) return;
    if (checkedBtn === staticBtn) {
      this._fetchAreaAggregation();
      this._addListener();
      this.setState({ checkedBtn: dynamicBtn });
    } else if (checkedBtn === dynamicBtn) {
      this._fetchAreaAggregation();
    } else {
      this._onCancelSelect();
    }
  };
  // minX=&maxX=&minY=&maxY=&beginTime=&endTime=&pitch=&code=&level=
  _fetchAreaAggregation = async () => {
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const _pitch = _MAP_.getPitch();
    const { checkedOpt } = this.state;
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&beginTime=${this._start}&endTime=${
      this._end
    }&pitch=${_pitch}&code=${checkedOpt}&level=${_zoom}`;
    const { res, err } = await GetAreaAggregation(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    // todo 显示到地图上
    const { curBar } = this.state;
    if (curBar !== TabValue.posituation) return; // 切换 tab 的情况
    const _featuresConvex = []; // 包络
    const _featuresPercentage = []; // 比例
    // 没有密集区域的情况
    if (res.length === 0) {
      TuyunMessage.show('当前屏幕点位数据较少，请直接查看点位图');
    }
    res.map(item => {
      const { allCoordinates, geojson, percentage } = item;
      let _sumX = 0;
      let _sumY = 0;
      let _convexP = allCoordinates.map(coord => {
        _sumX += coord.x;
        _sumY += coord.y;
        return TurfPoint([coord.x, coord.y], { percentage, radius: 2 });
      });
      const _center = [
        _sumX / allCoordinates.length,
        _sumY / allCoordinates.length
      ];
      const _text = `${(percentage * 100).toFixed(2)}%`;
      _featuresPercentage.push(TurfPoint(_center, { text: _text }));
      //
      const _poly = { geometry: geojson, type: 'Feature' };
      let _convexPoly;
      if (_convexP.length > 4) {
        _convexPoly = TurfConvex(FeatureCollection(_convexP));
      }
      if (_convexPoly) {
        _featuresConvex.push(TurfIntersect(_poly, _convexPoly));
      } else {
        _featuresConvex.push(_poly);
      }
    });
    // 包络
    const _geoJSONConvex = {
      type: 'geojson',
      data: FeatureCollection(_featuresConvex)
    };
    AddPolygonLayer(_MAP_, _geoJSONConvex, LayerIds.police.multipleArea, {
      color: 'rgba(0, 255, 255, 0.5)'
      // color: 'rgba(255,64,169,0.2)'
    });
    // 所占比例
    const _geoJSONDataNum = {
      type: 'geojson',
      data: FeatureCollection(_featuresPercentage)
    };
    AddTextLayer(_MAP_, _geoJSONDataNum, LayerIds.police.multipleText);
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchAreaAggregation);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchAreaAggregation);
  };
}

const fmtType = 'xxxx-xx-xx';
const multipleOpts = [
  { label: '全部案件', value: 'all' },
  { label: '刑事案件', value: '010000' },
  { label: '治安案件', value: '020000' }
];
const staticBtn = 'static';
const dynamicBtn = 'dynamic';
