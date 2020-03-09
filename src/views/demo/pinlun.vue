<template>
  <div class="pinlun">
    <van-nav-bar title="demo" left-text="返回" left-arrow @click-left="back"/>
    <div class="content" ref="content">
      
      <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '60%' }"
    >
    <div style="height:50px;" v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="item">
                的缩放个单身狗是电饭锅是电饭锅的分数高健康的分数能开发大脑思考过 v 你
            </div>
    </van-popup>
        <Popup v-model="popShow" :height="60">
            <div style="height:50px;" v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" :key="item">
                的缩放个单身狗是电饭锅是电饭锅的分数高健康的分数能开发大脑思考过 v 你
            </div>
        </Popup>
        <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <van-button
        style="margin-top: 10px;"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="popShow = true"
      >点击弹出</van-button>
        <van-button
        style="margin-top: 10px;"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="show = true"
      >点击弹出2</van-button>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
            <div style="height:100px">
                哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
    </div>
  </div>
</template>

<script>
import Popup from '../../components/Popup'
export default {
  name: "pinlun",
  data() {
    return {
        popShow: false,
        show: false
    };
  },
  watch: {
      popShow (n) {
          if (n) {
              this.$refs.content.style.overflow = 'hidden';
          } else {
              this.$refs.content.style.overflow = 'auto';
          }
      }
  },
  components: {
      Popup
  },
  mounted() {
  },
  methods: {
  },
  beforeDestroy () {
      this.$refs.content.style.overflow = 'auto';
  }
};
</script>
<style lang="scss">
.pinlun {
  // height: 300px;
}
</style>

