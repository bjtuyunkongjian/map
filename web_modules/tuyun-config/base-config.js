// 杭州地图 大华股份 内网
// const BuildApiHost = {
//   geoserverHost: `http://41.198.128.3:8081/`, // geoserver 地址
//   spriteHost: `http://41.198.128.3:8081/`, // 精灵图端口
//   imageHost: `http://41.198.128.3:8081/`, // 图片地址
//   glyphsHost: `http://41.198.128.3:8081/`, // 字体端口
//   apiHost: 'http://41.198.128.3:8081/', // api development 环境对应的 ip

//   httpTimeOut: 5000
// };

// 杭州地图
const BuildApiHost = {
  geoserverHost: `http://47.110.135.245:8081/`, // geoserver 地址
  spriteHost: `http://47.110.135.245:12808/`, // 精灵图端口
  imageHost: `http://47.110.135.245:12808/`, // 图片地址
  glyphsHost: `http://47.110.135.245:12808/`, // 字体端口
  apiHost: 'http://47.110.135.245:8081/', // api development 环境对应的 ip
  httpTimeOut: 5000
};

// 山东地图
// const BuildApiHost = {
//   geoserverHost: `http://47.97.230.212:8082/`, // geoserver 地址 阿里云： 116.62.186.152 10.49.6.62:8080
//   tileHost: `http://47.97.230.212:8082/`, // 自己提供瓦片数据的后台 47.110.135.245
//   spriteHost: `http://47.97.230.212:8082/`, // 精灵图端口
//   imageHost: `http://47.97.230.212:8082/`, // 图片地址
//   glyphsHost: `http://47.97.230.212:8082/`, // 字体端口
//   apiHost: 'http://47.97.230.212:8082/', // api development 环境对应的 ip
//   httpTimeOut: 5000
// };

export default BuildApiHost;
