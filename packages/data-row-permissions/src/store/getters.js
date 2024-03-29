export const getters = {
  isSU (state) {
    if (!state.uiContext || !state.uiContext.context) return false
    return state.uiContext.context.roles.includes('ROLE_SU')
  },
  isAuthenticated (state) {
    if (!state.uiContext || !state.uiContext.context) return false
    return state.uiContext.context.authenticated
  },
  loaded (state) {
    return state.responseStatus !== 0
  }
}
