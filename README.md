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

## 版本号说明

在文件 package.json 中先填写 version 字段

```bash
# 版本号说明
1.0.1
# 第一个数字：大版本更新，技术框架更换，重构等可加一,后面数字全置0
1.0.1 -> 2.0.0
# 第二个数字：功能点，新更新一个功能，数字可加一,后面数字为0
1.0.1 -> 1.2.0
# 第三个数字：bug修复，前面数字不变，最后一个数字加一，这个可以忽略
1.0.1 -> 1.0.2

# 生产环境版本号后追加release字段，大写
1.0.1-RELEASE

# 测试环境版本号后必须追加 beta字段,可在后再追加数字区分测试版本
2.22.0-beta-1
```

## 版本发布记录

```bash
1.0.0 2018-11-30 17:30
- 山东省地图底图配置完成
```
