import Guodao from './road-guodao';
import RoadShengdao from './road-shengdao';
import XianDao from './road-xiandao';
import Gjl from './road-gjl';
import Ksl from './road-ksl';
import Zgd from './road-zgd';
import ZaDao from './road-zadao';
import Cgd from './road-cgd';
import XiangDao from './road-xiangdao';
import Zx from './road-zx';

const _visibleLevel = 7;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    'road-source': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://192.168.8.107:12808/originMapServer/string?test=200&type=tms&zoom={z}&row={x}&column={y}'
      ]
    }
  },
  layers: [
    ...Zx,
    ...XiangDao,
    ...Ksl,
    ...Cgd,
    ...ZaDao,
    ...Gjl,
    ...Zgd,
    ...XianDao,
    ...RoadShengdao,
    ...Guodao
  ]
};

export default style;
