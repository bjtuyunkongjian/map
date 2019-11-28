import { MapSource } from '../constant';
import { Layout } from './common';

const TieLu = [
  {
    id: 'tielu_bg', // 记录了铁路，底层颜色灰色
    type: 'line',
    source: MapSource,
    'source-layer': 'TRA_LRR_LN', // LN，line的简写
    layout: Layout,
    paint: {
      'line-color': '#B6B3B7',
      'line-width': 2.4
    }
  },
  {
    id: 'tielu', // 记录了铁路，间隔白色
    type: 'line',
    source: MapSource,
    'source-layer': 'TRA_LRR_LN', // LN，line的简写
    layout: Layout,
    paint: {
      'line-color': '#FFFFFF',
      'line-dasharray': [5, 5],
      'line-width': 1.6
    }
  }
];

export default TieLu;
