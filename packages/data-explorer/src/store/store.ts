import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import headerModule from '@/store/header/headerModule'

// @ts-ignore
import context from '@molgenis/molgenis-ui-context'
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
      state: context.store.state,
      mutations: context.store.mutations
    }
  }
})
