// const BuildApiHost = {
//   geoserverHost: `http://10.49.6.62:8084/`, // geoserver 地址
//   spriteHost: `http://56.3.124.136:12808/`, // 精灵图端口
//   imageHost: `http://56.3.124.136:12808/`, // 图片地址
//   glyphsHost: `http://56.3.124.136:12808/`, // 字体端口
//   apiHost: 'http://10.49.6.62:8084/', // api development 环境对应的 ip
//   bffHost: `http://10.49.6.62:12808/`, // bff 192.168.43.210:8080   47.110.135.245:12808/   192.168.8.103:8080顾金燕后台  47.110.135.245:10808顾金燕端口
//   httpTimeOut: 5000,
// };

const BuildApiHost = {
  geoserverHost: `http://localhost:8084/`, // geoserver 地址
  spriteHost: `http://47.110.135.245:12808/`, // 精灵图端口
  imageHost: `http://47.110.135.245:12808/`, // 图片地址
  glyphsHost: `http://47.110.135.245:12808/`, // 字体端口
  apiHost: 'http://47.110.135.245:8084/', // api development 环境对应的 ip
  bffHost: `http://47.97.230.212:8091/`, // bff 192.168.43.210:8080   47.110.135.245:12808/   192.168.8.103:8080顾金燕后台  47.110.135.245:10808顾金燕端口
  httpTimeOut: 5000,
};

export default BuildApiHost;
