const layerId = 'playground-ref';

export default [
  {
    id: 'PLAYGROUND_BG',
    type: 'fill',
    source: 'bff-tile-source',
    'source-layer': '340401',
    filter: ['!=', 'NAME', '操场'],
    paint: {
      'fill-color': 'rgb(204, 177, 134)',
      'fill-opacity': 1,
      'fill-antialias': false
    },
    labelLayerId: layerId
  },
  {
    id: 'PLAYGROUND',
    type: 'fill',
    source: 'bff-tile-source',
    'source-layer': '340401',
    filter: ['==', 'NAME', '操场'],
    paint: {
      'fill-color': '#8edb98',
      'fill-opacity': 1,
      'fill-antialias': false
    },
    labelLayerId: layerId
  }
];
