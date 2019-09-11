
// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta, getRefsFromMeta } from './metaDataService'

import { DataApiResponseItem, MetaDataApiResponse, DataApiResponse } from '../types/ApiResponse'
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

const apiResponseMapper = (rowData: DataApiResponseItem) => {
  const row = rowData.data
  return Object.keys(row).reduce((accum:{[s: string]: string|object}, key) => {
    if (typeof row[key] === 'object') {
      // This is checked by the line above
      // @ts-ignore
      accum[key] = levelNRowMapper(row[key])
    } else {
      accum[key] = row[key]
    }
    return accum
  }, {})
}

const levelNRowMapper = (rowData: DataApiResponseItem) => {
  if (rowData.items) {
    const rows: [] = rowData.items
    return rows.map((rowData) => {
      return apiResponseMapper(rowData)
    })
  } else {
    return apiResponseMapper(rowData)
  }
}

const getTableDataWithReference = async (tableId: string, metaData: MetaDataApiResponse, tableSetting: TableSetting, isCustomCard:boolean) => {
  let attributes:string[]
  if (isCustomCard) {
    attributes = tableSetting.customCardAttrs.split(',').map(attribute => attribute.trim())
  } else {
    attributes = getAttributesfromMeta(metaData).splice(0, tableSetting.collapseLimit)
  }
  if (!attributes.includes(metaData.idAttribute)) attributes.push(metaData.idAttribute)
  if (!attributes.includes(metaData.labelAttribute)) attributes.push(metaData.labelAttribute)

  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, attributes, !isCustomCard)
  const response = await api.get(`/api/data/${tableId}?${expandReferencesQuery}`)
  response.items = getMappedData(response, metaDataRefs, isCustomCard)
  return response
}

const getMappedData = (response: any, metaDataRefs: any, isCustomCard: boolean) => {
  if (!isCustomCard) {
    return response.items.map((item:DataApiResponseItem) => levelOneRowMapper(item, metaDataRefs))
  } else {
    return response.items.map((item:DataApiResponseItem) => levelNRowMapper(item))
  }
}

const getRowDataWithReference = async (tableId: string, rowId: string, metaData: MetaDataApiResponse) => {
  const attributes:string[] = getAttributesfromMeta(metaData)
  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, attributes, true)
  const response = await api.get(`/api/data/${tableId}/${rowId}?${expandReferencesQuery}`)
  return levelOneRowMapper(response, metaDataRefs)
}

export {
  getTableDataWithReference,
  getRowDataWithReference,
  levelNRowMapper,
  getMappedData
}
