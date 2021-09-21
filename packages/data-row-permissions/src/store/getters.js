export const getters = {
  isSU (state) {
    if (!state.uiContext.context) return false
    return state.uiContext.context.roles.includes('ROLE_SU')
  },
  isAuthenticated (state) {
    if (!state.uiContext.context) return false
    return state.uiContext.context.authenticated
  }
}
