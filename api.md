# 图云空间 web 端对外接口

该文档为图云空间第三方开发接口文档。开发前请仔细阅读该文档，特殊情况会在文档中有所说明。对应的 api 名称、参数名称以及返回内容借鉴了多个地理信息可视化平台的 api，并遵守相应的地理信息编码命名规范。

该地图的底层使用的 webgl 实现，请务必使用支持 webgl 的浏览器进行开发和测试。推荐使用 google chrome 浏览器，60 以上的版本。急速浏览器尽量使用 73 以上的版本。由于 windows xp 系统对 webgl 的支持很不友好，所以 windows 平台请使用 windows 7 以上的进行开发。

查看 pdf 版本（当前最高版本: 2.4.17）接口文档：[点此下载](http://10.49.6.62:8084/docs/api.pdf)

注: **由于底层服务的改动，之前 1.x.x 版本对应的 js 包已不再维护，2019 年 3 月 12 日之前注册的 key 继续沿用，2019 年 3 月 12 日之后注册的 key 不再支持 1.x.x 版本。如有问题请与相关技术人员联系。**

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
    <script src="http://ip:host/dir/ty-map-development.2.4.18.js"></script>
    <script>
      const container = document.getElementById('app');
      const tyMap = new TyMap(container, { key: '你的对应的key' });
    </script>
  </body>
</html>
```

其中 TyMap 是 ty-map.2.4.18.js 中导出的唯一一个类。由于是 script 标签的形式引入，TyMap 也是一个全局对象。

## 需求

需要第三方提供对应的 ip 和域名，我们在设置白名单时要使用。ip 和域名是**用户使用地图时所在服务器**的 ip 和域名。

## 第三方如何调用

为了防止网络安全攻击，第三方调用的接口分为两类，开发版和生产版。其特点如下所示：

|        类别         | 开发版(development) | 生产版(production) |
| :-----------------: | :-----------------: | :----------------: |
| 静态地图配额(次/日) |        5000         |      3000000       |
|  是否需要验证 key   |         是          |         是         |
| 是否需要验证服务器  |         否          |         是         |

验证服务器是指会对第三方调用的服务器进行验证，为了防止他人盗用 key 之后进行二次开发，导致配额不足无法访问服务器等异常的情况。关于开发版和生产版两个版本，除了配额，以及开发版有图云空间的水印以外，其他功能完全一致。如果不是申请使用自己的服务器后台转接数据或者直接在服务器上进行开发，建议开发期间使用开发版进行开发，开发结束打包到服务器使用生产版。

本公司其他项目组还有坐标转换、地理编码以及路线规划等功能，如有需求可与相关人员联系。

### 使用 cdn 的形式引入

图云空间第三方接口 CDN 地址以及调用方式：

```html
<!-- 地图引入文件 -->
<script src="http://10.49.6.62:8084/third-party-api/ty-map-development.2.4.18.js"></script>
<script src="http://10.49.6.62:8084/third-party-api/ty-map-production.2.4.18.js"></script>
```

### 下载第三方接口的 js 代码

您可以从 <http://10.49.6.62:8084/third-party-api/ty-map-development.2.4.18.js> 或者 <http://10.49.6.62:8084/third-party-api/ty-map-production.2.4.18.js> 上下载图云空间第三方接口的对应版本到本地。其中 2.4.18 为版本号。然后通过

```html
<script src="dirname/ty-map-development.2.4.18.js"></script>
```

的方式调用。

### 使用自己的服务器后台

您可以申请使用自己的服务器后台，本公司会为您生成对应的 cdn，您也可以下载到本地进行开发。由于该方式只支持 production 版本，需用户提供对应的 ip 和域名。如使用此方法开发，请务必做好相应的安全策略。

## 基本功能

### 1. 地图调用功能，显示某省的详细地图

通过 script 标签的方式将代码引入，

```html
<script src="http://10.49.6.62:8084/third-party-api/ty-map-development.2.4.18.js"></script>
```

然后创建一个面积不为零的容器，比如创建一个 id 为 app 的 div 容器：

```html
<div id="app" style="width: 1366px; height: 768px;"></div>
```

然后新建一个 script 标签，以上面的 div#app 作为该地图的容器，调用 ty-map-[type].[version].js 中的唯一全局的类 TyMap。

```html
<script>
  const container = document.getElementById('app');
  const tyMap = new TyMap(container, { key: '你的对应的key' });
  console.log(tyMap); // 可以在控制台打印出 TyMap 的实例化对象看一下。
</script>
```

在 div#app 容器中就能看到某个省份的地图了。

### 2. 设置地图默认风格样式

可以在配置项中设置地图默认风格样式。有以下几种风格样式： standard ，european ，serene ，calm ，serenity ，night 可提供配置。默认是 standard 风格。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, { key: '你的对应的key', theme: 'standard' });
```

### 3. 地图的倾斜、旋转、移动、缩放

在默认实例化 TyMap 后就会带有这些功能。实例化 TyMap 接受两个参数，第一个参数是容器，第二个参数是**配置项**。可以在配置项中禁用这些功能。

### 4. 设置起始坐标中心

可以在配置项中设置起始坐标中心。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, { key: '你的对应的key', center: [117.0856, 36.6754] });
```

### 5. 设置起始旋转角

可以在配置项中设置起始旋转角。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, { key: '你的对应的key', bearing: 180 });
```

### 6. 设置起始倾斜角

可以在配置项中设置起始倾斜角。

举例：

```javascript
const container = document.getElementById('app');
new TyMap(container, { key: '你的对应的key', pitch: 30 });
```

## 设置和获取地图基本信息

### 1. resize()

重新调整地图容器大小。当地图容器的大小发生改变或者隐藏地图容器，通过调用此方法来使地图显示范围和容器的大小一致。

```markdown
**输入参数**
null

**返回结果**
null
```

### 2. getBounds()

获取地图的地理边界。结果是包含可见区域的最小边界。

```markdown
**输入参数**
null

**返回结果**
包含可见区域的最小边界
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.getBounds());
// 返回：
// {
//   _ne: {lng: 123.144257, lat: 38.371689},
//   _sw: {lng: 113.915742, lat: 34.438502}
// }
// _ne: north east
// _sw: south west
```

### 3. setMaxBounds(bounds?)

设置或清除地图的地理边界。平移和缩放操作受限于这些范围内。其中 bounds 是可选参数。

```markdown
**输入参数**
bounds?：可选参数，为空时代表清除地理边界。bounds 是 undefined 或者是一个二维数组：
[
[lngMax, latMax],
[lngMin, latMin]
]

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setMaxBounds(); // 清除边界
tyMap.setMaxBounds([
  [117.04023142816038, 36.78984454855521],
  [117.24189547791264, 36.73030425442248],
]); // 设置边界
```

该方法移出该区域范围时会导致闪烁，所以不推荐使用该方法。后面可能会注销该 api。

### 4. getMaxBounds()

获取地图约束的最大地理范围，如果没有设置，则返回 null。和 setMaxBounds 相对应。

```markdown
**输入参数**
null

**返回结果**
地图约束的最大地理范围或者 null，没有返回代表没有设置最大范围。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getMaxBounds(); // 返回：null
```

### 5. setMinZoom(zoomLevel?)

设置或清除地图的最小缩放级别。如果地图的当前缩放级别低于新的最小值，则地图将缩放到新的最小值。

```markdown
**输入参数**
zoomLevel?: 可选参数，为空时代表清除最小缩放级别；不为空时代表设置最小缩放级别。

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setMinZoom(10);
```

### 6. getMinZoom()

获取地图的最小允许缩放级别。

```markdown
**输入参数**
null

**返回结果**
设置的最小缩放级别或者 null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getMinZoom(); // 返回：7
```

### 7. setMaxZoom(zoomLevel?)

设置或清除地图的最大缩放级别。如果地图的当前缩放级别高于新的最大值，则地图将缩放到新的最大值。

```markdown
**输入参数**
zoomLevel?: 可选参数，为空时代表清除最大缩放级别；不为空时代表设置最大缩放级别。

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setMaxZoom(20);
```

### 8. getMaxZoom()

获取地图的最大允许缩放级别。

```markdown
**输入参数**
null

**返回结果**
设置的最大缩放级别或者 null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getMaxZoom(); // 返回：20
```

### 9. isZooming()

判断地图是否正在进行缩放操作。返回 true 或者 false。

```markdown
**输入参数**
null

**返回结果**
布尔值
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.isZooming(); // 返回 true 或者 false
```

### 10. isRotating()

判断地图是否正在进行旋转操作。

```markdown
**输入参数**
null

**返回结果**
布尔值
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.isRotating(); // 返回 true 或者 false
```

### 11. isMoving()

判断地图是否在移动（包括拖拽、旋转、缩放、倾斜等动作）。

```markdown
**输入参数**
null

**返回结果**
布尔值，true 或 false
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.isMoving(); // 返回 true 或者 false
```

### 12. getLayer(layerId)

获取当前屏幕渲染的图层内容。

```markdown
**输入参数**
layerId，对应图层的 id 号

**返回结果**
该 id 图层对应当前屏幕渲染的内容
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getLayer('layerIdxxx'); // 返回 对应的信息
```

### 13. addCircleLayer(source, layerId, options?)

添加点图层。根据相应数据结构在地图上添加对应点的图层。

```markdown
**输入参数**
source: geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- color?: 点的颜色，默认为红色，色值为 #RRGGBB/rgb(R,G,B)/rgba(R,G,B,ALPHA)
- labelLayerId?: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- strokeWidth?: 描边的宽度
- strokeColor?: 描边的颜色
- radius?: 点的半径

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
function addLayer() {
  const lnglatArr = [[lng1, lat1], [lng2, lat2], ...];
  const geometry = lnglatArr.map(item => tyMap.point(item, { radius: 3 }));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addCircleLayer(geojsonData, 'pointLayerId', {
    color: 'rgba(0,0,0,0)',
    strokeWidth: ['get', 'radius'],
    strokeColor: '#4169E1',
    labelLayerId: 'which id'
  });
}
tyMap.onClick(addLayer);
```

添加图层对应的方法应该在地图初始化完成后调用。如果是在初始化同时添加图层，请使用 onLoad 方法。如下所示：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.onLoad(() => {
  const lnglatArr = [[lng1, lat1], [lng2, lat2], ...];
  const geometry = lnglatArr.map(item => tyMap.point(item, { radius: 3 }));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addCircleLayer(geojsonData, 'pointLayerId', {
    color: 'rgba(0,0,0,0)',
    strokeWidth: ['get', 'radius'],
    strokeColor: '#4169E1',
    labelLayerId: 'which id'
  });
});
```

### 14. addLineLayer(source, layerId, options?)

添加线图层。根据相应数据结构在地图上添加对应线的图层。

```markdown
**输入参数**
source: geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- labelLayerId?: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- width?: 线的宽度，默认为 1
- color?: 线的颜色，默认为红色，色值为 #RRGGBB/rgb(R,G,B)/rgba(R,G,B,ALPHA)
- dasharray?: 是否是虚线，实线用 [1] 表示，虚线用[realRercentage, imaginaryRercentage]，默认为实线

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.onClick(() => {
  const lineArr = [[[lng11, lat11], [lng12, lat12], ...], [[lng21, lat21], [lng22, lat22], ...]];
  const geometry = lineArr.map(item => tyMap.lineString(item));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addLineLayer(geojsonData, 'lineLayerId', {
    color: 'rgba(0,0,0,0)',
    labelLayerId: 'which id'
  });
});
```

添加图层对应的方法应该在地图初始化完成后调用。详情参考 [添加点图层](#13-addcirclelayersource-layerid-options)

### 15. addPolygonLayer(source, layerId, options?)

添加面图层。根据相应数据结构在地图上添加对应点的图层。

```markdown
**输入参数**
source: geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- labelLayerId?: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- color?: 面的颜色，默认为红色，色值为 #RRGGBB/rgb(R,G,B)/rgba(R,G,B,ALPHA)

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.onClick(() => {
  const polygonArr = [[[[lng11, lat11], [lng12, lat12], [lng13, lat13], ...]]];
  const geometry = polygonArr.map(item => tyMap.polygon(item));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addPolygonLayer(geojsonData, 'polygonLayerId', {
    labelLayerId: 'which id'
  });
});
```

添加图层对应的方法应该在地图初始化完成后调用。详情参考 [添加点图层](#13-addcirclelayersource-layerid-options)

### 16. add3dLayer(source, layerId, options?)

添加三维建筑图层。根据相应数据结构在地图上添加三维建筑图层。

```markdown
**输入参数**
source: geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- labelLayerId: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- color: 线的颜色，默认为红色，色值为 #RRGGBB/rgb(R,G,B)/rgba(R,G,B,ALPHA)

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.onClick(() => {
  const polygon3dArr = [[[[lng11, lat11], [lng12, lat12], [lng13, lat13], ...]]];
  const geometry = polygon3dArr.map(item => tyMap.polygon3d(item));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.add3dLayer(geojsonData, 'polygon3dLayerId', {
    labelLayerId: 'which id'
  });
});
```

添加图层对应的方法应该在地图初始化完成后调用。详情参考 [添加点图层](#13-addcirclelayersource-layerid-options)

### 17. addTextLayer(source, layerId, options?)

添加文字图层。根据相应数据结构在地图上添加文字图层。**生成 geojson 格式的点的时候请务必带上 text 属性！**

```markdown
**输入参数**
source: geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- textColor?: 文字的颜色，默认为深灰色，色值为 #RRGGBB/rgb(R,G,B)/rgba(R,G,B,ALPHA)
- labelLayerId?: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- textHaloWith?: 描边的宽度，默认是 2 像素
- textHaloColor?: 描边的颜色，默认为白色

**返回结果**
null
```

添加图层对应的方法应该在地图初始化完成后调用。详情参考 [添加点图层](#13-addcirclelayersource-layerid-options)

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
tyMap.onClick(() => {
  const lnglatArr = [{coord: [lng1, lat1], text: 'text1'}, {coord: [lng2, lat2], text: 'text2'}, ...];
  const geometry = lnglatArr.map(item => tyMap.point(item.coord, { text: item.text }));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addTextLayer(geojsonData, 'textLayerId', {
    textColor: 'rgba(0,0,0,0)',
  });
});
```

### 18. addHeatMapLayer(source, layerId, options?)

添加点图层。根据相应数据结构在地图上添加对应点的图层。

```markdown
**输入参数**
source: 点集合的 geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- colorArr?: 点的颜色数组。数组中数值与色值间隔，默认为 [0, 'rgba(33,102,172,0)', 0.5, 'green', 0.8, 'yellow', 1, 'red']。数值取值范围为 0 到 1，色值为 #RRGGBB/rgb(R,G,B)/rgba(R,G,B,ALPHA)。
- labelLayerId?: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- radius?: 热力图圆的半径，默认为 10。
- opacity?: 透明度。默认为 1。

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
function addLayer() {
  const lnglatArr = [[lng1, lat1], [lng2, lat2], ...];
  const geometry = lnglatArr.map(item => tyMap.point(item, { radius: 3 }));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addCircleLayer(geojsonData, 'pointLayerId', {
    labelLayerId: 'which id'
  });
}
tyMap.onClick(addLayer);
```

添加图层对应的方法应该在地图初始化完成后调用。详情参考 [添加点图层](#13-addcirclelayersource-layerid-options)

### 19. addImageLayer(source, layerId, options?)

添加图片图层。根据相应数据结构在地图上添加对应图片的图层。

```markdown
**输入参数**
source: geojson 格式的数据
layerId: 所需渲染图层的 id，所有图层的 id 不能重复
options?: 配置项，默认为空，包括以下几个属性：

- imgUrl: 必传参数，添加图片对应的图片的地址
- imgName?: 为添加的图片重命名，前后不能重名，重名引擎会认为该图片资源已经加载而不进行再次添加，所以**重名不会报错**。
- size?: 图片缩放尺寸，默认为 1
- rotate?: 图片和文字旋转角度，默认为 0
- opacity?: 图片和文字的透明度，默认为 1
- labelLayerId?: 该图层在 labelLayerId 之下，默认为空代表添加到所有图层之上。提供可用的参考图层有 water-ref，grass-ref，road-ref，road-name-ref，building-ref，poi-ref，分别代表水系，绿地，道路，道路名称，建筑物，兴趣点的底部图层。
- rotationAlign?: 设置图片和文字旋转角度基于什么旋转。可选值为 map/viewport。当选择 map 时，会根据地图来旋转。当选择 viewport 时，会根据显示器屏幕来旋转。默认为 viewport。
- pitchAlign?: 设置图片和文字倾斜角度基于什么倾斜。可选值为 map/viewport。当选择 map 时，会根据地图来倾斜。当选择 viewport 时，会根据显示器屏幕来倾斜。默认为 viewport。
- placement?: 标签沿什么放置。可选值为 point/line/line-center。当选择 point 时，按点的经纬度来放置。当选择 line 时，沿线或者面，放于起始位置。当选择 line-center 时，放在线、面、多线、多面的中心位置。默认为 point。
- disableAvoid?: 禁用点与点之间的避让。默认点与点之间是会产生避让的，前面添加的点与后面添加的点发生冲突时，前面添加的点不显示。默认为 false。
- textFit?: 图片是否适应文字。可选值为 none/width/height/both。当设置为 none 时，图片与文字是平级关系，图片在前，文字在后，否则文字在图片的上层。当设置为 width 时，图片根据文字的宽度等比例缩放。当设置为 height 时，图片根据文字的高度等比例缩放。当设置为 both 时，图片的高度和宽度和文字的高宽相对应。默认为 none。
- textFitPaddng?: 图片与文字之间的 padding。默认为 [0, 0, 0, 0]。
- hotAreaWidth?: 热区的宽度。此选项使得图片更方便点击，但不会与影响点与点之间的避让关系。默认为 2。
- anchor?: 图片和文字相对经纬度的位置。可选值为 center/left/right/top/bottom/top-left/top-right/bottom-left/bottom-right。默认为 center。
- text?: 文字。默认为 ''。
- fontSize?: 文字大小。默认为 16。
- textWrapWidth?: 文字换行宽度。单位是根据中文文字大小来计算的。英文和数字文字大小可能为中文文字大小的二分之一，也可能其他值。比如设置 10，则最多十个标准中文文字一行。默认值为 8.

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {key: '你的对应的key'});
function addLayer() {
  const lnglatArr = [[lng1, lat1], [lng2, lat2], ...];
  const geometry = lnglatArr.map(item => tyMap.point(item, { radius: 3 }));
  const geojsonData = {
    type: 'geojson',
    data: tyMap.featureCollection(geometry)
  };
  tyMap.addImageLayer(geojsonData, 'pointLayerId', {
    imgUrl: `http://tuyunkongjian.com/test.png`
  });
}
tyMap.onClick(addLayer);
```

添加图层对应的方法应该在地图初始化完成后调用。详情参考 [添加点图层](#13-addcirclelayersource-layerid-options)

### 20. setFilter(layerId, filterExpress)

设置添加的图层对应的过滤条件。

```markdown
**输入参数**
layerId: 已经渲染的图层 id
filterExpress: 过滤条件表达式有两种：

- ["==", key, val] prop[key] === val
- ["!=", key, val] prop[key] !== val

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setFilter('toFilterLayer', ['==', 'type', 'HYH']); // toFilterLayer 过滤只剩下 type 为 HYH 的数据
```

### 21. removeLayer(layerId)

删除图层。根据 layerId 删除点、线、面、三维建筑对应的图层。

```markdown
**输入参数**
layerId: 已经渲染的图层 id

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.removeLayer('toRemoveLayer'); // 删除 toRemoveLayer 图层
```

### 22. setCenter(center)

设置地图的地理中心点。

```markdown
**输入参数**
center: [lng, lat]

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setCenter([116.98462, 36.64932]);
```

### 23. getCenter()

获取地图的地理中心点。

```markdown
**输入参数**

**返回结果**
经纬度，{lng, lat} 结构
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getCenter();
// 返回：{lng: 116.98462, lat: 36.64932}
```

### 24. setZoom(zoomLevel)

设置地图的缩放等级。

```markdown
**输入参数**
zoomLevel: 缩放等级

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setZoom(15);
```

### 25. getZoom()

获取地图的缩放等级。

```markdown
**输入参数**
null

**返回结果**
当前缩放等级
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getZoom();
// 返回：11.21
```

### 26. setBearing(bearing)

设置地图的旋转角度。

```markdown
**输入参数**
bearing: 旋转角度

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setBearing(180);
```

### 27. getBearing()

获取地图的旋转角度。

```markdown
**输入参数**
null

**返回结果**
当前地图旋转角度
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getBearing();
// 返回：0
```

### 28. setPitch(pitch)

设置地图的倾斜角。

```markdown
**输入参数**
pitch: 倾斜角度

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setPitch(30);
```

### 29. getPitch()

获取地图的倾斜角。

```markdown
**输入参数**
null

**返回结果**
当前地图倾斜角度
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getPitch();
// 返回：0
```

### 30. jumpTo(options)

不使用动画过渡，按指定大小更改地图的中心(center)/缩放等级(zoom)/旋转角度(bearing)/倾斜角(pitch)。

```markdown
**输入参数**
options: 对象，至少包括一项以下属性：

- center: 中心，[lng, lat]
- zoom: 缩放等级，数字
- bearing: 旋转角度，数字
- pitch: 倾斜角，数字

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.jumpTo({
  center: [117.0856, 36.6754],
  zoom: 12,
  pitch: 30,
  bearing: 180,
});
```

### 31. zoomIn()

使用动画过渡将地图的缩放级别提高 1。

```markdown
**输入参数**
null

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.zoomIn();
```

### 32. zoomOut()

使用动画过渡将地图的缩放级别减小 1。

```markdown
**输入参数**
null

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.zoomOut();
```

### 33. zoomTo(zoomLevel)

使用动画过渡将地图缩放到指定的缩放级别。

```markdown
**输入参数**
zoomLevel：缩放等级

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.zoomTo(12);
```

### 34. rotateTo(bearing)

使用动画过渡将地图旋转到指定的方位。

```markdown
**输入参数**
bearing：旋转角度

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.rotateTo(120);
```

### 35. panTo(lnglat)

使用动画过渡将地图平移到指定位置。

```markdown
**输入参数**
lnglat：经纬度坐标，[lng, lat]

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.panTo([117.0856, 36.6754]);
```

### 36. flyTo()

使用动画过渡，按指定大小更改地图的中心(center)/缩放等级(zoom)/旋转角度(bearing)/倾斜角(pitch)。

```markdown
**输入参数**
options：对象，至少包括一项以下内容：

- center: 中心，[lng, lat]
- zoom: 缩放等级
- bearing: 旋转角度
- pitch: 倾斜角

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.flyTo({
  center: [117.0856, 36.6754],
  zoom: 12,
  pitch: 30,
  bearing: 180,
});
```

### 37. stopAni()

中断过渡动画。过渡动画正在发生时可以使用此方法中断。

```markdown
**输入参数**
null

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.stopAni();
```

### 38. setTheme(themeName)

设置地图风格样式。

```markdown
**输入参数**
themeName: 风格类型名称。必须为以下几种风格样式之一： standard, european, serene, calm, serenity, night。

**返回结果**
null
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setTheme('european'); // toFilterLayer 过滤只剩下 type 为 HYH 的数据
```

## 辅助计算

### 1. unproject(point)

地图容器的像素坐标对应到指定的地理坐标位置。返回一个经纬度坐标。

```markdown
**输入参数**
要取消投影的像素坐标数组。

**返回结果**
对应于点的经纬度。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.unproject([100, 100]));
// 返回：{lng: 114.46505859371695, lat: 37.93974548507774}
```

### 2. project(lnglat)

地理坐标位置对应到指定的地图容器的像素坐标。返回一个像素坐标

```markdown
**输入参数**
对应于点的经纬度。

**返回结果**
要取消投影的像素坐标数组。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.project([114.4650585, 37.9397454]));
// 返回：{x: -6792.88034417781, y: -4185.204987593001}
```

### 3. point(lnglat, prop?)

生成单点对应的 geojson 格式数据。

```markdown
**输入参数**
lnglat: 经纬度数组，[lng, lat]
prop?: 对应的属性，如 { radius: 3 }

**返回结果**
单点对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.point([114.4650585, 37.9397454], { radius: 3 }));
// 返回：
// {
//   "type": "Feature",
//   "properties": {
//     "radius": 3
//   },
//   "geometry": {
//     "type": "Point",
//     "coordinates": [
//       114.4650585,
//       37.9397454
//     ]
//   }
// }
```

### 4. multiPoint(lnglatArr, prop?)

生成多点对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArr: 经纬度数组，[[lng1, lat1], [lng2, lat2]]
prop?: 对应的属性，如 { radius: 3 }

**返回结果**
多点对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.multiPoint(
    [
      [114.4650585, 37.9397454],
      [114.5650585, 37.8397454],
    ],
    {
      radius: 3,
    }
  )
);
```

### 5. lineString(lnglatArr, prop?)

生成单线对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArr: 经纬度数组，[[lng1, lat1], [lng2, lat2]]
prop?: 对应的属性，如 { name: 'HYH 路' }

**返回结果**
单线对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.lineString(
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    { name: 'HYH路' }
  )
);
```

### 6. multiLineString(lnglatArrArr, prop?)

生成多线对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArrArr: 经纬度数组，[[[lng11, lat11], [lng12, lat12]], [[lng21, lat21], [lng22, lat22]]]
prop?: 对应的属性，如 { name: 'HYH 路' }

**返回结果**
多线对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.multiLineString(
    [
      [
        [11, 11],
        [12, 12],
        [13, 13],
      ],
      [
        [21, 21],
        [22, 22],
        [23, 23],
      ],
    ],
    { name: 'HYH路' }
  )
);
```

### 7. polygon(lnglatArrArr, prop?)

生成单面对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArrArr: 经纬度数组，[[[lng11, lat11], [lng12, lat12], [lng13, lat13], [lng14, lat14]]]
prop?: 对应的属性，如 { name: 'HYH 区' }

**返回结果**
单面对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.polygon(
    [
      [
        [11, 11],
        [12, 12],
        [13, 13],
        [14, 14],
      ],
    ],
    { name: 'HYH区' }
  )
);
```

### 8. multiPolygon(lnglatArrArrArr, prop?)

生成多面对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArrArrArr: 经纬度数组，[
[[[lng111, lat111], [lng112, lat112], [lng113, lat113], [lng114, lat114]]],
[[[lng211, lat211], [lng212, lat212], [lng213, lat213], [lng214, lat214]]]
]
prop?: 对应的属性，如 { name: 'HYH 区' }

**返回结果**
多面对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.multiPolygon(
    [
      [
        [
          [111, 111],
          [112, 112],
          [113, 113],
          [114, 114],
        ],
      ],
    ],
    {
      name: 'HYH区',
    }
  )
);
```

### 9. polygon3d(lnglatArrArr, prop?)

生成单个三维建筑对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArrArr: 经纬度数组，[[[lng11, lat11], [lng12, lat12], [lng13, lat13], [lng14, lat14]]]
prop?: 对应的属性，如 { name: 'HYH 建筑', height: 80 }

**返回结果**
单个三维建筑对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.polygon3d(
    [
      [
        [11, 11],
        [12, 12],
        [13, 13],
        [14, 14],
      ],
    ],
    {
      name: 'HYH建筑',
    }
  )
);
```

### 10. multiPolygon3d(lnglatArrArrArr, prop?)

生成多个三维建筑对应的 geojson 格式数据。

```markdown
**输入参数**
lnglatArrArrArr: 经纬度数组，[
[[[lng111, lat111], [lng112, lat112], [lng113, lat113], [lng114, lat114]]],
[[[lng211, lat211], [lng212, lat212], [lng213, lat213], [lng214, lat214]]]
]
prop?: 对应的属性，如 { name: 'HYH 建筑', height: 50 }

**返回结果**
多个三维建筑对应的 geojson 格式数据。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(
  tyMap.multiPolygon3d(
    [
      [
        [
          [111, 111],
          [112, 112],
          [113, 113],
          [114, 114],
        ],
      ],
    ],
    {
      name: 'HYH区',
    }
  )
);
```

### 11. randomPoint(count, boundingBox?)

生成随机的 geojson 格式的点。

```markdown
**输入参数**
count: 数量
boundingBox?: 可选参数，边界范围 [minLng, minLat, maxLng, maxLat]，可为空，默认为 [-180, -90, 180, 90]

**返回结果**
随机的 geojson 格式的点。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.randomPoint(10, [-180, -90, 180, 90]));
```

### 12. randomLineString(count, options?)

生成随机的 geojson 格式的线。

```markdown
**输入参数**
count: 数量
options?: 可选参数，对象包含以下这些：

- boundingBox?: 边界范围，[minLng, minLat, maxLng, maxLat]，可为空，默认为 [-180, -90, 180, 90]
- verticesNum?: 线上顶点的数量，默认为 10
- maxRotation?: 从上一个线段转动的最大弧度数，默认为 π / 8

**返回结果**
随机的 geojson 格式的线。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.randomLineString(10, { boundingBox: [-180, -90, 180, 90] }));
```

### 13. randomPolygon = (count, options?)

生成随机的 geojson 格式的面。

```markdown
**输入参数**
count: 数量
options?: 可选参数，对象包含以下这些：

- boundingBox?: 边界范围，[minLng, minLat, maxLng, maxLat]，可为空，默认为 [-180, -90, 180, 90]
- verticesNum?: 线上顶点的数量，默认为 10
- maxRadialLen?: 顶点可以到达多边形中心的最大数纬度或经度，默认为 10

**返回结果**
随机的 geojson 格式的面。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
console.log(tyMap.randomPolygon(10, { boundingBox: [-180, -90, 180, 90] }));
```

### 14. featureCollection(geometryArr)

由多个单点、单线、单面生成多点、多线、多面对应的集合。

```markdown
**输入参数**
geometryArr: 相同类型(点、线、面)的 geometry

**返回结果**
geojson 格式的对应的集合。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const pt1 = tyMap.point([1, 1], { text: 'pt1' });
const pt2 = tyMap.point([2, 2], { text: 'pt2' });
const pt3 = tyMap.point([3, 3], { text: 'pt3' });
const collection = tyMap.featureCollection([pt1, pt2, pt3]);
console.log(collection);
```

### 15. midPoint(point1, point2)

计算 geojson 格式的两个点的中点。

```markdown
**输入参数**
point1: geojson 格式的点
point2: geojson 格式的点

**返回结果**
geojson 格式的对应的点
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const pt1 = tyMap.point([1, 1]);
const pt2 = tyMap.point([2, 2]);
const center = tyMap.midPoint(pt1, pt2);
console.log(center);
```

### 16. pointDistance(from, to, units?)

计算 geojson 格式两点之间的距离。

```markdown
**输入参数**
from: 起始点，geojson 格式
to: 终止点，geojson 格式
units?: 单位，可选值为 英里(miles)/千米(kilometers)，默认为 千米。可选参数

**返回结果**
两点之间的距离，单位为 units
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const from = tyMap.point([1, 1]);
const to = tyMap.point([2, 2]);
const distance = tyMap.pointDistance(from, to);
```

### 17. lineLength(lineString, units?)

计算 geojson 格式的线的长度。

```markdown
**输入参数**
lineString: geojson 格式的线，必须为单线
units?: 单位，可选值为 英里(miles)/千米(kilometers)，默认为 千米。可选参数

**返回结果**
线的长度，单位为 units
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const from = tyMap.lineString([
  [11, 32],
  [13, 22],
  [13, 25],
  [15, 34],
]);
const length = tyMap.lineLength(line);
```

### 18. polygonArea(polygon)

计算 geojson 格式的面的面积。

```markdown
**输入参数**
lineString: geojson 格式的面，必须为单面

**返回结果**
面积，单位：平方米
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const from = tyMap.lineString([
  [
    [11, 32],
    [13, 22],
    [13, 25],
    [15, 34],
  ],
]);
const length = tyMap.polygonArea(line);
```

### 19. pointCenter(ptCollection)

计算 geojson 格式的多个点形成的重心。

```markdown
**输入参数**
ptCollection: 点的集合

**返回结果**
geojson 格式的对应的点
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const pt1 = tyMap.point([1, 1]);
const pt2 = tyMap.point([2, 2]);
const pt3 = tyMap.point([3, 3]);
const collection = tyMap.featureCollection([pt1, pt2, pt3]);
const center = tyMap.pointCenter(collection);
```

### 20. point2LineDistance(point, lineString, units?)

计算某个点到某条线的最短距离。

```markdown
**输入参数**
point: geojson 格式的点
lineString: geojson 格式的线，单线
units?: 单位，可选值为 英里(miles)/千米(kilometers)，默认为 千米。可选参数

**返回结果**
geojson 格式的对应的点
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const pt = tyMap.point([1, 3]);
const lineString = tyMap.lineString([
  [1, 1],
  [3, 3],
]);
const distance = tyMap.point2LineDistance(pt, lineString);
```

### 21. nearestPointOnLine(lines, point)

计算某条线上离某个点最近的那个点。

```markdown
**输入参数**
lines: geojson 格式的线，可以为 lineString 、 multiLineString 或者仅包含 lineString 和 multiLineString 的 featureCollection
point: geojson 格式的点

**返回结果**
线上的最近的点，geojson 格式。其中属性对象包含且不仅包含以下三个值：

- index: 在第 n 条线段部分找到最近点
- dist: 该点与最近点之间的距离，单位为 千米
- location: 沿着线的起始位置和最近点之间的距离，单位为 千米
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const pt = tyMap.point([1, 3]);
const lineString1 = tyMap.lineString([
  [1, 1],
  [3, 3],
]);
const nearestPt = tyMap.nearestPointOnLine(line, pt);
```

### 22. alongLine(lineString, distance, units?)

计算某条线上距离起始点为 distance 的点的坐标。

```markdown
**输入参数**
lineString: geojson 格式的线，单线
distance: 数值
units?: 单位，可选值为 英里(miles)/千米(kilometers)，默认为 千米。可选参数

**返回结果**
geojson 格式的对应的点
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const lineString = tyMap.lineString([
  [1, 1],
  [3, 3],
]);
const distance = tyMap.alongLine(lineString, 200);
```

### 23. pointInPolygon(point, polygons)

判断某个点是否在某个面上。

```markdown
**输入参数**
point: geojson 格式的点
polygons: 可以是单面(polygon)、多面(multiPolygon)或者是仅包含 polygon 和 multiPolygon 的 featureCollection

**返回结果**
true 或 false
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const point = tyMap.point([2, 2]);
const poly = tyMap.polygon([
  [1, 1],
  [1, 3],
  [3, 3],
  [3, 1],
  [1, 1],
]);
const distance = tyMap.pointInPolygon(point, poly);
```

### 24. sector(center, radius, startAng, endAng, options?)

计算给定点、给定半径给定起始角和终止角对应的扇形。

```markdown
**输入参数**
center: [lng, lat]
radius: 半径
startAng: 起始角
endAng: 终止角
options?: 配置项，可选。包括以下几项：

- units?: 单位，可选值为 英里(miles)/千米(kilometers)，默认为 千米
- steps?: 由多少个线段组成，默认为 64
- properties?: 和面类似的属性

**返回结果**
geojson 格式的对应的面
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const center = tyMap.point([1, 1]);
const radius = 5;
const startAng = 25;
const endAng = 45;
const sector = tyMap.sector(center, radius, startAng, endAng);
```

### 25. convex(collection)

根据多个点生成 geojson 格式的凸多边形。

```markdown
**输入参数**
collection: 由 point 组成的 featureCollection

**返回结果**
geojson 格式的对应的面
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const collection = tyMap.featureCollection([
  tyMap.point([1, 4]),
  tyMap.point([2, 4]),
  tyMap.point([5, 7]),
  tyMap.point([5, 4]),
  tyMap.point([3, 0]),
]);
const convPoly = tyMap.convex(collection);
```

### 26. polygonIntersect(poly1, poly2)

求两个面的交集。

```markdown
**输入参数**
poly1: polygon，单面
poly2: polygon，单面

**返回结果**
geojson 格式的对应的 point/multiPoint/lineString/multiLineString/polygon/multiPolygon 或者为 null。
null 就代表两个面没有任何交集。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const poly1 = tyMap.polygon([
  [
    [122.801742, 45.48565],
    [122.801742, 45.60491],
    [122.584762, 45.60491],
    [122.584762, 45.48565],
    [122.801742, 45.48565],
  ],
]);

const poly2 = tyMap.polygon([
  [
    [122.520217, 45.535693],
    [122.64038, 45.553967],
    [122.720031, 45.526554],
    [122.669906, 45.507309],
    [122.723464, 45.446643],
    [122.487258, 45.477466],
    [122.520217, 45.535693],
  ],
]);
const intersectPoly = tyMap.polygonIntersect(poly1, poly2);
```

### 27. polygonUnion(poly1, poly2, poly3, ...)

求多个面的并集。

```markdown
**输入参数**
poly1: polygon 或者 multiPolygon
poly2: polygon 或者 multiPolygon
poly3: polygon 或者 multiPolygon
...

**返回结果**
geojson 格式的对应的 polygon/multiPolygon。
```

### 28. polygonDiff(poly1, poly2)

求第一个面和第二个面的差集。

```markdown
**输入参数**
poly1: polygon 或者 multiPolygon
poly2: polygon 或者 multiPolygon
poly3: polygon 或者 multiPolygon
...

**返回结果**
geojson 格式的对应的 polygon/multiPolygon。
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
const poly1 = tyMap.polygon([
  [
    [128, -26],
    [141, -26],
    [141, -21],
    [128, -21],
    [128, -26],
  ],
]);
const poly1 = tyMap.polygon([
  [
    [126, -28],
    [140, -28],
    [140, -20],
    [126, -20],
    [126, -28],
  ],
]);
const polyDiff = turf.polygonDiff(poly1, poly2);
```

## 监听事件

### 地图监听事件

### 1. onResize(callback)

调整地图容器大小。在调整地图容器大小后触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMouseDown(() => {
  // todo
});
```

### 2. onMouseDown(callback)

鼠标按下事件。在地图上按下鼠标时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMouseDown(() => {
  // todo
});
```

### 3. onMouseUp(callback)

鼠标释放事件。在地图上释放鼠标时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMouseUp(() => {
  // todo
});
```

### 4. onMouseOver(callback)

鼠标移入事件。在鼠标移入地图时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMouseOver(() => {
  // todo
});
```

### 5. onMouseOut(callback)

鼠标移出事件。在鼠标移出地图时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMouseOut(() => {
  // todo
});
```

### 6.onMouseMove(callback)

鼠标移动事件。在地图中移动鼠标时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMouseMove(() => {
  // todo
});
```

### 7.onClick(callback)

鼠标点击事件。在地图上点击鼠标时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onClick(() => {
  // todo
});
```

### 8.onDbClick(callback)

鼠标双击事件。在地图上双击鼠标时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onDblClick(() => {
  // todo
});
```

### 9. onContextMenu(callback)

鼠标右键点击事件。在地图上右键鼠标时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onContextMenu(() => {
  // todo
});
```

### 10. onDrag(callback)

地图拖拽事件。在拖拽地图时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onDrag(() => {
  // todo
});
```

### 11. onZoom(callback)

地图缩放事件。在地图上移动鼠标滚轮时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onZoom(() => {
  // todo
});
```

### 12. onRotate(callback)

地图旋转事件。在地图上移动鼠标滚轮时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onRotate(() => {
  // todo
});
```

### 13. onPitch(callback)

地图倾斜事件。在地图上移动鼠标滚轮时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onPitch(() => {
  // todo
});
```

### 14. onMove(callback)

地图移动事件。在拖拽、缩放、旋转、倾斜时触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMove(() => {
  // todo
});
```

### 15. onMoveEnd(callback)

地图移动结束事件。在拖拽、缩放、旋转、倾斜动作结束触发对应回调。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onMoveEnd(() => {
  // todo
});
```

### 16. onLoad(callback)

地图首次渲染完成事件。在下载所有必要资源并且第一次视觉上完成地图渲染后立即触发。callback 为回调函数。

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLoad(() => {
  // todo
});
```

### 移除地图监听事件

移除监听事件与各个监听事件相对应，移出监听事件的回调函数应该和监听事件的回调函数是同一个函数。

### 1. offResize(callback)

移除调整地图容器大小事件。callback 为回调函数。

### 2. offMouseDown(callback)

移除鼠标按下事件。callback 为回调函数。

### 3. offMouseUp(callback)

移除鼠标释放事件。callback 为回调函数。

### 4. offMouseOver(callback)

移除鼠标移入事件。callback 为回调函数。

### 5. offMouseOut(callback)

移除鼠标移出事件。callback 为回调函数。

### 6.offMouseMove(callback)

移除鼠标移动事件。callback 为回调函数。

### 7.offClick(callback)

移除鼠标点击事件。callback 为回调函数。

### 8.offDbClick(callback)

移除鼠标双击事件。callback 为回调函数。

### 9. offContextMenu(callback)

移除鼠标右键点击事件。callback 为回调函数。

### 10. offDrag(callback)

移除地图拖拽事件。callback 为回调函数。

### 11. offZoom(callback)

移除地图缩放事件。callback 为回调函数。

### 12. offRotate(callback)

移除地图旋转事件。callback 为回调函数。

### 13. offPitch(callback)

移除地图倾斜事件。callback 为回调函数。

### 14. offMove(callback)

移除地图移动事件。callback 为回调函数。

### 15. offMoveEnd(callback)

移除地图移动结束事件。callback 为回调函数。

### 16. offLoad(callback)

移除地图首次渲染完成事件。callback 为回调函数。

### 图层监听事件

### 1.onLayerMousedown(layerId, callback)

鼠标按下事件。在图层对应的点、线、面上按下鼠标时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerMousedown('layerId', () => {
  // todo
});
```

### 2.onLayerMouseUp(layerId, callback)

鼠标释放事件。在图层对应的点、线、面上释放鼠标时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerMouseUp('layerId', () => {
  // todo
});
```

### 3. onLayerMouseOver(layerId, callback)

鼠标移入事件。在鼠标移入图层对应的点、线、面时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerMouseOver('layerId', () => {
  // todo
});
```

### 4. onLayerMouseOut(layerId, callback)

鼠标移出事件。在鼠标移出图层对应的点、线、面时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerMouseOut('layerId', () => {
  // todo
});
```

### 5. onLayerMouseMove(layerId, callback)

鼠标移动事件。在图层对应的点、线、面上移动鼠标时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerMouseMove('layerId', () => {
  // todo
});
```

### 6. onLayerClick(layerId, callback)

鼠标点击事件。在图层对应的点、线、面上点击鼠标时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerClick('layerId', () => {
  // todo
});
```

### 7. onLayerDblClick(layerId, callback)

鼠标双击事件。在图层对应的点、线、面上双击鼠标时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerDblClick('layerId', () => {
  // todo
});
```

### 8. onLayerContextMenu(layerId, callback)

鼠标右键点击事件。在图层对应的点、线、面上右键鼠标时触发对应回调。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.onLayerContextMenu('layerId', () => {
  // todo
});
```

### 移除图层监听事件

### 1.offLayerMousedown(layerId, callback)

移除鼠标按下事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 2.offLayerMouseUp(layerId, callback)

移除鼠标释放事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 3. offLayerMouseOver(layerId, callback)

移除鼠标移入事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 4. offLayerMouseOut(layerId, callback)

移除鼠标移出事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 5. offLayerMouseMove(layerId, callback)

移除鼠标移动事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 6. offLayerClick(layerId, callback)

移除鼠标点击事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 7. offLayerDblClick(layerId, callback)

移除鼠标双击事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

### 8. offLayerContextMenu(layerId, callback)

移除鼠标右键点击事件。

```markdown
**传入参数**
layerId: 对应的图层 id
callback: 回调函数
```

## 扩展功能

### 建筑物颜色

### 1. setBuildingColor({ x, y, color })

配置建筑物颜色。配置完成后调用下获取建筑物颜色的接口以更新。

```markdown
**传入参数**
x: 经度
y: 纬度
color: 颜色，仅支持 rgb(r, g, b) 格式
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.setBuildingColor({
  x: 118.8104,
  y: 36.32626,
  color: 'rgb(111,222, 33)',
});
tyMap.getBuildingColor();
```

### 2. getBuildingColor()

获取配置后的建筑物颜色。

```markdown
**传入参数**
无
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getBuildingColor();
```

### 3. removeBuildingColor({ x, y })

删除已经配置的建筑物颜色。

```markdown
**传入参数**
x: 经度
y: 纬度
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.removeBuildingColor({
  x: 118.8104,
  y: 36.32626,
});
tyMap.getBuildingColor();
```

### 建筑物楼层高度标定

### 1. setSurround({ x, y, color, floor })

配置建筑物楼层的颜色。

```markdown
**传入参数**
x: 经度
y: 纬度
color: 颜色，仅支持 rgb(r, g, b) 格式。多个颜色以 ";" 隔开，如： rgb(1,2, 33);rgb(12, 33,4)
floor: 楼层，必须为整数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
await tyMap.setSurround({
  x: 118.8104,
  y: 36.32626,
  color: 'rgb(111,222, 33)',
  floor: 5,
});
// 更新已标定的楼层
await tyMap.getSurround('layerIdName');
```

### 2. getSurround(layerId)

获取配置后的建筑物楼层的颜色。一定要设置一个图层 id，方便点击的时候使用。更新的时候保证前后的图层 id 一致。

```markdown
**传入参数**
layerId: 经度
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
tyMap.getSurround('layerIdName');
```

### 3. removeSurround({ x, y, floor })

删除配置的建筑物楼层的颜色。

```markdown
**传入参数**
x: 经度
y: 纬度
floor: 楼层，必须为整数
```

举例：

```javascript
const tyMap = new TyMap(document.getElementById('app'), {
  key: '你的对应的key',
});
await tyMap.removeSurround({
  x: 118.8104,
  y: 36.32626,
  floor: 5,
});
// 更新已标定的楼层
await tyMap.getSurround('layerIdName');
```
