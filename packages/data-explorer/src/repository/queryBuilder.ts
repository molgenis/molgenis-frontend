import { MetaData } from '@/types/MetaData'
import { getAttributesfromMeta } from './metaDataService'

const buildExpandQuery = (metaData: MetaData, selectedAttributeNames:string[]) => {
  return metaData.attributes
    .filter(a => a.isReference)
    .filter(a => selectedAttributeNames.includes(a.name))
    .map(a => a.name)
    .join(',')
}

const buildExpandedAttributesQuery = (metaData: MetaData, attrs:string[]) => {
  if (!attrs.includes(metaData.idAttribute.name)) {
    attrs.push(metaData.idAttribute.name)
  }

  if (metaData.labelAttribute !== undefined && !attrs.includes(metaData.labelAttribute.name)) {
    attrs.push(metaData.labelAttribute.name)
  }
  const expand = buildExpandQuery(metaData, attrs)
  const filter = attrs.join(',')
  return `expand=${expand}&filter=${filter}`
}

const buildRowQuery = (metaData: MetaData, dataDisplayLimit?: Number) => {
  const attributes: string[] = getAttributesfromMeta(metaData)
  // Todo: remove work around, needed as compounds are not passed by getAttributesfromMeta.
  // Adding id and label makes sure we get these fields.
  const columnSet = new Set([...attributes])
  columnSet.add(metaData.idAttribute.name)
  if (metaData.labelAttribute !== undefined) {
    columnSet.add(metaData.labelAttribute.name)
  }
  const expandReferencesQuery = buildExpandedAttributesQuery(metaData, [...columnSet])
  const size = buildSizeQueryParam(dataDisplayLimit)
  return `${size}${expandReferencesQuery}`
}

const buildSizeQueryParam = (dataDisplayLimit?: Number) => {
  return typeof dataDisplayLimit === 'number' ? `size=${dataDisplayLimit}&` : ''
}

export {
  buildExpandedAttributesQuery,
  buildSizeQueryParam,
  buildRowQuery
}
