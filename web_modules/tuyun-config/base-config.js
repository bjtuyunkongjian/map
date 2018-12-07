export default {
  geoserverHost: 'http://192.168.8.104:8080/', // geoserver 地址 阿里云： 116.62.186.152
  geojsonHost: `http://${window.location.hostname}:3000/`, // 提供geojson的后台
  tileHost: 'http://192.168.8.104:12808/', // 自己提供瓦片数据的后台，包括精灵图和文字
  bffHost: `http://192.168.8.111:8080/`, // bff
  httpTimeOut: 50
};
