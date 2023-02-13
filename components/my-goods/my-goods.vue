<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <radio checked color="#C00000" v-if="showRadio" :checked="goods.goods_state" @click="radioClickHandler" />
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic" mode=""></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum" ></uni-number-box>
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
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
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
      radioClickHandler() {
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        let value = parseInt(val)
        if(!value) {
          this.$emit('num-change',{
            goods_id:this.goods_id,
            goods_count:1
          })
        }else {
          this.$emit('num-change',{
            goods_id:this.goods_id,
            goods_count:+val
          })
        }
        
      }
    }
  }
</script>

<style lang="less">
.goods-item {
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 2rpx solid #f0f0f0;

  .goods-item-left {
    margin-right: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
    }
    
    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
      
    .goods-price {
      font-size: 32rpx;
      color: #c00000;
    }
  }
}
</style>