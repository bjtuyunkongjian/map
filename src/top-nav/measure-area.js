import turf from 'turf';

export function MeasureArea() {
  _MAP_.on('load', () => {
    if (_MAP_.getSource('measure-area')) return; // 做个保护
    _MAP_
      .addSource('measure-area', {
        type: 'geojson',
        data: _areaGeojson
      })
      .addLayer({
        id: 'measure-vertex',
        type: 'circle',
        source: 'measure-area',
        paint: {
          'circle-radius': 5,
          'circle-color': '#000'
        },
        filter: ['in', '$type', 'Point']
      })
      .addLayer({
        id: 'measure-polygon',
        type: 'fill',
        source: 'measure-area',
        layout: {},
        paint: {
          'fill-color': '#c4daf6',
          'fill-opacity': 0.8,
          'fill-antialias': false
        }
      });
    _MAP_.on('click', e => {
      const { selectedMeasure } = this.state;
      if (selectedMeasure !== 1) return; // 根据 selectedMeasure 来判断
      var features = _MAP_.queryRenderedFeatures(e.point, {
        layers: ['measure-vertex']
      });
      if (_areaGeojson.features.length > 2) _areaGeojson.features.pop();
      distanceContainer.innerHTML = '';
      if (features.length) {
        var id = features[0].properties.id;
        _areaGeojson.features = _areaGeojson.features.filter(function(point) {
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
        _areaGeojson.features.push(point);
      }
      if (_areaGeojson.features.length > 2) {
        _areaString.geometry.coordinates = [
          _areaGeojson.features.map(point => point.geometry.coordinates)
        ];
        _areaGeojson.features.push(_areaString);
        var value = document.createElement('pre');
        const _totalArea =
          turf.area(_areaString) > 10 ** 6
            ? `${(turf.area(_areaString) / 10 ** 6).toLocaleString()} 平方千米`
            : `${turf.area(_areaString).toLocaleString()} 平方米`;

        value.textContent = `总面积：${_totalArea}`;

        distanceContainer.appendChild(value);
      }
      _MAP_.getSource('measure-area').setData(_areaGeojson);
    });

    _MAP_.on('contextmenu', ClearAreaPolygon);
  });
}

export function ClearAreaPolygon() {
  _areaGeojson.features = [];
  _MAP_.getSource('measure-area') &&
    _MAP_.getSource('measure-area').setData(_areaGeojson); // 保护
  distanceContainer.innerHTML = '';
}

const _areaGeojson = {
  type: 'FeatureCollection',
  features: []
};

const _areaString = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: []
  }
};

const distanceContainer = document.getElementById('distance');
