import ApplicationState from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'

export default {
  filterRsql: (state: ApplicationState): string | null =>
    state.tableMeta && createRSQLQuery(state.filters.selections, state.tableMeta)
}
