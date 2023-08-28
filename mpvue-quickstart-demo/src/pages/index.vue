<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model"/>
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy"/>
    </form>
    <a href="/pages/counter" class="counter">去往Vuex示例页面</a>
    <div class='home-page'>
      <p @click='handleClick'>
        click me
      </p>
      <p v-text='test'></p>
    </div>
  </div>
</template>

<script>
  import card from '@/components/card'
  import {mapState, mapMutations} from 'vuex'
  import {TEST} from '@/store/mutation-types'

  export default {
    mpType: 'page',

    data () {
      return {
        motto: 'Hello World',
        userInfo: {}
      }
    },

    components: {
      card
    },

    computed: {
      ...mapState([
        'test', 'userInfo'
      ])
    },

    methods: {
      ...mapMutations([
        TEST
      ]),
      handleClick () {
        this[TEST](Math.random()) // 调用mutation
        console.log(this.test) // 获取store中test数据
      },
      bindViewTap () {
        const url = '/packageA/logs'
        this.$router.push(url)
      },
      getUserInfo () {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo
              }
            })
          }
        })
      },
      clickHandle (msg, ev) {
        // eslint-disable-next-line
        console.log('clickHandle:', msg, ev)
      }
    },

    created () {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo()
    }
  }
</script>

<style lang="scss" scoped>
  .userinfo {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #cccccc;

    .userinfo-avatar {
      width: 128px;
      height: 128px;
      margin: 20px;
      border-radius: 50%;
    }

    .userinfo-nickname {
      color: #aaa;
    }
  }


  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }

</style>
