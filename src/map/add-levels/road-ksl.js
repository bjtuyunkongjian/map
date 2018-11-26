const symbolLabelLayerId = "symbol-ref";

const lineLabelLayerId = "line-gd-ref";
const lineBgLabelLayerId = "line-gd-ref";

export default [
  {
    id: "ksl_bg", //快速路的背景
    type: "line",
    source: "road-source",
    "source-layer": "LEVEL_12",
    // minzoom: _visibleLevel,
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-width": {
        base: 2,
        stops: [
          [7, 3],
          [8, 2],
          [9, 3],
          [10, 4],
          [11, 4],
          [12, 7],
          [13, 5],
          [14, 6],
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
      "line-color": "#d8d8d8"
    },
    labelLayerId: lineBgLabelLayerId
  },
  {
    id: "ksl",
    type: "line",
    source: "road-source",
    "source-layer": "LEVEL_12",
    // minzoom: _visibleLevel,
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-width": {
        base: 2,
        stops: [
          [7, 2],
          [8, 1],
          [9, 2],
          [10, 3],
          [11, 3],
          [12, 5],
          [13, 4],
          [14, 5],
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
      "line-color": "#fff"
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: "ksl_name", // 快速路
    type: "symbol",
    source: "road-source",
    "source-layer": "LEVEL_12",
    // minzoom: _visibleLevel,
    layout: {
      "text-field": {
        stops: [[7, ""], [13, "{NAME}"]]
      },
      visibility: "visible",
      "symbol-placement": "line",
      "text-font": ["Arial Unicode MS Bold"],
      "text-pitch-alignment": "map",
      "symbol-spacing": 500,
      "text-rotation-alignment": "map",
      "text-size": 10,
      "icon-rotation-alignment": "viewport"
    },
    paint: {
      "text-color": "rgba(65, 65, 65, 0.9)",
      "text-halo-width": 2,
      "text-halo-color": "rgba(255, 255, 255, 1)"
    },
    labelLayerId: symbolLabelLayerId
  }
];