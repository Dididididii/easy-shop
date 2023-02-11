<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic" mode=""></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
          ￥{{goods.goods_price | tofixed}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    filters:{
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    methods:{
      
    }
  }
</script>

<style lang="less">
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 2rpx solid #f0f0f0;

  .goods-item-left {
    margin-right: 10rpx;

    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
    }

    .goods-price {
      font-size: 32rpx;
      color: #c00000;
    }
  }
}
</style>