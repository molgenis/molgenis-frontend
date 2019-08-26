// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import ApplicationState, { EntityMetaRefs } from '@/types/ApplicationState'
import { tryAction } from './helpers'
import { buildExpandedAttributesQuery } from '@/repository/queryBuilder'
import { DataApiResponseItem, MetaDataAttribute } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'
import { getAttributesfromMeta, getRefsFromMeta } from '@/repository/metaDataService'

export default {
  loadEntity: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState }) => {
    const response = await api.get(`/api/data/${state.activeEntity}`)
    commit('setEntityData', response)
  }),
  loadMetaData: tryAction(async ({ commit, state }: { commit: any, state: ApplicationState }) => {
    const response = await api.get(`/api/v2/${state.activeEntity}`)
    commit('setMetaData', response.meta)
    return response.meta
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
  getTableData: async ({ commit, state, dispatch }: { commit: any, state: ApplicationState, dispatch: any }) => {
    const metaData = await dispatch('loadMetaData')
    const attributes:string[] = getAttributesfromMeta(metaData)
    const metaDataRefs = getRefsFromMeta(metaData)
    const query = buildExpandedAttributesQuery(metaDataRefs, attributes)
    const response = await api.get(`/api/data/${state.activeEntity}?${query}`)
    const tableData = response.items.map((responseItem: DataApiResponseItem) => {
      const row = responseItem.data
      return Object.keys(row).reduce((accum, key) => {
        const value = row[key]
        const isReference = (key : string) : boolean => Object.keys(metaDataRefs).includes(key)
        const isMref = (key: string) : boolean => metaDataRefs[key].fieldType.includes('MREF')
        let resolvedValue
        if (isReference(key)) {
          if (isMref(key)) {
            // The isMref already checks if the value.items is available
            // @ts-ignore
            resolvedValue = value.items.map((mrefValue) => mrefValue.data[metaDataRefs[key].labelAttribute]).join(', ')
          } else {
            // This is checked by isReference
            // @ts-ignore
            resolvedValue = value.data[metaDataRefs[key].labelAttribute]
          }
        } else {
          resolvedValue = value
        }
        accum[key] = resolvedValue
        return accum
      }, <StringMap>{})
    })
    response.items = tableData
    commit('setTableData', response)
  }
}
