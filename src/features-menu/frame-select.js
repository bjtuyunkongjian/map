/**
 * @author sl204984
 * 框选
 */
import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import {
  point as TurfPoint,
  polygon as TurfPolygon,
  lineString as LineString,
  featureCollection as FeatureCollection
} from 'turf';
import {
  AddPolygonLayer,
  AddLineLayer,
  AddCircleLayer,
  RemoveLayer,
  LayerIds
} from 'tuyun-utils';

import Event, { EventName } from './event';
import MenuItems from './menu-items';

export default class FrameSelect extends Component {
  state = {
    curMenu: -1
  };

  _vertexClick = []; // 已点击的坐标
  _vertexMove; // 移动时对应的坐标
  _vertexTotal = []; // 所有的坐标
  _mapCanvas; // 地图底图 dom 元素
  _prompt; // 提示

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { curMenu } = this.state;
    const _selected = MenuItems.frameSelect === curMenu;
    return (
      <div
        className={`menu-item ${_selected ? 'checked' : ''}`}
        onClick={this._clickMenu}
      >
        框选
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeCurMenu, curMenu => {
      this.setState({ curMenu });
    });
  };

  _init = () => {
    this._mapCanvas = _MAP_.getCanvas();
  };

  _clickMenu = ev => {
    ev && ev.stopPropagation();
    const { curMenu } = this.state;
    this._vertexClick = [];
    this._vertexMove = [];
    this._vertexTotal = [];
    const _selected = MenuItems.frameSelect === curMenu;
    if (!_selected) {
      // 添加监听
      _MAP_.on('click', this._clickMap);
      _MAP_.on('mousemove', this._mouseMove);
      _MAP_.on('contextmenu', this._finishDraw);
      // 更改鼠标样式
      this._mapCanvas.style.cursor = 'crosshair';
    } else {
      // 移除监听
      _MAP_.off('click', this._clickMap);
      _MAP_.off('mousemove', this._mouseMove);
      _MAP_.off('contextmenu', this._finishDraw);
      this._mapCanvas.style.cursor = ''; // 清除鼠标样式
    }
    // 删除图层
    RemoveLayer(_MAP_, LayerIds.frameSelect.point);
    RemoveLayer(_MAP_, LayerIds.frameSelect.line);
    RemoveLayer(_MAP_, LayerIds.frameSelect.area);

    Event.emit(EventName.changeCurMenu, _selected ? -1 : MenuItems.frameSelect);
  };

  _clickMap = e => {
    const { lngLat } = e;
    this._vertexClick.push([lngLat.lng, lngLat.lat]);
    this._vertexTotal = [...this._vertexClick]; // 解构，而不是直接赋值
    if (this._vertexClick.length === 1) {
      this._prompt = new mapboxgl.Popup({
        offset: promptOffset,
        closeOnClick: false,
        closeButton: false
      })
        .setLngLat(lngLat)
        .setText('右键结束选择')
        .addTo(_MAP_);
    }
    this._drawSelectedArea();
  };

  _mouseMove = e => {
    if (this._vertexClick.length <= 0) return;
    const { lngLat } = e;
    this._vertexMove = [lngLat.lng, lngLat.lat];
    this._vertexTotal = [...this._vertexClick, this._vertexMove];
    this._prompt.setLngLat(lngLat);
    if (this._vertexTotal.length >= 2) {
      this._drawSelectedArea();
    }
  };

  _finishDraw = () => {
    this._vertexTotal = [...this._vertexClick]; // 解构，而不是直接赋值
    _MAP_.off('click', this._clickMap);
    _MAP_.off('mousemove', this._mouseMove);
    _MAP_.off('contextmenu', this._finishDraw);
    this._prompt.remove();
    this._mapCanvas.style.cursor = ''; // 清除鼠标样式
    if (this._vertexTotal.length >= 3) {
      this._drawSelectedArea();
      const _prompt = new mapboxgl.Popup()
        .setLngLat(this._vertexTotal[this._vertexTotal.length - 1])
        .setText('删除选中区域')
        .addTo(_MAP_);
      _prompt.on('close', this._deleteSelected); // 删除触发
    } else {
      this._deleteSelected();
    }
  };

  _deleteSelected = () => {
    const { curMenu } = this.state;
    RemoveLayer(_MAP_, LayerIds.frameSelect.point);
    RemoveLayer(_MAP_, LayerIds.frameSelect.line);
    RemoveLayer(_MAP_, LayerIds.frameSelect.area);
    const _selected = MenuItems.frameSelect === curMenu;
    if (_selected) {
      this.setState({ curMenu: -1 });
    }
  };

  _drawSelectedArea = () => {
    // 添加点
    if (this._vertexClick.length > 0) {
      const _geometryPoint = this._vertexClick.map(item =>
        TurfPoint(item, { radius: 3 })
      );
      const _geoJSONDataPoint = {
        type: 'geojson',
        data: FeatureCollection(_geometryPoint)
      };
      AddCircleLayer(_MAP_, _geoJSONDataPoint, LayerIds.frameSelect.point, {
        color: 'rgba(0,0,0,0)',
        strokeWidth: 2,
        strokeColor: '#4169E1',
        labelLayerId
      });
    }
    // 添加线图层
    if (this._vertexTotal.length > 1) {
      const _geometryL = LineString([
        ...this._vertexTotal,
        this._vertexTotal[0]
      ]);
      const _geoJSONDataL = {
        type: 'geojson',
        data: _geometryL
      };
      AddLineLayer(_MAP_, _geoJSONDataL, LayerIds.frameSelect.line, {
        color: '#4169E1',
        dasharray: [5, 5],
        labelLayerId
      });
    }
    // 添加面图层
    if (this._vertexTotal.length > 2) {
      const _geometryP = TurfPolygon([
        [...this._vertexTotal, this._vertexTotal[0]]
      ]);
      const _geoJSONDataPolygon = {
        type: 'geojson',
        data: _geometryP
      };
      AddPolygonLayer(_MAP_, _geoJSONDataPolygon, LayerIds.frameSelect.area, {
        color: 'rgba(255,0,0,0.5)',
        labelLayerId
      });
    }
  };
}

const labelLayerId = 'line-name-ref';
const promptOffset = {
  top: [2, 2]
};
