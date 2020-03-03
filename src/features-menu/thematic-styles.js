/**
 * @author sl204984
 */
import { BuildingColor } from 'tuyun-utils';

export default [
  {
    id: 'background', //背景
    type: 'background',
    standard: '#f5f5f5',
    european: '#f9f5ec', //服务民生
    serene: '#e7ecf0', //执法监督
    calm: '#f2f2f2', //反恐维稳
    serenity: '#f3f8ff', //侦查打击
    night: '#101114' //交通服务
  },
  {
    id: 'GRAILN_bg', //铁路 --无需更改
    type: 'road-bg',
    standard: '#B6B3B7',
    european: '#B6B3B7',
    serene: '#B6B3B7',
    calm: '#B6B3B7',
    serenity: '#B6B3B7',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'GRAILN',
    type: 'road',
    standard: '#FFFFFF',
    european: '#FFFFFF',
    serene: '#FFFFFF',
    calm: '#FFFFFF',
    serenity: '#FFFFFF',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'GROALN_other_ZD_bg', //可能是匝道 ---小匝道
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#d8d8d8',
    calm: '#d8d8d8',
    serenity: '#d8d8d8',
    night: '#25262d'
  },
  {
    id: 'GROALN_other_ZD',
    type: 'road',
    standard: '#FFFFFF',
    european: '#FFFFFF',
    serene: '#FFFFFF',
    calm: '#FFFFFF',
    serenity: '#FFFFFF',
    night: '#1d4e32'
  },
  {
    id: 'zd_bg', //匝道 --立交桥！
    type: 'road-bg',
    standard: '#fed669',
    european: '#fed669',
    serene: '#66cc00',
    calm: '#074d38',
    serenity: '#065279',
    night: '#25262d'
  },
  {
    id: 'zd',
    type: 'road',
    standard: '#ffeebb',
    european: '#ffeebb',
    serene: '#9eaab4',
    calm: '#7bcfa6',
    serenity: '#d2f0f4',
    night: '#1d4e32'
  },
  {
    id: 'GROALN_other_CGD_bg', // 次干道、县道
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#d8d8d8',
    calm: '#d8d8d8',
    serenity: '#d8d8d8',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'GROALN_other_CGD',
    type: 'road',
    standard: '#FFFFFF',
    european: '#FFFFFF',
    serene: '#FFFFFF',
    calm: '#FFFFFF',
    serenity: '#FFFFFF',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'GROALN_other_ZGD_bg', //主干道
    type: 'road-bg',
    standard: '#ffae00',
    european: '#ffae00',
    serene: '#5b7c9b',
    calm: 'rgb(43, 43, 43)',
    serenity: '#177cb0',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'GROALN_other_ZGD',
    type: 'road',
    standard: '#ffeebb',
    european: '#ffeebb',
    serene: '#cdd9e3',
    calm: 'rgb(69, 69, 69)',
    serenity: '#fff',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'GROALN_other_KSL_bg', //快速路
    type: 'road-bg',
    standard: '#ffeebb',
    european: '#ffae00',
    serene: '#ff9900',
    calm: '#072438',
    serenity: '#30dff3',
    night: '#25262d'
  },
  {
    id: 'GROALN_other_KSL',
    type: 'road',
    standard: '#ffeebb',
    european: '#ffeebb',
    serene: '#ffffff',
    calm: '#982728',
    serenity: '#fff',
    night: '#1d4e32'
  },
  {
    id: 'cgd_bg', //次干道
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#89d7a3',
    calm: 'rgb(43, 43, 43)',
    serenity: '#d2f0f4',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'cgd',
    type: 'road',
    standard: '#fff',
    european: '#fff',
    serene: '#fff',
    calm: '#fff',
    serenity: '#fff',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'gjl_bg', //高架路
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#ff9900',
    calm: '#4c8dae',
    serenity: '#d8d8d8',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'gjl',
    type: 'road',
    standard: '#fed669',
    european: '#fed669',
    serene: '#ffffff',
    calm: '#d8d8d8',
    serenity: '#d4f2e7',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'guodao_bg', //国道
    type: 'road-bg',
    standard: '#f9bd09',
    european: '#8ee053',
    serene: '#66cc00',
    calm: '#1d4e32',
    serenity: '#d8d8d8',
    night: '#1d4e32'
  },
  {
    id: 'guodao',
    type: 'road',
    standard: '#fed669',
    european: '#ffb528',
    serene: '#cbd7e3',
    calm: '#bbcdc5',
    serenity: '#4c8dae',
    night: '#60bd03'
  },
  {
    id: 'ksl_bg', //快速路
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#d8d8d8',
    calm: '#d8d8d8',
    serenity: '#30dff3',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'ksl',
    type: 'road',
    standard: '#fff',
    european: '#fff',
    serene: '#fff',
    calm: '#fff',
    serenity: '#fff',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'shengdao_bg', //省道
    type: 'road-bg',
    standard: '#ffae00',
    european: '#7bd025',
    serene: '#70cc14',
    calm: '#040d17',
    serenity: '#177cb0',
    night: '#22332f'
  },
  {
    id: 'shengdao',
    type: 'road',
    standard: '#ffeebb',
    european: '#fffcf9',
    serene: '#ffffff',
    calm: '#e0eee8',
    serenity: '#d8d8d8',
    night: '#6c0'
  },
  {
    id: 'xd_bg', //县道--9?
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#7bd02d',
    calm: 'rgb(43, 43, 43)',
    serenity: '#177cb0',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'xd',
    type: 'road',
    standard: '#fed669',
    european: '#fed669',
    serene: '#ffffff',
    calm: 'rgb(69, 69, 69)',
    serenity: '#d8d8d8',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'xiangdao_bg', //乡道---
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#d8d8d8',
    calm: '#d8d8d8',
    serenity: '#d8d8d8',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'xiangdao',
    type: 'road',
    standard: '#fff',
    european: '#fff',
    serene: '#fff',
    calm: '#fff',
    serenity: '#fff',
    night: 'rgb(69, 69, 69)'
  },

  {
    id: '9L_zgd_bg', //9级的主干道
    type: 'road-bg',
    standard: '#ffae00',
    european: '#ffae00',
    serene: '#7bd02d',
    calm: '#43cee6',
    serenity: '#177cb0',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: '9L_zgd',
    type: 'road',
    standard: '#ffeebb',
    european: '#ffeebb',
    serene: '#fff',
    calm: '#e0eee8',
    serenity: '#d8d8d8',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'zx_bg', //支线
    type: 'road-bg',
    standard: '#d8d8d8',
    european: '#d8d8d8',
    serene: '#d8d8d8',
    calm: '#d8d8d8',
    serenity: '#d8d8d8',
    night: 'rgb(43, 43, 43)'
  },
  {
    id: 'zx',
    type: 'road',
    standard: '#fff',
    european: '#fff',
    serene: '#fff',
    calm: '#d8d8d8',
    serenity: '#fff',
    night: 'rgb(69, 69, 69)'
  },
  {
    id: 'GVEGPL', //绿地
    type: 'fill',
    standard: '#b5e9b6',
    european: '#bbf5ae',
    serene: '#bbcdc5 ',
    calm: '#ccd6d7',
    serenity: '#c0ebd7',
    night: '#072438'
  },
  {
    id: 'GHYDPL_7L', //水渠 河流
    type: 'fill',
    standard: '#b3d8ff',
    european: '#aee1f5',
    serene: '#B0C4DE',
    calm: '#778899',
    serenity: '#90cccb',
    night: '#192634'
  },
  {
    id: 'GHYDPL_OTH', //水库 河流的面状要素
    type: 'fill',
    standard: '#b3d8ff',
    european: '#aee1f5',
    serene: '#B0C4DE', //#bfd3e4
    calm: '#778899',
    serenity: '#90cccb',
    night: '#192634'
  },
  {
    id: 'GRESPL_1_3D', //三维建筑
    type: '3d',
    standard: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      'rgb(255, 255, 255)'
    ],
    european: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#f8f4ec'
    ],
    serene: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#eaeff2'
    ],
    calm: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#f7f5f0'
    ],
    serenity: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#e3f9fd'
    ],
    night: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#1b202a'
    ]
  },
  {
    id: 'GRESPL_2_3D',
    type: '3d',
    standard: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      'rgb(255, 255, 255)'
    ],
    european: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#f8f4ec'
    ],
    serene: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#eaeff2'
    ],
    calm: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#f7f5f0'
    ],
    serenity: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#e3f9fd'
    ],
    night: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#1b202a'
    ]
  },
  {
    id: 'GRESPL_3_3D',
    type: '3d',
    standard: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      'rgb(255, 255, 255)'
    ],
    european: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#f8f4ec'
    ],
    serene: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#eaeff2'
    ],
    calm: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#f7f5f0'
    ],
    serenity: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#e3f9fd'
    ],
    night: [
      'coalesce',
      ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
      '#1b202a'
    ]
  }
];