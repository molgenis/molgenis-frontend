import ApplicationState from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'
import { RouterLinkStub } from '@vue/test-utils'

export default {
  filterRsql: (state: ApplicationState): string | null =>
    state.tableMeta && createRSQLQuery(state.filters, state.searchText),
  hasEditRights: (state: ApplicationState, getters: any, rootState:any): boolean => {
    if (!rootState.account.context) {
      return false // no context loaded yet
    }
    const { roles, authenticated } = rootState.account.context
    return authenticated && roles.some((role: string) => {
      return ['ROLE_EDITOR', 'ROLE_MANAGER', 'ROLE_SU'].includes(role)
    })
  }
}
