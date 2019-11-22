import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import {
  AddPolygonLayer,
  LayerIds,
  FormatDate,
  RemoveLayer,
  GlobalEvent,
  GloEventName,
  AddCircleLayer
} from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';

import PopulationChart from './population-chart';
import CaseChart from './case-chart';
import SituationChart from './situation-chart';
import Event, { EventName } from './event';
import { GetCount, GetAreaData } from './webapi';
import {
  DefaultArea,
  Area,
  LabelLayerId,
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './constant';

export default class JurisdictionCharts extends Component {
  _visible = false;
  _area = DefaultArea;
  _start = FormatDate(new Date(StartYear, StartMonth, StartDate), fmtType);
  _end = FormatDate(new Date(EndYear, EndMonth, EndDate), fmtType);
  _type = '';
  _selectedChart = '';

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
    Event.on(EventName.changeSelectedBar, this._onChangeSelectedBar);
  };

  _onToggleVisible = ({ visible } = {}) => {
    this._visible = visible;
    if (visible) this._getCount();
    RemoveLayer(_MAP_, LayerIds.jurisdiction.area);
  };

  _onChangeArea = ({ area }) => {
    this._area = area;
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
    // 填数据
    for (let key of Object.keys(_series)) {
      _series[key].push({ name: this._area.label, code: this._area.value });
    }
    const _param = `code=${this._area.value}`;
    const { res = {}, err } = await GetCount(_param);
    if (!res || err) return;
    if (typeof res === 'string') {
      RemoveLayer(_MAP_, LayerIds.jurisdiction.area);
      TuyunMessage.error(res);
    } else if (!res.isValid) {
      RemoveLayer(_MAP_, LayerIds.jurisdiction.area);
      TuyunMessage.error('边界无效');
    }
    if (res.geometry) {
      const _geoJSONDataPolygon = {
        type: 'geojson',
        data: {
          geometry: res.geometry,
          properties: {},
          type: 'Feature'
        }
      };
      // 绘制多边形
      AddPolygonLayer(_MAP_, _geoJSONDataPolygon, LayerIds.jurisdiction.area, {
        color: Area.color,
        opacity: 0.5,
        LabelLayerId
      });
    }
    // 人口
    _series.population[0].data = [
      res.qbrkCount || 0,
      res.czrkCount || 0,
      res.ldrkCount || 0,
      res.zdrkCount || 0
    ];
    // 单位
    _series.unit[0].data = [
      res.qbdwCount || 0,
      res.ptdwCount || 0,
      res.tzdwCount || 0,
      res.bhdwCount || 0
    ];
    // 房屋
    _series.building[0].data = [
      res.czfwCount || 0,
      res.zzfwCount || 0,
      res.xzfwCount || 0
    ];
    // 案件
    _series.case[0].data = [
      res.qbajCount || 0,
      res.xsajCount || 0,
      res.xzajCount || 0
    ];
    // 警情
    _series.situation[0].data = [
      res.qbjqCount || 0,
      res.jtjqCount || 0,
      res.zajqCount || 0,
      res.xsjqCount || 0
    ];
    Event.emit(EventName.changeData, _series);
  };

  _onChangeSelectedBar = val => {
    const [chartName, type] = val.split(':');
    if (this._selectedChart === chartName && this._type === type) return;
    // 赋值
    this._selectedChart = chartName;
    this._type = type;
    if (!type) {
      RemoveLayer(_MAP_, LayerIds.jurisdiction.point);
      _MAP_.off('click', LayerIds.jurisdiction.point, this._clickPoint);
      // TODO 删除弹窗
      // _MAP_.off('click', LayerIds.jurisdiction.point, this._closePopup);
    } else {
      this._fetchData();
      _MAP_.on('click', LayerIds.jurisdiction.point, this._clickPoint);
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
    const _param = `code=${this._area.value}&level=${this._area.level}&type=${this._type}Count&startTime=${this._start}&endTime=${this._end}`;
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
    AddCircleLayer(_MAP_, _geoJSONData, LayerIds.jurisdiction.point, {
      color: '#004d93'
    });
  };
}

const fmtType = 'xxxx-xx-xx';

/*
isValid: true
name: "东营市公安局"
code: "370500000000"
area: 7861.392749999987

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
