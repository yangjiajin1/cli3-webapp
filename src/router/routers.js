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
    path: '/attendance',
    name: 'attendance',
    meta: {
      title: '考勤',
      footer: true
    },
    component: () => import('@/views/attendance/attendance.vue')
  },
  {
    path: '/attendance2',
    name: 'attendance2',
    meta: {
      title: '考勤',
      footer: true
    },
    component: () => import('@/views/attendance/attendance2.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: 'about'
    },
    component: () => import('@/views/About.vue')
  },
  {
    path: '/yemian1',
    name: 'yemian1',
    meta: {
      title: '页面一'
    },
    component: () => import('@/views/cheldPage/yemian1.vue')
  },
  {
    path: '/yemian2',
    name: 'yemian2',
    meta: {
      title: '页面二'
    },
    component: () => import('@/views/cheldPage/yemian2.vue')
  }
]