import { MetaData } from '@/types/MetaData'

const buildExpandQuery = (metaData: MetaData, selectedAttributeNames:string[]) => {
  return metaData.attributes
    .filter(a => a.isReference)
    .filter(a => selectedAttributeNames.includes(a.name))
    .map(a => a.name)
    .join(',')
}

const buildExpandedAttributesQuery = (metaData: MetaData, selectedAttributeNames:string[]) => {
  const expand = buildExpandQuery(metaData, selectedAttributeNames)
  const filter = selectedAttributeNames.join(',')
  return `expand=${expand}&filter=${filter}`
}

export {
  buildExpandedAttributesQuery
}
