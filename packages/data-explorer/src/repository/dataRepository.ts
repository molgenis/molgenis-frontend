import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta } from './metaDataService'
import * as metaDataRepository from './metaDataRepository'
import { DataApiResponse, DataApiResponseItem, DataObject } from '@/types/ApiResponse'
import { MetaData, Attribute } from '@/types/MetaData'
import axios from 'axios'
import { encodeRsqlValue } from '@molgenis/rsql'

// maps api response to object with as key the name of the column and as value the label of the value or a list of labels for mrefs
const levelOneRowMapper = async (rowData: DataApiResponseItem, metaData: MetaData) => {
  if (!rowData.data) {
    throw new Error('invalid input: row data must have data property')
  }

  const metadataAttributeMap: {[s: string]: Attribute} = metaData.attributes.reduce((accum:any, attr) => {
    accum[attr.name] = attr
    return accum
  }, {})

  const row: DataObject = rowData.data
  let result:any = {}
  let keys = Object.keys(row)

  for (let i = 0; i < keys.length; i++) {
    const columnKey = keys[i]
    const value = row[columnKey]
    const attributeMetadata = metadataAttributeMap[columnKey]
    const isReference = attributeMetadata.isReference
    let resolvedValue
    if (isReference && attributeMetadata.refEntityType) {
      // @ts-ignore
      if (value.items) {
        resolvedValue = await getMrefLabel(attributeMetadata, value)
      } else {
        resolvedValue = await getRefLabel(attributeMetadata, value)
      }
    } else {
      resolvedValue = value
    }
    result[columnKey] = resolvedValue
  }

  return result
}

const getMrefLabel = async (attributeMetadata: Attribute, rowDataItem:any) => {
  // The isMref already checks if the value.items is available
  // @ts-ignore
  const refMetadata = await metaDataRepository.fetchMetaDataByURL(attributeMetadata.refEntityType)
  // @ts-ignore
  const resolvedValue = rowDataItem.items.map((mrefValue) => mrefValue.data[refMetadata.labelAttribute.name]).join(', ')
  return resolvedValue
}

const getRefLabel = async (attributeMetadata: Attribute, rowDataItem:any) => {
  // This is checked by isReference
  // @ts-ignore
  const refMetadata = await metaDataRepository.fetchMetaDataByURL(attributeMetadata.refEntityType)
  // @ts-ignore
  const resolvedValue = rowDataItem.data[refMetadata.labelAttribute.name]
  return resolvedValue
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

const addFilterIfSet = (request: string, rsqlFilter?: string): string => {
  return rsqlFilter ? `${request}&q=${encodeRsqlValue(rsqlFilter)}` : request
}

const _buildSizeQueryParam = (dataDisplayLimit?: number) => {
  return typeof dataDisplayLimit === 'number' ? `size=${dataDisplayLimit}&` : ''
}

const getTableDataDeepReference = async (
  tableId: string,
  metaData: MetaData,
  coloms: string[],
  rsqlQuery?: string,
  dataDisplayLimit?: number
) => {
  if (!coloms.includes(metaData.idAttribute.name)) {
    coloms.push(metaData.idAttribute.name)
  }

  if (metaData.labelAttribute !== undefined && !coloms.includes(metaData.labelAttribute.name)) {
    coloms.push(metaData.labelAttribute.name)
  }

  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, coloms)
  const size = _buildSizeQueryParam(dataDisplayLimit)
  const request = addFilterIfSet(`/api/data/${tableId}?${size}${expandReferencesQuery}`, rsqlQuery)
  const response = (await axios.get<DataApiResponse>(request)).data
  const result = { items: response.items.map((item: DataApiResponseItem) => levelNRowMapper(item)) }
  return result
}

const getTableDataWithLabel = async (tableId: string, metaData: MetaData, columns: string[], rsqlQuery?: string, dataDisplayLimit?: number) => {
  const columnSet = new Set([...columns])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }

  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [...columnSet])
  const size = _buildSizeQueryParam(dataDisplayLimit)
  const request = addFilterIfSet(`/api/data/${tableId}?${size}${expandReferencesQuery}`, rsqlQuery)
  const response = (await axios.get<DataApiResponse>(request)).data
  const result = { items: await Promise.all(response.items.map(async (item: DataApiResponseItem) => {
    return levelOneRowMapper(item, metaData)
  })) }
  return result
}

// called on row expand
const getRowDataWithReferenceLabels = async (tableId: string, rowId: string, metaData: MetaData, dataDisplayLimit?: number) => {
  const attributes: string[] = getAttributesfromMeta(metaData)
  // Todo: remove work around, needed as compounds are not passed by getAttributesfromMeta.
  // Adding id and label makes sure we get these fields.
  const columnSet = new Set([...attributes])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }
  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [...columnSet])
  const size = _buildSizeQueryParam(dataDisplayLimit)
  const response = await axios.get<DataApiResponse>(`/api/data/${tableId}/${rowId}?${size}${expandReferencesQuery}`)
  return levelOneRowMapper(response.data, metaData)
}

const deleteRow = async (tableId: string, rowId: string) => {
  return axios.delete(`/api/data/${tableId}/${rowId}`)
}

export {
  getTableDataDeepReference,
  getTableDataWithLabel,
  getRowDataWithReferenceLabels,
  deleteRow
}
