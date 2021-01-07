import client from '@/lib/client'
import ApplicationState from '@/types/ApplicationState'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'
import * as metaFilterMapper from '@/mappers/metaFilterMapper'

export default {
  downloadResources: async function (store, resources) {
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

  fetchTableMeta: async ({ commit, state }: { commit: any, state: ApplicationState }, payload: { tableName: string }) => {
    commit('setTableSettings', {})
    commit('setMetaData', null)
    commit('setFilterDefinition', [])
    commit('setFiltersShown', [])
    commit('setFilterSelection', {})

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
  async fetchViewData (store, { tableName }) {
    if (store.state.tableName !== tableName) {
      await store.dispatch('fetchTableMeta', { tableName })
      if (store.getters.isUserAuthenticated) {
        await store.dispatch('header/fetchBreadcrumbs')
      }

      store.commit('setTableName', tableName)
    }

    if (store.state.dataDisplayLayout === 'CardView') {
      store.dispatch('fetchCardViewData')
    } else {
      store.dispatch('fetchTableViewData')
    }
  },
  fetchCardViewData: async ({ commit, state, getters }: { commit: any, state: ApplicationState, getters: any }) => {
    if (state.tableName === null) {
      commit('addToast', { message: 'cannot load card data without table name', type: 'danger' })
      return
    }

    if (state.tableMeta === null) {
      commit('addToast', { message: 'cannot load table data without meta data', type: 'danger' })
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
        state.tableName, state.tableMeta, columns, rsqlQuery, state.tablePagination
      )
    } else {
      columns = metaDataService.getAttributesfromMeta(state.tableMeta).splice(0, state.tableSettings.collapseLimit)
      tableData = await dataRepository.getTableDataWithLabel(
        state.tableName, state.tableMeta, columns, rsqlQuery, state.tablePagination)
    }

    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
      commit('setPagination', { ...state.tablePagination, ...{ count: tableData.page.totalElements } })
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
      state.tablePagination
    )

    if (getters.filterRsql === rsqlQuery) {
      // retrieved results are still relevant
      commit('setTableData', tableData)
      commit('setPagination', { ...state.tablePagination, ...{ count: tableData.page.totalElements } })
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
    const rowData = await dataRepository.getRowDataWithReferenceLabels(state.tableName, payload.rowId, state.tableMeta, state.tablePagination)
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
  }
}
