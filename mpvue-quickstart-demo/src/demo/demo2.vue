<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index" class="home">去往首页 {{countNum}}</a>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapState([
        'count'
      ]),
      ...mapGetters({'countNum': 'getCount'})
    },

    methods: {
      ...mapMutations([
        'increment',
        'decrement'
      ])
    },
    onShow () {
      // console.log($router.currentRoute);
      // 云数据库
      this.$clouddb.collection('test').get({
        success (res) {
          // res.data 包含该记录的数据
          console.log(res.data)
        }
      })
      // 云函数
      wx.cloud.callFunction({
        name: 'testFun',
        data: {},
        success: res => {
          console.log(res.result)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
</script>

<style>
  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }

  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
</style>
