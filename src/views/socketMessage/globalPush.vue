<template>
  <div class="globalPush">
    <van-nav-bar title="全局推送" left-text="返回" left-arrow @click-left="back"/>
    <div class="content">
        <div>1使用http请求方式，get</div>
        <div>2服务端通过socket</div>
        <div>3对在线客户端进行全局可滚动消息推送</div>
        <van-field v-model="value" placeholder="请输入" />
        <van-button
        style="margin-top: 10px;"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="sendAll"
      >发送</van-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "globalPush",
  data() {
    return {
        value: ''
    };
  },
  mounted() {
  },
  methods: {
      sendAll () {
          if (!this.value) return
          const url = 'http://yangjiajin.cn:7001/socket'
          // const url = 'http://127.0.0.1:7001/socket'
          this.$http.get(url,{params: {name: this.value}}).then(data => {
              console.log(data)
          })
      }
  }
};
</script>
<style lang="scss">
.globalPush {
  // height: 300px;
}
</style>

