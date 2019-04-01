/**
 * @author sl
 * @description 重点人员的详细分类
 */

import React, { Component } from 'react';
import {
  Event as GlobalEvent,
  EventName as GloEventName,
  CreateUid
} from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { FetchNameplateData, FetchHeatMapData, FetchDetailNum } from './webapi';
import { DetailTypeMap, PopulationLayerId } from './constant';
import {
  AddPointLayer,
  AddHeatMapLayer,
  AddNamePlateLayer,
  RemoveLayer
} from './layer-control';

export default class KeyPopDetail extends Component {
  state = {
    visible: false, // 是否显示
    hidden: false, // 是否隐藏，右侧菜单栏收进去的时候不显示弹框，但数据还是要加载
    pName: '',
    pCode: '',
    selectedItem: {},
    detailMap: {}
  };

  _uuid = -1;

  componentDidMount = () => this._init();

  render() {
    const { visible, pName, detailMap, selectedItem, hidden } = this.state;
    if (!visible) return null;
    const _typeArr = DetailTypeMap[pName];
    if (!_typeArr || _typeArr.length === 0) return null;
    return (
      <ul className={`keypop-detail ${hidden ? 'hidden' : ''}`}>
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

  _init = () => {
    this._dealWithEvent();
  };

  _dealWithEvent = () => {
    const { toggleKeyPopDetail, hideKeyPopDetail } = GloEventName;
    GlobalEvent.on(toggleKeyPopDetail, async ({ visible, name, code }) => {
      await this.setState({ visible, pName: name, pCode: code });
      if (visible) {
        this._fetchData(); // 获取接口数据
        _MAP_.on('moveend', this._fetchData);
      } else {
        _MAP_.off('moveend', this._fetchData);
      }
    });
    GlobalEvent.on(hideKeyPopDetail, ({ hidden }) => {
      this.setState({ hidden });
    });
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
    RemoveLayer(_MAP_, PopulationLayerId); // 删除图层
    const _features = res.map(item => {
      const { x, y, num, jzwbm } = item;
      return TurfPoint([x, y], { code: jzwbm, num, enableClick: true });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddNamePlateLayer(_MAP_, _geoJSONData); // 添加铭牌
  };

  // 获取点的数据
  _fetchHeatMap = async () => {
    const _uuid = (this._uuid = CreateUid());
    const { selectedItem = {}, pCode } = this.state;
    const _bounds = _MAP_.getBounds();
    const _reqCode = selectedItem.code || pCode;
    const { res, err } = await FetchHeatMapData({
      points: _bounds,
      sectype: _reqCode
    });
    if (!res || err) return;
    if (this._uuid !== _uuid) return; // 不是对应请求了
    RemoveLayer(_MAP_, PopulationLayerId); // 删除图层
    let _enableClick = false;
    if (res.length < 200) {
      _enableClick = true;
    }
    const _features = res.map(item => {
      const { ZXDHZB, ZXDZZB, RKBM } = item;
      return TurfPoint([ZXDHZB, ZXDZZB], {
        code: RKBM,
        enableClick: _enableClick
      });
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    // 点的个数大于 200，显示热力图
    if (res.length > 200) {
      AddHeatMapLayer(_MAP_, _geoJSONData);
    } else {
      // 点的个数小于 200，显示点位图
      AddPointLayer(_MAP_, _geoJSONData);
    }
  };

  // 获取 详细数据
  _fetchDetailMap = async () => {
    const { pCode } = this.state;
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchDetailNum({
      points: _bounds,
      type: pCode
    });
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
