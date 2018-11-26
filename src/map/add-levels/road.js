import RoadShengdao from "./road-shengdao";
import XianDao from "./road-xiandao";
import Gjl from "./road-gjl";
import Ksl from "./road-ksl";
import Zgd from "./road-zgd";
import ZaDao from "./road-zadao";
import Cgd from "./road-cgd";
import XiangDao from "./road-xiangdao";
import Zx from "./road-zx";

const _visibleLevel = 7;
const symbolLabelLayerId = "symbol-ref";
const lineLabelLayerId = "line-gd-ref";
const lineBgLabelLayerId = "line-gd-ref";

const layers = [
  {
    id: "guodao_bg", // 国道背景
    type: "line",
    source: "road-source",
    "source-layer": "gaoguoGDB",
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-width": {
        base: 2,
        stops: [
          [7, 1],
          [8, 2],
          [9, 3],
          [10, 4],
          [11, 4],
          [12, 5],
          [13, 7],
          [14, 9],
          [15, 10],
          [16, 10],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26]
        ]
      },
      "line-color": "#f9bd09"
    },
    labelLayerId: lineBgLabelLayerId
  },
  {
    id: "guodao", // 路网图层（name字段），国道
    type: "line",
    source: "road-source",
    "source-layer": "gaoguoGDB",
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-width": {
        base: 2,
        stops: [
          [7, 1],
          [8, 1],
          [9, 2],
          [10, 3],
          [11, 3],
          [12, 4],
          [13, 6],
          [14, 8],
          [15, 7],
          [16, 7],
          [17, 9],
          [18, 11],
          [19, 11],
          [20, 19],
          [21, 22],
          [22, 24]
        ]
      },
      "line-color": "#fed669"
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: "guodao_name", // 国道名称
    type: "symbol",
    source: "road-source",
    "source-layer": "gaoguoGDB",
    layout: {
      "text-field": {
        stops: [[7, ""], [12, "{NAME}"]]
      },
      visibility: "visible",
      "symbol-placement": "line",
      "text-font": ["Arial Unicode MS Bold"],
      "text-pitch-alignment": "viewport",
      "symbol-spacing": 500,
      "text-rotation-alignment": "map",
      "text-size": 12,
      "icon-rotation-alignment": "viewport"
    },
    paint: {
      "text-color": "rgba(65, 65, 65, 1)",
      "text-halo-width": 2,
      "text-halo-color": "rgba(255, 255, 255, 1)"
    },
    labelLayerId: symbolLabelLayerId
  },
  {
    id: "guodao_icon", // 国道图标
    type: "symbol",
    source: "road-source",
    "source-layer": "gaoguoGDB",
    filter: ["!=", "ENTIID", ""],
    layout: {
      "text-field": "{ENTIID}",
      visibility: "visible",
      "symbol-placement": "line",
      "text-size": 10,
      "icon-image": "ic_map_gh.9",
      "icon-text-fit": "both",
      "icon-text-fit-padding": [1, 2, 1, 2],
      "text-justify": "center",
      "text-font": ["黑体"],
      "text-pitch-alignment": "viewport",
      "text-rotation-alignment": "viewport",
      "icon-rotation-alignment": "viewport",
      "text-anchor": "center",
      "text-keep-upright": false
    },
    paint: {
      "text-color": "#FFFFFF"
    },
    labelLayerId: symbolLabelLayerId
  }
];

const style = {
  visibleLevel: _visibleLevel,
  source: {
    "road-source": {
      type: "vector",
      scheme: "tms",
      tiles: [
        "http://192.168.8.109:8080/originMapServer/string?test=200&zoom={z}&row={x}&column={y}"
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
    ...layers
  ]
};

export default style;
