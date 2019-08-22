// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import ApplicationState from '@/types/ApplicationState'
import { tryAction } from './helpers'

export default {
  loadEntity: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState}) => {
    const response = await api.get(`/api/data/${state.activeEntity}`)
    commit('setEntityData', response)
  }),
  loadMetaData: tryAction(async ({ commit, state } : { commit: any, state: ApplicationState}) => {
    const response = await api.get(`/api/v2/${state.activeEntity}`)
    commit('setMetaData', response.meta)
  }),
  getTableSettings: tryAction(async ({ commit, state }: {commit: any, state: ApplicationState},
    payload : { tableName: string }) => {
    const response = await api.get(`/api/data/${state.settingsTable}?q=table=="${payload.tableName}"`)
    if (response.items.length > 0) {
      const id = response.items[0].data.id
      const shop = response.items[0].data.shop
      commit('setIsShop', shop)
      commit('setSettingsRowId', id)
      return id
    }
  })
}
