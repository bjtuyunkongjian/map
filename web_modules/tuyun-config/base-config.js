// 192.168.251.46
const BuildApiHost = {
  geoserverHost: `http://localhost:8082/`, // geoserver 地址 阿里云： 47.97.230.212:8080 10.49.6.62:8080
  tileHost: `http://localhost:8082/`, // 自己提供瓦片数据的后台 47.97.230.212:12808
  bffHost: `http://47.110.135.245:8888/`, // bff 192.168.43.210:8080   47.110.135.245:12808/   192.168.8.103:8080顾金燕后台  47.110.135.245:10808顾金燕端口
  spriteHost: `http://47.110.135.245:12808/`, // 精灵图端口
  imageHost: `http://47.110.135.245:12808/`, // 图片地址
  glyphsHost: `http://47.110.135.245:12808/`, // 字体端口
  apiHost: 'http://47.110.135.245:8080/', // api development 环境对应的 ip
  httpTimeOut: 5000
};

export default BuildApiHost;
