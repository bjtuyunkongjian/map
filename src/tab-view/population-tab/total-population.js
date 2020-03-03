import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import {
  GlobalEvent,
  GloEventName,
  CreateUid,
  RemoveLayer,
  LayerIds,
  AddCircleLayer,
  AddHeatMapLayer,
  AddNamePlateLayer,
  GlobalConst
} from 'tuyun-utils';

import { ChartName } from './chart-info';
import { GetDistribution, GetNameplate } from './webapi';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class TotalPopulation extends Component {
  state = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  _curCell = {};
  _uuid = -1;

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { curBar, selectedIndex, chartData } = this.state;
    if (curBar !== TabValue.population) return null;
    const _baseValue = chartData.totalPop / 50; // 给一个基础值
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          baseValue={_baseValue}
          title={{ text: '人口分布' }}
          legend={{ text: `人口总数：${chartData.totalPop || 0}` }}
          data={[
            {
              label: '总人口',
              value: chartData.totalPop || 0,
              type: 'QBRK'
            },
            {
              label: '常驻',
              value: chartData.ckpop || 0,
              type: 'CZRK'
            },
            {
              label: '流动',
              value: chartData.lkpop || 0,
              type: 'LDRK'
            },
            {
              label: '重点',
              value: chartData.zdpop || 0,
              type: 'ZDRK'
            },
            {
              label: '境外',
              value: chartData.jwpop || 0,
              type: 'JWRK'
            }
          ]}
          selectedIndex={selectedIndex}
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav); // 切换 tab
    Event.on(EventName.changePopSelected, this._onChangePopSelected); // 切换图表
    Event.on(EventName.updatePopChart, this._onUpdatePopChart); // 更新图表数据
  };

  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    _MAP_.off('moveend', this._fetchData); // 移除监听
    this.setState({ curBar: nextBar, selectedChart: '', selectedIndex: -1 });
  };

  _onChangePopSelected = ({ selectedChart, selectedIndex }) => {
    if (selectedChart === ChartName.totalPop && selectedIndex > -1) {
      this.setState({ selectedChart, selectedIndex });
      this._fetchData(); // 选中当前图表，请求对应数据
      _MAP_.on('moveend', this._fetchData); // 选中当前图表，添加监听事件
    } else {
      this.setState({ selectedChart, selectedIndex: -1 }); // 没选中你当前图表，设置索引为 -1
      _MAP_.off('moveend', this._fetchData); // 没选中当前图表，移除监听事件
    }
  };

  _onUpdatePopChart = ({ totalPopData }) => {
    this.setState({ chartData: totalPopData }); // 更新图表数据
  };

  _clickBar = barInfo => {
    const { selectedChart, selectedIndex } = this.state;
    const { curIndex, curCell } = barInfo;
    this._curCell = curCell;
    let _selectInd;
    if (selectedChart === ChartName.totalPop) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    const { population: populationLayerIds } = LayerIds;
    RemoveLayer(_MAP_, populationLayerIds.point); // 切换图表，先删除当前图层
    RemoveLayer(_MAP_, populationLayerIds.heatmap); // 切换图表，先删除当前图层
    RemoveLayer(_MAP_, populationLayerIds.namePlate); // 切换图表，先删除当前图层
    GlobalEvent.emit(GloEventName.closePopupPopNameplate); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupPopulation); // 切换图表，先关闭详情弹窗
    // 发射切换图表事件
    Event.emit(EventName.changePopSelected, {
      selectedChart: ChartName.totalPop,
      selectedIndex: _selectInd
    });
  };

  _fetchData = () => {
    const { type } = this._curCell;
    const _zoom = _MAP_.getZoom();
    _zoom <= 16 ? this._fetchHeatMapData(type) : this._fetchNameplateData(type); // 获取数据，小于 16 级，获取热力图数据，大于 16 级，获取铭牌数据
  };

  // 获取热力图数据
  _fetchHeatMapData = async type => {
    const { curBar } = this.state;
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    // ?minX=&maxX=&minY=&maxY=&type=&level=
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&level=${_zoom}&type=${type}`;
    const { res, err } = await GetDistribution(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    // todo 显示到地图上

    if (curBar !== TabValue.population) return; // 切换 tab 的情况
    let _enableClick = false;
    if (res.length < 200 && (type === 'ZDRK' || type === 'JWRK')) {
      _enableClick = true;
    }
    const _features = res.map(item => {
      const { x, y, rkbm } = item;
      return TurfPoint([x, y], {
        code: rkbm,
        enableClick: _enableClick
      });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const _geoJSONDataEmpty = {
      type: 'geojson',
      data: FeatureCollection([])
    };
    const { population: populationLayerIds } = LayerIds;
    if (_enableClick) {
      AddCircleLayer(_MAP_, _geoJSONData, populationLayerIds.point, {
        color: population.color
      }); // 可以点击，显示点位图
      AddHeatMapLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.heatmap); // 可以点击，不显示热力图
      AddNamePlateLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.namePlate); // 添加铭牌
    } else {
      AddCircleLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.point, {
        color: population.color
      }); // 不可以点击，不显示点位图
      AddHeatMapLayer(_MAP_, _geoJSONData, populationLayerIds.heatmap); // 不可以点击，显示热力图
      AddNamePlateLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.namePlate); // 添加铭牌
    }
  };

  // 获取铭牌数据
  _fetchNameplateData = async type => {
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&type=${type}`;
    const { res, err } = await GetNameplate(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    const { curBar } = this.state;
    if (curBar !== TabValue.population) return; // 切换 tab 的情况
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num, enableClick: true });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const _geoJSONDataEmpty = {
      type: 'geojson',
      data: FeatureCollection([])
    };
    const { population: populationLayerIds } = LayerIds;
    AddNamePlateLayer(_MAP_, _geoJSONData, populationLayerIds.namePlate); // 添加铭牌
    AddCircleLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.point, {
      color: population.color
    }); // 可以点击，显示点位图
    AddHeatMapLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.heatmap); // 不可以点击，显示热力图
  };
}
const { population } = GlobalConst.policeData;