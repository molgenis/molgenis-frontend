import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions.ts'
import getters from '@/store/getters.ts'
import mutations from '@/store/mutations.ts'
import { SecurityModel } from '@/types/SecurityModel'

Vue.use(Vuex)

const state: SecurityModel = {
  loginUser: {},
  groups: [],
  groupMembers: {},
  groupRoles: {},
  groupPermissions: {},
  users: [],
  toast: null
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
