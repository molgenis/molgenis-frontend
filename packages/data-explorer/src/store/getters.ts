import ApplicationState from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'

export default {
  filterRsql: (state: ApplicationState): string | null =>
    state.tableMeta && createRSQLQuery(state.filters, state.searchText),
  hasManagerRole: (state: ApplicationState) => {
    console.log(state)
    return state.context.context.roles.includes('ROLE_MANAGER')
  }
}
