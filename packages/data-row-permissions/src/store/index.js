import Vue from 'vue'
import Vuex from 'vuex'
const uiContextModule = require('@molgenis/molgenis-ui-context').default

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    isSU (state) {
      return state.uiContext.context.roles.includes('ROLE_SU')
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    uiContext: {
      namespaced: true,
      state: uiContextModule.store.state,
      mutations: uiContextModule.store.mutations,
      actions: uiContextModule.store.actions
    }
  }
})
