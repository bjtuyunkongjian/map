const DevHost = {
  geoserverHost: `http://47.110.135.245:8686/`, // geoserver 地址 阿里云： 116.62.186.152 10.49.6.62:8080
  // geoserverHost: `http://116.62.186.152:8080/`, // geoserver 地址 阿里云： 116.62.186.152 10.49.6.62:8080
  geojsonHost: `http://${window.location.hostname}:3000/`, // 提供geojson的后台
  tileHost: `http://116.62.186.152:12808/`, // 自己提供瓦片数据的后台 47.110.135.245
  bffHost: `http://192.168.8.145:8080/`, // bff 192.168.43.210:8080   47.110.135.245:12808/   192.168.8.103:8080顾金燕后台  47.110.135.245:10808顾金燕端口
  spriteHost: `http://116.62.186.152:12808/`, // 精灵图端口
  imageHost: `http://116.62.186.152:12808/`, // 图片地址
  glyphsHost: `http://116.62.186.152:12808/`, // 字体端口
  httpTimeOut: 5000,
};

// 192.168.251.46
// const BuildApiHost = {
//   geoserverHost: `http://47.97.230.212:8082/`, // geoserver 地址 阿里云： 116.62.186.152 10.49.6.62:8080
//   tileHost: `http://47.97.230.212:8082/`, // 自己提供瓦片数据的后台 47.110.135.245
//   spriteHost: `http://47.97.230.212:8082/`, // 精灵图端口
//   imageHost: `http://47.97.230.212:8082/`, // 图片地址
//   glyphsHost: `http://47.97.230.212:8082/`, // 字体端口
//   apiHost: 'http://47.97.230.212:8082/', // api development 环境对应的 ip
//   httpTimeOut: 5000
// };

export default DevHost;
