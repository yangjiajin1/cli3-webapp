// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
// import { Loading, Message, Notification } from 'element-ui'
import Router from '../router'
// import querystring from 'querystring'
// import router from '../router'

// 超时时间
axios.defaults.timeout = 50000
// 设置请求头  Content-Type:multipart/form-data;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// 让ajax携带cookie
// axios.defaults.withCredentials = true
// 默认loading



// 请求中断处理
const CancelToken = axios.CancelToken
let source = CancelToken.source()

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 切换路由阻断处理
    config.cancelToken = source.token
    return config
  },
  error => {
    // tryHideFullScreenLoading()
    // loadinginstace.close()
    // Message.error({
    //   showClose: true,
    //   message: '请求超时'
    // })
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  data => {
    return data.data
  },
  error => {
    if (error.message !== 'breakRequest') { // 切换中断不做处理
      // 错误处理
      if (error && error.response) {
        switch (error.response.status) {
          case 400: error.message = '请求错误(400)'; break
          case 401: error.message = '未授权，请重新登录(401)'; break
          case 403: error.message = '拒绝访问(403)'; break
          case 404: error.message = '请求出错(404)'; break
          case 408: error.message = '请求超时(408)'; break
          case 500: error.message = '服务器错误(500)'; break
          case 501: error.message = '服务未实现(501)'; break
          case 502: error.message = '网络错误(502)'; break
          case 503: error.message = '服务不可用(503)'; break
          case 504: error.message = '网络超时(504)'; break
          case 505: error.message = 'HTTP版本不受支持(505)'; break
          default: error.message = `连接出错(${error.response.status})!`
        }
      } else {
        error.message = '连接服务器失败!'
      }
    }

    return Promise.reject(error)
  }
)
// 切换路由中断请求
Router.beforeEach((to, from, next) => {
  source.cancel('breakRequest')
  const CancelToken = axios.CancelToken
  source = CancelToken.source()
  next()
})

export default axios
