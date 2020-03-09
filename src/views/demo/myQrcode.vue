<template>
  <div class="myQrcode">
    <van-nav-bar title="二维码" left-text="返回" left-arrow @click-left="back" />
    <div class="content">
      <!-- <van-cell-group> -->
      <van-field
        v-model="message"
        label="内容"
        type="textarea"
        placeholder="请输入生成内容"
        rows="1"
        autosize
      />
      <!-- </van-cell-group> -->
      <van-button
        style="margin-top: 10px;"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="clickQRCode"
      >生成二维码</van-button>
      <div class="erweima">
          <img :src="imgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "myQrcode",
  data() {
    return {
      message: '',
      imgUrl: ''
    };
  },
  mounted() {},
  methods: {
    clickQRCode() {
      if (!this.message) {
          return
      }
      QRCode.toDataURL(this.message)
        .then(url => {
            this.imgUrl = url
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style lang="scss">
.myQrcode {
  // height: 300px;
  .erweima {
      padding-top: 20px;
      img {
          width: 300px;
      }
  }
}
</style>

