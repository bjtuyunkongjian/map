const lineLabelLayerId = "line-ref";
const lineBgLabelLayerId = "line-bg-ref";
const symbolLabelLayerId = "symbol-ref";

export default [
  {
    id: "xiangdao_bg", //乡道
    type: "line",
    source: "road-source",
    "source-layer": "xiangdaoGDB",
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
          [12, 3],
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
    id: "xiangdao",
    type: "line",
    source: "road-source",
    "source-layer": "xiangdaoGDB",
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
          [12, 3],
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
    id: "xiangdao_name",
    type: "symbol",
    source: "road-source",
    "source-layer": "xiangdaoGDB",
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
      "text-size": {
        base: 0,
        stops: [
          [9, 0],
          [10, 0],
          [11, 0],
          [12, 0],
          [13, 0],
          [14, 0],
          [15, 10],
          [16, 10],
          [17, 11],
          [18, 11],
          [19, 12],
          [20, 12]
        ]
      },
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
