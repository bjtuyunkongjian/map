import React, { Component } from 'react';
import { FetchRequest } from 'tuyun-utils';
import CustomLayer from './custom-layer';
export default class index extends Component {
  state = {
    scale: 8e-9,
  };

  _shouldRemove = false;
  _customLayer = undefined;
  _visibleLv = 16.5;

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="add-custom">
        <div className="custom-row">
          模型缩放比例：
          <div className="custom-btn" onClick={() => this._changeScale(2)}>
            增加
          </div>
          <div className="custom-btn" onClick={() => this._changeScale(0.5)}>
            减小
          </div>
        </div>
      </div>
    );
  }

  _init = () => {
    _MAP_
      .on('style.load', () => {
        this._loadModels();
      })
      .on('moveend', () => {
        this._loadModels();
      });
  };

  _loadModels = async () => {
    const _zoom = _MAP_.getZoom();
    // 小于 _visibleLv 级，删除对应图层
    if (_zoom < this._visibleLv) {
      this._customLayer = undefined;
      return this._removeBuilding('model-custom');
    }
    // 获取屏幕范围
    const _bounds = _MAP_.getBounds();
    // 获取新的建筑物
    const _url = `mod/getPointKey?minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}`;
    const { res, err } = await FetchRequest({ url: _url });
    if (err || !res) return console.log('没获取到返回数据');
    const _modelArr = [];
    // const _features = [];
    for (let item of res) {
      const { lnglat, id } = item;
      const [x, y] = lnglat;
      // 文字
      // _features.push(TurfPoint([x, y], { text: id }));
      // 模型
      _modelArr.push({
        url: `http://47.97.230.212:8082/models/${id}.gltf`,
        lng: x,
        lat: y,
        altitude: 0,
        name: `side-${id}`,
      });
    }
    // // 添加文字
    // const _geoJSONData = {
    //   type: 'geojson',
    //   data: FeatureCollection(_features)
    // };
    // AddTextLayer(_MAP_, _geoJSONData, 'building-id');

    // 添加模型
    const _center = _MAP_.getCenter();
    if (!this._customLayer) {
      this._customLayer = new CustomLayer({
        center: [_center.lng, _center.lat],
        id: 'model-custom',
        modelArr: _modelArr,
        bounds: _bounds,
      });
      _MAP_.addLayer(this._customLayer);
    } else {
      this._customLayer.updateModel({
        center: [_center.lng, _center.lat],
        modelArr: _modelArr,
        bounds: _bounds,
      });
    }
  };

  _changeScale = async (w) => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });
  };

  _removeBuilding = (id) => _MAP_.getLayer(id) && _MAP_.removeLayer(id);
}
