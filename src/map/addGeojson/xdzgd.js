/**
 * @author sl 2019-01-02
 */

const sourceName = "xdzgd-source";

const style = {
  sourceName: sourceName,
  "dataName": "xdzgd",
  layers: [{
      "id": "xdzgd_bg",
      type: 'line',
      source: sourceName,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 3],
            [8, 2],
            [9, 3],
            [10, 4],
            [11, 4],
            [12, 7],
            [13, 9],
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
        'line-color': '#ffae00'
      }
    }, {
      id: 'xdzgd', // 路网图层（name字段），县道主干道
      type: 'line',
      source: sourceName,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 2],
            [8, 1],
            [9, 2],
            [10, 3],
            [11, 3],
            [12, 5],
            [13, 6],
            [14, 6],
            [15, 7],
            [16, 7],
            [17, 9],
            [18, 11],
            [19, 11],
            [20, 19],
            [21, 22],
            [22, 24],
          ]
        },
        'line-color': '#ffeebb'
      }
    },
    {
      id: 'xdzgd_name', // 县道主干道名称
      type: 'symbol',
      source: sourceName,
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
        'symbol-placement': 'line',
        'text-font': ['Arial Unicode MS Bold'],
        'text-pitch-alignment': 'viewport',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 12,
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 1)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }
  ]
};

export default style;