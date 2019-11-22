import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import {
  CreateUid,
  RemoveLayer,
  AddImageLayer,
  LayerIds,
  GlobalEvent,
  GloEventName,
  IsEmpty,
  GlobalConst
} from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import { TuyunMessage } from 'tuyun-kit';

import {
  GetIdSearch,
  GetUnitData,
  GetPoiData,
  GetCarData,
  GetCaseResult,
  GetPoliceResult,
  GetPoliceCarResult
} from './webapi';
import { SearchValue } from './constant';
import Event, { EventName } from './event';

export default class BaseSearch extends Component {
  state = {
    curNav: {},
    optsVisible: false,
    curType: searchList[0] || {}
  };

  _inputVal = '';

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { curNav, curType, optsVisible } = this.state;
    if (SearchValue.base !== curNav.value) return null;
    return (
      <div className="search-type">
        <div className="current-type" onClick={() => this._toggleOptions()}>
          <div>{curType.label || '基础搜索'}</div>
          {optsVisible ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <ul className={`search-options ${optsVisible ? '' : 'hidden'}`}>
            {searchList.map((item, index) => {
              return (
                <li
                  key={`search_list_${index}`}
                  className={`option-item${
                    item === curType ? ' selected' : ''
                  }`}
                  onClick={() => this._selectOption(item)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeSearchNav, nextNav => {
      const { curNav, curType } = this.state;
      if (nextNav === curNav) return;
      this.setState({ curNav: nextNav, optsVisible: false });
      Event.emit(EventName.changeSearchType, curType); // 切换 nav
    });
    Event.on(EventName.clickSearchBtn, () => {
      const { curNav, curType } = this.state;
      if (curNav.value !== SearchValue.base) return;
      if (curType.value === 'idCard') {
        this._fetchIdCard();
      } else if (curType.value === 'carNumber') {
        this._fetchCarNumber();
      } else if (curType.value === 'unitName') {
        this._fetchUnitName();
      } else if (curType.value === 'placeName') {
        this._fetchPlaceName();
      } else if (curType.value === 'caseName') {
        this._fetchCaseData();
      } else if (curType.value === 'policeCar') {
        this._fetchPoliceCar();
      } else if (curType.value === 'policeNum') {
        this._fetchPoliceData();
      }
    });
    Event.on(EventName.changeInputVal, value => {
      this._inputVal = value;
      const { searchResult: SearchLayerIds } = LayerIds;
      if (!this._inputVal) {
        GlobalEvent.emit(GloEventName.showSearchResult, { visible: false });
        RemoveLayer(_MAP_, SearchLayerIds.point);
        GlobalEvent.emit(GloEventName.closePopupUnit);
      }
    });
  };

  _init = () => {
    const { searchResult: SearchLayerIds } = LayerIds;
    _MAP_.on('click', SearchLayerIds.point, e => {
      const { type, code } = e.features[0].properties;
      if (type === searchType.baseUnitName) {
        const { showPopupUnit } = GloEventName;
        const { coordinates: lngLat } = e.features[0].geometry;
        const { x, y } = _MAP_.project(lngLat);
        GlobalEvent.emit(showPopupUnit, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          code: code,
          lngLat: lngLat
        });
      } else if (type === searchType.basePlaceName) {
        const { name, kind } = e.features[0].properties;
        const { coordinates } = e.features[0].geometry;
        GlobalEvent.emit(GloEventName.showSearchResult, {
          visible: true,
          detailInfo: { kind, name, x: coordinates[0], y: coordinates[1] },
          type
        });
      } else if (type === searchType.baseCaseName) {
        const { ajbh } = e.features[0].properties;
        const { coordinates: lngLat } = e.features[0].geometry;
        const { x, y } = _MAP_.project(lngLat);
        GlobalEvent.emit(GloEventName.showPopupCase, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          code: ajbh,
          lngLat: lngLat
        });
      } else {
        GlobalEvent.emit(GloEventName.showSearchResult, { visible: true });
      }
    });
    Event.emit(EventName.changeSearchType, searchList[0]);
  };

  // 人员查找
  _fetchIdCard = async () => {
    let _param = `idCard=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    const { res, err } = await GetIdSearch(_param);
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    if (this._uuid !== _uuid) return;
    const { x, y } = res;
    GlobalEvent.emit(GloEventName.showSearchResult, {
      visible: true,
      type: searchType.baseIdCard,
      detailInfo: res
    });
    _MAP_.flyTo({ center: [x, y], zoom: 10 });
    const _features = [TurfPoint([x, y])];
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult: SearchLayerIds } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, SearchLayerIds.point, {
      iconImage: 'landmark'
    });
  };

  // 车牌查询
  _fetchCarNumber = async () => {
    const _param = `plateName=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    const { res, err } = await GetCarData(_param);
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    if (this._uuid !== _uuid) return;
    const { x, y } = res;
    GlobalEvent.emit(GloEventName.showSearchResult, {
      visible: true,
      type: searchType.baseCarNumber,
      detailInfo: res
    });
    _MAP_.flyTo({ center: [x, y], zoom: 10 });
    const _features = [TurfPoint([x, y])];
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult: SearchLayerIds } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, SearchLayerIds.point, {
      iconImage: 'landmark'
    });
  };

  // 警员查找 objectId=37140000000004288
  _fetchPoliceData = async () => {
    const _param = `objectId=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    const { res, err } = await GetPoliceResult(_param);
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    console.log('res', res);
    if (this._uuid !== _uuid) return;
    const { x, y, objectId } = res;
    GlobalEvent.emit(GloEventName.showSearchResult, {
      visible: true,
      type: searchType.policeNum,
      detailInfo: res
    });
    const _features = [TurfPoint([x, y])];
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, searchResult.point, {
      iconImage: 'landmark'
    });
  };

  // 警车查找 objectId=37010000000019406
  _fetchPoliceCar = async () => {
    const _param = `objectId=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    const { res, err } = await GetPoliceCarResult(_param);
    console.log('res', res);
    const { 0: x, 1: y } = res.gpsPoints[0];
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    if (this._uuid !== _uuid) return;
    // GlobalEvent.emit(GloEventName.showSearchResult, {
    //   visible: true,
    //   type: searchType.policeCar,
    //   detailInfo: res
    // });
    const _features = [TurfPoint([x, y])];
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, searchResult.point, {
      iconImage: 'ic_map_policecar'
    });
  };

  // 单位名称查找
  _fetchUnitName = async () => {
    const _param = `unitName=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    GlobalEvent.emit(GloEventName.showGlobalLoading);
    const { res, err } = await GetUnitData(_param);
    GlobalEvent.emit(GloEventName.closeGlobalLoading);
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    if (this._uuid !== _uuid) return;
    const _features = res.map(item => {
      const { x, y, zagldwbm } = item;
      return TurfPoint([x, y], {
        radius: 6,
        code: zagldwbm,
        type: searchType.baseUnitName
      });
    });
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, searchResult.point, {
      iconImage: 'landmark'
    });
  };

  // 地点名称查找
  _fetchPlaceName = async () => {
    const _param = `poiName=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    GlobalEvent.emit(GloEventName.showGlobalLoading);
    const { res, err } = await GetPoiData(_param);
    GlobalEvent.emit(GloEventName.closeGlobalLoading);
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    if (this._uuid !== _uuid) return;
    const _features = res.map(item => {
      const { x, y, kind, name } = item;
      return TurfPoint([x, y], {
        // radius: 6,
        type: searchType.basePlaceName,
        kind: kind,
        name: name
      });
    });
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult: SearchLayerIds } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, SearchLayerIds.point, {
      iconImage: 'landmark'
    });
  };

  // 案件名称/案件编号搜索
  _fetchCaseData = async () => {
    const _param = `option=${this._inputVal}`;
    const _uuid = (this._uuid = CreateUid());
    GlobalEvent.emit(GloEventName.showGlobalLoading);
    const { res, err } = await GetCaseResult(_param);
    GlobalEvent.emit(GloEventName.closeGlobalLoading);
    if (IsEmpty(res) || err) return TuyunMessage.info('未查询到对应信息');
    if (this._uuid !== _uuid) return;
    const _features = res.map(item => {
      const { x, y, ajbh, ajmc } = item;
      return TurfPoint([x, y], {
        type: searchType.baseCaseName,
        ajbh: ajbh,
        ajmc: ajmc
      });
    });
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    const { searchResult: SearchLayerIds } = LayerIds;
    AddImageLayer(_MAP_, _geoJSONDataPoint, SearchLayerIds.point, {
      iconImage: 'landmark'
    });
  };

  _toggleOptions = () => {
    const { optsVisible } = this.state;
    this.setState({ optsVisible: !optsVisible });
  };

  _selectOption = option => {
    const { curType } = this.state;
    if (curType === option) return;
    const { searchResult: SearchLayerIds } = LayerIds;
    GlobalEvent.emit(GloEventName.showSearchResult, { visible: false });
    RemoveLayer(_MAP_, SearchLayerIds.point);
    this.setState({ curType: option });
    GlobalEvent.emit(GloEventName.closePopupUnit);
    Event.emit(EventName.changeSearchType, option);
  };
}

const { searchType } = GlobalConst;

const searchList = [
  { label: '地点', value: 'placeName', placeholder: '输入地点名称' },
  { label: '人员', value: 'idCard', placeholder: '输入身份证号' },
  { label: '车辆', value: 'carNumber', placeholder: '输入车牌号' },
  { label: '单位', value: 'unitName', placeholder: '输入单位名称' },
  { label: '案件', value: 'caseName', placeholder: '输入案件名称或编号' },
  { label: '警员', value: 'policeNum', placeholder: '输入警员信息' },
  { label: '警车', value: 'policeCar', placeholder: '输入警车信息' }
];
