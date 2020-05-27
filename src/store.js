import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showFooter: false, // 底部菜单控制
    userName: localStorage.getItem('userName') || '',
    messageRedDot: false, // 消息红点提示
    messageList: JSON.parse(localStorage.getItem('messageList')) || [],

    messageAllState: false, // 全局消息显示
    messageText: '', //全局消息
  },
  getters : {
    getUserName : state => {
      return state.userName
    },
    getMessageList : state => {
      return state.messageList
    },
    messageRedDot : state => {
      return state.messageRedDot
    },
    messageAllState : state => {
      return state.messageAllState
    },
    messageText : state => {
      return state.messageText
    },
  },
  mutations: {
    ShowFooter (state, flag) {
      state.showFooter = flag
    },
    SOCKET_getMsg (state, obj) {
      if (!state.messageRedDot) {
        state.messageRedDot = true
      }
      if (state.messageList.length > 1000) {
        state.messageList.splice(0,100)
      }
      state.messageList.push(obj)
      localStorage.setItem('messageList', JSON.stringify(state.messageList));
    },
    SOCKET_notice (state, obj) {
      if (!state.messageAllState) {
        state.messageAllState = true
      }
      state.messageText = obj.value
    },
    SET_RedDot (state, red) {
      state.messageRedDot = red
    },
    SET_UserName (state, name) {
      state.userName = name
      localStorage.setItem('userName', state.userName);
    },
    SET_AllState (state, stat) {
      state.messageAllState = stat
    }
  },
  actions: {

  }
})
