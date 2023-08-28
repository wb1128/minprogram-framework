import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from '@/App'
import store from '@/store'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false

// 小程序云开发
wx.cloud.init({
  env: 'wxapp-weike-edu',
  traceUser: true
})
const clouddb = wx.cloud.database()
Vue.prototype.$clouddb = clouddb
Vue.prototype.$store = store

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
