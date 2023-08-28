// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 1、2
    // root: {
    //   text: 'Hello world',
    //   src: 'https://img1.baidu.com/it/u=1890390320,3399874998&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'
    // }
    // 3、
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
    // 4、
    // root: {
    //   id: 'root01',
    //   children: [{
    //     id: 'root02',
    //       type: 'view',
    //       children: [{
    //         type: 'text',
    //         value: 'Hello world'
    //       }, {
    //         type: 'image',
    //         src: 'https://img1.baidu.com/it/u=1890390320,3399874998&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'
    //       }]
    //     },

    //   ]
    // }
  }
})