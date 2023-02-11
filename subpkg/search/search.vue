<template>
  <view class="search-box">
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">
          {{item.goods_item}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show:true,
        showSync:true,
        seachVal:'',
        timer:null,
        kw:'',
        searchResults:[],
        historyList: ['a', 'app', 'apple']
      }
    },
    methods: {
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.kw = e.value
          this.getSearchList()
        },500)
      },
      async getSearchList() {
        if(this.kw === ''){
          this.searchResults = []
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        this.saveSearchHistory()
      },
      saveSearchHistory() {
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
        })
      },
      clearHistory(){
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
    },
    computed:{
      history(){
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
    }
  }
</script>

<style lang="less">
.uni-searchbar {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 32rpx;
  background-color: #c00000;
}
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 10rpx;

  .sugg-item {
    font-size: 24rpx;
    padding: 26rpx 0;
    border-bottom: 2rpx solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 6rpx;
    }
  }
}
.history-box {
  padding: 0 10rpx;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 26rpx;
    border-bottom: 2rpx solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 10rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
