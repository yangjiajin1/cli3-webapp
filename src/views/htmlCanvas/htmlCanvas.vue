<template>
  <div class="htmlCanvas">
    <van-nav-bar title="生成海报" left-text="返回" left-arrow @click-left="back"/>
    <div class="content">
        <div class="poster" ref="poster">
            <img src="./img/kapian.jpg" alt="">
            <p>{{valueName}}</p>
        </div>
        <div class="shuru">
            <div>请输入：</div>
            <van-field v-model="valueName" placeholder="请输入用户名" />
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="seave">生成</van-button>
        </div>

        <van-popup class="popImg" position="bottom" round closeable v-model="popshow">
            <img :src="imgBase64" alt="">
        </van-popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import html2canvas from 'html2canvas'
export default {
  name: "htmlCanvas",
  data() {
    return {
        popshow: false,
        imgBase64: '',
        valueName: '示例'
    };
  },
  mounted() {
  },
  methods: {
      seave () {
          html2canvas(this.$refs.poster).then(canvas => {
              this.imgBase64 = canvas.toDataURL("image/png")
              this.popshow = true
          });
      }
  }
};
</script>
<style lang="scss">
.htmlCanvas {
//   min-height: 100%;

    .poster {
        width: 80%;
        margin: 0 auto;
        position: relative;
        >img {
            width: 100%;
        }
        >p {
            position: absolute;
            font-size: 30px;
            bottom: 30px;
            color: #fff;
            width: 100%;
            text-align: center;
        }
    }
    .shuru {
        padding: 20px 20px;
        // text-align: left;
        font-size: 18px;
    }
    .popImg {
        padding: 30px 10%;
        >img {
            width: 100%;
        }
    }
}
</style>

