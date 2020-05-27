<template>
  <div class="message">
    <van-nav-bar :title="'消息 在线:'+ cont" left-text="返回" left-arrow @click-left="back" />
    <div class="content" ref="content">
      <!-- <div class="zaixian">在线：{{cont}}</div> -->
      <div class="messageList" ref="messageList">
        <div class="infoMsg" v-for="(item,index) in getMessageList" :key="index">
          <p>{{item.name || item.id}}:</p>
          <div class="contentText">{{item.value}}</div>
        </div>
      </div>
    </div>
    <van-popup class="popname" v-model="popshow" :close-on-click-overlay="false">
        <div>起个名字吧</div>
        <van-field v-model="valueName" placeholder="请输入名字" />
        <van-button class="qrbtn" type="info" size="small" @click="nameok">确 认</van-button>
    </van-popup>
    <div class="bottomFex">
      <van-field @keypress="keypress" type="textarea" autosize rows="1" v-model="value" placeholder />
      <div class="fason">
          <div class="fasonBtn" @click="sendMsg">
              发送
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/* eslint-disable */
export default {
  name: "message",
  data() {
    return {
      popshow: false,
      valueName: '',

      newMsgState: false,
      list: [],
      value: "",
      cont: 0
    };
  },
  sockets: {
    connect(data) {
      console.log("连接成功");
    },
    users(data) {
      this.cont = data;
    }
    //   getMsg (data) {
    //       console.log(data)
    //       this.list.push(data)
    //   }
  },
  computed: {
    ...mapGetters(["getMessageList", "getUserName"])
  },
  watch: {
      getMessageList (n,v) {
        this.$nextTick(() => {
            if ((this.$refs.messageList.clientHeight - this.$refs.content.scrollTop - this.$refs.content.clientHeight) < 60) {
                this.newMsgState = true
                this.$refs.messageList.scrollIntoView({ block: 'end', behavior: 'smooth' })
            } else {
                this.newMsgState = false
            }
        })
      }
  },
  mounted() {
    if (!this.getUserName) {
        this.popshow = true
    }
    this.$nextTick(() => {
        this.$refs.messageList.scrollIntoView(false)
    })
    this.getUsersCont();
  },
  methods: {
    getUsersCont() {
      this.$socket.emit("users");
    },
    keypress (e) {
      let keycode = e.keyCode;
      if (keycode == 13) {
        e.preventDefault();
        this.sendMsg()
      }
    },
    sendMsg() {
      if (this.value) {
        this.$socket.emit("send", { name: this.getUserName, value: this.value });
        this.value = "";
      }
    },
    nameok () {
      if (this.valueName) {
        this.$store.commit("SET_UserName", this.valueName);
        this.popshow = false
      }
    }
  },
  destroyed() {
    this.$store.commit("SET_RedDot", false);
  }
};
</script>
<style lang="scss">
.message {
  // height: 300px;
  background-color: #ecedee;
  .content {
    position: relative;
    .zaixian {
      position: absolute;
      top: 0;
      width: 100%;
    }
    .messageList {
      padding-bottom: 74px;
      min-height: 100%;
      .infoMsg {
        text-align: left;
        padding: 16px 16px 5px;
        .contentText {
          margin-top: 8px;
          display: inline-block;
          background-color: #fff;
          padding: 12px;
          margin-left: 15px;
          border-radius: 4px;
        }
      }
    }
  }
  .popname {
      padding: 20px 10px;
      border-radius: 6px;
      .qrbtn {
          margin-top: 20px;
      }
  }
  .bottomFex {
    position: fixed;
    display: flex;
    width: 100%;
    min-height: 44px;
    bottom: 0;
    left: 0;
    background-color: #f7f7f7;
    box-sizing: content-box;
    padding-bottom: env(safe-area-inset-bottom);
    .fason {
      width: 70px;
      color: #fff;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background-color: #fff;
      .fasonBtn {
          background-color: deepskyblue;
          width: 50px;
          height: 34px;
          line-height: 34px;
          border-radius: 4px;
          margin-bottom: 5px;
      }
    }
  }
}
</style>

