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

const visibleLevel = 11;
const lineLabelLayerId = 'line-lv15-ref';
const lineBgLabelLayerId = 'line-bg-ref';

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLvAllRd]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ARoad_SiWei@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ],
      minzoom: visibleLevel,
    },
  },
  layers: [
    // {
    //   id: 'dushigaosulu_bg', // 路网图层（name字段），次干道、县道
    //   type: 'line',
    //   source: LevelConfig.addLvAllRd,
    //   'source-layer': 'dushigaosulu',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-width': {
    //       base: 2,
    //       stops: [
    //         [15, 7],
    //         [16, 9.5],
    //         [17, 11.5],
    //         [18, 13.5],
    //         [19, 15.5],
    //         [20, 16],
    //       ],
    //     },
    //     'line-color': '#000000',
    //   },
    //   labelLayerId: lineBgLabelLayerId,
    // },
    // // 高速公路
    // {
    //   id: 'gaosugonglu_bg', // 路网图层（name字段），次干道、县道
    //   type: 'line',
    //   source: LevelConfig.addLvAllRd,
    //   'source-layer': 'gaosugonglu',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-width': {
    //       base: 2,
    //       stops: [
    //         [15, 7],
    //         [16, 9.5],
    //         [17, 11.5],
    //         [18, 13.5],
    //         [19, 15.5],
    //         [20, 16],
    //       ],
    //     },
    //     'line-color': '#000000',
    //   },
    //   labelLayerId: lineBgLabelLayerId,
    // },

    // // 九级路
    // {
    //   id: 'jiujilu_bg', // 路网图层（name字段），次干道、县道
    //   type: 'line',
    //   source: LevelConfig.addLvAllRd,
    //   'source-layer': 'jiujilu',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-width': {
    //       base: 2,
    //       stops: [
    //         [15, 7],
    //         [16, 9.5],
    //         [17, 11.5],
    //         [18, 13.5],
    //         [19, 15.5],
    //         [20, 16],
    //       ],
    //     },
    //     'line-color': '#000000',
    //   },
    //   labelLayerId: lineBgLabelLayerId,
    // },
    // // 其他道路
    // {
    //   id: 'qitadaolu_bg', // 路网图层（name字段），次干道、县道
    //   type: 'line',
    //   source: LevelConfig.addLvAllRd,
    //   'source-layer': 'qitadaolu',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-width': {
    //       base: 2,
    //       stops: [
    //         [15, 7],
    //         [16, 9.5],
    //         [17, 11.5],
    //         [18, 13.5],
    //         [19, 15.5],
    //         [20, 16],
    //       ],
    //     },
    //     'line-color': '#000000',
    //   },
    //   labelLayerId: lineBgLabelLayerId,
    // },

    // 省道
    {
      id: 'all_shengdao_bg', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: LevelConfig.addLvAllRd,
      'source-layer': 'shengdao',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          stops: [
            [7, 14],
            [20, 40],
          ],
        },
        'line-color': '#000000',
      },
      labelLayerId: lineBgLabelLayerId,
    },
    {
      id: 'all_shengdao', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: LevelConfig.addLvAllRd,
      'source-layer': 'shengdao',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          stops: [
            [7, 1],
            [21, 3],
          ],
        },
        'line-dasharray': [5, 5],
        'line-color': '#ffffff',
      },
      labelLayerId: lineBgLabelLayerId,
    },
    // 国道
    {
      id: 'all_guodao_bg', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: LevelConfig.addLvAllRd,
      'source-layer': 'guodao',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          stops: [
            [7, 21],
            [20, 60],
          ],
        },
        'line-color': '#000000',
      },
      labelLayerId: lineBgLabelLayerId,
    },
    {
      id: 'all_guodao', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: LevelConfig.addLvAllRd,
      'source-layer': 'guodao',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          stops: [
            [7, 1],
            [21, 3],
          ],
        },
        'line-dasharray': [5, 5],
        'line-color': '#ffffff',
      },
      labelLayerId: lineBgLabelLayerId,
    },
    // 县道
    // {
    //   id: 'all_xiandao_bg', // 路网图层（name字段），次干道、县道
    //   type: 'line',
    //   source: LevelConfig.addLvAllRd,
    //   'source-layer': 'xiandao',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-width': {
    //       base: 2,
    //       stops: [
    //         [15, 7],
    //         [16, 9.5],
    //         [17, 11.5],
    //         [18, 13.5],
    //         [19, 15.5],
    //         [20, 16],
    //       ],
    //     },
    //     'line-color': '#000000',
    //   },
    //   labelLayerId: lineBgLabelLayerId,
    // },
    // // 乡镇道路
    // {
    //   id: 'all_xiangzhendaolu_bg', // 路网图层（name字段），次干道、县道
    //   type: 'line',
    //   source: LevelConfig.addLvAllRd,
    //   'source-layer': 'xiangzhendaolu',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-width': {
    //       base: 2,
    //       stops: [
    //         [15, 7],
    //         [16, 9.5],
    //         [17, 11.5],
    //         [18, 13.5],
    //         [19, 15.5],
    //         [20, 16],
    //       ],
    //     },
    //     'line-color': '#000000',
    //   },
    //   labelLayerId: lineBgLabelLayerId,
    // },
  ],
};

export default style;
