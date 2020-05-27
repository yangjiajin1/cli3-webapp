<template>
  <div id="app">
    <div style ='margin:0 auto;width:0px;height:0px;overflow:hidden;'>
      <img src='@/assets/images/imgIcon.jpg' />
    </div >
    <transition :name="transitionName">
      <navigation>
        <router-view class="router-view" />
      </navigation>
    </transition>
    <van-notice-bar class="notice_bar" v-if="messageAllState" :text="messageText" left-icon="volume-o" @click="close" mode="closeable" />
    <!-- 底部导航 newsList-->
    <transition name="slideInUp">
      <van-tabbar fixed v-model="active" v-if="$store.state.showFooter">
        <van-tabbar-item icon=" iconfont icon-shouye" @click="back('home')">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o" @click="go('message')" :dot="messageRedDot">聊天</van-tabbar-item>
        <van-tabbar-item icon=" iconfont icon-shoucang" @click="back('newsList')">新闻</van-tabbar-item>
        <van-tabbar-item icon=" iconfont icon-wode">我的</van-tabbar-item>
      </van-tabbar>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      transitionName: "",
      active: 0,
      menlist: ["home", "newsList", "attendance2"],
      selectedLabelDefault: "home",
      routList: {
        'home': 0,
        'message': 1,
        'newsList': 2
      }
    };
  },
  watch: {
    '$route' (data) {
      if (this.routList[data.name] != undefined) {
        this.active = this.routList[data.name]
      } else {
        this.active = 9
      }
    }
  },
  computed: {
    ...mapGetters(["messageRedDot","messageAllState", "messageText"])
  },
  mounted() {
    this.$navigation.on("forward", (f, t) => {
      if (this.ismen(f.route.name, t.route.name)) {
        this.transitionName = "";
        return;
      }
      this.transitionName = "slide-in-right";
    });
    this.$navigation.on("back", (f, t) => {
      if (this.ismen(f.route.name, t.route.name)) {
        this.transitionName = "";
        return;
      }
      this.transitionName = "slide-out-right";
    });
  },
  methods: {
    goFacade(url) {
      this.$router.push({ name: url });
    },
    ismen(a, b) {
      return this.menlist.includes(a) && this.menlist.includes(b);
    },
    close () {
        this.$store.commit('SET_AllState', false)
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
.notice_bar {
  position: fixed;
  width: 100%;
  left: 0;
  top: 50px;
  z-index: 9999;
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
  animation-name: "slideInUp";
  animation-duration: 0.3s;
}
.slideInUp-leave-active {
  animation-name: "slideOutDown";
  animation-duration: 0.3s;
}

.slide-in-right-enter-active {
  animation-name: "slideInRight";
  animation-duration: 0.35s;
  pointer-events: none;
}
.slide-in-right-leave-active {
  // fadeOutMy
  animation-name: "fadeOutMy";
  animation-duration: 0.35s;
  pointer-events: none;
  z-index: 0;
}

.slide-out-right-enter-active {
  animation-name: "fadeInMy";
  animation-duration: 0.35s;
  pointer-events: none;
}
.slide-out-right-leave-active {
  animation-name: "slideOutRight";
  animation-duration: 0.35s;
  pointer-events: none;
  z-index: 2;
}

@keyframes fadeOutMy {
  from {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  to {
    transform: translateX(-100px);
    -webkit-transform: translateX(-100px);
  }
}
@keyframes fadeInMy {
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
