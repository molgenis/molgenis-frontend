import { EntityMetaRefs } from '../types/ApplicationState'

const buildFilterQuery = (entityMetaRefs: EntityMetaRefs, attributes:string[]) => {
  const filterQuery = attributes.reduce((query: string, attribute: string) => {
    return entityMetaRefs[attribute] ? `${query},${attribute}(${entityMetaRefs[attribute].labelAttribute})` : `${query},${attribute}`
  }, <string>'').replace(',', '')
  return filterQuery
}

const buildExpandQuery = (entityMetaRefs: EntityMetaRefs, attributes:string[]) => {
  const expandQuery = attributes.reduce((query: string, attribute: string) => {
    return entityMetaRefs[attribute] ? `${query},${attribute}` : `${query}`
  }, <string>'').replace(',', '')
  return expandQuery
}

const buildExpandedAttributesQuery = (entityMetaRefs: EntityMetaRefs, attributes:string[]) => {
  const expand = buildExpandQuery(entityMetaRefs, attributes)
  const filter = buildFilterQuery(entityMetaRefs, attributes)
  return `expand=${expand}&filter=${filter}`
}

export {
  buildExpandedAttributesQuery
}
