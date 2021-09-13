import Vue from 'vue'
import Vuex from 'vuex'
import { actions } from './actions'
const uiContextModule = require('@molgenis/molgenis-ui-context').default

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Routersync lives here
    route: {},
    // this is where the ui-context module is bound to
    uiContext: {},
    userOptions: [],
    roleOptions: [],
    serverError: '',
    rlsObjects: [], // the 'rows'
    rlsEntities: [], // the 'tables'
    responseStatus: 0,
    permissionObject: {},
    startInAddMode: false,
    availablePermissions: []
  },
  getters: {
    isSU (state) {
      if (!state.uiContext.context) return false
      return state.uiContext.context.roles.includes('ROLE_SU')
    },
    isAuthenticated (state) {
      if (!state.uiContext.context) return false
      return state.uiContext.context.authenticated
    }
  },
  mutations: {
    setUserOptions (state, response) {
      state.userOptions = response.map(user => ({ text: user.username, value: user.username }))
    },
    setRoleOptions (state, response) {
      state.roleOptions = response.items.map(item => ({ value: item.data.name, text: `${item.data.label} (${item.data.name})` }))
    },
    setResponseStatus (state, response) {
      // if we get data back status is omitted.
      state.responseStatus = response.status || 200
    },
    setPermissionObject (state, response) {
      state.permissionObject = response.data
    },
    setServerError (state, response) {
      state.serverError = response.detail
    },
    setStartInAddMode (state, response) {
      state.startInAddMode = !response.data.permissions.length && state.responseStatus < 400
    },
    setRlsObjects (state, response) {
      state.rlsObjects = response.data.objects
    },
    setRlsEntities (state, response) {
      state.rlsEntities = response.data
    },
    setAvailablePermissions (state, response) {
      state.availablePermissions = response
    }
  },
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
