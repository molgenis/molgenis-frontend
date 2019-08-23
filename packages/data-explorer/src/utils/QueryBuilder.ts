import {EntityMetaRefs} from '../types/ApplicationState'

export const filterQueryGenerator = (entityMetaRefs: EntityMetaRefs, attributes:string[]) => {
  const filterQuery = attributes.reduce((query: string, attribute: string) => {
    return entityMetaRefs[attribute] ? `${query},${attribute}(${entityMetaRefs[attribute].labelAttribute})` : `${query},${attribute}`
  }, <string>'').replace(',', '')
  return filterQuery
}

export const expandQueryGenerator = (entityMetaRefs: EntityMetaRefs, attributes:string[]) => {
  console.log(attributes)
  const expandQuery = attributes.reduce((query: string, attribute: string) => {
    console.log(attribute, query)
    return entityMetaRefs[attribute] ? `${query},${attribute}` : `${query}`
  }, <string>'').replace(',', '')
  return expandQuery
}
