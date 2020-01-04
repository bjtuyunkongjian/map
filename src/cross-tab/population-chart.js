import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import {
  CreateUid,
  RemoveLayer,
  LayerIds,
  AddCircleLayer,
  AddHeatMapLayer,
  AddNamePlateLayer,
  GlobalConst,
  GlobalEvent,
  GloEventName
} from 'tuyun-utils';

import Event, { EventName } from './event';
import {
  GetPopulationCount,
  GetPopulationDistribution,
  GetCountOfBuilding
} from './webapi';

import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

export default class PopulationChart extends Component {
  state = { visible: false, series: [], selectedValue: '' };

  _uuid = -1;

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series, selectedValue } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '人口' }}
          xAxis={[
            { name: '总人口', type: 'QBRK' },
            { name: '常驻', type: 'CZRK' },
            { name: '流动', type: 'LDRK' },
            { name: '重点', type: 'ZDRK' }
          ]}
          hslColorArr={[[210, 39, 49]]}
          series={series || []}
          height={220}
          selectedKey="type"
          selectedValue={selectedValue}
          onClick={this._clickBar}
        />
      </li>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.toggleVisible, this._onToggleVisible);
  };

  _onToggleVisible = ({ visible } = {}) => {
    this.setState({ visible: visible });
    const { population: populationLayerIds } = LayerIds;
    if (visible) {
      this._getCount();
      _MAP_.on('moveend', this._onMoveend); // 选中当前图表，添加监听事件
      _MAP_.on('click', populationLayerIds.namePlate, this._clickPopLayer);
    } else {
      this.setState({ selectedValue: '' });
      const { population: populationLayerIds } = LayerIds;
      RemoveLayer(_MAP_, populationLayerIds.point); // 切换图表，先删除当前图层
      RemoveLayer(_MAP_, populationLayerIds.heatmap); // 切换图表，先删除当前图层
      RemoveLayer(_MAP_, populationLayerIds.namePlate); // 切换图表，先删除当前图层
      GlobalEvent.emit(GloEventName.closePopupPopNameplate); // 切换图表，先关闭铭牌弹窗
      GlobalEvent.emit(GloEventName.closePopupPopulation); // 切换图表，先关闭详情弹窗
      this._fetchData();
      _MAP_.off('moveend', this._onMoveend);
      _MAP_.off('click', populationLayerIds.namePlate, this._clickPopLayer);
    }
  };

  _onMoveend = () => {
    this._getCount();
    this._fetchData();
  };

  _clickPopLayer = e => {
    const _zoom = _MAP_.getZoom();
    // // 大于 16 级，可以点击，小于 16 级，看点的数量
    const { lngLat, originalEvent, features } = e;
    const { code, enableClick } = features[0].properties;
    if (_zoom > 16) {
      const { showPopupPopNameplate } = GloEventName;
      GlobalEvent.emit(showPopupPopNameplate, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat,
        code: code
      });
    } else if (enableClick) {
      // todo 判断类型显示人口详情
      const { showPopupPopulation } = GloEventName;
      GlobalEvent.emit(showPopupPopulation, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat,
        code: code
      });
    }
  };

  _getCount = async () => {
    // minX=&maxX=&minY=&maxY=&level=
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&level=${_zoom}`;
    const { res, err } = await GetPopulationCount(_param);
    if (!res || err) return;
    const { totalPop = 0, ckpopPop = 0, lkPop = 0, zdpop = 0 } = res;
    const _series = [
      {
        name: '当前屏幕',
        code: 'curScreen',
        data: [totalPop, ckpopPop, lkPop, zdpop]
      }
    ];
    this.setState({ series: _series });
  };

  _clickBar = async barInfo => {
    const { selectedValue } = this.state;
    const { type = '' } = barInfo.curSeries.cellInfo;
    await this.setState({ selectedValue: selectedValue === type ? '' : type });
    const { population: populationLayerIds } = LayerIds;
    RemoveLayer(_MAP_, populationLayerIds.point); // 切换图表，先删除当前图层
    RemoveLayer(_MAP_, populationLayerIds.heatmap); // 切换图表，先删除当前图层
    RemoveLayer(_MAP_, populationLayerIds.namePlate); // 切换图表，先删除当前图层
    GlobalEvent.emit(GloEventName.closePopupPopNameplate); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupPopulation); // 切换图表，先关闭详情弹窗
    this._fetchData();
  };

  _fetchData = () => {
    const { selectedValue } = this.state;
    if (!selectedValue) return;
    const _zoom = _MAP_.getZoom();
    _zoom <= 16
      ? this._fetchHeatMapData(selectedValue)
      : this._fetchNameplateData(selectedValue); // 获取数据，小于 16 级，获取热力图数据，大于 16 级，获取铭牌数据
  };

  // 获取热力图数据
  _fetchHeatMapData = async type => {
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    // ?minX=&maxX=&minY=&maxY=&type=&level=
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&level=${_zoom}&type=${type}`;
    const { res, err } = await GetPopulationDistribution(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    // todo 显示到地图上
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
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&type=${type}`;
    const { res, err } = await GetCountOfBuilding(_param);
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
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
