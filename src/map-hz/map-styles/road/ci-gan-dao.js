import { MapSource } from '../constant';
import { Layout, PaintCiGanDao } from './common';

const CiGanDao = [
  {
    id: 'cgd_bg',
    type: 'line',
    source: MapSource,
    'source-layer': 'CGD',
    layout: Layout,
    paint: PaintCiGanDao.bgRoad
  },
  {
    id: 'cgd',
    type: 'line',
    source: MapSource,
    'source-layer': 'CGD',
    layout: Layout,
    paint: PaintCiGanDao.road
  }
];

export default CiGanDao;
