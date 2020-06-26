import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import headerModule from '@/store/header/headerModule'

const uiContextModule = require('@molgenis/molgenis-ui-context').default

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    header: headerModule,
    account: {
      namespaced: true,
      state: uiContextModule.store.state,
      actions: uiContextModule.store.actions,
      mutations: uiContextModule.store.mutations
    }
  }
})
