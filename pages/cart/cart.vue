<template>
  <view>
    <view class="cart-container" v-if="cart.length !==0">
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title=text">购物车</text>
      </view>
      <uni-swipe-action>
        <block v-for="(goods,i) in cart" :key="i">
          <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
            <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
    </view>
    <view class="empty-cart" v-else>
      <image src="../../static/cart_empty@2x.png" class="empty-img" mode=""></image>
      <text class="tip-text">空空如也~</text>
    </view>
    <my-settle></my-settle>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins:[badgeMix],
    computed:{
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        options: [{
              text: '删除', // 显示的文本内容
              style: {
                backgroundColor: '#C00000' // 按钮的背景颜色
              }
            }]
      }
    },
    methods: {
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="less">
.cart-title {
  height: 80rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  border-bottom: 2rpx solid #efefef;
  .cart-title-text {
    margin-left: 20rpx;
  }
}
.cart-container {
  padding-bottom: 100rpx;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
