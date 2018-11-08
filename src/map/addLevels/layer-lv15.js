/**
 * @author sl 2019-01-02
 * todolist 
 * 1. 路网图层CLASID不对，覆盖之前的国道，无法通过CLASID区分和过滤  ======> 高速覆盖国道
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 15;
const labelLayerId = 'GVEGPL';

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv15]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASDLayers@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [
    // 区域面的配置
    {
      id: 'GHYDPL',
      type: 'fill',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GHYDPL', // py是面
      layout: {},
      paint: {
        'fill-color': '	#DC143C',
        'fill-antialias': false
      }
    }, {
      id: 'GRFCPL', // 记录了一些公司，养殖场，墓地等区域
      type: 'fill',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GRFCPL', // py是面
      layout: {},
      paint: {
        'fill-color': '#CACFD2',
        'fill-antialias': false
      }
    }, {
      id: 'GTFCPL',
      type: 'fill',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GTFCPL', // py是面
      layout: {},
      paint: {
        'fill-color': '	#FF69B4',
        'fill-antialias': false
      }
    },
    /**
     * 线
     */
    {
      id: 'SD_GHFCLN', // 记录了河流，黄河，隧道等的边界   ====> 没有名称
      type: 'line',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GHFCLN', // LN，line的简写
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
        'line-color': '#d8d8d8',
      }
    },
    {
      id: 'SD_GHYDLN', // 记录了一些线性的水渠、河沟 不显示  ======> 不显示是不是不妥 =======> 只显示名称
      type: 'line',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GHYDLN', // LN，line的简写
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
        'line-color': '#d8d8d8',
      }
    },
    {
      id: 'SD_GRFCLN', // 记录了长城岭，养殖场等 =====>  NAME 属性为空，暂时注释了
      type: 'line',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GRFCLN', // LN，line的简写
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
        'line-color': '#d8d8d8',
      }
    },
    {
      id: 'SD_GTFCLN', // 记录了XX桥，XX通道  ==========> 没有 NAME
      type: 'line',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GTFCLN', // LN，line的简写
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
        'line-color': '#d8d8d8',
      }
    },
    {
      id: 'GROALN_other_1009_ZD_bg', // 路网图层（name字段），栈道、内部道路、机耕路、乡村路、小路 + 专用公路、其他公路、村道
      type: 'line',
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
      source: levelConfig.addLv15,
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
    {
      id: 'SD_GHFCPT', // 此图层记录了一些水站和XX闸
      type: 'symbol',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GHFCPT',
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'btn_bubble_a_normal',
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
    },
    {
      id: 'GHYDPT', // 记录一些井和XX泉  =======> 貌似没有数据 不对，是 NAME 属性为空，但是数据还是有的
      type: 'symbol',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GHYDPT',
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'btn_bubble_a_normal',
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
    },
    {
      id: 'GNPNPT', // 记录了XX山和水库
      type: 'symbol',
      source: levelConfig.addLv15,
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
    {
      id: 'SD_GRFCPT', // 记录了一些学校，自来水厂，服务站，输油站，液化气站，遗址，陵墓，寺庙，游乐场等  ======> NAME属性为空
      type: 'symbol',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GRFCPT',
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_{KIND}',
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
    },
    {
      id: 'GTFCPT', // 记录了一些学校，自来水厂，服务站，输油站，液化气站，遗址，陵墓，寺庙，游乐场等   =======> 没有名称属性 NAME
      type: 'symbol',
      source: levelConfig.addLv15,
      'source-layer': 'SD_GTFCPT',
      layout: {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_{KIND}',
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
    },


    {
      id: 'SD_GAGNPT', // 此图层记录了村庄POI
      type: 'symbol',
      source: levelConfig.addLv15,
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
    },
    //////////////////////////////////
    // poi
    {
      id: 'POI_LEVEL_15_1108',
      type: 'symbol',
      source: levelConfig.addLv15,
      'source-layer': 'POI_LEVEL_15_1108',
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_{KIND}',
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
      source: levelConfig.addLv15,
      'source-layer': 'GRESPL_Merge_1',
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
      source: levelConfig.addLv15,
      'source-layer': 'GRESPL_Merge_2',
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
      source: levelConfig.addLv15,
      'source-layer': 'GRESPL_Merge_3',
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
    }
  ]
}

export default style;