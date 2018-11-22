import turf from 'turf';

export function MeasureDistance() {
  _MAP_.on('load', () => {
    if (_MAP_.getSource('measure-distance')) return; // 做个保护
    _MAP_
      .addSource('measure-distance', {
        type: 'geojson',
        data: _distanceGeojson
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
        }
      });
    _MAP_.on('click', e => {
      const { selectedMeasure } = this.state;
      if (selectedMeasure !== 0) {
        return;
      }
      var features = _MAP_.queryRenderedFeatures(e.point, {
        layers: ['measure-points']
      });
      if (_distanceGeojson.features.length > 1) _distanceGeojson.features.pop();
      distanceContainer.innerHTML = '';
      if (features.length) {
        var id = features[0].properties.id;
        _distanceGeojson.features = _distanceGeojson.features.filter(function(
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
        _distanceGeojson.features.push(point);
      }
      if (_distanceGeojson.features.length > 1) {
        _linestring.geometry.coordinates = _distanceGeojson.features.map(
          point => point.geometry.coordinates
        );
        _distanceGeojson.features.push(_linestring);
        var value = document.createElement('pre');
        value.textContent =
          '总距离：' + turf.lineDistance(_linestring).toLocaleString() + 'km';
        distanceContainer.appendChild(value);
      }
      _MAP_.getSource('measure-distance').setData(_distanceGeojson);
    });

    _MAP_.on('contextmenu', ClearDistanceLine);
  });
}

export function ClearDistanceLine() {
  _distanceGeojson.features = [];
  _MAP_.getSource('measure-distance') &&
    _MAP_.getSource('measure-distance').setData(_distanceGeojson); // 保护
  distanceContainer.innerHTML = '';
}

const _distanceGeojson = {
  type: 'FeatureCollection',
  features: []
};

const _linestring = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: []
  }
};
const distanceContainer = document.getElementById('distance');
