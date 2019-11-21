//比对碰撞
import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import {
  AddPolygonLayer,
  LayerIds,
  GloEventName,
  GlobalEvent,
  AddCircleLayer,
  FormatDate,
  RemoveLayer
} from 'tuyun-utils';

import PopulationChart from './population-chart';
import CaseChart from './case-chart';
import SituationChart from './situation-chart';
import Event, { EventName } from './event';
import { GetCount, GetCustomCount, GetAreaData, GetCustomData } from './webapi';
import {
  DefaultArea,
  AreaList,
  LabelLayerId,
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './constant';

export default class CompareCharts extends Component {
  _visible = false;
  _areaArr = [...DefaultArea];
  _geometryArr = [];

  _start = FormatDate(new Date(StartYear, StartMonth, StartDate), fmtType);
  _end = FormatDate(new Date(EndYear, EndMonth, EndDate), fmtType);

  componentWillMount = () => this._dealWithEvent();

  render() {
    return (
      <ul className="charts-box">
        <PopulationChart />
        <CaseChart />
        <SituationChart />
      </ul>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeAreaRange, this._onChangeArea);
    Event.on(EventName.changeDateRange, this._onChangeDate);
    Event.on(EventName.toggleVisible, this._onToggleVisible);
    Event.on(EventName.drawPrevGeo, this._drawPolygon);
    Event.on(EventName.changeSelectedBar, this._onChangeSelectedBar);
  };

  _onToggleVisible = ({ visible } = {}) => {
    this._visible = visible;
    if (visible) this._getCount();
  };

  _onChangeArea = ({ firstArea, secArea }) => {
    this._areaArr = [firstArea, secArea];
    this._visible && this._getCount();
  };

  _onChangeDate = ({
    startYear,
    startMonth,
    startDate,
    endYear,
    endMonth,
    endDate
  }) => {
    this._start = FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    );
    this._end = FormatDate(new Date(endYear, endMonth, endDate), fmtType);
    this._visible && this._getCount();
  };

  _getCount = async () => {
    // 生成 series
    const _series = {
      population: [],
      unit: [],
      building: [],
      case: [],
      situation: []
    };
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading);
    for (let i = 0; i < this._areaArr.length; i++) {
      const _area = this._areaArr[i];
      // 填数据

      for (let key of Object.keys(_series)) {
        _series[key].push({
          name: _area.label,
          code: _area.value
        });
      }
      // 就是这里 再选择别的辖区以后_area就没有 type了
      // 请求
      let res, err;
      if (_area.type === 'jurisdiction') {
        const _param = `code=${_area.value}&startTime=${this._start}&endTime=${this._end}`;
        const resMap = await GetCount(_param);
        res = resMap.res;
        err = resMap.err;
      } else if (_area.type === 'custom') {
        // boundary: startTime: endTime:
        const resMap = await GetCustomCount({
          boundary: _area.geometry,
          startTime: this._start,
          endTime: this._end
        });
        res = resMap.res;
        err = resMap.err;
        res.geometry = _area.geometry;
      }
      if (!res || err) {
        GlobalEvent.emit(closeGlobalLoading);
        return;
      }
      // 绘制多边形
      this._geometryArr[i] = res.geometry; // 多边形数据
      // 人口
      _series.population[i].data = [
        res.qbrkCount || 0,
        res.czrkCount || 0,
        res.ldrkCount || 0,
        res.zdrkCount || 0
      ];
      // 单位
      _series.unit[i].data = [
        res.qbdwCount || 0,
        res.ptdwCount || 0,
        res.tzdwCount || 0,
        res.bhdwCount || 0
      ];
      // 房屋
      _series.building[i].data = [
        res.czfwCount || 0,
        res.zzfwCount || 0,
        res.xzfwCount || 0
      ];

      // 案件
      _series.case[i].data = [
        res.qbajCount || 0,
        res.xsajCount || 0,
        res.xzajCount || 0
      ];
      // 警情
      _series.situation[i].data = [
        res.qbjqCount || 0,
        res.jtjqCount || 0,
        res.zajqCount || 0,
        res.xsjqCount || 0
      ];
    }
    GlobalEvent.emit(closeGlobalLoading);
    this._drawPolygon(); // 绘制多边形
    Event.emit(EventName.changeData, _series);
  };

  _drawPolygon = () => {
    for (let i = 0; i < this._geometryArr.length; i++) {
      const _geometry = this._geometryArr[i];
      if (!_geometry) continue;
      const _geometryP = {
        geometry: _geometry,
        properties: {},
        type: 'Feature'
      };
      const _geoJSONDataPolygon = {
        type: 'geojson',
        data: _geometryP
      };
      AddPolygonLayer(
        _MAP_,
        _geoJSONDataPolygon,
        `${LayerIds.compareBar.area}_${i}`,
        {
          color: AreaList[i].color,
          opacity: 0.5,
          LabelLayerId
        }
      );
    }
    // this._getCount();
  };

  _onChangeSelectedBar = val => {
    const [chartName, type] = val.split(':');
    if (this._selectedChart === chartName && this._type === type) return;
    // 赋值
    this._selectedChart = chartName;
    this._type = type;
    for (let i = 0; i < this._areaArr.length; i++) {
      if (!type) {
        RemoveLayer(_MAP_, `${LayerIds.compareBar.circle}_${i}`);
        _MAP_.off(
          'click',
          `${LayerIds.compareBar.circle}_${i}`,
          this._clickPoint
        );
        // TODO 删除弹窗
      } else {
        this._fetchData();
        _MAP_.on(
          'click',
          `${LayerIds.compareBar.circle}_${i}`,
          this._clickPoint
        );
      }
    }
  };

  _clickPoint = e => {
    // visible, boxLeft, boxTop, lngLat, code
    const { code } = e.features[0].properties;
    const { coordinates: lngLat } = e.features[0].geometry;
    const { x, y } = _MAP_.project(lngLat);
    if (this._selectedChart === 'population') {
      GlobalEvent.emit(GloEventName.showPopupPopulation, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        code: code,
        lngLat: lngLat
      });
    } else if (this._selectedChart === 'case') {
      GlobalEvent.emit(GloEventName.showPopupCase, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        code: code,
        lngLat: lngLat
      });
    } else if (this._selectedChart === 'situation') {
      GlobalEvent.emit(GloEventName.showPopupSituation, {
        visible: true,
        boxLeft: x,
        boxTop: y,
        code: code,
        lngLat: lngLat
      });
    }
  };

  //code=&type=&startTime=&endTime=   type：点位的类型
  _fetchData = async () => {
    for (let i = 0; i < this._areaArr.length; i++) {
      if (this._areaArr[i].type === 'jurisdiction') {
        const _param = `code=${this._areaArr[i].value}&level=${this._areaArr[i].level}&type=${this._type}Count&startTime=${this._start}&endTime=${this._end}`;
        GlobalEvent.emit(GloEventName.showGlobalLoading);
        const { res, err } = await GetAreaData(_param);
        GlobalEvent.emit(GloEventName.closeGlobalLoading);
        if (!res || err) return;
        const _features = res.map(item => {
          const { x, y, RKBM, ajbh, jjdbh } = item;
          return TurfPoint([x, y], {
            code: RKBM || ajbh || jjdbh
          });
        });
        const _geoJSONData = {
          type: 'geojson',
          data: FeatureCollection(_features)
        };
        AddCircleLayer(
          _MAP_,
          _geoJSONData,
          `${LayerIds.compareBar.circle}_${i}`,
          {
            color: AreaList[i].rgb
          }
        );
      } else if (this._areaArr[i].type === 'custom') {
        GlobalEvent.emit(GloEventName.showGlobalLoading);
        const { res, err } = await GetCustomData({
          boundary: this._areaArr[i].geometry,
          startTime: this._start,
          endTime: this._end,
          type: `${this._type}Count`
        });
        GlobalEvent.emit(GloEventName.closeGlobalLoading);
        if (!res || err) return;
        const _features = res.map(item => {
          const { x, y, RKBM, ajbh, jjdbh } = item;
          return TurfPoint([x, y], {
            code: RKBM || ajbh || jjdbh
          });
        });
        const _geoJSONData = {
          type: 'geojson',
          data: FeatureCollection(_features)
        };
        AddCircleLayer(
          _MAP_,
          _geoJSONData,
          `${LayerIds.compareBar.circle}_${i}`,
          {
            color: AreaList[i].rgb
          }
        );
      }
    }
  };
}

const fmtType = 'xxxx-xx-xx';

/*
isValid: true
hasBoundary: true
name: "东营市公安局"
code: "370500000000"
area: 7861.392749999987
geometry: {coordinates: Array(1), type: "Polygon"}

{ name: '总人口', code: 'qbrk' }, qbrkCount: 2100886
{ name: '常驻', code: 'czrk' }, czrkCount: 1868759
{ name: '流动', code: 'ldrk' }, ldrkCount: 231908
{ name: '重点', code: 'zdrk' }, zdrkCount: 1757
jwrkCount: 0 境外人口

{ name: '全部', code: 'qbdw' }, qbdwCount: 61069
{ name: '普通', code: 'ptdw' }, ptdwCount: 51378
{ name: '特种', code: 'tzdw' }, tzdwCount: 1251
{ name: '保护', code: 'bhdw' }, bhdwCount: 1442
jxcsCount: 25089 九小场所

{ name: '出租', code: 'czfw' }, czfwCount: 14358
{ name: '自住', code: 'zzfw' }, zzfwCount: 815404
{ name: '空置', code: 'xzfw' }, xzfwCount: 14350
qbfwCount: 844112 全部房屋

案件 
{ name: '全部', code: 'qbaj' }, qbajCount: 69758
{ name: '刑事', code: 'xsaj' }, xsajCount: 21328
{ name: '行政', code: 'xzaj' }, xzajCount: 46705

警情
{ name: '全部', code: 'qbjq' }, qbjqCount: 338645
{ name: '交通', code: 'jtjq' }, jtjqCount: 105632
{ name: '治安', code: 'zajq' }, zajqCount: 79570
{ name: '刑事', code: 'xsjq' }, xsjqCount: 13660
qzqzjqCount: 33350  群众求助
*/
