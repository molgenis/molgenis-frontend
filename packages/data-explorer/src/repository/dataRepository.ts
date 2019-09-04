
// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta, getRefsFromMeta } from './metaDataService'

import { DataApiResponseItem, MetaDataApiResponse } from '../types/ApiResponse'
import { StringMap } from '../types/GeneralTypes'
import { EntityMetaRefs, TableSetting } from '@/types/ApplicationState'

const levelOneRowMapper = (rowData: DataApiResponseItem, metaDataRefs: EntityMetaRefs) => {
  const row = rowData.data
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
}

const getTableDataWithReferenceFromConfig = async (tableId: string, metaData: MetaDataApiResponse, tableSetting: TableSetting) => {
  let attributes:string[] = tableSetting.customCardAttrs.split(',').map(attribute => attribute.trim())
  attributes.push('id')
  const metaDataRefs = getRefsFromMeta(metaData)
  const initialColumnIds = attributes
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, initialColumnIds)

  const response = await api.get(`/api/data/${tableId}?${expandReferencesQuery}`)
  const resolvedItems = response.items.map((item:any) => levelOneRowMapper(item, metaDataRefs))
  response.items = resolvedItems
  return response
}

const getTableDataWithReference = async (tableId: string, metaData: MetaDataApiResponse, numberOfInitialColumns: number) => {
  const attributes:string[] = getAttributesfromMeta(metaData)
  const metaDataRefs = getRefsFromMeta(metaData)
  const initialColumnIds = attributes.splice(0, numberOfInitialColumns)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, initialColumnIds)

  const response = await api.get(`/api/data/${tableId}?${expandReferencesQuery}`)
  const resolvedItems = response.items.map((item:any) => levelOneRowMapper(item, metaDataRefs))
  response.items = resolvedItems
  return response
}

const getRowDataWithReference = async (tableId: string, rowId: string, metaData: MetaDataApiResponse) => {
  const attributes:string[] = getAttributesfromMeta(metaData)
  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, attributes)
  const response = await api.get(`/api/data/${tableId}/${rowId}?${expandReferencesQuery}`)
  return levelOneRowMapper(response, metaDataRefs)
}

export {
  getTableDataWithReferenceFromConfig,
  getTableDataWithReference,
  getRowDataWithReference
}
