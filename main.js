
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'


Vue.config.productionTip = false

App.mpType = 'app'
uni.$http = $http
// 配置请求根路径
$http.baseUrl = "https://www.uinav.com"
// 请求开始之前做一些事情
$http.beforeRequest = (options)=>{
  uni.showLoading({
    title:'数据加载中...'
  })
}
// 请求完成之后做一些事情
$http.afterRequest=()=>{
  uni.hideLoading()
}
// 封装的展示消息提示的方法
uni.$showMsg = (title='数据加载失败！',duration = 1500)=>{
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif