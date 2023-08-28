# mpvue-quickstart

> A MPVue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


初始化项目
vue init F-loat/mpvue-quickstart mpvue-quickstart && cd mpvue-quickstart && npm install

安装vant-weapp
npm install vant-weapp -S --production
集中式页面配置
npm install mpvue-entry -D
路由
npm install mpvue-router-patch -S

上面三个都已经在F-loat/mpvue-quickstart中了，所以不用再安装

安装sass，sass-loader // 版本太高会报错 // this.getResolve is not a functio
npm install sass-loader@7.3.1 node-sass -D

css样式px与rpx 安装完后，修改，/build/utils.js 中的配置，1:1的，px转为rpx，不然还要费脑子计算。默认的是0.5：1
npm install px2rpx-loader
var px2rpxLoader = {
    loader: 'px2rpx-loader',
    options: {
      baseDpr: 1,
      rpxUnit: 1
    }
  }

设置了几个tabbar，测试云开发
