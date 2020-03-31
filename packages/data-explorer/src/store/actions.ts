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
      commit('setTableSettings', response.items[0].data)
    }
    commit('setIsSettingsLoaded')
  }),
  fetchCardViewData: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }) => {
    if (state.tableName === null) {
      throw new Error('cannot load table data for non string table id')
    }

    const metaData = await metaDataRepository.fetchMetaDataById(state.tableName)
    commit('setMetaData', metaData)
    commit('setFiltersDefinition', await metaFilterMapper.mapMetaToFilters(metaData))

    let columns: string[]
    let tableData
    const isCustomCard = state.dataDisplayLayout === 'CardView' && state.tableSettings.customCardCode

    const rsqlQuery = getters.filterRsql

    commit('setTableData', [])
    if (isCustomCard) {
      columns = state.tableSettings.customCardAttrs.split(',').map(attribute => attribute.trim())
      tableData = await dataRepository.getTableDataDeepReference(state.tableName, metaData, columns, rsqlQuery)
    } else {
      columns = metaDataService.getAttributesfromMeta(metaData).splice(0, state.tableSettings.collapseLimit)
      tableData = await dataRepository.getTableDataWithLabel(state.tableName, metaData, columns, rsqlQuery)
    }
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
    }
  },
  fetchTableViewData: async ({ commit, getters }: { commit: any, getters: any }, payload: {tableName: string}) => {
    const tableName = payload.tableName
    const metaData = await metaDataRepository.fetchMetaDataById(tableName)
    commit('setMetaData', metaData)

    const rsqlQuery = getters.filterRsql

    commit('setTableData', [])
    const tableData = await dataRepository.getTableDataWithLabel(tableName, metaData, metaDataService.getAttributesfromMeta(metaData), rsqlQuery)
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
    }
  },
  // expanded default card
  fetchRowDataLabels: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }, payload: {rowId: string}) => {
    if (typeof state.tableName !== 'string') {
      throw new Error('cannot load table data for non string table id')
    }
    const metaData = await metaDataRepository.fetchMetaDataById(state.tableName)
    commit('setMetaData', metaData)
    const rsqlQuery = getters.filterRsql
    commit('updateRowData', [])
    const rowData = await dataRepository.getRowDataWithReferenceLabels(state.tableName, payload.rowId, metaData)
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('updateRowData', { rowId: payload.rowId, rowData })
    }
  }
}
