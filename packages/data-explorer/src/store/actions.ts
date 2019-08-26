// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import ApplicationState from '@/types/ApplicationState'
import { tryAction } from './helpers'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'

export default {
  loadEntity: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState }) => {
    const response = await api.get(`/api/data/${state.activeEntity}`)
    commit('setEntityData', response)
  }),
  loadDefaultEntityData: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState },
    payload: { expandAndFilter: string }) => {
    const response = await api.get(`/api/data/${state.activeEntity}?${payload.expandAndFilter}`)
    commit('setDefaultEntityData', response.items)
  }),
  getTableSettings: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState },
    payload: { tableName: string }) => {
    const response = await api.get(`/api/data/${state.settingsTable}?q=table=="${payload.tableName}"`)
    if (response.items.length > 0) {
      const id = response.items[0].data.id
      const shop = response.items[0].data.shop
      commit('setIsShop', shop)
      commit('setSettingsRowId', id)
      return id
    }
  }),
  getTableData: async ({ commit, state }: { commit: any, state: ApplicationState }) => {
    if (typeof state.activeEntity !== 'string') {
      throw new Error('cannot load table data for non string entity id')
    }
    const metaData = await metaDataRepository.fetchMetaData(state.activeEntity)
    commit('setMetaData', metaData)
    const tableData = await dataRepository.getTableDataWithReference(state.activeEntity, metaData)
    commit('setTableData', tableData)
  }
}
