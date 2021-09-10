import Vue from 'vue'
import Vuex from 'vuex'
import api from '@molgenis/molgenis-api-client'
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
    responseStatus: 0,
    permissionObject: {},
    startInAddMode: false
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
    }
  },
  actions: {
    getAllRoles ({ commit }) {
      api.get('/api/data/sys_sec_Role').then((response) => {
        commit('setRoleOptions', response)
      })
    },
    getAllUsers ({ commit }) {
      api.get('/api/identities/user').then((response) => {
        commit('setUserOptions', response)
      })
    },
    getPermissionsForObject ({ commit, state }) {
      this.changedPermissionObjects = []
      this.addedPermissionObjects = []
      commit('setResponseStatus', { status: 0 })
      api.get(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`).then((response) => {
        commit('setPermissionObject', response)
        commit('setResponseStatus', response)
        commit('setStartInAddMode', response)
      }).catch(e => {
        commit('setResponseStatus', e)
      })
    },
    updatePermissions ({ state, dispatch }, changedPermissionObjects) {
      this.editMode = false
      // TODO upgrade api-client
      fetch(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        method: 'PATCH',
        body: JSON.stringify({
          permissions: changedPermissionObjects
        })
      }).then(() => {
        // reset
        dispatch('getPermissionsForObject')
      })
    },
    addPermission ({ state, commit, dispatch }, newPermissionObject) {
      api.post(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`, { body: JSON.stringify({ permissions: [newPermissionObject] }) }).then(() => {
        dispatch('getPermissionsForObject')
      }).catch(async (e) => {
        const response = await e.json()
        commit('setServerError', response)
      })

      this.newPermissionObject = {}
    },
    removePermission ({ dispatch, state }, permissionToRemove) {
      delete permissionToRemove.permission
      api.delete_(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`, { body: JSON.stringify(permissionToRemove) }).then(() => {
        dispatch('getPermissionsForObject')
      })
    }
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
