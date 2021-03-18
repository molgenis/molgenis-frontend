import client from '@/lib/client'
import ApplicationState from '@/types/ApplicationState'
import { V2Response } from '@/types/EntityTypeV2'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'
import * as metaFilterMapper from '@/mappers/metaFilterMapper'

export default {
  fetchTableMeta: async ({ commit, getters, dispatch }, payload: { tableName: string }) => {
    commit('setMetaData', null)
    commit('setFilterDefinition', [])
    commit('setTableName', payload.tableName)

    await dispatch('fetchTableSettings', payload)

    const metaData = await metaDataRepository.fetchMetaDataById(payload.tableName)
    const { definition } = await metaFilterMapper.mapMetaToFilters(metaData)
    commit('setMetaData', metaData)
    commit('setFilterDefinition', definition)
    if (getters.isUserAuthenticated) {
      // Dispatch action in the header module requires executing from the root scope:
      await dispatch('header/fetchBreadcrumbs', null, { root: true })
    }
  },
  async fetchViewData ({ commit, dispatch, state }: any) {
    if (state.dataDisplayLayout === 'CardView') {
      dispatch('fetchCardViewData')
    } else {
      dispatch('fetchTableViewData')
    }
  },
  fetchCardViewData: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }) => {
    if (state.tableName === null) {
      commit('addToast', { message: 'cannot load card data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('addToast', { message: 'cannot load card data without meta data', type: 'danger' })
      return
    }

    let columns: string[]
    let tableData:any = []
    const isCustomCard = state.dataDisplayLayout === 'CardView' && state.tableSettings.customCardCode
    const rsqlQuery = getters.filterRsql

    if (isCustomCard) {
      columns = state.tableSettings.customCardAttrs
        .split(',')
        .filter(f => f !== '')
        .map(a => a.trim())

      tableData = await dataRepository.getTableDataDeepReference(
        state.tableName, state.tableMeta, columns, rsqlQuery, state.tablePagination, state.sort
      )
    } else {
      columns = metaDataService.getAttributesfromMeta(state.tableMeta).splice(0, state.tableSettings.collapseLimit)
      tableData = await dataRepository.getTableDataWithLabel(
        state.tableName, state.tableMeta, columns, rsqlQuery, state.tablePagination, state.sort)
    }

    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
      commit('setPaginationCount', tableData.page.totalElements)
    }
  },
  fetchTableViewData: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }) => {
    if (state.tableName === null) {
      commit('addToast', { message: 'cannot fetch table view data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('addToast', { message: 'cannot fetch table view data without meta data', type: 'danger' })
      return
    }

    const rsqlQuery = getters.filterRsql
    let tableData:any = []

    tableData = await dataRepository.getTableDataWithLabel(
      state.tableName,
      state.tableMeta,
      metaDataService.getAttributesfromMeta(state.tableMeta),
      rsqlQuery,
      state.tablePagination,
      state.sort
    )

    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
      commit('setPaginationCount', tableData.page.totalElements)
    }
  },
  // expanded default card
  fetchRowDataLabels: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }, payload: { rowId: string }) => {
    if (state.tableName === null) {
      commit('addToast', { message: 'cannot fetch row data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('addToast', { message: 'cannot fetch row data without meta data', type: 'danger' })
      return
    }

    const rsqlQuery = getters.filterRsql

    commit('updateRowData', [])
    const rowData = await dataRepository.getRowDataWithReferenceLabels(state.tableName, payload.rowId, state.tableMeta)
    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('updateRowData', { rowId: payload.rowId, rowData })
    }
  },
  deleteRow: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: { rowId: string }) => {
    if (typeof state.tableName !== 'string') {
      commit('addToast', { message: 'cannot delete row from unknown table', type: 'danger' })
      return
    }
    await dataRepository.deleteRow(state.tableName, payload.rowId)
    commit('removeRow', { rowId: payload.rowId })
  },

  downloadResources: async (store, resources) => {
    const res = await client.post('/plugin/navigator/download', {
      resources: resources.map(resource => ({
        id: resource.id,
        type: resource.type
      }))
    })

    const fetchJobImmediate = await client.get(`/api/v2/sys_job_ResourceDownloadJobExecution/${res.data.identifier}`)
    store.commit('addToast', { type: 'info', message: fetchJobImmediate.data.progressMessage })

    const interval = setInterval(async () => {
      const fetchJob = await client.get(`/api/v2/sys_job_ResourceDownloadJobExecution/${res.data.identifier}`)
      if (fetchJob.data.status === 'SUCCESS') {
        store.commit('addToast', {
          message: `Download data from <a href="${fetchJob.data.resultUrl}">${fetchJob.data.resultUrl}</a>`,
          type: 'success',
          timeout: 0
        })
        clearInterval(interval)
      } else if (fetchJob.data.status === 'FAILED') {
        store.commit('addToast', { type: 'danger', message: fetchJob.data.progressMessage, timeout: 0 })
        clearInterval(interval)
      }
    }, 1000)
  },

  fetchTablePermissions: async ({ commit }: { commit: any }, payload: { tableName: string }) => {
    const res = await client.get<V2Response>(`/api/v2/${payload.tableName}?start=0&num=0`)
    const tablePermissions = res.data.meta.permissions
    commit('setTablePermissions', tablePermissions)
    return tablePermissions
  },

  fetchTableSettings: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: { tableName: string }) => {
    commit('setTableSettings', {})
    const response = await client.get(`/api/data/${state.settingsTable}?q=table=="${payload.tableName}"`)
    if (response.data.items.length === 1) {
      commit('setTableSettings', response.data.items[0].data)
    }
  },

  saveEntityDetailTemplate: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: { template: string }) => {
    if (state.tableMeta === null) {
      commit('addToast', { message: 'cannot save template without meta data', type: 'danger' })
      return
    }

    const data = { detail_template: payload.template }
    if (state.tableSettings.settingsRowId === null) {
      // create new row
      const postData = { ...data, table: state.tableMeta.id }
      return client.post(`/api/data/${state.settingsTable}`, postData)
    } else {
      // update existing row
      return client.patch(`/api/data/${state.settingsTable}/${state.tableSettings.settingsRowId}`, data)
    }
  }
}
