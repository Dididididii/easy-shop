<template>
  <view>
    <!-- 使用自定义搜索组件 -->
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height:wh+'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active ? 'active':'']" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="right-scroll-view" :style="{height:wh+'px'}">
        <view class="cate-lv2" v-for="(item,i) in cateLevel2" :key="i">
          <view class="cate-lv2-title">/ {{item.cat_name}} /</view>
          <!-- 动态渲染三级分类的列表数据 -->
          <view class="cate-lv3-list">
            <!-- 三级分类 Item 项 -->
            <view class="cate-lv3-item" v-for="(item2,i2) in item.children" :key="i2" @click="gotoGoodsList(item2)">
              <!-- 图片 -->
              <image :src="item2.cat_icon" mode=""></image>
              <!-- 文本 -->
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>       
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,
        cateList:[],
        cateLevel2:[],
        active:0,
        scrollTop:0
      }
    },
    methods: {
      async getCateList() {
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status!==200) return this.$showMsg()
        console.log(res.message[0].children);
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeChanged(i) {
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0? 1:0
      },
      gotoGoodsList(item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      this.getCateList()
    }
  }
</script>

<style lang="less">
.scroll-view-container {
  display: flex;
  .cate-lv2-title {
    font-size: 24rpx;
    font-weight: bold;
    text-align: center;
    padding: 30rpx 0;
  }
  .left-scroll-view {
    width: 240rpx;
    .left-scroll-view-item {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;
      
      &.active {
        background-color: #ffffff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 120rpx;
      height: 120rpx;
    }

    text {
      font-size: 24rpx;
    }
  }
}
</style>
