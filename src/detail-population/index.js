/**
 * @author sl
 * @description 重点人员的详细分类
 */

import React, { Component } from 'react';
import {
  GlobalEvent,
  GloEventName,
  CreateUid,
  LayerIds,
  AddCircleLayer,
  AddHeatMapLayer,
  AddNamePlateLayer,
  RemoveLayer,
  GlobalConst
} from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { FetchNameplateData, GetDistribution, GetSubKeyNum } from './webapi';
import { DetailTypeMap } from './constant';

export default class DetailPopulation extends Component {
  state = {
    showUi: true,
    visible: false, // 是否显示
    hidden: false, // 是否隐藏，右侧菜单栏收进去的时候不显示弹框，但数据还是要加载
    pName: '',
    pCode: '',
    hasSecType: false,
    selectedItem: {},
    detailMap: {}
  };

  _uuid = -1;

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const {
      visible,
      hasSecType,
      pName,
      detailMap,
      selectedItem,
      hidden,
      showUi
    } = this.state;
    if (!hasSecType) return null;
    if (!showUi || !visible) return null;
    const _typeArr = DetailTypeMap[pName];
    if (!_typeArr || _typeArr.length === 0) return null;
    return (
      <ul className={`detail-category ${hidden ? 'hidden' : ''}`}>
        {_typeArr.map((item, index) => {
          const _checked = selectedItem === item;
          return (
            <li
              key={`detail_item_${index}`}
              className={`detail-item ${_checked ? 'checked' : ''} `}
              onClick={e => this._selectMenu(e, item)}
            >
              <div className="item-label">{item.label}</div>
              <div className="item-count">{detailMap[item.name] || 0}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    const { toggleDetailPopulation, toggleHideDetailPopulation } = GloEventName;
    GlobalEvent.on(toggleDetailPopulation, this._toggleKeyPopDetail);
    GlobalEvent.on(toggleHideDetailPopulation, ({ hidden }) => {
      this.setState({ hidden });
    });
    GlobalEvent.on(GloEventName.toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _toggleKeyPopDetail = async ({ visible, name, code, hasSecType }) => {
    await this.setState({ visible, pName: name, pCode: code, hasSecType });
    if (visible) {
      this._fetchData(); // 获取接口数据
      _MAP_.on('moveend', this._fetchData);
    } else {
      _MAP_.off('moveend', this._fetchData);
      const { population: populationLayerIds } = LayerIds;
      RemoveLayer(_MAP_, populationLayerIds.point); // 切换图表，先删除当前图层
      RemoveLayer(_MAP_, populationLayerIds.heatmap); // 切换图表，先删除当前图层
      RemoveLayer(_MAP_, populationLayerIds.namePlate); // 切换图表，先删除当前图层
    }
  };

  // 获取数据接口
  _fetchData = ignoreFetchDetail => {
    const _zoom = _MAP_.getZoom();
    !ignoreFetchDetail && this._fetchDetailMap(); // 获取右下角弹框详细数字
    if (_zoom >= 16) {
      this._fetchNamePlate(); // 大于 16 级，用 铭牌 显示
    } else {
      this._fetchHeatMap(); // 小于 16 级，热力图 和 点位图
    }
  };

  // 获取铭牌数据
  _fetchNamePlate = async () => {
    const _uuid = (this._uuid = CreateUid());
    const { selectedItem = {}, pCode } = this.state;
    const _bounds = _MAP_.getBounds();
    const _reqCode = selectedItem.code || pCode;
    const { res, err } = await FetchNameplateData({
      points: _bounds,
      firtype: 1, // 人口
      thirtype: _reqCode
    });
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    const { visible } = this.state;
    if (!visible) return; // 不显示的时候就不加载当前图层
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

  // 获取点的数据
  _fetchHeatMap = async () => {
    const _uuid = (this._uuid = CreateUid());
    const { selectedItem = {}, pCode } = this.state;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const _reqCode = selectedItem.code || pCode;
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&zdrylb=${_reqCode}&level=${_zoom}&type=ZDRK`;
    const { res, err } = await GetDistribution(_param);

    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    const { visible } = this.state;
    if (!visible) return; // 不显示的时候就不加载当前图层
    let _enableClick = false;
    if (res.length < 200) {
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
      AddHeatMapLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.heatmap); // 不可以点击，显示热力图
      AddNamePlateLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.namePlate); // 添加铭牌
    } else {
      AddCircleLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.point, {
        color: population.color
      }); // 可以点击，显示点位图
      AddHeatMapLayer(_MAP_, _geoJSONData, populationLayerIds.heatmap); // 不可以点击，显示热力图
      AddNamePlateLayer(_MAP_, _geoJSONDataEmpty, populationLayerIds.namePlate); // 添加铭牌
    }
  };

  // 获取 详细数据
  _fetchDetailMap = async () => {
    const { pCode, hasSecType } = this.state;
    if (!hasSecType) return; // 没有二级分类，不需要请求
    const _bounds = _MAP_.getBounds();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&zdrylb=${pCode}`;
    const { res, err } = await GetSubKeyNum(_param);
    if (!res || err) return;
    this.setState({ detailMap: res });
  };

  _selectMenu = async (e, item) => {
    const { selectedItem } = this.state;
    e.stopPropagation();
    await this.setState({ selectedItem: selectedItem === item ? {} : item });
    this._fetchData(true); // 不需要重新加载详情个数
  };
}

const { population } = GlobalConst.policeData;
