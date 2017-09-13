import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    title: 'Hello',
    num: 0
  },
  mutations: {
    setNum (state, payload) {
      state.num = state.num + payload
    }
  },
  actions: {
    plusSome ({commit}, payload) {
      commit('setNum', payload)
    }
  },
  getters: {
    getTitle (state) {
      return state.title + "world"
    }
  }
})
