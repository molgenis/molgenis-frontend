export const mutations = {
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
}
