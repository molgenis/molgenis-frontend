import api from '@molgenis/molgenis-api-client'

export const actions = {
  getAllRoles ({ commit }) {
    api.get('/api/data/sys_sec_Role').then((response) => {
      commit('setRoleOptions', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  getAllUsers ({ commit }) {
    api.get('/api/identities/user').then((response) => {
      commit('setUserOptions', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  getAllPermissionsTypes ({ commit }) {
    commit('setResponseStatus', { status: 0 })
    api.get('/api/permissions/types').then((response) => {
      commit('setRlsEntities', response)
      commit('setResponseStatus', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  getPermissionsByEntityId ({ commit }, entityId) {
    api.get(`/api/permissions/types/permissions/${entityId}`).then((response) => {
      commit('setAvailablePermissions', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  // These are all the 'objects' which can be anything, from a row, to a zip file
  // At this point only items are shown which have permission set to it,
  // being owner is not enough to be shown here [13/08/2021]
  getAllRlsObjects ({ commit }, entityId) {
    commit('setResponseStatus', { status: 0 })
    api.get(`/api/permissions/${entityId}`).then((response) => {
      commit('setRlsObjects', response)
      commit('setResponseStatus', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  // CRUD actions for permissions
  getPermissionsForObject ({ commit, state }) {
    commit('setResponseStatus', { status: 0 })
    api.get(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`).then((response) => {
      commit('setPermissionObject', response)
      commit('setResponseStatus', response)
      commit('setStartInAddMode', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  updatePermissions ({ state, dispatch, commit }, changedPermissionObjects) {
    // https://github.com/molgenis/molgenis-js-client/issues/66
    fetch(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify({
        ...changedPermissionObjects
      })
    }).then(() => {
      // reset
      dispatch('getPermissionsForObject')
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  addPermission ({ state, commit, dispatch }, newPermissionObject) {
    api.post(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`, { body: JSON.stringify({ permissions: [newPermissionObject] }) }).then(() => {
      dispatch('getPermissionsForObject')
    }).catch(async (e) => {
      const response = await e.json()
      commit('setServerError', response)
    })
  },
  removePermission ({ dispatch, state, commit }, permissionToRemove) {
    api.delete_(`/api/permissions/${state.route.params.entityId}/${state.route.params.objectId}`, { body: JSON.stringify(permissionToRemove) }).then(() => {
      dispatch('getPermissionsForObject')
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  }
}
