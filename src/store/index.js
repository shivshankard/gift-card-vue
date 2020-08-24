import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
    layout: 'default-layout'
  },
  mutations: {
    SET_LAYOUT (state, payload) {
      store.commit('layout',payload)
      state.layout = payload;
    }
  },
  actions: {
    setLayout: ({commit, state}, newValue) => {
        commit('SET_LAYOUT', newValue)
        return state.layout
    }
  },
  getters: {
    layout (state) {
      return state.layout
    }
  },
  methods: {
    GetLayout: function()
    {
  
    }    
  }
})