/**
 * @author sl 2019-01-02
 * todolist 
 * 1. 路网图层CLASID不对，覆盖之前的国道，无法通过CLASID区分和过滤  ======> 高速覆盖国道
 */
import CONFIG from '../config';

const _visibleLevel = 15;
const labelLayerId = 'GVEGPL';

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [CONFIG.addLv15]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASDLayers@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [{
      id: 'GRFCPL', // 记录了一些公司，养殖场，墓地等区域
      type: 'fill',
      source: 'composite',
      'source-layer': 'SD_GRFCPL', // py是面
      layout: {},
      paint: {
        'fill-color': '#CACFD2',
        'fill-antialias': false
      }
    },
    /**
     * 线
     */
    // {
    //   id: 'SD_GHFCLN', // 记录了河流，黄河，隧道等的边界   ====> 没有名称
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GHFCLN', // LN，line的简写
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    {
      id: 'SD_GHYDLN', // 记录了一些线性的水渠、河沟 不显示  ======> 不显示是不是不妥 =======> 只显示名称
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_GHYDLN', // LN，line的简写
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
      },
      paint: {
        'text-color': '#2E7EAF',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    },
    // {
    //   id: 'SD_GRFCLN', // 记录了长城岭，养殖场等 =====>  NAME 属性为空，暂时注释了
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GRFCLN', // LN，line的简写
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    // {
    //   id: 'SD_GTFCLN', // 记录了XX桥，XX通道  ==========> 没有 NAME
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GTFCLN', // LN，line的简写
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    {
      id: 'GROALN_other_1009_ZD_bg', // 路网图层（name字段），栈道、内部道路、机耕路、乡村路、小路 + 专用公路、其他公路、村道
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '420400'],
        ['==', 'CLASID', '420500'],
        ['==', 'CLASID', '420700'],
        ['==', 'CLASID', '430400'],
        ['==', 'CLASID', '430503'],
        ['==', 'CLASID', '430531'],
        ['==', 'CLASID', '430532'],
        ['==', 'CLASID', '430533'],
        ['==', 'CLASID', '430600'],
        ['==', 'CLASID', '430700'],
        ['==', 'CLASID', '440100'],
        ['==', 'CLASID', '440200'],
        ['==', 'CLASID', '440300'],
        ['==', 'CLASID', '440600'],
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 5.2],
            [16, 5.2],
            [17, 6.1],
            [18, 7],
            [19, 8],
            [20, 17.5]
          ]
        },
        'line-color': '#d8d8d8'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_ZD', // 路网图层（name字段），栈道、内部道路、机耕路、乡村路、小路 + 专用公路、其他公路、村道
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '420400'],
        ['==', 'CLASID', '420500'],
        ['==', 'CLASID', '420700'],
        ['==', 'CLASID', '430400'],
        ['==', 'CLASID', '430503'],
        ['==', 'CLASID', '430531'],
        ['==', 'CLASID', '430532'],
        ['==', 'CLASID', '430533'],
        ['==', 'CLASID', '430600'],
        ['==', 'CLASID', '430700'],
        ['==', 'CLASID', '440100'],
        ['==', 'CLASID', '440200'],
        ['==', 'CLASID', '440300'],
        ['==', 'CLASID', '440600'],
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 4],
            [16, 4],
            [17, 5],
            [18, 6],
            [19, 7],
            [20, 16]
          ]
        },
        'line-color': '#FFFFFF'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_CGD_bg', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '420301'],
        ['==', 'CLASID', '420302'],
        ['==', 'CLASID', '430502'],
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 6],
            [16, 7.5],
            [17, 8.5],
            [18, 9.5],
            [19, 10.5],
            [20, 15]
          ]
        },
        'line-color': '#d8d8d8'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_CGD', // 路网图层（name字段），次干道、县道
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '420301'],
        ['==', 'CLASID', '420302'],
        ['==', 'CLASID', '430502'],
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 5],
            [16, 6],
            [17, 7],
            [18, 8],
            [19, 9],
            [20, 14]
          ]
        },
        'line-color': '#FFFFFF'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_ZGD_bg', // 路网图层（name字段），主干道
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['==', 'CLASID', '430501'],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 6],
            [16, 7.5],
            [17, 8.5],
            [18, 9.5],
            [19, 10.5],
            [20, 16]
          ]
        },
        'line-color': '#ffae00'
      },
      labelLayerId: 'GVEGPL'
    },
    {
      id: 'GROALN_other_1009_ZGD', // 路网图层（name字段），主干道
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['==', 'CLASID', '430501'],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 5],
            [16, 6],
            [17, 7],
            [18, 8],
            [19, 9],
            [20, 14]
          ]
        },
        'line-color': '#ffeebb'
      }
    }, {
      id: 'GROALN_other_1009_GS_bg', // 路网图层（name字段），高速公路，背景充当描边
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '420704'],
        ['==', 'CLASID', '420705'],
        ['==', 'CLASID', '420706'],
        ['==', 'CLASID', '420600']
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 8.5],
            [16, 8.5],
            [17, 10],
            [18, 12.5],
            [19, 12.5],
            [20, 20]
          ]
        },
        'line-color': '#ffae00'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_GS', // 路网图层（name字段），高速公路
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '420704'],
        ['==', 'CLASID', '420705'],
        ['==', 'CLASID', '420706'],
        ['==', 'CLASID', '420600']
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 7],
            [16, 7],
            [17, 9],
            [18, 11],
            [19, 11],
            [20, 19]
          ]
        },
        'line-color': '#ffeebb'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_KSL_bg', // 路网图层（name字段），背景充当描边 快速路，高架路
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '430200'],
        ['==', 'CLASID', '430300']
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 8.5],
            [16, 8.5],
            [17, 10],
            [18, 12.5],
            [19, 12.5],
            [20, 20]
          ]
        },
        'line-color': '#ffae00'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_KSL', // 路网图层（name字段） 快速路，高架路
      type: 'line',
      source: CONFIG.addLv15,
      filter: ['any',
        ['==', 'CLASID', '430200'],
        ['==', 'CLASID', '430300']
      ],
      'source-layer': 'GROALN_other_1009',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': {
          'base': 2,
          'stops': [
            [15, 7],
            [16, 7],
            [17, 9],
            [18, 11],
            [19, 11],
            [20, 19]
          ]
        },
        'line-color': '#ffeebb'
      },
      labelLayerId: 'GVEGPL'
    }, {
      id: 'GROALN_other_1009_NAME',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'GROALN_other_1009', // LN，line的简写
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'line',
        'text-font': ['Arial Unicode MS Bold'],
        'text-pitch-alignment': 'viewport',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 12,
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': '#2E7EAF',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    },

    /**
     * 点
     */
    // {
    //   id: 'SD_GHFCPT', // 此图层记录了一些水站和XX闸
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GHFCPT',
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    // {
    //   id: 'GHYDPT', // 记录一些井和XX泉  =======> 貌似没有数据 不对，是 NAME 属性为空，但是数据还是有的
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GHYDPT',
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    {
      id: 'GNPNPT', // 记录了XX山和水库
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_GNPNPT',
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': '#409FD8',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    },
    // {
    //   id: 'SD_GRFCPT', // 记录了一些学校，自来水厂，服务站，输油站，液化气站，遗址，陵墓，寺庙，游乐场等  ======> NAME属性为空
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GRFCPT',
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    // {
    //   id: 'GTFCPT', // 记录了一些学校，自来水厂，服务站，输油站，液化气站，遗址，陵墓，寺庙，游乐场等   =======> 没有名称属性 NAME
    //   type: 'symbol',
    //   source: CONFIG.addLv15,
    //   'source-layer': 'SD_GTFCPT',
    //   layout: {
    //     'text-field': '{NAME}',
    //     'visibility': 'visible',
    //     'symbol-placement': 'point',
    //     'text-size': 11,
    //     'text-padding': 4,
    //     'icon-image': 'btn_bubble_a_normal',
    //     'text-justify': 'left',
    //     'text-anchor': 'left',
    //     'text-offset': [0.8, 0],
    //     'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
    //     'text-pitch-alignment': 'viewport',
    //     'text-rotation-alignment': 'viewport',
    //     'icon-rotation-alignment': 'viewport'
    //   },
    //   paint: {
    //     'text-color': '#737517',
    //     'text-halo-width': 2,
    //     'text-halo-color': 'rgba(255, 255, 255, 1)'
    //   }
    // },
    {
      id: 'SD_GAGNPT', // 此图层记录了村庄POI
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_GAGNPT',
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_other_cities',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': '#737517',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_zhongcan',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '110101']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_zhongcan',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_xican',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '110102']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_xican',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_dining',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '110103'],
        ['==', 'KIND', '230226']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_dining',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_lvdian',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '120102']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_lvdian',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_hotel',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '120103'],
        ['==', 'KIND', '120104']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_hotel',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_zhuzhai',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '120201']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_zhuzhai',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_others_shopping',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '130101'],
        ['==', 'KIND', '130102']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_others_shopping',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_others_fun',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '130201'],
        ['==', 'KIND', '130202'],
        ['==', 'KIND', '130203'],
        ['==', 'KIND', '130301'],
        ['==', 'KIND', '130302'],
        ['==', 'KIND', '130303'],
        ['==', 'KIND', '130401'],
        ['==', 'KIND', '130402'],
        ['==', 'KIND', '130405'],
        ['==', 'KIND', '130406'],
        ['==', 'KIND', '130407'],
        ['==', 'KIND', '130408'],
        ['==', 'KIND', '130409'],
        ['==', 'KIND', '1304010'],
        ['==', 'KIND', '1304011'],
        ['==', 'KIND', '130602'],
        ['==', 'KIND', '130603'],
        ['==', 'KIND', '130700'],
        ['==', 'KIND', '130701'],
        ['==', 'KIND', '130702'],
        ['==', 'KIND', '130703'],
        ['==', 'KIND', '130704'],
        ['==', 'KIND', '130705'],
        ['==', 'KIND', '130801'],
        ['==', 'KIND', '130803'],
        ['==', 'KIND', '130804'],
        ['==', 'KIND', '130805'],
        ['==', 'KIND', '130806'],
        ['==', 'KIND', '130807'],
        ['==', 'KIND', '200201'],
        ['==', 'KIND', '200300'],
        ['==', 'KIND', '200400'],
        ['==', 'KIND', '200404'],
        ['==', 'KIND', '200405'],
        ['==', 'KIND', '210101'],
        ['==', 'KIND', '210102'],
        ['==', 'KIND', '210103'],
        ['==', 'KIND', '210104'],
        ['==', 'KIND', '210201'],
        ['==', 'KIND', '210202'],
        ['==', 'KIND', '210203'],
        ['==', 'KIND', '210209'],
        ['==', 'KIND', '210210'],
        ['==', 'KIND', '210216'],
        ['==', 'KIND', '210217'],
        ['==', 'KIND', '210218'],
        ['==', 'KIND', '210219'],
        ['==', 'KIND', '210301'],
        ['==', 'KIND', '210302'],
        ['==', 'KIND', '210303'],
        ['==', 'KIND', '210304'],
        ['==', 'KIND', '210400'],
        ['==', 'KIND', '230125'],
        ['==', 'KIND', '230127'],
        ['==', 'KIND', '230130'],
        ['==', 'KIND', '230201'],
        ['==', 'KIND', '230202'],
        ['==', 'KIND', '240100'],
        ['==', 'KIND', '250100'],
        ['==', 'KIND', '250200']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_others_fun',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_others_yaodian',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '130501'],
        ['==', 'KIND', '130502']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_yaodian',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_qicheweixiu',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '140101'],
        ['==', 'KIND', '140104'],
        ['==', 'KIND', '140201'],
        ['==', 'KIND', '140202'],
        ['==', 'KIND', '140301'],
        ['==', 'KIND', '140302'],
        ['==', 'KIND', '140304']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_qicheweixiu',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_bank',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '150101'],
        ['==', 'KIND', '150103'],
        ['==', 'KIND', '150104'],
        ['==', 'KIND', '150200']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_bank',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_school',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '160100'],
        ['==', 'KIND', '160101'],
        ['==', 'KIND', '160102'],
        ['==', 'KIND', '160103'],
        ['==', 'KIND', '160104'],
        ['==', 'KIND', '160106'],
        ['==', 'KIND', '160107'],
        ['==', 'KIND', '160108'],
        ['==', 'KIND', '160109']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_school',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_library',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '160201'],
        ['==', 'KIND', '160202'],
        ['==', 'KIND', '160203'],
        ['==', 'KIND', '160204'],
        ['==', 'KIND', '160205'],
        ['==', 'KIND', '160206'],
        ['==', 'KIND', '160207'],
        ['==', 'KIND', '160208'],
        ['==', 'KIND', '160209']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_library',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_building',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '170201'],
        ['==', 'KIND', '190110'],
        ['==', 'KIND', '190112'],
        ['==', 'KIND', '190301'],
        ['==', 'KIND', '190400'],
        ['==', 'KIND', '190401'],
        ['==', 'KIND', '190402'],
        ['==', 'KIND', '190403'],
        ['==', 'KIND', '190404'],
        ['==', 'KIND', '190502'],
        ['==', 'KIND', '200101'],
        ['==', 'KIND', '200102'],
        ['==', 'KIND', '200104'],
        ['==', 'KIND', '220100'],
        ['==', 'KIND', '220200'],
        ['==', 'KIND', '220300'],
        ['==', 'KIND', '220400'],
        ['==', 'KIND', '230206'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_building',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_yundongchangguan',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '180100'],
        ['==', 'KIND', '180101'],
        ['==', 'KIND', '180102'],
        ['==', 'KIND', '180103'],
        ['==', 'KIND', '180104'],
        ['==', 'KIND', '180105'],
        ['==', 'KIND', '180106'],
        ['==', 'KIND', '180107']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_yundongchangguan',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_dianyingyuan',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '180209'],
        ['==', 'KIND', '210213']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_dianyingyuan',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_theater',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '180210']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_theater',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_gongan',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '190200'],
        ['==', 'KIND', '190201']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_gongan',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_gongmu',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '210211']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_gongmu',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_youju',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '210213']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_youju',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_chezhan',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any', ['==', 'KIND', '230100']],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_chezhan',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_train_station',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230103'],
        ['==', 'KIND', '230105']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_train_station',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_highway_exit',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230203']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_highway_exit',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_highway_entry',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230204']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_highway_entry',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_toll',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230209']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_toll',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_parking',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230207'],
        ['==', 'KIND', '230211'],
        ['==', 'KIND', '230212'],
        ['==', 'KIND', '230223'],
        ['==', 'KIND', '230224'],
        ['==', 'KIND', '230225'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_parking',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_bus_station2',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230213']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_bus_station2',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }, {
      id: 'OTH_POI_jiayouzhan',
      type: 'symbol',
      source: CONFIG.addLv15,
      'source-layer': 'SD_POI_LEVEL15_1013',
      filter: ['any',
        ['==', 'KIND', '230215'],
        ['==', 'KIND', '230216'],
        ['==', 'KIND', '230217'],
        ['==', 'KIND', '230218']
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_jiayouzhan',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      'paint': {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    },
    /**
     * 3d建筑
     * */
    {
      'id': 'GRESPL_1_3D',
      source: CONFIG.addLv15,
      'source-layer': 'SD_GRESPL_1_1009',
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
          "interpolate", ["linear"],
          ["zoom"],
          15, 0,
          15.05, ['*', ['+', ["get", "H"], 1], 3]
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': .6
      },
      labelLayerId
    },
    {
      'id': 'GRESPL_2_3D',
      source: CONFIG.addLv15,
      'source-layer': 'SD_GRESPL_2_1009',
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          "interpolate", ["linear"],
          ["zoom"],
          15, 0,
          15.05, ['*', ['+', ["get", "H"], 1], 3]
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': .6
      },
      labelLayerId
    }, {
      'id': 'GRESPL_3_3D',
      source: CONFIG.addLv15,
      'source-layer': 'SD_GRESPL_3_1009',
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          "interpolate", ["linear"],
          ["zoom"],
          15, 0,
          15.05, ['*', ['+', ["get", "H"], 1], 3]
        ],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': .6
      },
      labelLayerId
    },
  ]
}

function _checkSource(map, source) {
  for (let key in source) {
    if (map.getSource(key))
      return false;
  }
  return true;
}

export default function (map) {
  const source = style.source;
  const layers = style.layers;
  // if (map.getZoom() >= style.visibleLevel && _checkSource(map, source)) {


  // }
  if (map.getZoom() >= style.visibleLevel && _checkSource(map, source)) {
    for (let key in source) {
      map.addSource(key, source[key]);
    }
    for (let item of layers) {
      map.addLayer(item, item.labelLayerId);
    }
  }
}