// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import ApplicationState from '@/types/ApplicationState'
import { tryAction } from './helpers'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'
import * as metaFilterMapper from '@/mappers/metaFilterMapper'

export default {
  getTableSettings: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState },
    payload: { tableName: string }) => {
    const response = await api.get(`/api/data/${state.tableSettings.settingsTable}?q=table=="${payload.tableName}"`)
    if (response.items.length > 0) {
      const id = response.items[0].data.id
      commit('setTableSettings', response.items[0].data)
      return id
    }
  }),
  fetchCardViewData: async ({ commit, state }: { commit: any, state: ApplicationState }) => {
    if (state.tableName === null) {
      throw new Error('cannot load table data for non string table id')
    }

    const metaData = await metaDataRepository.fetchMetaData(state.tableName)
    commit('setMetaData', metaData)
    commit('setFilters', await metaFilterMapper.mapMetaToFilters(metaData))

    let columns: string[]
    let tableData
    const isCustomCard = state.dataDisplayLayout === 'CardView' && state.tableSettings.customCardCode

    if (isCustomCard) {
      columns = state.tableSettings.customCardAttrs.split(',').map(attribute => attribute.trim())
      tableData = await dataRepository.getTableDataDeepReference(state.tableName, metaData, columns)
    } else {
      columns = metaDataService.getAttributesfromMeta(metaData).splice(0, state.tableSettings.collapseLimit)
      tableData = await dataRepository.getTableDataWithLabel(state.tableName, metaData, columns)
    }

    commit('setTableData', tableData)
  },
  fetchTableViewData: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: {tableName: string}) => {
    const tableName = payload.tableName
    const metaData = await metaDataRepository.fetchMetaData(tableName)
    commit('setMetaData', metaData)

    const tableData = await dataRepository.getTableDataWithLabel(tableName, metaData, metaDataService.getAttributesfromMeta(metaData))
    commit('setTableData', tableData)
  },
  // expanded default card
  fetchRowDataLabels: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: {rowId: string}) => {
    if (typeof state.tableName !== 'string') {
      throw new Error('cannot load table data for non string table id')
    }
    const metaData = await metaDataRepository.fetchMetaData(state.tableName)
    commit('setMetaData', metaData)
    const rowData = await dataRepository.getRowDataWithReferenceLabels(state.tableName, payload.rowId, metaData)
    commit('updateRowData', { rowId: payload.rowId, rowData })
  }
}
