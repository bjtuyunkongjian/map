import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';
import turf from 'turf';

export default class MeasureOptions extends Component {
  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  componentDidMount() {
    _MAP_ && this._init();
  }

  render() {
    const { selectedOpt } = this.props;

    const _optItems = measureOptions.map((item, index) => (
      <li
        className="option-item"
        key={`nav_option_${index}`}
        onClick={() => this._checkStyle(index)}
      >
        {item.name}
        {selectedOpt === index ? <MdCheck /> : null}
      </li>
    ));

    return _optItems;
  }

  _init = () => {
    this._measureDistance();
  };

  _measureDistance = () => {
    if (_MAP_.getSource('measure-distance')) return;
    _MAP_
      .addSource('measure-distance', {
        type: 'geojson',
        data: distanceGeojson
      })
      .addLayer({
        id: 'measure-points',
        type: 'circle',
        source: 'measure-distance',
        paint: {
          'circle-radius': 5,
          'circle-color': '#000'
        },
        filter: ['in', '$type', 'Point']
      })
      .addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'measure-distance',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#000',
          'line-width': 2.5
        },
        filter: ['in', '$type', 'LineString']
      })
      .on('click', e => {
        const { selectedOpt } = this.props;

        if (selectedOpt !== 0) {
          distanceGeojson.features = [];
          _MAP_.getSource('measure-distance').setData(distanceGeojson);
          return;
        }
        var features = _MAP_.queryRenderedFeatures(e.point, {
          layers: ['measure-points']
        });
        if (distanceGeojson.features.length > 1) distanceGeojson.features.pop();
        distanceContainer.innerHTML = '';
        if (features.length) {
          var id = features[0].properties.id;
          distanceGeojson.features = distanceGeojson.features.filter(function(
            point
          ) {
            return point.properties.id !== id;
          });
        } else {
          var point = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [e.lngLat.lng, e.lngLat.lat]
            },
            properties: {
              id: String(new Date().getTime())
            }
          };

          distanceGeojson.features.push(point);
        }

        if (distanceGeojson.features.length > 1) {
          linestring.geometry.coordinates = distanceGeojson.features.map(
            function(point) {
              return point.geometry.coordinates;
            }
          );
          distanceGeojson.features.push(linestring);
          var value = document.createElement('pre');
          value.textContent =
            '总距离：' + turf.lineDistance(linestring).toLocaleString() + 'km';
          distanceContainer.appendChild(value);
        }

        _MAP_.getSource('measure-distance').setData(distanceGeojson);
      });
  };

  _checkStyle = index => {
    const { onSelect, selectedOpt } = this.props;
    if (index !== selectedOpt) {
      distanceGeojson.features = [];
      _MAP_.getSource('measure-distance').setData(distanceGeojson);
      distanceContainer.innerHTML = '';
    }
    onSelect(index);
  };
}

const measureOptions = [
  { value: 0, name: '测距' },
  { value: 1, name: '测面' },
  { value: 2, name: '标点' }
];

const distanceGeojson = {
  type: 'FeatureCollection',
  features: []
};

const linestring = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: []
  }
};

const distanceContainer = document.getElementById('distance');
