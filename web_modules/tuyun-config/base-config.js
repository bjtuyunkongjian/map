export default {
  host: 'http://116.62.186.152:8080/',
  geoserverHost: 'http://192.168.8.104:8080/', // geoserver 地址
  geojsonHost: `http://${window.location.hostname}:3000/`,
  tileHost: 'http://192.168.8.104:12808/', // 自己提供瓦片数据的后台
  bffHost: `http://192.168.8.111:8080/`,
  httpTimeOut: 50
};
