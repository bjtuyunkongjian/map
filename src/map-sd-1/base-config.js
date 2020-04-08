// 杭州地图 大华股份 内网
// const BuildApiHost = {
//   geoserverHost: `http://41.198.128.3:8081/`, // geoserver 地址
//   spriteHost: `http://41.198.128.3:8081/`, // 精灵图端口
//   imageHost: `http://41.198.128.3:8081/`, // 图片地址
//   glyphsHost: `http://41.198.128.3:8081/`, // 字体端口
//   apiHost: 'http://41.198.128.3:8081/', // api development 环境对应的 ip

//   httpTimeOut: 5000
// };

// 杭州地图 外网
const BuildApiHost = {
  geoserverHost: `http://10.49.6.62:8084/`, // geoserver 地址
  spriteHost: `http://47.110.135.245:12808/`, // 精灵图端口
  imageHost: `http://47.110.135.245:12808/`, // 图片地址
  glyphsHost: `http://47.110.135.245:12808/`, // 字体端口
  apiHost: 'http://10.49.6.62:8084/', // api development 环境对应的 ip
  bffHost: `http://47.97.230.212:8091/`, // bff 192.168.43.210:8080   47.110.135.245:12808/   192.168.8.103:8080顾金燕后台  47.110.135.245:10808顾金燕端口
  httpTimeOut: 5000,
};

export default BuildApiHost;
