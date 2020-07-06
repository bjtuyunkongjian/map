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

for (const item of roads) {
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
          [10, 15],
          [20, 30],
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

// 路名添加在道路上面
for (const item of roads) {
  const rdName = {
    id: `siwei_${item}_rd_name`,
    type: 'symbol',
    source: 'road-siwei',
    'source-layer': item,
    // filter: ['!=', 'CLASID', '430503'],
    layout: {
      'text-field': '{PathName}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': '#747474',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  };
  layers.push(rdName);
}

export default layers;
