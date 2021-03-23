import { buildExpandedAttributesQuery } from './queryBuilder'
import { getAttributesfromMeta } from './metaDataService'
import * as metaDataRepository from './metaDataRepository'
import { DataApiResponse, DataApiResponseItem, DataObject, isSingleRefValueObject, MRefValueObject, SingleRefValueObject, FileValueObject, isMRefValueObject, isFileValueObject, isRefValue } from '@/types/ApiResponse'
import { MetaData, Attribute, RefAttribute, isRefAttribute } from '@/types/MetaData'
import client from '@/lib/client'
import { encodeRsqlValue } from '@molgenis/rsql'
import { Pagination } from '@molgenis-ui/components-library'
import { Sort } from '@/types/Sort'

// maps api response to object with as key the name of the column and as value the label of the value or a list of labels for mrefs
const levelOneRowMapper = async (rowData: DataApiResponseItem, metaData: MetaData) => {
  const metadataAttributeMap: { [s: string]: Attribute } = metaData.attributes.reduce((accum: any, attr) => {
    accum[attr.name] = attr
    return accum
  }, {})

  const row: DataObject = rowData.data
  const result: any = {}
  const keys = Object.keys(row)

  for (let i = 0; i < keys.length; i++) {
    const columnKey = keys[i]
    const dataObjectValue = row[columnKey]
    const attributeMetadata = metadataAttributeMap[columnKey]
    let resolvedValue
    if (isRefAttribute(attributeMetadata) && (isSingleRefValueObject(dataObjectValue) || isMRefValueObject(dataObjectValue))) {
      if (isMRefValueObject(dataObjectValue)) {
        resolvedValue = await getMRefData(attributeMetadata, dataObjectValue)
      } else if (isFileValueObject(dataObjectValue)) {
        resolvedValue = getFileData(dataObjectValue)
      } else {
        resolvedValue = await getRefData(attributeMetadata, dataObjectValue)
      }
    } else {
      resolvedValue = dataObjectValue
    }
    result[columnKey] = resolvedValue
  }

  return result
}

const getMRefData = async (attributeMetadata: RefAttribute, value: MRefValueObject) => {
  const metaData = await metaDataRepository.fetchMetaDataByURL(attributeMetadata.refEntityType)

  return value.items.map((refValue) => {
    return toRefValueObject(refValue, metaData)
  })
}

const getRefData = async (attributeMetadata: RefAttribute, value: SingleRefValueObject) => {
  const metaData = await metaDataRepository.fetchMetaDataByURL(attributeMetadata.refEntityType)
  return toRefValueObject(value, metaData)
}

const getFileData = (value: FileValueObject) => {
  return {
    id: value.data.id,
    label: value.data.filename, // flip filename to label so each dataObject has label
    filename: value.data.filename,
    contentType: value.data.contentType,
    size: value.data.size,
    url: value.data.url
  }
}

const toRefValueObject = (value: DataApiResponseItem, metaData: MetaData) => {
  const id = value.data[metaData.idAttribute.name]
  const label = metaData.labelAttribute ? value.data[metaData.labelAttribute.name] : id
  return { id, label }
}

const apiResponseMapper = (rowData: DataApiResponseItem) => {
  return Object.keys(rowData.data).reduce((accum: { [s: string]: string | object | number | boolean }, key) => {
    const dataItem = rowData.data[key]
    if (isRefValue(dataItem)) {
      if (isMRefValueObject(dataItem)) {
        accum[key] = dataItem.items.map((item) => apiResponseMapper(item))
      } else if (isSingleRefValueObject(dataItem)) {
        accum[key] = apiResponseMapper(dataItem)
      }
      // Else it's a empty link ref, it has no data to map
      // example : {links: {self: "https://[server]/api/data/[tableId]/[rowId]/[columnName]"}}
      // Note: The empty link ref is added by the api to break infinite circular references
    } else {
      accum[key] = dataItem
    }
    return accum
  }, {})
}

const levelNRowMapper = (rowData: DataApiResponseItem) => {
  // check if mref
  if (isMRefValueObject(rowData)) {
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

const buildPageQuery = (pagination: Pagination | undefined) => {
  // (!) Adapt page to 0-based data-api page property.
  return pagination ? Object
    .entries({ page: pagination.page - 1, size: pagination.size })
    .map(([ k, v ]) => `${k}=${v}`)
    .join('&') + '&'
    : ''
}

const buildSortQuery = (sort?: Sort): string => {
  return sort && sort.sortColumnName !== null ? `&sort=${sort.isSortOrderReversed ? '-' : ''}${sort.sortColumnName}` : ''
}

const getTableDataDeepReference = async (
  tableId: string,
  metaData: MetaData,
  columns: string[],
  rsqlQuery?: string,
  pagination?: Pagination,
  sort?: Sort
) => {
  if (!columns.includes(metaData.idAttribute.name)) {
    columns.push(metaData.idAttribute.name)
  }

  if (metaData.labelAttribute !== undefined && !columns.includes(metaData.labelAttribute.name)) {
    columns.push(metaData.labelAttribute.name)
  }

  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, columns)

  const sortQuery = buildSortQuery(sort)
  const pageQuery = buildPageQuery(pagination)
  const request = addFilterIfSet(`/api/data/${tableId}?${pageQuery}${expandReferencesQuery}${sortQuery}`, rsqlQuery)
  const response = (await client.get<DataApiResponse>(request)).data

  const items = response.items.map((item: DataApiResponseItem) => levelNRowMapper(item))
  return { items, page: response.page }
}

const getTableDataWithLabel = async (
  tableId: string,
  metaData: MetaData,
  columns: string[],
  rsqlQuery?: string,
  pagination?: Pagination,
  sort?: Sort
) => {
  const columnSet = new Set([ ...columns ])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }

  const sortQuery = buildSortQuery(sort)
  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [ ...columnSet ])
  const pageQuery = buildPageQuery(pagination)
  const request = addFilterIfSet(`/api/data/${tableId}?${pageQuery}${expandReferencesQuery}${sortQuery}`, rsqlQuery)
  const response = (await client.get<DataApiResponse>(request)).data
  const items = await Promise.all(response.items.map(async (item: DataApiResponseItem) => {
    return levelOneRowMapper(item, metaData)
  }))

  return { items, page: response.page }
}

const getRowDataWithReferenceLabels = async (tableId: string, rowId: string, metaData: MetaData) => {
  const attributes: string[] = getAttributesfromMeta(metaData)
  // Todo: remove work around, needed as compounds are not passed by getAttributesfromMeta.
  // Adding id and label makes sure we get these fields.
  const columnSet = new Set([ ...attributes ])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }

  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [ ...columnSet ])
  const response = await client.get<DataApiResponseItem>(`/api/data/${tableId}/${rowId}?${expandReferencesQuery}`)
  return levelOneRowMapper(response.data, metaData)
}

const deleteRow = async (tableId: string, rowId: string) => {
  return client.delete(`/api/data/${tableId}/${rowId}`)
}

export {
  getTableDataDeepReference,
  getTableDataWithLabel,
  getRowDataWithReferenceLabels,
  deleteRow
}
