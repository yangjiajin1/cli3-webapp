<template>
  <div class="demooo">
    <van-nav-bar title="页面名字" left-text="返回" left-arrow @click-left="back"/>
    <div class="content">
        <div>{{jieshouzhon}}</div>
        <van-button
        style="margin-top: 10px;"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="yuanshen"
      >点击</van-button>
      <div class="box" v-for="(item,index) in imgList" :key="index">
          <img :src="item" alt="">
          {{index}}
      </div>
        
        <div class="aaaa">{{value}}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "demooo",
  data() {
    return {
        value: '',
        imgList:[],
        jieshouzhon: ''
    };
  },
  mounted() {
      let _this = this
      window["getMultiImage"] = function (value) {
        //   alert('接收')
          let aaa = JSON.parse(value)
        console.log(aaa.status)
        if (aaa.status == '1') {
            _this.jieshouzhon = '接收完成'
        } else {
            _this.jieshouzhon = '接收中'
        }
          for (let index = 0; index < aaa.splitImg.length; index++) {
              const element = aaa.splitImg[index];
              _this.imgList.push('data:image/png;base64,' + element)
          }
      }
  },
  methods: {
      yuanshen () {
          Native.takeMultiMountPhoto(50)
      }
  }
};
</script>
<style lang="scss">
.demooo {
  // height: 300px;
  .aaaa {
      width: 100%;
      word-break:break-all;
      
  }
  .box {
      width: 30%;
      float: left;
      img {
          width: 100%;
      }
  }
}
</style>

