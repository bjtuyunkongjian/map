import React, { Component } from 'react';
import { AddPolygonLayer, LayerIds } from 'tuyun-utils';
import { FormatDate } from 'tuyun-utils';

import PopulationChart from './population-chart';
import UnitChart from './unit-chart';
import BuildingChart from './building-chart';
import CaseChart from './case-chart';
import SituationChart from './situation-chart';
import Event, { EventName } from './event';
import { GetCount } from './webapi';
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

export default class JurisdictionCharts extends Component {
  _visible = false;
  _area = DefaultArea;
  _start = FormatDate(new Date(StartYear, StartMonth, StartDate), fmtType);
  _end = FormatDate(new Date(EndYear, EndMonth, EndDate), fmtType);

  componentWillMount = () => this._dealWithEvent();

  render() {
    return (
      <ul className="charts-box">
        <PopulationChart />
        <UnitChart />
        <BuildingChart />
        <CaseChart />
        <SituationChart />
      </ul>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeAreaRange, this._onChangeArea);
    Event.on(EventName.changeDateRange, this._onChangeDate);
    Event.on(EventName.toggleVisible, this._onToggleVisible);
  };

  _onToggleVisible = ({ visible } = {}) => {
    this._visible = visible;
    if (visible) this._getCount();
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
    const { res, err } = await GetCount(_param);
    if (!res || err) return;
    // 绘制多边形
    if (res.geometry) {
      const _geometryP = {
        geometry: res.geometry,
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
        `${LayerIds.compareBar.area}`,
        {
          color: AreaList.color,
          opacity: 0.5,
          LabelLayerId
        }
      );
    }
    // 人口
    _series.population[0].data = [
      res.qbrkCount,
      res.czrkCount,
      res.ldrkCount,
      res.zdrkCount
    ];
    // 单位
    _series.unit[0].data = [
      res.qbdwCount,
      res.ptdwCount,
      res.tzdwCount,
      res.bhdwCount
    ];
    // 房屋
    _series.building[0].data = [res.czfwCount, res.zzfwCount, res.xzfwCount];
    // 案件
    _series.case[0].data = [1, 2, 3, 4];
    // 案件
    _series.situation[0].data = [1, 2, 3, 4];
    Event.emit(EventName.changeData, _series);
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
*/
