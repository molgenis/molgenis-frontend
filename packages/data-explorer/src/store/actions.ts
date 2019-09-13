// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import ApplicationState from '@/types/ApplicationState'
import { tryAction } from './helpers'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import { getAttributesfromMeta } from '@/repository/metaDataService'

export default {
  loadTableData: tryAction(async ({ commit, state } : {commit: any, state: ApplicationState}) => {
    const response = await api.get(`/api/data/${state.tableName}`)
    commit('setTableData', response)
  }),
  getTableSettings: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState },
    payload: { tableName: string }) => {
    const response = await api.get(`/api/data/${state.tableSettings.settingsTable}?q=table=="${payload.tableName}"`)
    if (response.items.length > 0) {
      const id = response.items[0].data.id
      commit('setTableSettings', response.items[0].data)
      return id
    }
  }),
  // on create DataView
  getTableData: async ({ commit, state }: { commit: any, state: ApplicationState }) => {
    if (state.tableName === null) {
      throw new Error('cannot load table data for non string table id')
    }

    const metaData = await metaDataRepository.fetchMetaData(state.tableName)
    commit('setMetaData', metaData)

    let coloms: string[]
    let tableData
    const isCustomCard = state.dataDisplayLayout === 'CardView' && state.tableSettings.customCardCode

    if (isCustomCard) {
      coloms = state.tableSettings.customCardAttrs.split(',').map(attribute => attribute.trim())
      tableData = await dataRepository.getTableDataDeepReference(state.tableName, metaData, coloms)
    } else {
      coloms = getAttributesfromMeta(metaData).splice(0, state.tableSettings.collapseLimit)
      tableData = await dataRepository.getTableDataWithLabel(state.tableName, metaData, coloms)
    }

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
