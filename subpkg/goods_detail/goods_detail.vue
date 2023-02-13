<template>
  <view v-if="goods_info.goods_name">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏区 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view> 
      </view>
      <!-- 运费 -->
      <view class="yf">
        快递:免运费
      </view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce" class="tesa"></rich-text>
    <view class="b">
      
    </view>
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
    </view>
  </view>
</template>

<script>
  import {mapMutations ,mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    data() {
      return {
        goods_info:{},
        options:[{
          icon:'shop',
          text:'店铺'
        },{
          icon:'cart',
          text:'购物车',
          info:2
        }],
        buttonGroup:[{
          text:'加入购物车',
          backgroundColor:'#ff0000',
          color:'#fff'
        },{
          text:'立即购买',
          backgroundColor:'#ffa200',
          color:'#fff'
        }]
      };
    },
    methods:{
      ...mapMutations('m_cart',['addToCart']),
      buttonClick(e){
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id :this.goods_info.goods_id,
            goods_name:this.goods_info.goods_name,
            goods_price:this.goods_info.goods_price,
            goods_count:1,
            goods_small_logo:this.goods_info.goods_small_logo,
            goods_state:true
          }
          this.addToCart(goods)
        }
      },
      onClick(e){
        if(e.content.text === '购物车') {
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      async getGoodsDetail(goods_id) {
        const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
        if(res.meta.status!==200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/'<img /g ,'<img style="display:block;"').replace(/webp/g,'jpg')
        this.goods_info = res.message
      },
      preview(i) {
        uni.previewImage({
          current:i,
          urls:this.goods_info.pics.map(x=>x.pics_big)
        })
      }
    },
    onLoad(op) {
      const goods_id = op.goods_id
      this.getGoodsDetail(goods_id)
    },
    watch:{
      total: {
        handler(newVal) {
          const findResult = this.options.find((x)=>x.text === '购物车')
          if(findResult) {
            findResult.info = newVal
          }
        },
        immediate:true
      }
    }
  }
</script>

<style lang="less">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box{
  padding: 20rpx;
  padding-right: 0;
  .price {
    color: #c00000;
    font-size: 36rpx;
    margin: 20rpx 0;
  }
  .goods-info-body{
    display: flex;
    justify-content: space-between;
  }
  .goods-name {
    font-size: 26rpx;
    padding-right: 20rpx;
  }
  .favi {
    width: 240rpx;
    font-size: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 2rpx solid #efefef;
    color: gray;
  }
  .yf {
    margin: 20rpx 0;
    font-size: 24rpx ;
    color: gray;
  }
}
.goods-detail-container{
  padding-bottom: 100rpx;
}
.goods_nav{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.b{
  height: 2rpx;
  margin-bottom: 100rpx;
}
</style>
