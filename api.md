# 图云空间web端对外接口

该文档为图云空间第三方开发接口文档。开发前请仔细阅读该文档，特殊情况会在文档中有所说明。对应的 api 名称、参数名称以及返回内容借鉴了多个地理信息可视化平台的 api，并遵守相应的地理信息编码命名规范。

该地图的底层使用的webgl实现，请务必使用支持webgl的浏览器进行开发和测试。推荐使用chrome浏览器，60 以上的版本。由于windows xp系统对webgl的支持很不友好，所以 windows 平台请使用 windows 7 以上的进行开发。

## 简单实例

通过以下实例即可实现一个基础的地图功能。

```html
<!DOCTYPE html>
<html lang="en" style="width: 100%; height: 100%;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body style="width: 100%; height: 100%;">
    <div id="app" style="width: 100%; height: 100%;"></div>
    <script src="http://ip:host/dir/ty-map.1.1.0.js"></script>
    <script>
      const container = document.getElementById('app');
      const tyMap = new TyMap(container, {key: '你的对应的key'});
    </script>
  </body>
</html>
```

其中 TyMap 是 ty-map.1.1.0.js 中导出的唯一一个类。由于是 script 标签的形式引入，TyMap 也是一个全局对象。

## 需求

需要第三方提供对应的ip和域名，我们在设置白名单时要使用。ip和域名是**用户使用地图时所在服务器**的ip和域名。

## 第三方如何调用

为了防止网络安全攻击，第三方调用的接口分为两类，开发版和生产版。其特点如下所示：

|        类别         | 开发版(development) | 生产版(production) |
| :-----------------: | :-----------------: | :----------------: |
| 静态地图配额(次/日) |        1000         |      3000000       |
|   是否需要验证key   |         是          |         是         |
| 是否需要验证服务器  |         否          |         是         |

验证服务器是指会对第三方调用的服务器进行验证，为了防止他人盗用key之后进行二次开发，导致配额不足无法访问服务器等异常的情况。关于开发版和生产版两个版本，除了配额，以及生产版有图云空间的水印以外，其他功能完全一致。如果不是直接在服务器上进行开发，建议开发期间使用开发版进行开发，开发结束打包到服务器使用生产版。

本公司其他项目组还有坐标转换、地理编码以及路线规划等功能，如有需求可与相关人员联系。

### 使用 cdn 的形式引入

图云空间第三方接口 CDN 地址以及调用方式：

```html
<!-- 地图引入文件 -->
<script src="http://47.110.135.245:3000/third-party-api/ty-map-development.1.1.0.js"></script>
<script src="http://47.110.135.245:3000/third-party-api/ty-map-production.1.1.0.js"></script>
```

### 下载第三方接口的 js 代码

您可以从 <http://47.110.135.245:3000/third-party-api/ty-map-development.1.1.0.js> 上下载图云空间第三方接口的对应版本到本地。其中 1.1.0 为版本号。然后通过

```html
<script src="dirname/ty-map-development.1.1.0.js"></script>
```

的方式调用。

## 基本功能

### 1. 地图调用功能，显示山东省的详细地图

通过 script 标签的方式将代码引入，

```html
<script src="http://47.110.135.245:3000/third-party-api/ty-map-development.1.1.0.js"></script>
```

然后创建一个面积不为零的容器，比如创建一个 id 为 app 的 div 容器：

```html
<div id="app" style="width: 1366px; height: 768px;"></div>
```

然后新建一个 script 标签，以上面的 div#app 作为该地图的容器，调用 ty-map-\[type\].\[version\].js 中的唯一全局的类 TyMap。

```html
<script>
  const container = document.getElementById('app');
  const tyMap = new TyMap(container, {key: '你的对应的key'});
  console.log(tyMap); // 可以在控制台打印出 TyMap 的实例化对象看一下。
</script>
```

在 div#app 容器中就能看到山东省的地图了。

### 2. 地图的倾斜、旋转、移动、缩放

在默认实例化 TyMap 后就会带有这些功能。实例化 TyMap 接受两个参数，第一个参数是容器，第二个参数是**配置项**。可以在配置项中禁用这些功能。

### 3. 设置起始坐标中心

可以在配置项中设置起始坐标中心。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, {key: '你的对应的key', center: [117.0856, 36.6754]});
```

### 4. 设置起始旋转角

可以在配置项中设置起始旋转角。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, {key: '你的对应的key', bearing: 180});
```

### 5. 设置起始倾斜角

可以在配置项中设置起始倾斜角。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, {key: '你的对应的key', pitch: 30});
```

## 设置和获取地图基本信息

### 1. resize()

重新调整地图容器大小。当地图容器的大小发生改变或者隐藏地图容器，通过调用此方法来使地图显示范围和容器的大小一致。

### 2. getBounds()

获取地图的地理边界。结果是包含可见区域的最小边界。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
console.log(tyMap.getBounds());
// 返回：
// {
//   _ne: {lng: 123.14425781246035, lat: 38.37168970146746},
//   _sw: {lng: 113.91574218746871, lat: 34.438502997233144}
// }
// _ne: north east
// _sw: south west
```

### 3. setMaxBounds(bounds?)

设置或清除地图的地理边界。平移和缩放操作受限于这些范围内。其中 bounds 是可选参数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.setMaxBounds(); // 清除边界
tyMap.setMaxBounds([
  [117.04023142816038, 36.78984454855521],
  [117.24189547791264, 36.73030425442248]
]); // 设置边界
```

该方法移出该区域范围时会导致闪烁，所以不推荐使用该方法。

### 4. getMaxBounds()

获取地图约束的最大地理范围，如果没有设置，则返回null。和 setMaxBounds 相对应。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.getMaxBounds(); // 返回：null
```

### 5. setMinZoom(zoomLevel?)

设置或清除地图的最小缩放级别。如果地图的当前缩放级别低于新的最小值，则地图将缩放到新的最小值。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.setMinZoom(10);
```

### 6. getMinZoom()

获取地图的最小允许缩放级别。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.getMinZoom(); // 返回：7
```

### 7. setMaxZoom(zoomLevel?)

设置或清除地图的最大缩放级别。如果地图的当前缩放级别高于新的最大值，则地图将缩放到新的最大值。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.setMaxZoom(20);
```

### 8. getMaxZoom()

获取地图的最大允许缩放级别。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.getMaxZoom(); // 返回：20
```

### 9. isZooming()

判断地图是否正在进行缩放操作。返回 true 或者 false。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.isZooming(); // 返回 true 或者 false
```

### 10. isRotating()

判断地图是否正在进行旋转操作。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.isRotating(); // 返回 true 或者 false
```

### 11. isMoving()

判断地图是否在移动（包括拖拽、旋转、缩放、倾斜等动作）。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.isMoving(); // 返回 true 或者 false
```

### 12. getLayer(layerId)

获取当前屏幕渲染的图层内容。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.getLayer('layerIdxxx'); // 返回 对应的信息
```

### 13. 添加点图层。根据相应数据结构在地图上添加对应点的图层。
### 14. 添加线图层。根据相应数据结构在地图上添加对应线的图层。
### 15. 添加面图层。根据相应数据结构在地图上添加对应点的图层。
### 16. 添加三维建筑图层。根据相应数据结构在地图上添加三维建筑图层。
### 17. 设置添加的图层对应的过滤条件。
### 18. 删除图层。删除点、线、面、三维建筑图层。
### 19. 获取添加图层对应的内容。
### 20. 设置地图的地理中心点。
### 21. 获取地图的地理中心点。
### 22. 按指定的偏移量平移地图。
### 23. 使用动画过渡将地图平移到指定位置。
### 24. 设置地图的缩放等级。
### 25. 获取地图的缩放等级。
### 26. 使用动画过渡将地图缩放到指定的缩放级别。
### 27. 将地图的缩放级别提高 1。
### 28. 将地图的缩放级别减小 1。
### 29. 设置地图的旋转角度。
### 30. 获取地图的旋转角度。
### 31. 使用动画过渡将地图旋转到指定的方位。
### 32. 设置地图的倾斜角。
### 33. 获取地图的倾斜角。
### 34. 改变中心，缩放，方位和倾斜角的任何组合，使沿着引起飞行的曲线的过渡动画化。动画无缝地结合了变焦和平移，即使在经过很远的距离之后也能帮助用户保持倾斜角。
### 35. 中断过渡动画。

## 辅助计算

### 1. unproject(point)

地图容器的像素坐标对应到指定的地理坐标位置。返回一个经纬度坐标。

```md
**输入参数**
要取消投影的像素坐标数组。

**返回结果**
对应于点的经纬度。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'));
console.log(tyMap.unproject([100, 100]));
// 返回：{lng: 114.46505859371695, lat: 37.93974548507774}
```

### 2. 地理坐标位置对应到指定的地图容器的像素坐标。返回一个像素坐标
### 3. 生成单点对应的 geojson 格式数据。
### 4. 生成多点对应的 geojson 格式数据。
### 5. 生成单线对应的 geojson 格式数据。
### 6. 生成多线对应的 geojson 格式数据。
### 7. 生成单面对应的 geojson 格式数据。
### 8. 生成多面对应的 geojson 格式数据。
### 9. 生成单个三维建筑对应的 geojson 格式数据。
### 10. 生成多个三维建筑对应的 geojson 格式数据。
### 11. 生成随机的 geojson 格式的点。
### 12. 生成随机的 geojson 格式的线。
### 13. 生成随机的 geojson 格式的面。
### 14. 生成多点、多线、多面对应的集合。
### 15. 计算 geojson 格式两点的中心位置。
### 16. 计算 geojson 格式两点之间的距离。
### 17. 计算 geojson 格式的线的距离。
### 18. 计算 geojson 格式的面的面积。
### 19. 通过最大和最小经纬度生成对应矩形面的 geojson 数据。
### 20. 计算多个 geojson 格式的点数据的中心位置。
### 21. 计算某个点到某条线的最短距离。
### 22. 计算某条线上离某个点最近的那个点。
### 23. 计算某条线上距离为 x 的点的坐标。
### 24. 判断某个点是否在某个面上。
### 25. 计算给定点并给定半径的圆形多边形。
### 26. 计算给定点、给定半径给定起始角和终止角对应的扇形。
### 27. 根据多个点生成 geojson 格式的凸多边形。
### 28. 求两个面的交集。
### 29. 求两个面的并集。
### 30. 求第一个面和第二个面的差集。
### 31. 通过线生成对应的面。
### 32. 通过面生成对应的线。

## 监听事件

### 地图监听事件

### 1. 调整地图大小。在调整地图大小后触发对应回调。
### 2. 鼠标按下事件。在地图上按下鼠标时触发对应回调。
### 3. 鼠标释放事件。在地图上释放鼠标时触发对应回调。
### 4. 鼠标移入事件。在鼠标移入地图时触发对应回调。
### 5. 鼠标移出事件。在鼠标移出地图时触发对应回调。
### 6. 鼠标移动事件。在地图中移动鼠标时触发对应回调。
### 7. 鼠标点击事件。在地图上点击鼠标时触发对应回调。
### 8. 鼠标双击事件。在地图上双击鼠标时触发对应回调。
### 9. 鼠标右键点击事件。在地图上右键鼠标时触发对应回调。
### 10. 地图拖拽事件。在地图上移动鼠标滚轮时触发对应回调。
### 11. 地图缩放事件。在地图上移动鼠标滚轮时触发对应回调。
### 12. 地图旋转事件。在地图上移动鼠标滚轮时触发对应回调。
### 13. 地图倾斜事件。在地图上移动鼠标滚轮时触发对应回调。
### 14. 地图移动事件。在拖拽、缩放、旋转、倾斜时触发对应回调。
### 15. 地图移动结束事件。在拖拽、缩放、旋转、倾斜动作结束触发对应回调。
### 16. 地图首次渲染完成事件。在下载所有必要资源并且第一次视觉上完成地图渲染后立即触发。

### 图层监听事件

### 1. 鼠标按下事件。在图层对应的点、线、面上按下鼠标时触发对应回调。
### 2. 鼠标释放事件。在图层对应的点、线、面上释放鼠标时触发对应回调。
### 3. 鼠标移入事件。在鼠标移入图层对应的点、线、面时触发对应回调。
### 4. 鼠标移出事件。在鼠标移出图层对应的点、线、面时触发对应回调。
### 5. 鼠标移动事件。在图层对应的点、线、面上移动鼠标时触发对应回调。
### 6. 鼠标点击事件。在图层对应的点、线、面上点击鼠标时触发对应回调。
### 7. 鼠标双击事件。在图层对应的点、线、面上双击鼠标时触发对应回调。
### 8. 鼠标右键点击事件。在图层对应的点、线、面上右键鼠标时触发对应回调。
