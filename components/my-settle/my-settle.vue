<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="checkedCount" /><text>全选</text>
    </label>
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <view class="btn-settle">
      结算({{checkedCount}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
export default {
  data() {
    return {}
  },
  methods:{
    ...mapMutations('m_cart',['updateAllGoodsState']),
    isFullCheck() {
      return this.total === this.checkedCount
    },
    changeAllState() {
      this.updateAllGoodsState(!this.isFullCheck)
    }
  },
  computed:{
    ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount'])
  }
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  // 将背景色从 cyan 改为 white
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10rpx;
  font-size: 28rpx;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 100rpx;
    min-width: 200rpx;
    background-color: #c00000;
    color: white;
    line-height: 100rpx;
    text-align: center;
    padding: 0 20rpx;
  }
}
</style>