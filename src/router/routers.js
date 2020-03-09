import Home from '@/views/Home.vue'
export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      footer: true
    },
    component: Home
  },
  {
    path: '/newsList',
    name: 'newsList',
    meta: {
      title: '推荐新闻',
      footer: true
    },
    component: () => import('@/views/news/newsList.vue')
  },
  {
    path: '/imgPage',
    name: 'imgPage',
    meta: {
      title: '图片压缩'
    },
    component: () => import('@/views/demo/imgPage.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    meta: {
      title: '日历'
    },
    component: () => import('@/views/demo/calendar.vue')
  },
  {
    path: '/myQrcode',
    name: 'myQrcode',
    meta: {
      title: '生成二维码'
    },
    component: () => import('@/views/demo/myQrcode.vue')
  },
  {
    path: '/slide',
    name: 'slide',
    meta: {
      title: '生成二维码'
    },
    component: () => import('@/views/demo/slide.vue')
  },
  {
    path: '/myEcharts',
    name: 'myEcharts',
    meta: {
      title: '图表'
    },
    component: () => import('@/views/demo/myEcharts.vue')
  },
  {
    path: '/pinlun',
    name: 'pinlun',
    meta: {
      title: 'demo'
    },
    component: () => import('@/views/demo/pinlun.vue')
  },
  {
    path: '/imgList',
    name: 'imgList',
    meta: {
      title: 'demo'
    },
    component: () => import('@/views/demo/imgList.vue')
  },
  {
    path: '/heatMap',
    name: 'heatMap',
    meta: {
      title: '热力图'
    },
    component: () => import('@/views/heatMap/heatMap.vue')
  },
  {
    path: '/htmlCanvas',
    name: 'htmlCanvas',
    meta: {
      title: '海报'
    },
    component: () => import('@/views/htmlCanvas/htmlCanvas.vue')
  }
]