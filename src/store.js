import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showFooter: false
  },
  mutations: {
    ShowFooter (state, flag) {
      state.showFooter = flag
    }
  },
  actions: {

  }
})
