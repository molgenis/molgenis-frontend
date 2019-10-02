// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta, getRefsFromMeta } from './metaDataService'

import { DataApiResponseItem, MetaDataApiResponse, DataApiResponse, DataObject } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'
import { EntityMetaRefs } from '@/types/ApplicationState'

// maps api response to object with as key the name of the column and as value the label of the value or a list of labels for mrefs
const levelOneRowMapper = (rowData: DataApiResponseItem, metaDataRefs: EntityMetaRefs): StringMap => {
  if (!rowData.data) {
    throw new Error('invalid input: row data must have data property')
  }
  const row: DataObject = rowData.data
  return Object.keys(row).reduce((accum, key) => {
    const value = row[key]
    const isReference = (key: string): boolean => Object.keys(metaDataRefs).includes(key)
    let resolvedValue
    if (isReference(key)) {
      // @ts-ignore
      if (value.items) {
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
  if (rowData.data) {
    const row: any = rowData.data
    return Object.keys(row).reduce((accum: { [s: string]: string | object }, key) => {
      // check if ref
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
}

const levelNRowMapper = (rowData: DataApiResponseItem) => {
  // check if mref
  if (rowData.items) {
    const rows: DataApiResponseItem[] = rowData.items
    return rows.map((rowData) => {
      return apiResponseMapper(rowData)
    })
  } else {
    return apiResponseMapper(rowData)
  }
}

const getTableDataDeepReference = async (tableId: string, metaData: MetaDataApiResponse, coloms: string[]) => {
  if (!coloms.includes(metaData.idAttribute)) coloms.push(metaData.idAttribute)
  if (!coloms.includes(metaData.labelAttribute)) coloms.push(metaData.labelAttribute)

  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, coloms, false)
  const response = await api.get(`/api/data/${tableId}?${expandReferencesQuery}`)
  response.items = response.items.map((item: DataApiResponseItem) => levelNRowMapper(item))
  return response
}

const getTableDataWithLabel = async (tableId: string, metaData: MetaDataApiResponse, columns: string[]) => {
  const columnSet = new Set([...columns])
  columnSet.add(metaData.idAttribute)
  columnSet.add(metaData.labelAttribute)

  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, [...columnSet], false)
  const response = await api.get(`/api/data/${tableId}?${expandReferencesQuery}`)
  response.items = response.items.map((item: DataApiResponseItem) => levelOneRowMapper(item, metaDataRefs))
  return response
}

// called on row expand
const getRowDataWithReferenceLabels = async (tableId: string, rowId: string, metaData: MetaDataApiResponse) => {
  const attributes: string[] = getAttributesfromMeta(metaData)
  // Todo: remove work around, needed as compounds are not pased by getAttributesfromMeta.
  // Addding id and label makes sure we get these fields.
  const columnSet = new Set([...attributes])
  columnSet.add(metaData.idAttribute)
  columnSet.add(metaData.labelAttribute)
  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, [...columnSet], true)
  const response = await api.get(`/api/data/${tableId}/${rowId}?${expandReferencesQuery}`)
  return levelOneRowMapper(response, metaDataRefs)
}

export {
  getTableDataDeepReference,
  getTableDataWithLabel,
  getRowDataWithReferenceLabels
}
