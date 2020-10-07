import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions.ts'
import getters from '@/store/getters.ts'
import mutations from '@/store/mutations.ts'
import { SecurityModel } from '@/types/SecurityModel'
const uiContextModule = require('@molgenis/molgenis-ui-context').default

Vue.use(Vuex)

const state: SecurityModel = {
  groups: [],
  groupMembers: {},
  groupRoles: {},
  groupPermissions: {},
  users: [],
  toast: null,
  groupRights: { user: null, anonymous: null, roles: [] }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    account: {
      namespaced: true,
      state: uiContextModule.store.state,
      mutations: uiContextModule.store.mutations,
      actions: uiContextModule.store.actions
    }
  }
})
