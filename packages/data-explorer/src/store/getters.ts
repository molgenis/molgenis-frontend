import ApplicationState from '@/types/ApplicationState'
import { DataApiResponse } from '@/types/ApiResponse'
import { transformToRSQL } from '@molgenis/molgenis-js-rsql'
import { createRSQLQuery } from '@/mappers/rsqlMapper'

export default {
  activeEntityData: (state: ApplicationState): DataApiResponse | null =>
    state.tableData,
  filterRsql: (state: ApplicationState): string | null => 
    state.tableMeta && createRSQLQuery(state.filters.selections, state.tableMeta)
    
}
