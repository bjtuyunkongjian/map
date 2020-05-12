const lineLabelLayerId = 'line-gd-ref';
const lineBgLabelLayerId = 'line-gd-ref';
const minzoom = 16.5;

const roads = [
  'dushigaosulu',
  'gaosugonglu',
  'guodao',
  'jiujilu',
  'qitadaolu',
  'shengdao',
  'xiandao',
  'xiangzhendaolu',
];

const layers = [];

for (let item of roads) {
  const bgLayer = {
    id: `siwei_${item}_bg`,
    type: 'line',
    source: 'road-siwei',
    'source-layer': item,
    minzoom,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': {
        base: 1,
        stops: [
          [7, 14],
          [20, 42],
        ],
      },
      'line-color': '#AAAAAA',
    },
    labelLayerId: lineBgLabelLayerId,
  };
  layers.push(bgLayer);
  // 中线
  const preLayer = {
    id: `siwei_${item}`,
    type: 'line',
    source: 'road-siwei',
    'source-layer': item,
    minzoom,
    layout: {
      'line-join': 'round',
      'line-cap': 'butt',
    },
    paint: {
      'line-width': {
        base: 1,
        stops: [
          [7, 1],
          [21, 3],
        ],
      },
      'line-color': '#ffffff',
      'line-dasharray': [3, 7],
    },
    labelLayerId: lineLabelLayerId,
  };
  layers.push(preLayer);
}

export default layers;
