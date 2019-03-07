<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="router-view"/>
      </navigation>
    </transition>

    <!-- 底部导航 -->
    <transition name="slideInUp">
      <!-- <van-tabbar fixed v-model="active" v-if="$store.state.showFooter">
        <van-tabbar-item icon=" iconfont icon-shouye" @click="back('home')">首页</van-tabbar-item>
        <van-tabbar-item icon=" iconfont icon-dingyue" @click="back('attendance2')">考勤2</van-tabbar-item>
        <van-tabbar-item icon=" iconfont icon-shoucang" @click="back('attendance')">考勤</van-tabbar-item>
        <van-tabbar-item icon=" iconfont icon-wode">我的</van-tabbar-item>
      </van-tabbar> -->
      <cube-tab-bar
      class="tabBar"
      v-if="$store.state.showFooter"
    v-model="selectedLabelDefault"
    :data="tabs"
    @click="clickHandler">

  </cube-tab-bar>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: '',
      menlist:['home','attendance','attendance2'],
      selectedLabelDefault: 'home',
      tabs: [{
        label: '首页',
        value: 'home',
        icon: 'cubeic-home'
      }, {
        label: '考勤',
        value: 'attendance2',
        icon: 'cubeic-like'
      }, {
        label: 'Vip',
        value: 'attendance',
        icon: 'cubeic-vip'
      }, {
        label: '我的',
        value: '',
        icon: 'cubeic-person'
      }]
    }
  },
  mounted () {
    this.$navigation.on('forward', (f,t) => {
      if (this.ismen(f.route.name,t.route.name)) {
        this.transitionName = ''
        return
      }
      this.transitionName = 'slide-in-right'
    })
    this.$navigation.on('back', (f,t) => {
      if (this.ismen(f.route.name,t.route.name)) {
        this.transitionName = ''
        return
      }
      this.transitionName = 'slide-out-right'
    })
  },
  methods: {
    goFacade (url) {
      this.$router.push({name: url})
    },
    ismen (a,b) {
      return (this.menlist.includes(a) && this.menlist.includes(b))
    },
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      this.back(label)
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // position: relative;
  height: 100%;
  .tabBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;

  }
}
.router-view {
  position: absolute;
  // top: 0;
  // bottom: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #fafafa;
}
.slideInUp-enter-active {
  animation-name: 'slideInUp';
  animation-duration: .3s;
}
.slideInUp-leave-active {
  animation-name: 'slideOutDown';
  animation-duration: .3s;
}


.slide-in-right-enter-active{
  animation-name: 'slideInRight';
  animation-duration: .5s;
  pointer-events: none;
}
.slide-in-right-leave-active{
  // fadeOutMy
  animation-name: 'fadeOutMy';
  animation-duration: .5s;
  pointer-events: none;
  z-index: 0;
}

.slide-out-right-enter-active{
  animation-name: 'fadeInMy';
  animation-duration: .5s;
  pointer-events: none;
}
.slide-out-right-leave-active{
  animation-name: "slideOutRight";
  animation-duration: .5s;
  pointer-events: none;
  z-index: 2;
}

@keyframes fadeOutMy
{
from {
  transform: translateX(0px);
  -webkit-transform: translateX(0px);
  }
to {
  transform: translateX(-100px);
  -webkit-transform: translateX(-100px);
  }
}
@keyframes fadeInMy
{
from {
  transform: translateX(-100px);
  -webkit-transform: translateX(-100px);
  }
to {
  -webkit-transform: translateX(0px);
  transform: translateX(0px);
  }
}
</style>
