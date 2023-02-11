<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <!-- 使用 view 组件模拟 input 输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      bgcolor:{
        type:String,
        default:'#c00000'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    data() {
      return {
        wh:0
      };
    },
    methods:{
      searchBoxHandler() {
        this.$emit('click')
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
    }
  }
</script>

<style lang="less">
.search-box {
  position: sticky;
  tpo:0;
  z-index: 999;
}
.my-search-container {
  // background-color: #c00000;
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}
.my-search-box {
  height: 72rpx;
  background-color: #ffffff;
  // border-radius: 30rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .placeholder {
    font-size: 30rpx;
    margin-left: 10rpx;
  }
}
</style>