import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'
const uiContextModule = require('@molgenis/molgenis-ui-context').default

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    uiContext: {
      namespaced: true,
      state: uiContextModule.store.state,
      mutations: uiContextModule.store.mutations,
      actions: uiContextModule.store.actions
    }
  }
})
