// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import ApplicationState, {EntityMetaRefs} from '@/types/ApplicationState'
import {tryAction} from './helpers'
import {filterQueryGenerator, expandQueryGenerator} from '@/utils/QueryBuilder'
import {DataApiResponseItem, MetaDataAttribute} from "@/types/ApiResponse"
import {StringMap} from "@/types/GeneralTypes";

const getRefsFromMeta = (meta: any) => {
  return meta.attributes.reduce((refItems: EntityMetaRefs, attribute: MetaDataAttribute) => {
    if (attribute.refEntity) {
      refItems[attribute.name] = {
        refEntity: attribute.refEntity.name.toString(),
        fieldType: attribute.fieldType,
        labelAttribute: attribute.refEntity.labelAttribute.toString()
      }
    }
    return refItems
  }, <EntityMetaRefs>{})
}

export default {
  loadEntity: tryAction(async ({commit, state}: { commit: any, state: ApplicationState }) => {
    const response = await api.get(`/api/data/${state.activeEntity}`)
    commit('setEntityData', response)
  }),
  loadMetaData: tryAction(async ({commit, state}: { commit: any, state: ApplicationState }) => {
    const response = await api.get(`/api/v2/${state.activeEntity}`)
    commit('setMetaData', response.meta)
    return response.meta
  }),
  loadDefaultEntityData: tryAction(async ({commit, state}: { commit: any, state: ApplicationState },
                                          payload: { expandAndFilter: string }) => {

    const response = await api.get(`/api/data/${state.activeEntity}?${payload.expandAndFilter}`)
    commit('setDefaultEntityData', response.items)
  }),
  getTableSettings: tryAction(async ({commit, state}: { commit: any, state: ApplicationState },
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
  getTableData: (async ({commit, state, dispatch}: { commit: any, state: ApplicationState, dispatch: any }) => {
    const metaData = await dispatch('loadMetaData')
    const attributes = metaData.attributes
      .filter((attribute: MetaDataAttribute) => attribute.fieldType !== 'COMPOUND') // TODO:Compounds are out of scope for now because they will be treated differently in meta data api v3
      .slice(0, 10) // TODO:We only get the first ten because otherwise the URL will get too big with the expand and filter
      .map((attribute: MetaDataAttribute) => attribute.name)
    const metaDataRefs = getRefsFromMeta(metaData)
    const expand = expandQueryGenerator(metaDataRefs, attributes)
    const filter = filterQueryGenerator(metaDataRefs, attributes)
    const query = `expand=${expand}&filter=${filter}`
    const response = await api.get(`/api/data/${state.activeEntity}?${query}`)
    const tableData = response.items.map((responseItem: DataApiResponseItem) => {
      const row = responseItem.data
      return Object.keys(row).reduce((accum, key) => {
        const value = row[key]
        const isReference = (key : string) : boolean => Object.keys(metaDataRefs).includes(key)
        const isMref = (key: string) : boolean => metaDataRefs[key].fieldType.includes('MREF')
        let resolvedValue;
        if (isReference(key)) {
          if (isMref(key)) {
            resolvedValue =  value.items.map((mrefValue) => mrefValue.data[metaDataRefs[key].labelAttribute]).join(', ')
          } else {
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

  })
}
