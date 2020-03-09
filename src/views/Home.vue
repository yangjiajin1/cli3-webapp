<template>
  <div class="home ios-paddingBottom" ref="home">
    <div class="home-swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item.image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="menuList">
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(item,index) in menuList"
          :key="index"
          :icon="item.icon"
          :text="item.name"
          :to="item.path"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      weizhi: 0,
      images: [
        { image: "http://yangjiajin.cn/img/lunbo/Rotation1.jpg" },
        { image: "http://yangjiajin.cn/img/lunbo/Rotation2.jpg" },
        { image: "http://yangjiajin.cn/img/lunbo/Rotation3.jpg" }
      ],
      haha:'改着玩',
      menuList: [
        {name: '图片压缩', icon: 'photo-o',path: '/imgPage'},
        {name: '日历', icon: 'calender-o', path: '/calendar'},
        {name: '二维码', icon: 'qr', path: '/myQrcode'},
        {name: '滑动', icon: 'hotel-o', path: '/slide'},
        {name: '图表', icon: 'bar-chart-o', path: '/myEcharts'},
        {name: 'popup滑动', icon: 'bar-chart-o', path: '/pinlun'},
        {name: '图片上传', icon: 'photo-o', path: '/imgList'},
        {name: '热力图', icon: 'photo-o', path: '/heatMap'},
        {name: '生成海报', icon: 'photo-o', path: '/htmlCanvas'},
      ]
    };
  },
  activated() {
    this.$refs.home.scrollTop = this.weizhi;
  },
  deactivated() {
    this.weizhi = this.$refs.home.scrollTop;
  },
  created () {
  },
  methods: {
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
    padding: 10px 0;
    height: 500px;
  }
}
</style>

