import React, { Component } from 'react';
import CustomLayer from './custom-layer';
import Lnglat from './lnglat';

export default class index extends Component {
  state = {
    scale: 5e-8
  };

  _shouldRemove = false;

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="add-custom">
        <div className="custom-row">
          缩放比例：
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
    _MAP_.on('style.load', () => {
      this._loadModels();
    });
    // .on('moveend', () => {
    //   this._loadModels(true);
    // });
  };

  _loadModels = () => {
    const { scale } = this.state;
    const _bounds = _MAP_.getBounds();
    const buildings = Lnglat.filter((item, index) => {
      const { lnglat } = item;
      if (
        lnglat[0] < _bounds._ne.lng &&
        lnglat[0] > _bounds._sw.lng &&
        lnglat[1] < _bounds._ne.lat &&
        lnglat[1] > _bounds._sw.lat
      )
        return true;
    });

    for (let item of buildings) {
      this._shouldRemove && _MAP_.removeLayer('model-' + item.id);
      const { lnglat } = item;
      _MAP_.addLayer(
        new CustomLayer(
          lnglat[0],
          lnglat[1],
          0,
          'model-' + item.id,
          `http://47.110.135.245:12808/static/test/${item.id}.gltf`,
          scale
        ),
        'GHYDPL_7L_NAME'
      );
    }
    if (!this._shouldRemove) this._shouldRemove = true;
  };

  _changeScale = async w => {
    const { scale } = this.state;
    this.setState({ scale: w * scale });
    this._loadModels();
  };
}
