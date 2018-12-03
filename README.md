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

##编码规范

# HTML 部分

-对所有的引用使用 const -变量用 let 定义，(将 const 和 let 分类) -字面量创建对象 const item = {} const items=[] -不使用保留字作为键值，使用同义词替换需要使用的保留字 -对象方法简写 addValue(){} -使用函数声明代替函数表达式，在对象属性声明前把简写的属性分组 #数组部分 -向数组添加元素时，使用 Array.push 替代直接赋值
eg:const a=[]; a,push(''asdfghj) -使用拓展运算符...复制数组
eg:const items=[...items]; -使用 Array.from 把一个类数组对象转换成数组
eg:const b = Array.from(a); -使用解构存取和使用多属性对象
eg: -不在非函数代码块(if,while 等)声明函数并赋值给一个变量 -使用函数表达式(传递一个匿名函数)，使用箭头函数符号
-import 不适用通配符\*，不直接从 import 中直接 export
#JSX 部分
-JSX 中，每个文件只写一个模块，多个无状态模块可以放在单个文件中 -创建模块：1.1 如果模块有内部状态或是 refs,使用 class extends React.Component
1.2 如果模块没有状态或者没有引用 refs，使用普通函数
-props 属性：使用唯一 ID，避免使用数组的 index 作为属性 key 的值

#css 部分 -尽量不要使用 id 选择器
