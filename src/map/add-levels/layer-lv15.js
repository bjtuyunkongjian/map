/**
 * @author sl 2019-01-02
 * 部分线的type为symbol是只显示名称
 * todolist
 * 1. 路网图层CLASID不对，覆盖之前的国道，无法通过CLASID区分和过滤  ======> 高速覆盖国道
 * 2.三维建筑移到17层开始显示
 *
 * 妈耶 800+行，不忍直视 =_= !
 */
import { LevelConfig, BaseConfig } from 'tuyun-config';
// import { BuildingColor } from 'tuyun-utils';

const visibleLevel = 13;

// const jqLabelLayerId = 'jq-ref';
const threeLabelLayerId = '3d-ref';
const fillExtrusionHeight = 15;

// 3d 普通建筑颜色和透明度
const gresplOpacity = 0.5;
const gresplColor = 'rgb(255, 255, 255)';

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLv15]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/HZWorkSpace%3A15L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    /**
     * 3d建筑
     * */
    {
      id: 'RES_PY',
      source: LevelConfig.addLv15,
      'source-layer': 'RES_PY',
      type: 'fill-extrusion',
      filter: ['!=', 'CLASID', '310200'],
      paint: {
        'fill-extrusion-color': gresplColor,
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          fillExtrusionHeight,
          0,
          fillExtrusionHeight + 0.55,
          ['*', ['+', ['get', 'FLOOR'], 1], 3]
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': gresplOpacity
      },
      labelLayerId: threeLabelLayerId
    },
    {
      id: 'RES_PY1',
      source: LevelConfig.addLv15,
      'source-layer': 'RES_PY1',
      type: 'fill-extrusion',
      filter: ['!=', 'CLASID', '310200'],
      paint: {
        'fill-extrusion-color': gresplColor,
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          fillExtrusionHeight,
          0,
          fillExtrusionHeight + 0.55,
          ['*', ['+', ['get', 'FLOOR'], 1], 3]
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': gresplOpacity
      },
      labelLayerId: threeLabelLayerId
    }
  ]
};

export default style;
