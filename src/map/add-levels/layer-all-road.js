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

const visibleLevel = 15;
const lineLabelLayerId = 'line-lv15-ref';
const lineBgLabelLayerId = 'line-bg-ref';

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLvAllRd]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3Aall_road@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ],
      minzoom: visibleLevel,
    },
  },
  layers: [
    {
      id: 'road_all_bg', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: LevelConfig.addLvAllRd,
      filter: [
        'any',
        ['==', 'CLASID', '420301'],
        ['==', 'CLASID', '420302'],
        ['==', 'CLASID', '430502'],
      ],
      'source-layer': 'GROALN_other',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [15, 7],
            [16, 9.5],
            [17, 11.5],
            [18, 13.5],
            [19, 15.5],
            [20, 16],
          ],
        },
        'line-color': '#000000',
      },
      labelLayerId: lineBgLabelLayerId,
    },
    {
      id: 'road_all', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: LevelConfig.addLvAllRd,
      filter: [
        'any',
        ['==', 'CLASID', '420301'],
        ['==', 'CLASID', '420302'],
        ['==', 'CLASID', '430502'],
      ],
      'source-layer': 'GROALN_other',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [15, 5],
            [16, 7],
            [17, 11],
            [18, 15],
            [19, 16],
            [20, 14],
          ],
        },
        'line-color': '#000000',
      },
      labelLayerId: lineLabelLayerId,
    },
  ],
};

export default style;
