/**
 * @author sl 2019-03-06
 * @description 单位柱状图
 * 1. 全部单位
 * 2. 普通单位
 * 3. 特种单位
 * 4. 保护单位
 * 5. 九小场所
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import {
  CreateUid,
  GlobalEvent,
  GloEventName,
  AddCircleLayer,
  AddNamePlateLayer,
  RemoveLayer,
  LayerIds,
  GlobalConst
} from 'tuyun-utils';

import { ChartName } from './chart-info';
import { GetDistribution, GetNameplate } from './webapi';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class UnitBar extends Component {
  state = {
    curBar: DefaultTab,
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  _curCell = {};
  _uuid = -1;

  componentDidMount = () => this._init();

  render() {
    const { curBar, selectedChart, selectedIndex, chartData } = this.state;
    if (curBar !== TabValue.unit) return null;
    const _selectIndex =
      selectedChart === ChartName.unitBar ? selectedIndex : -1;
    const _baseValue = chartData.totalDw / 50;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          baseValue={_baseValue}
          title={{ text: '单位' }}
          legend={{ text: `总数：${chartData.totalDw || 0}` }}
          data={[
            {
              label: '全部',
              value: chartData.totalDw || 0,
              code: null,
              sectype: '1',
              type: 'QBDW'
            },
            {
              label: '普通',
              value: chartData.ptdw || 0,
              code: '2',
              sectype: '2',
              type: 'PTDW'
            },
            {
              label: '特种',
              value: chartData.tzdw || 0,
              code: '3',
              sectype: '3',
              type: 'TZDW'
            },
            {
              label: '保护',
              value: chartData.bhdw || 0,
              code: '4',
              sectype: '4',
              type: 'BHDW'
            },
            {
              label: '九小场所',
              value: chartData.jxcs || 0,
              code: '5',
              sectype: '5',
              type: 'JXCS'
            }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _init = () => {
    this._dealWithEvent();
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav); // 切换 tab
    Event.on(EventName.updateUniChart, this._onUpdateUniChart); // 更新数据
    Event.on(EventName.changeUniSelected, this._onChangeUniSelected); // 切换选中的图表
  };

  /**
   * 切换 tab：
   * 1. 重置当前选中的 tab
   * 2. 重置选中的图表
   */
  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    _MAP_.off('moveend', this._fetchData);
    this.setState({
      curBar: nextBar,
      selectedChart: '',
      selectedIndex: -1
    });
  };

  /**
   * 更新数据
   */
  _onUpdateUniChart = ({ unitBarData }) => {
    this.setState({ chartData: unitBarData });
  };

  _onChangeUniSelected = ({ selectedChart, selectedIndex }) => {
    this.setState({ selectedChart, selectedIndex });
    const _selectIndex =
      selectedChart === ChartName.unitBar ? selectedIndex : -1;
    if (_selectIndex > -1) {
      this._fetchData();
      _MAP_.on('moveend', this._fetchData);
    } else {
      _MAP_.off('moveend', this._fetchData);
    }
  };

  _clickBar = barInfo => {
    const { selectedChart, selectedIndex } = this.state;
    const { curIndex, curCell } = barInfo;
    let _selectInd;
    this._curCell = curCell;
    if (selectedChart === ChartName.unitBar) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    const { unit: unitLayerIds } = LayerIds;
    RemoveLayer(_MAP_, unitLayerIds.point); // 删除图层
    RemoveLayer(_MAP_, unitLayerIds.namePlate); // 删除图层
    GlobalEvent.emit(GloEventName.closePopupUnit); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupUnitNameplate); // 切换图表，先关闭详情弹窗
    Event.emit(EventName.changeUniSelected, {
      selectedChart: ChartName.unitBar,
      selectedIndex: _selectInd
    });
    if (_selectInd > -1) {
      _MAP_.on('click', unitLayerIds.point, this._clickPopLayer);
      _MAP_.on('click', unitLayerIds.namePlate, this._clickPopLayer);
    } else {
      _MAP_.off('click', unitLayerIds.point, this._clickPopLayer);
      _MAP_.off('click', unitLayerIds.namePlate, this._clickPopLayer);
    }
    GlobalEvent.emit(GloEventName.toggleDetailUnit, { visible: false }); // 不显示
  };

  _fetchData = () => {
    const { type } = this._curCell || {};
    const _zoom = _MAP_.getZoom();
    _zoom < 16 ? this._fetchUnitData(type) : this._fetchNameplateData(type); // 获取数据，小于 16 级，获取热力图数据，大于 16 级，获取铭牌数据
  };

  // 获取散点数据
  _fetchUnitData = async type => {
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    // minX=120&maxX=125&minY=36.4&maxY=37&level=9.5&type=BHDW&tzbhbm=252
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&level=${_zoom}&type=${type}`;
    const { res, err } = await GetDistribution(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    // todo 显示到地图上
    const { curBar } = this.state;
    if (curBar !== TabValue.unit) return;
    let _circleRadius,
      _enableClick = false;
    // 点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
    // 点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
    // 点的数据量在 200 以内，现有点的大小，需要有点击功能
    if (res.length < 200) {
      _circleRadius = 6;
      _enableClick = true;
    } else if (res.length < 1000) {
      _circleRadius = 4;
    } else {
      _circleRadius = 2;
    }
    const _features = res.map(item => {
      const { x, y, zagldwbm } = item;
      return TurfPoint([x, y], {
        code: zagldwbm, // 单位地址编码
        radius: _circleRadius,
        enableClick: _enableClick
      }); // 生成点数据
    });
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { unit: unitLayerIds } = LayerIds;
    AddCircleLayer(_MAP_, _geoJSONDataPoint, unitLayerIds.point, {
      color: unit.color
    });
    // 房屋铭牌数据为空
    const _geoJSONDataName = { type: 'geojson', data: FeatureCollection([]) };
    AddNamePlateLayer(_MAP_, _geoJSONDataName, unitLayerIds.namePlate);
  };

  // 获取铭牌数据
  _fetchNameplateData = async type => {
    const { curBar } = this.state;
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    // minX=120&maxX=125&minY=36.4&maxY=37&type=PTDW
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&type=${type}`;
    const { res, err } = await GetNameplate(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    if (curBar !== TabValue.unit) return;
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num, enableClick: true }); // 支持点击事件
    });
    const _geoJSONDataName = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { unit: unitLayerIds } = LayerIds;
    AddNamePlateLayer(_MAP_, _geoJSONDataName, unitLayerIds.namePlate); // 添加铭牌
    const _geoJSONDataPoint = { type: 'geojson', data: FeatureCollection([]) };
    AddCircleLayer(_MAP_, _geoJSONDataPoint, unitLayerIds.point); // 清空点位
  };

  _clickPopLayer = e => {
    const _zoom = _MAP_.getZoom();
    const { lngLat, originalEvent, features } = e;
    const { code, enableClick } = features[0].properties;
    if (_zoom > 16) {
      const { showPopupUnitNameplate } = GloEventName;
      GlobalEvent.emit(showPopupUnitNameplate, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat,
        code: code
      });
    } else if (enableClick) {
      const { showPopupUnit } = GloEventName;
      GlobalEvent.emit(showPopupUnit, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat,
        code: code
      });
    }
  };
}
const { unit } = GlobalConst.policeData;