import React, { Component } from 'react';
import {
  CreateUid,
  GloEventName,
  GlobalEvent,
  RemoveLayer,
  AddCircleLayer,
  AddNamePlateLayer,
  LayerIds,
  GlobalConst
} from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { GetSubCatalogs, GetDistribution, GetNameplate } from './webapi';

export default class DetailUnit extends Component {
  state = {
    showUi: true,
    visible: false, // 是否显示
    hidden: false, // 是否隐藏，右侧菜单栏收进去的时候不显示弹框，但数据还是要加载
    pCode: '',
    hasSecType: false,
    selectedValue: '',
    detailArr: [],
    unitType: ''
  };

  _uuid = -1;

  componentWillMount = () => this._dealWithEvent();

  render() {
    const {
      visible,
      hasSecType,
      detailArr,
      selectedValue,
      hidden,
      showUi
    } = this.state;

    if (!visible || !hasSecType || !showUi) return null;
    if (!detailArr || detailArr.length === 0) return null;
    return (
      <ul className={`detail-category ${hidden ? 'hidden' : ''}`}>
        {detailArr.map((item, index) => {
          const _checked = selectedValue === item.code;
          return (
            <li
              key={`detail_item_${index}`}
              className={`detail-item ${_checked ? 'checked' : ''} `}
              onClick={e => this._selectMenu(e, item)}
            >
              <div className="item-label">{item.name}</div>
              <div className="item-count">{item.count || 0}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  _dealWithEvent = () => {
    GlobalEvent.on(GloEventName.toggleDetailUnit, this._onToggleDetailUnit);
    GlobalEvent.on(GloEventName.toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onToggleDetailUnit = async ({ visible, code, hasSecType, unitType }) => {
    await this.setState({
      visible,
      pCode: code,
      hasSecType,
      unitType,
      selectedValue: ''
    });
    GlobalEvent.emit(GloEventName.closePopupUnit); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupUnitNameplate); // 切换图表，先关闭详情弹窗
    const { unit: unitLayerIds } = LayerIds;
    RemoveLayer(_MAP_, unitLayerIds.point); // 删除图层
    RemoveLayer(_MAP_, unitLayerIds.namePlate); // 删除图层
    _MAP_.off('click', unitLayerIds.point, this._clickPopLayer);
    _MAP_.off('click', unitLayerIds.namePlate, this._clickPopLayer);
    // 有子类，需要请求子类数据
    if (visible && hasSecType) {
      this._fetchData();
      _MAP_.on('moveend', this._fetchData);
      _MAP_.on('click', unitLayerIds.point, this._clickPopLayer);
      _MAP_.on('click', unitLayerIds.namePlate, this._clickPopLayer);
    } else if (visible && !hasSecType) {
      this._fetchMapData();
      _MAP_.on('moveend', this._fetchMapData);
      _MAP_.on('click', unitLayerIds.point, this._clickPopLayer);
      _MAP_.on('click', unitLayerIds.namePlate, this._clickPopLayer);
    } else if (!visible) {
      _MAP_.off('moveend', this._fetchData);
      _MAP_.off('moveend', this._fetchMapData);
    }
  };

  _clickPopLayer = e => {
    const _zoom = _MAP_.getZoom();
    const { lngLat, originalEvent, features } = e;
    const { code, enableClick } = features[0].properties;
    if (_zoom >= 16) {
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

  _selectMenu = async (e, item) => {
    e && e.stopPropagation();
    const { code } = item;
    const { selectedValue } = this.state;
    const _selectedVal = selectedValue === code ? '' : code;
    await this.setState({ selectedValue: _selectedVal });
    this._fetchMapData();
  };

  _fetchData = () => {
    this._fetchMapData();
    this._fetchDetailNum();
  };

  _fetchMapData = () => {
    const _zoom = _MAP_.getZoom();
    _zoom < 16 ? this._fetchUnitData() : this._fetchNameplateData();
  };

  _fetchUnitData = async () => {
    const { unit } = GlobalConst.policeData;
    const { pCode, selectedValue, unitType } = this.state;
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    let _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&level=${_zoom}&type=${typeMap[unitType]}&tzbhbm=`;
    if (!selectedValue) {
      _param += pCode;
    } else {
      _param += selectedValue;
    }
    const { res, err } = await GetDistribution(_param);
    const { visible } = this.state;
    if (!visible) return;
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    // todo 显示到地图上
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
  _fetchNameplateData = async () => {
    const { pCode, selectedValue, unitType } = this.state;
    const _uuid = (this._uuid = CreateUid());
    const _bounds = _MAP_.getBounds();
    // minX=120&maxX=125&minY=36.4&maxY=37&type=BHDW&code=999&subCode=252
    let _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&type=${typeMap[unitType]}&code=${pCode}`;
    if (selectedValue) _param += `&subCode=${selectedValue}`;
    const { res, err } = await GetNameplate(_param);
    const { visible } = this.state;
    if (!visible) return;
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
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

  _fetchDetailNum = async () => {
    const { unitType } = this.state;
    const _bounds = _MAP_.getBounds();
    // minX=120&maxX=125&minY=36.4&maxY=37&type=BHDW
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&type=${typeMap[unitType]}`;
    const { res, err } = await GetSubCatalogs(_param);
    if (!res || err) return;
    const { visible } = this.state;
    if (!visible) return;
    this.setState({ detailArr: res });
  };
}

const typeMap = { special: 'TZDW', protect: 'BHDW' };
