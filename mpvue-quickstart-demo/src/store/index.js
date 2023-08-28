import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './action'

import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  test: 0,
  userInfo: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        // removeItem: key => wx.clearStorage()
        // （tips: 提示，小程序每次进入都会执行removeItem方法，导致数据存储不下来，所以暂时把removeItem后面的函数写为一个空函数！！）
        removeItem: key => () => {}
      }
    }),
    debug ? createLogger() : {}
  ]
})
