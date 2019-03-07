import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes
})
// 路由钩子
router.beforeEach((to, from, next) => {
  document.body.scrollTop = '0';
  store.commit('ShowFooter', to.meta.footer)
  next()
})
export default router
