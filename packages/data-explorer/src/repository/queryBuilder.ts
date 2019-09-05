import { EntityMetaRefs } from '../types/ApplicationState'

const buildFilterQuery = (entityMetaRefs: EntityMetaRefs, attributes:string[], useMetaRefs:boolean) => {
  const filterQuery = attributes.reduce((query: string, attribute: string) => {
    const metaRefs = useMetaRefs && entityMetaRefs[attribute] ? `(${entityMetaRefs[attribute].labelAttribute})` : ''
    return `${query},${attribute}${metaRefs}`
  }, <string>'').replace(',', '')
  return filterQuery
}

const buildExpandQuery = (entityMetaRefs: EntityMetaRefs, attributes:string[]) => {
  const expandQuery = attributes.reduce((query: string, attribute: string) => {
    return entityMetaRefs[attribute] ? `${query},${attribute}` : `${query}`
  }, <string>'').replace(',', '')
  return expandQuery
}

const buildExpandedAttributesQuery = (entityMetaRefs: EntityMetaRefs, attributes:string[], useMetaRefs:boolean) => {
  const expand = buildExpandQuery(entityMetaRefs, attributes)
  const filter = buildFilterQuery(entityMetaRefs, attributes, useMetaRefs)
  return `expand=${expand}&filter=${filter}`
}

export {
  buildExpandedAttributesQuery
}
