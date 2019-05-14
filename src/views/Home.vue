<template>
  <div class="home ios-paddingBottom" ref="home">
    <div class="home-swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item.image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <router-link to="/about" style="font-size:20px;padding:15px">Go to about</router-link>
    </div>
    <div class="menuList"></div>
    <slide-stack></slide-stack>
    <slide-line></slide-line>
  </div>
</template>

<script>
import slideStack from "@/components/slide/slideStack";
import slideLine from "@/components/slide/slideLine";
export default {
  name: "home",
  components: {
    slideStack,
    slideLine
  },
  data() {
    return {
      weizhi: 0,
      images: [
        { image: "http://yangjiajin.cn/img/lunbo/Rotation1.jpg" },
        { image: "http://yangjiajin.cn/img/lunbo/Rotation2.jpg" },
        { image: "http://yangjiajin.cn/img/lunbo/Rotation3.jpg" }
      ],
      haha:'改着玩'
    };
  },
  activated() {
    this.$refs.home.scrollTop = this.weizhi;
  },
  deactivated() {
    this.weizhi = this.$refs.home.scrollTop;
  }
};
</script>
<style lang="scss">
.home {
  .home-swipe {
    height: 3.45rem;
    img {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .menuList {
    height: 300px;
  }
}
</style>

