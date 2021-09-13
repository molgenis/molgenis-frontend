import api from '@molgenis/molgenis-api-client'

export const actions = {
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
  getAllPermissionsTypes ({ commit }) {
    api.get('/api/permissions/types').then((response) => {
      commit('setRlsEntities', response)
    })
  },
  getPermissionsByEntityId ({ commit }, entityId) {
    api.get(`/api/permissions/types/permissions/${entityId}`).then((response) => {
      commit('setAvailablePermissions', response.data)
    })
  },
  // These are all the 'objects' which can be anything, from a row, to a zip file
  // At this point only items are shown which have permission set to it,
  // being owner is not enough to be shown here [13/08/2021]
  getAllRlsObjects ({ commit }, entityId) {
    api.get(`/api/permissions/${entityId}`).then((response) => {
      commit('setRlsObjects', response)
    }).catch(e => {
      commit('setResponseStatus', e)
    })
  },
  // CRUD actions for permissions
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
}
