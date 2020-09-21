import ApplicationState from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'

export default {
  filterRsql: (state: ApplicationState): string | null =>
    state.tableMeta && createRSQLQuery(state.filters, state.searchText),
  userRoles: (state: ApplicationState, getters: any, rootState:any): string[] => {
    return rootState.account.context ? rootState.account.context.roles : []
  },
  isUserAuthenticated: (state: ApplicationState, getters: any, rootState:any): boolean => {
    return rootState.account.context ? rootState.account.context.authenticated : false
  },
  hasEditRights: (state: ApplicationState, getters: any): boolean => {
    return getters.isUserAuthenticated && getters.userRoles.some((role: string) => {
      return ['ROLE_EDITOR', 'ROLE_MANAGER', 'ROLE_SU'].includes(role)
    })
  },
  hasEditSettingsRights: (state: ApplicationState, getters: any): boolean => {
    return getters.isUserAuthenticated && getters.userRoles.includes('ROLE_SU')
  }
}
