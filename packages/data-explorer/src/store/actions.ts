// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { tryAction } from './helpers'

export default {
  loadTableData: tryAction(async ({ commit, state } : any) => {
    const response = await api.get(`/api/data/${state.tableName}`)
    commit('setTableData', response)
  }),
  loadTableMetaData: tryAction(async ({ commit, state } : any) => {
    const response = await api.get(`/api/v2/${state.tableName}`)
    commit('setTableMetaData', response.meta)
  })
}
