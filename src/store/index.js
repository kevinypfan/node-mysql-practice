import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    state: [],
    title: 'Hello',
    newTable: null
  },
  mutations: {
    setNewTable (state, payload) {
      state.newTable = payload
    }
  },
  actions: {
    createTable ({commit}, payload) {
      Vue.axios.post('/createtable', payload)
      .then((result) => {
        console.log(result)
        commit('setNewTable', result.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    insertTable ({commit}, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post('/insertdata', payload)
          .then((result) => {
            resolve();
          }).catch((err) => {
            reject();
          })
      })
    }
  },
  getters: {
    getTitle (state) {
      return state.title + 'World'
    },
    getNewTable (state) {
      return state.newTable
    }
  }
})
