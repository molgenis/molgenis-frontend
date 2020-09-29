import client from '@/lib/client'
import ApplicationState from '@/types/ApplicationState'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'
import * as metaFilterMapper from '@/mappers/metaFilterMapper'

export default {
  fetchTableMeta: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: { tableName: string }) => {
    commit('setTableSettings', {})
    commit('setMetaData', null)
    commit('setFilterDefinition', [])
    commit('setFiltersShown', [])
    commit('setFilterSelection', {})
    commit('setSearchText', '')

    const response = await client.get(`/api/data/${state.settingsTable}?q=table=="${payload.tableName}"`)
    if (response.data.items.length === 1) {
      commit('setTableSettings', response.data.items[0].data)
    }

    const metaData = await metaDataRepository.fetchMetaDataById(payload.tableName)
    const { definition } = await metaFilterMapper.mapMetaToFilters(metaData)
    commit('setMetaData', metaData)
    commit('setFilterDefinition', definition)
    commit('setFiltersShown', state.tableSettings.defaultFilters)

    if (state.bookmark !== '') {
      commit('applyBookmark')
    }
  },
  fetchCardViewData: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }) => {
    if (state.tableName === null) {
      commit('setToast', { message: 'cannot load card data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('setToast', { message: 'cannot load table data without meta data', type: 'danger' })
      return
    }

    let columns: string[]
    let tableData
    const isCustomCard = state.dataDisplayLayout === 'CardView' && state.tableSettings.customCardCode

    const rsqlQuery = getters.filterRsql

    commit('setTableData', [])
    if (isCustomCard) {
      columns = state.tableSettings.customCardAttrs
        .split(',')
        .filter(f => f !== '')
        .map(a => a.trim())

      tableData = await dataRepository.getTableDataDeepReference(
        state.tableName,
        state.tableMeta,
        columns,
        rsqlQuery,
        state.dataDisplayLimit)
    } else {
      columns = metaDataService.getAttributesfromMeta(state.tableMeta).splice(0, state.tableSettings.collapseLimit)
      tableData = await dataRepository.getTableDataWithLabel(state.tableName, state.tableMeta, columns, rsqlQuery, state.dataDisplayLimit)
    }
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
    }
  },
  fetchTableViewData: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }, payload: { tableName: string }) => {
    if (state.tableName === null) {
      commit('setToast', { message: 'cannot fetch table view data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('setToast', { message: 'cannot fetch table view data without meta data', type: 'danger' })
      return
    }

    const rsqlQuery = getters.filterRsql

    commit('setTableData', [])
    const tableData = await dataRepository.getTableDataWithLabel(
      state.tableName,
      state.tableMeta,
      metaDataService.getAttributesfromMeta(state.tableMeta),
      rsqlQuery,
      state.dataDisplayLimit)
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
    }
  },
  // expanded default card
  fetchRowDataLabels: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }, payload: { rowId: string }) => {
    if (state.tableName === null) {
      commit('setToast', { message: 'cannot fetch row data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('setToast', { message: 'cannot fetch row data without meta data', type: 'danger' })
      return
    }

    const rsqlQuery = getters.filterRsql

    commit('updateRowData', [])
    const rowData = await dataRepository.getRowDataWithReferenceLabels(state.tableName, payload.rowId, state.tableMeta, state.dataDisplayLimit)
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('updateRowData', { rowId: payload.rowId, rowData })
    }
  },
  deleteRow: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: { rowId: string }) => {
    if (typeof state.tableName !== 'string') {
      commit('setToast', { message: 'cannot delete row from unknown table', type: 'danger' })
      return
    }
    await dataRepository.deleteRow(state.tableName, payload.rowId)
    commit('removeRow', { rowId: payload.rowId })
  }
}
