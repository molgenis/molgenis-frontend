// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta, getRefsFromMeta } from './metaDataService'

import { MetaDataApiResponse } from '@/types/ApiResponse'
import { EntityMetaRefs } from '@/types/ApplicationState'
import { ResourceCollection } from '@/types/ResourceCollection'
import { Resource } from '@/types/Resource'

const getReferenceLabel = (itemKey: string, reference: Resource, metaDataRefs: EntityMetaRefs) => {
  return reference.data ? reference.data[metaDataRefs[itemKey].labelAttribute] : ''
}

const getReferenceCollectionLabel = (itemKey: string, references: ResourceCollection, metaDataRefs: EntityMetaRefs) => {
  return references.items
    .map((mrefValue) => getReferenceLabel(itemKey, mrefValue, metaDataRefs))
    .join(', ')
}

// maps api response to object with as key the name of the column and as value the label of the value or a list of labels for mrefs
const levelOneRowMapper = (rowData: Resource, metaDataRefs: EntityMetaRefs) => {
  if(!rowData.data) {
    return
  }
  const row = rowData.data
  return Object.keys(row).reduce((accum, key) => {
    const value = row[key]
    let resolvedValue
    if ((value as Resource).data) {
      resolvedValue = getReferenceLabel(key, (value as Resource), metaDataRefs)
    } else if ((value as ResourceCollection).items) {
      resolvedValue = getReferenceCollectionLabel(key, (value as ResourceCollection), metaDataRefs) // (value as ResourceCollection).items.map((mrefValue) => mrefValue.data[metaDataRefs[key].labelAttribute]).join(', ')
    } else {
      resolvedValue = value
    }

    accum[key] = resolvedValue
    return accum
  }, <Record<string, string | number | boolean | object | null >>{})
}

const apiResponseMapper = (rowData: Resource) => {
  if (!rowData.data) {
    return
  }
  const row: any = rowData.data
  return Object.keys(row).reduce((accum: { [s: string]: string | object| undefined }, key) => {
    // check if ref
    if (typeof row[key] === 'object') {
      accum[key] = levelNRowMapper(row[key])
    } else {
      accum[key] = row[key]
    }
    return accum
  }, {})
}

const levelNRowMapper = (rowData: ResourceCollection | Resource) => {
  if ('items' in rowData) {
    const rows = rowData.items
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
  response.items = response.items.map((item: Resource) => levelNRowMapper(item))
  return response
}

const getTableDataWithLabel = async (tableId: string, metaData: MetaDataApiResponse, columns: string[]) => {
  const columnSet = new Set([...columns])
  columnSet.add(metaData.idAttribute)
  columnSet.add(metaData.labelAttribute)

  const metaDataRefs = getRefsFromMeta(metaData)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaDataRefs, [...columnSet], false)
  const response = await api.get(`/api/data/${tableId}?${expandReferencesQuery}`)
  response.items = response.items.map((item: Resource) => levelOneRowMapper(item, metaDataRefs))
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
