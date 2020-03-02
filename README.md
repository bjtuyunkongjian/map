# 图云空间——地图打包

## 启动

1. 在根目录路径下输入 npm install 或 yarn，会自动下载所需的包
2. 安装完成对应的包以后，npm start，打开浏览器，输入 localhost:8080
3. 按住鼠标左键拖动视图，按住鼠标右键旋转视图，滚动鼠标滚轮缩放视图

## 文件目录注释

- 本工程采用最新的 webpack4.x 配置，基本实现 0 配置；
- ./.vscode/ 目录下是关于 vscode 的一些配置；
- ./bin/ 目录下是一些配置上传的文件， **config.js 文件不要上传到服务器**；
- ./src/ 目录下包含所有的 js 文件；
- ./static/ 目录下是一些静态资源，其中 sprite 文件夹中有雪碧图和雪碧图对应的 json，需要把这四个文件放到服务器上，sprite 具体生成方法在对应的工程上；
- ./style/ 目录下是所有的 css 样式文件；
- ./web_modules/ 目录下是一些公用的配置和组件；

## 文件上传

### 文档

- 47.110 sl/map-server/static/docs
- 47.97 sl/map-server/static/docs

### api

- 47.110 sl/map-server/static/third-party-api
- 47.97 sl/map-server/static/third-party-api

## 配置

1. mapbox 相应配置：[mapbox 参考文档](https://www.mapbox.com/mapbox-gl-js/)
2. 使用 gulp 打包生成雪碧图

## 版本发布记录

```markdown
# 2.4.15 2019-11-26

添加杭州地图
```

## 版本号说明

在文件 package.json 中先填写 version 字段

canshu

```markdown
# 版本号说明

1.0.1

# 第一个数字：大版本更新，技术框架更换，重构等可加一,后面数字全置 0

1.0.1 -> 2.0.0

# 第二个数字：功能点，新更新一个功能，数字可加一,后面数字为 0

1.1.1 -> 1.2.0

# 第三个数字：bug 修复，前面数字不变，最后一个数字加一，这个可以忽略

1.0.1 -> 1.0.2

# 生产环境版本号后追加 release 字段，大写

1.0.1-RELEASE

# 测试环境版本号后必须追加 beta 字段,可在后再追加数字区分测试版本

2.22.0-beta-1
```
