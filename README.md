### 运行目标
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693188442617-6b94c6d9-3a15-4477-b5ea-a6597d47ba30.png#averageHue=%23fefefc&clientId=u0873f765-efd4-4&from=paste&id=ud9b24a93&originHeight=234&originWidth=482&originalType=url&ratio=1&rotation=0&showTitle=false&size=74185&status=done&style=none&taskId=u1a44f613-1ed2-42ac-a73a-619a587694e&title=)
精简小程序架构，我们只需要在逻辑层调用对应的 App()/Page() 方法，且在方法里面处理 data、提供生命周期/事件函数等，同时在视图层提供对应的模版及样式供渲染就能运行小程序了。
这也是大多数小程序开发框架重点考虑和处理的部分。

### 预编译wepy
#### WePY
WePY (发音: /'wepi/)是一款让小程序支持组件化开发的框架，通过预编译的手段让开发者可以选择自己喜欢的开发风格去开发小程序。框架的细节优化，Promise，Async Functions 的引入都是为了能让开发小程序项目变得更加简单，高效。

#### wepy是如何运行到小程序上？
wepy的核心在于编译环节，能够将优雅简洁的类似VUE风格的代码，编译成微信小程序所需要的繁杂代码。
wepy中有专门的script、style、template、config解析模块
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693192540598-f85923d3-c75b-4e3b-9b26-94176239b2b8.png#averageHue=%23fefefd&clientId=u0873f765-efd4-4&from=paste&height=286&id=u07267d7b&originHeight=286&originWidth=357&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8123&status=done&style=none&taskId=u61449c72-5090-4e66-8de3-ff7cbaf5777&title=&width=357)
![](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693190328753-69ab5a61-a217-47d8-94f9-ec2e44d1ea16.png#averageHue=%23fdfcfc&clientId=u0873f765-efd4-4&from=paste&id=PwNp6&originHeight=300&originWidth=551&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua5d054d4-45e2-41b6-aad3-f36a29f1d78&title=)
编译结果
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693202234533-e1fcaccf-392e-4bb1-af74-471f53551003.png#averageHue=%23fcfaf7&clientId=u0873f765-efd4-4&from=paste&height=308&id=ude81d65f&originHeight=308&originWidth=197&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12418&status=done&style=none&taskId=u3c610292-a408-43be-b6e8-fc4ec894b9f&title=&width=197)
编译前
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693192253962-320c04fa-c1fd-431b-b459-a4c49387b08d.png#averageHue=%23fcfcfb&clientId=u0873f765-efd4-4&from=paste&height=574&id=uc86249a9&originHeight=574&originWidth=657&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32903&status=done&style=none&taskId=u01f6f51c-4a9b-4fe7-a5cb-54b82a23cbe&title=&width=657)
编译后![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693192181274-35b3c095-71e2-4ac0-a931-1d9efcee1842.png#averageHue=%23fdfcfb&clientId=u0873f765-efd4-4&from=paste&height=525&id=u058cda8c&originHeight=525&originWidth=714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=52060&status=done&style=none&taskId=u7d58533b-5fbc-499c-af27-9bf5f197f1e&title=&width=714)
#### wepy是如何处理数据变化后的更新？
数据绑定
wepy数据绑定的原理和 vue 的数据绑定实现原理 一样 ，也是实现了一个观察者模式，只是，vue 做的更新处理是 patch 函数 diff 虚拟 dom 实现更新 web，而，wepy做的是调用 setData 更新数据。
以及双向绑定
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693202066103-9ecf9485-9ba0-4985-ad5c-17027eb9ba8d.png#averageHue=%23fefefe&clientId=u0873f765-efd4-4&from=paste&height=671&id=vaidu&originHeight=671&originWidth=306&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23721&status=done&style=none&taskId=u3cb3c80f-5bfd-4179-9fc5-76dc79b8d1d&title=&width=306)
```
// core/weapp/init/lifecycle
export function patchLifecycle (output, options, rel, isComponent) {
  // output 小程序的运行环境
  const initLifecycle = function (...args) {
    let vm = new initClass();
    // 将小程序 this 绑定到 vm.$wx 上去
    vm.$wx = this;
    // 初始化数据，进行数据绑定，进行绑定对数据只是 data 中的数据
    initData(vm, output.data, isComponent);
    // 进行依赖收集，做 setData
    initRender(vm, Object.keys(vm._data).concat(Object.keys(vm._props)).concat(Object.keys(vm._computedWatchers || {})));
    return callUserMethod(vm, vm.$options, 'created', args);
  };
 
  // 绑定到小程序到生命周期中去，做点事
  // 相当于 Page({created: initLifecycle(){}})
  output.created = initLifecycle;
};


// core/weapp/init/render.js
export function initRender (vm, keys) {
 return new Watcher(vm, function () {
     // 会触发数据到 getter 进行依赖收集
     Object.keys(keys).forEach(key => clone(vm[key]))
     // 调用 setData 进行数据更新，vm.$wx 在页面 created 钩子到时候进行绑定，写在了前面，是小程序中的 this
     vm.$wx.setData(dirty, renderFlushCallbacks)
   }
 }, function () {

 }, null, true);
};

```

坏处有什么呢？

- vue后期再出一些新特性的话，预编译框架都需要在进行语法解析扩展编写。
- 兼容问题，比如小程序不支持的一些属性，如果不支持，预编译框架要进行兼容。

### 半编译半运行mpvue
#### mpvue
mpvue是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验
#### mpvue是如何运行到小程序上？
这个项目就是直接从vue项目fork过来修改的。Vue.js 本身就将平台相关 API 抽离，在 src/platforms 文件夹下实现不同平台的适配。mpvue 的思路就是增加新的平台层支持，即 mp 小程序平台。
具体在源码中的表现就是：在 Vue 源码的 platforms 文件夹下面增加了 mp 目录，在里面实现了 complier（编译时） 和 runtime （运行时）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693203856603-1cc64e94-04fd-4c07-9147-e899dcb13406.png#averageHue=%23fefefd&clientId=u0873f765-efd4-4&from=paste&height=711&id=u45e52757&originHeight=711&originWidth=1280&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78459&status=done&style=none&taskId=ua1213782-12be-4cc7-b047-ae21b703852&title=&width=1280)

mpvue 编译时
在编译阶段，mpvue 所做的工作主要是将 Vue 模板视图层代码编译为符合小程序语法的视图层代码。这部分工作主要由 mpvue-loader 完成。所做的工作主要有：标签映射、指令转换、组件支持、事件绑定、样式转译等。
可以看到Vue 模版和 小程序模版还是比较相似的。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693195457758-0b8277b6-66d3-462a-975a-5606bfdd0abb.png#averageHue=%23f9faf8&clientId=u0873f765-efd4-4&from=paste&id=u60a6443f&originHeight=276&originWidth=731&originalType=url&ratio=1&rotation=0&showTitle=false&size=130878&status=done&style=none&taskId=u94fcffa4-dece-42cb-a3c8-d7faf3bc991&title=)

编译前
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693203551090-46d2e7e5-b41c-4e2a-b670-971cf262705f.png#averageHue=%23fdfcfb&clientId=u0873f765-efd4-4&from=paste&height=627&id=u4f326c33&originHeight=627&originWidth=770&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36436&status=done&style=none&taskId=uc903493a-267c-4967-9d24-8ed119d66d8&title=&width=770)
编译后
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693203511677-85e8059b-3071-44b4-92d2-c39006dafb93.png#averageHue=%23fdfbf9&clientId=u0873f765-efd4-4&from=paste&height=457&id=ue541548c&originHeight=457&originWidth=1007&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78208&status=done&style=none&taskId=uef953945-34d8-4d10-bbfc-8f09623e945&title=&width=1007)

#### mpvue是如何处理数据变化后的更新？
运行阶段：初始化 Vue 组件实例的同时，初始化小程序页面实例；组件 patch 更新阶段，不再直接操作DOM，而是调用小程序页面实例的 setData 方法将视图更新
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693195475722-cfb3f189-e1ac-420b-809f-f577682a8f37.png#averageHue=%23fdfbf5&clientId=u0873f765-efd4-4&from=paste&id=u0c550659&originHeight=441&originWidth=794&originalType=url&ratio=1&rotation=0&showTitle=false&size=187779&status=done&style=none&taskId=u0c5c825e-66a7-497f-b769-43c6a39e362&title=)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693204167669-502facd6-d984-4782-b50e-500155c47302.png#averageHue=%23fbf8f6&clientId=u0873f765-efd4-4&from=paste&height=431&id=u76681bdd&originHeight=431&originWidth=1049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108016&status=done&style=none&taskId=uf6444f38-63ab-4ae1-8810-e6744414872&title=&width=1049)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693204207425-147188e1-4656-4549-b601-69c6b706a16f.png#averageHue=%23fefdfd&clientId=u0873f765-efd4-4&from=paste&height=275&id=ue99b06c8&originHeight=275&originWidth=388&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10896&status=done&style=none&taskId=u00621cc7-8ea6-44a1-99ca-6518c383995&title=&width=388)

为什么这个框架的名称叫半编译半运行框架，半编译讲的是vue的template需要单独编译为wxml，半运行讲的是vue整体的特性都会在逻辑层中运行。为了符合小程序的渲染框架，修改了vue的框架，最终达到了这个目的。

### 运行时Taro
#### Taro
m Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 小程序 / H5 / RN 等应用。  
#### Taro是如何运行到小程序上？
如何把半运行时框架变成为运行时框架？
mpvue需要compiler模块将vue中的template编译为WXML是因为小程序无法直接操作dom，所以把vue的template模版提前编译为wxml，然后通过setData把data数据传输过去。然而纯运行时框架就是要解决这个半编译的问题。
解决这个问题使用的是小程序模版template

编译前
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693205221150-72f595bf-2f0d-4abb-814e-bf2a57c4207f.png#averageHue=%23fdfcfb&clientId=u0873f765-efd4-4&from=paste&height=117&id=u0998809f&originHeight=117&originWidth=451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5246&status=done&style=none&taskId=ua98b1ed8-d60a-4248-9faa-1b34848b4e7&title=&width=451)
编译后
```
<import src="../../base.wxml"/>
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693205252972-40d5ba8f-271d-4fb1-b35e-270afc5f7ce6.png#averageHue=%23fefdfc&clientId=u0873f765-efd4-4&from=paste&height=454&id=u8c5a0afc&originHeight=454&originWidth=1100&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46101&status=done&style=none&taskId=u6f97d157-b3a5-4129-b013-ff423e7c5aa&title=&width=1100)

#### Taro是如何处理数据变化后的更新？
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693205295324-b2a9d4aa-d93c-4a68-8144-d984eb98400c.png#averageHue=%23fefdfd&clientId=u0873f765-efd4-4&from=paste&height=441&id=u03947cdd&originHeight=441&originWidth=530&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15582&status=done&style=none&taskId=u6eca0a98-9a97-4cb2-8677-321f14e5561&title=&width=530)

也就是说
data
```javascript
root: {
       id: 'root01',
       children: [
         {
           type: 'text',
           value: 'Hello world'
         },
         {
           type: 'image',
           src: 'https://img1.baidu.com/it/u=1890390320,3399874998&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'
         }
       ]
    }
```
wxml
```
<template is="tpl" data="{{ root: root }}"></template>
<template name="tpl">
  <template is="tpl-container" data="{{ item: root }}"></template>
</template>
<!-- template 容器 -->
<template name="tpl-container">
  <block wx:for="{{ item.children }}" wx:key="{{ item.id }}">
    <template is="{{ 'tpl-' + item.type }}" data="{{ item: item }}"></template>
  </block>
</template>
<!-- template image 的声明 -->
<template name="tpl-image">
  <image style="width: 100%; height: 200px;" src="{{ item.src }}"></image>
</template>
<!-- template text 的声明 -->
<template name="tpl-text">
  <text>{{ item.value }}</text>
</template>
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/12565912/1693205528017-634127b4-51e0-4218-9a1a-077ce1126afa.png#averageHue=%23323531&clientId=u0873f765-efd4-4&from=paste&height=372&id=u095cd825&originHeight=372&originWidth=415&originalType=binary&ratio=1&rotation=0&showTitle=false&size=183279&status=done&style=none&taskId=uc8d53f8a-afff-4e31-bc2a-08c6df900c0&title=&width=415)

### 参考
[WePY Document](https://wepyjs.github.io/wepy-docs/2.x/#/)
[像VUE一样写微信小程序-深入研究wepy框架](https://zhuanlan.zhihu.com/p/28700207)
[wepy 的运行原理探索 - 掘金](https://juejin.cn/post/6844903905868906509)
[mpvue.com](http://mpvue.com/)
[小程序框架原理分析（mpvue 为主） - 掘金](https://juejin.cn/post/6999657521250041864)
[小程序 - mpvue - 《前端面试之道》 - 书栈网 · BookStack](https://www.bookstack.cn/read/CS-Interview-Knowledge-Map/spilt.16.MP-mp-ch.md#mpvue)
[模板 | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html)
[掘金小册](https://juejin.cn/book/6982013809212784676/section/6982024689329635361)
[实现细节 | Taro 文档](https://docs.taro.zone/docs/implement-note/)
[Taro3运行时机制剖析 - 掘金](https://juejin.cn/post/7087041847700226062)
[小程序跨框架开发的探索与实践 | Taro 文档](https://nervjs.github.io/taro-docs/blog/2020-01-02-gmtc/)


