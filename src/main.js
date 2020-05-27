// import 'babel-polyfill'
import Vue from 'vue'
import './vant-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/http/http'
import 'animate.css'
import '@/assets/css/main.scss'
import './assets/js/rem'
import './assets/iconfont/iconfont.css' // 字体图标
import Navigation from 'vue-navigation'

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({

  debug: true,
  connection: 'http://yangjiajin.cn:7001',  //
  // connection: 'http://127.0.0.1:7001',  //
  vuex: {
    store,
    mutationPrefix: "SOCKET_",
    actionPrefix: "SOCKET_"
  }
}))
// 移动端点击优化 needsclick 
// 目前问题 手动调用click无效
// import FastClick from 'fastclick'
// if ('addEventListener' in document) {
// 	document.addEventListener('DOMContentLoaded', function() {
//     FastClick.attach(document.body);
//     // 处理input快速点击无反应
//     FastClick.prototype.focus = function(targetElenent) {
//       targetElenent.focus()
//     }
// 	}, false);
// }
// 阻止启动生产消息
Vue.config.productionTip = false
Vue.use(Navigation, {router, store, moduleName: 'navigation', keyName: 'VNK'})

Vue.prototype.$http = axios
// 设置全局参数 方法或者变量
Vue.mixin({
  data () {
    return {
    }
  },
  methods: {
    go (url) {
      this.$router.push({name: url})
    },
    back (urlName) {
      console.log('返回')
      // 如果url存在 则跳转到对应的位置
      if (typeof urlName === 'string' && urlName) {
        let routerList = this.$navigation.getRoutes().reverse()
        console.log('routerList=', this.$navigation.getRoutes())
        if (router.history.current.name === urlName) return
        for (let i = 0; i < routerList.length; i++) {
          let item =routerList[i].substring(0, routerList[i].indexOf('?'))
          if (item == urlName) {
            this.$router.go(-i)
            // 找出最近的位置
            return false
          }
        }
        // 如果不存在则 跳转到对应的路由
        this.$router.push({name: urlName})
      } else {
        // this.$router.go(-1)
        window.history.back()
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
