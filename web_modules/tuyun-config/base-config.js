export default {
  geoserverHost: 'http://116.62.186.152:8080/', // geoserver 地址 阿里云： 116.62.186.152
  geojsonHost: `http://${window.location.hostname}:3000/`, // 提供geojson的后台
  tileHost: 'http://116.62.186.152:12808/', // 自己提供瓦片数据的后台 47.110.135.245
  bffHost: `http://192.168.8.102:8080/`, // bff
  spriteHost: 'http://116.62.186.152:12808/', // 精灵图端口
  glyphsHost: 'http://116.62.186.152:12808/', // 字体端口
  httpTimeOut: 5000
};
