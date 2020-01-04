/**
 * 警情详情
 */

import React, { Component } from 'react';
import {
  FormatDate,
  GlobalEvent,
  GloEventName,
  CreateUid,
  LayerIds,
  AddCircleLayer,
  RemoveLayer,
  GlobalConst
} from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { Getdistribution } from './webapi';

export default class DetailPosituation extends Component {
  state = {
    showUi: true,
    visible: false, // 是否显示
    hidden: false, // 是否隐藏，右侧菜单栏收进去的时候不显示弹框，但数据还是要加载
    pCode: '',
    selectedCode: '',
    detailArr: [],
    hasSecType: false
  };

  _start = '';
  _end = '';
  _uuid = { detailNum: -1, posiData: -1 };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, hidden, detailArr, selectedCode, showUi } = this.state;
    if (!visible || !showUi) return null;
    return (
      <ul
        className={`case-detail ${hidden ? 'hidden' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {detailArr.map((item, index) => {
          const _checked = selectedCode === item.code;
          return (
            <li
              key={`detail_item_${index}`}
              className={`detail-item ${_checked ? 'checked' : ''}`}
              onClick={() => this._selectMenu(item)}
            >
              <div className="item-label">{item.name}</div>
              <div className="item-count">{item.count}</div>
            </li>
          );
        })}
      </ul>
    );
  }

  _dealWithEvent = () => {
    GlobalEvent.on(
      GloEventName.toggleSituatuinDetail,
      this._onTogglePosiDetail
    );
    GlobalEvent.on(GloEventName.changeSituationDate, this._onChangePosiDate);
    GlobalEvent.on(
      GloEventName.toggleHidePoliceDetail,
      this._onToggleHidePosiDetail
    );
    GlobalEvent.on(GloEventName.toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onTogglePosiDetail = async ({ code, hasSecType }) => {
    const _visible = !!code;
    await this.setState({
      visible: _visible,
      pCode: code,
      selectedCode: '',
      detailArr: [],
      hidden: false,
      hasSecType
    });
    if (_visible && code) {
      this._addListener(); // 添加监听
      this._fetchPosiData(); // 获取警情数据
      // this._fetchDetailNum(); // 获取子类数据
    } else {
      this._uuid = { detailNum: -1, posiData: -1 };
      RemoveLayer(_MAP_, LayerIds.police.point); // 删除图层
      GlobalEvent.emit(GloEventName.closePopupSituation); // 关闭弹窗
      this._removeListener();
    }
  };

  _onChangePosiDate = dateMap => {
    const { pCode, hasSecType } = this.state;
    const {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate
    } = dateMap;
    this._start = FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    );
    this._end = FormatDate(new Date(endYear, endMonth, endDate), fmtType);
    if (pCode) {
      hasSecType && this._fetchDetailNum();
      this._fetchPosiData();
    }
  };

  _onToggleHidePosiDetail = ({ hidden }) => {
    this.setState({ hidden });
  };

  _fetchDetailNum = async () => {
    const { pCode, hasSecType } = this.state;
    if (!hasSecType) return;
    //  minX=&maxX=&minY=&maxY=&startTime=&endTime=&type=&level=
    const _uuid = (this._uuid.detailNum = CreateUid());
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&startTime=${this._start}&endTime=${
      this._end
    }&type=${pCode}&level=${_zoom}`;
    const { res, err } = await GetDetailNum(_param);
    if (!res || err) return;
    if (_uuid !== this._uuid.detailNum) return;
    res.sort((x, y) => y.count - x.count);
    this.setState({ detailArr: res });
  };

  _selectMenu = async item => {
    const { selectedCode } = this.state;
    const { code, count, name } = item;
    const _selectedCode = selectedCode === code ? '' : code;
    await this.setState({ selectedCode: _selectedCode });
    if (count > 0) {
      this._fetchPosiData();
    } else if (_selectedCode) {
      RemoveLayer(_MAP_, LayerIds.police.point);
      TuyunMessage.show(`${name}在该层级下数量为0`);
    }
  };

  _fetchPosiData = async () => {
    const _uuid = (this._uuid.posiData = CreateUid());
    const { pCode, selectedCode } = this.state;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    //minX=&maxX=&minY=&maxY=&beginTime=&endTime=&code=&level=
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&beginTime=${this._start}&endTime=${
      this._end
    }&code=${selectedCode || pCode}&level=${_zoom}`;
    const { res, err } = await Getdistribution(_param);
    if (!res || err) return;
    if (_uuid !== this._uuid.posiData) return;
    const { visible } = this.state;
    if (!visible) return;
    let _circleRadius,
      _enableClick = false;
    if (res.length < 200) {
      _circleRadius = 6;
      _enableClick = true;
    } else if (res.length < 1000) {
      _circleRadius = 3;
    } else {
      _circleRadius = 2;
    }
    const _features = res.map(item => {
      const { x, y, jjdbh } = item;
      return TurfPoint([x, y], {
        code: jjdbh, // 地址编码
        radius: _circleRadius,
        enableClick: _enableClick
      }); // 生成点数据
    });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    AddCircleLayer(_MAP_, _geoJSONData, LayerIds.police.point, {
      color: poSituation.color
    });
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchPosiData);
    // _MAP_.on('moveend', this._fetchDetailNum);
    _MAP_.on('click', LayerIds.police.point, this._clickPopLayer);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchPosiData);
    // _MAP_.off('moveend', this._fetchDetailNum);
    _MAP_.off('click', LayerIds.police.point, this._clickPopLayer);
  };

  _clickPopLayer = e => {
    const { lngLat, originalEvent, features } = e;
    const { code, enableClick } = features[0].properties;
    if (!enableClick) return;
    GlobalEvent.emit(GloEventName.showPopupSituation, {
      visible: true,
      boxLeft: originalEvent.x,
      boxTop: originalEvent.y,
      lngLat: lngLat,
      code: code
    });
  };
}

const fmtType = 'xxxx-xx-xx';
const { poSituation } = GlobalConst.policeData;
