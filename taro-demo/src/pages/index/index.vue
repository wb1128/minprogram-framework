<template>
  <view class="index">
    <text @click="onClick">{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'

export default {
  setup () {
    const msg = ref('Hello world')
    const onClick = () => {
      console.log('点击')
    }
    return {
      msg,
      onClick
    }
  }
}
</script>
