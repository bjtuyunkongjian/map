import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import {
  IsEmpty,
  GloEventName,
  GlobalEvent,
  RemoveLayer,
  AddCircleLayer,
  AddImageLayer,
  LayerIds
} from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import { SearchValue } from './constant';
import Event, { EventName } from './event';
import { DrawMultiPolygon, DrawCircle } from './draw-geo';
import { PostPolygonSearch, GetCircleSearch } from './webapi';

export default class PolySearch extends Component {
  state = {
    curType: polyList[0] || {},
    typeOptVisible: false,
    shapeOptVisible: false,
    curNav: {},
    curPoly: polyType[0] || {}
  };

  _geoInfo = {}; // geo 对应的信息
  _mapCanvas; // 地图底图 dom 元素

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const {
      curType,
      typeOptVisible,
      shapeOptVisible,
      curNav,
      curPoly
    } = this.state;
    if (SearchValue.polygon !== curNav.value) return null;
    return (
      <div className="search-type">
        <div className="current-type" onClick={() => this._changeOption()}>
          <div>{curType.label || '多边形搜索'}</div>
          {typeOptVisible ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <ul className={`search-options${typeOptVisible ? '' : ' hidden'}`}>
            {polyList.map((item, index) => {
              return (
                <li
                  key={`search_list_${index}`}
                  className={`option-item${
                    item === curType ? ' selected' : ''
                  }`}
                  onClick={() => this._selectItem(item)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="current-type" onClick={() => this._selectPolygon()}>
          <div>{curPoly.label || '多边形'}</div>
          {shapeOptVisible ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <ul className={`search-options${shapeOptVisible ? '' : ' hidden'}`}>
            {polyType.map((item, index) => {
              return (
                <li
                  key={`polygon_list_${index}`}
                  className={`option-item${
                    item === curPoly ? ' selected' : ''
                  }`}
                  onClick={() => this._changePoly(item)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="check-area" onClick={() => this._checkArea()}>
          <div>选择区域</div>
        </div>
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeSearchNav, nextNav => {
      const { curNav } = this.state;
      if (nextNav === curNav) return;
      this.setState({
        curNav: nextNav,
        typeOptVisible: false,
        shapeOptVisible: false
      });
    });
    Event.on(EventName.clickSearchBtn, () => {
      const { curNav } = this.state;
      if (curNav.value !== SearchValue.polygon) return;
      this._fetchGeoData();
    });
    Event.on(EventName.createFinalGeo, geoInfo => (this._geoInfo = geoInfo));
  };

  _init = () => {
    this._mapCanvas = _MAP_.getCanvas();
    const { polyAreaReasult } = LayerIds;
    _MAP_.on('click', polyAreaReasult.point, e => {
      const { type, code, name } = e.features[0].properties;
      const { coordinates: lngLat } = e.features[0].geometry;
      const { x, y } = _MAP_.project(lngLat);
      if (type === 'case') {
        GlobalEvent.emit(GloEventName.showPopupCase, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          lngLat: lngLat,
          code: code
        });
      } else if (type === 'policeSituation') {
        GlobalEvent.emit(GloEventName.showPopupSituation, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          lngLat: lngLat,
          code: code
        });
      } else if (type === 'specialCompany' || type === 'protectCompany') {
        GlobalEvent.emit(GloEventName.showPopupUnit, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          lngLat: lngLat,
          code: code
        });
      } else if (type === 'importantPerson') {
        GlobalEvent.emit(GloEventName.showPopupPopulation, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          lngLat: lngLat,
          code: code
        });
      } else if (type === 'camera') {
        const { cameraurl } = e.features[0].properties;
        const { coordinates: lngLat } = e.features[0].geometry;
        GlobalEvent.emit(GloEventName.showCamera, {
          visible: true,
          boxLeft: x,
          boxTop: y,
          lngLat: lngLat,
          code: code,
          name: name,
          cameraurl: cameraurl
        });
      }
    });
  };

  _changeOption = () => {
    const { typeOptVisible } = this.state;
    const { polyAreaReasult } = LayerIds;
    this.setState({ typeOptVisible: !typeOptVisible, shapeOptVisible: false });
    RemoveLayer(_MAP_, polyAreaReasult.point);
  };

  _selectItem = option => {
    this.setState({ curType: option });
  };

  _selectPolygon = () => {
    const { shapeOptVisible } = this.state;
    this.setState({ shapeOptVisible: !shapeOptVisible, typeOptVisible: false });
  };

  _changePoly = option => this.setState({ curPoly: option });

  _checkArea = () => {
    const { curPoly } = this.state;
    if (curPoly.value === 'polygon') {
      DrawMultiPolygon();
    } else {
      DrawCircle();
    }
  };

  _fetchGeoData = async () => {
    if (IsEmpty(this._geoInfo)) return TuyunMessage.info('请绘制对应图形'); // 没有图形信息
    const { curType, curPoly } = this.state;
    const { showGlobalLoading, closeGlobalLoading } = GloEventName;
    GlobalEvent.emit(showGlobalLoading);
    let res, err;
    if (curPoly.value === 'polygon') {
      const { geometry } = this._geoInfo;
      const _body = {
        type: curType.value,
        polygon: geometry
      };
      const { res: pRes, err: pErr } = await PostPolygonSearch(_body);
      res = pRes;
      err = pErr;
    } else {
      const { geometry, radius } = this._geoInfo;
      const _param = `type=${curType.value}&point=${JSON.stringify(
        geometry
      )}&radius=${radius}`;
      const { res: pRes, err: pErr } = await GetCircleSearch(encodeURI(_param));
      res = pRes;
      err = pErr;
    }
    GlobalEvent.emit(closeGlobalLoading);
    if (!res || err) return TuyunMessage.info('未搜到任何数据');
    // 显示数据
    if (curType.value === 'camera') {
      const _features = res.map(item => {
        const { longitude, latitude, kdid, name, url } = item;
        if (item.url) {
          console.log(item, res.indexOf(item));
        }
        return TurfPoint([longitude, latitude], {
          code: kdid,
          type: curType.value,
          name: name,
          cameraurl: url
        });
      });
      const _geoJSON = {
        type: 'geojson',
        data: FeatureCollection(_features)
      };
      const { polyAreaReasult } = LayerIds;
      AddImageLayer(_MAP_, _geoJSON, polyAreaReasult.point, {
        iconImage: 'camera_important'
      });
    } else {
      const _features = res.map(item => {
        const { x, y, ajbh, jjdbh, ZAGLDWBM, RKBM } = item;
        return TurfPoint([x, y], {
          code: ajbh || jjdbh || ZAGLDWBM || RKBM,
          type: curType.value
        });
      });
      const _geoJSONDataPoint = {
        type: 'geojson',
        data: FeatureCollection(_features)
      };
      const { polyAreaReasult } = LayerIds;
      AddCircleLayer(_MAP_, _geoJSONDataPoint, polyAreaReasult.point, {
        radius: 5
      });
    }
  };
}

const polyList = [
  { label: '案件', value: 'case' },
  { label: '摄像头', value: 'camera' },
  { label: '警情', value: 'policeSituation' },
  { label: '特种单位', value: 'specialCompany' },
  { label: '保护单位', value: 'protectCompany' },
  { label: '重点人员', value: 'importantPerson' }
];

const polyType = [
  { label: '多边形', value: 'polygon' },
  { label: '圆形', value: 'circle' }
];
