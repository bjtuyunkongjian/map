# 图云空间——地图

## 启动

- 1.在根目录路径下输入 npm install 或 yarn，会自动下载所需的包
- 2.安装完成对应的包以后，npm start，会自动打开浏览器
- 3.配置了热更新，不需要每次更改代码后重启

## 文件注释

- 本工程采用最新的 webpack4.x 配置，基本实现 0 配置
- css 样式文件在./static/css/mapbox-gl.css 中
- ./static/sprite 文件夹中有雪碧图和雪碧图对应的 json，需要把这四个文件放到服务器上
- 所有 js 文件在 src 中

## 配置

- 1. mapbox 相应配置：https://www.mapbox.com/mapbox-gl-js/style-spec#layers-background
- 2. 在线生成雪碧图：https://www.toptal.com/developers/css/sprite-generator
