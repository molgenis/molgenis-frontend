import { EntityMetaRefs } from '@/types/ApplicationState'
import { MetaDataAttribute, MetaDataApiResponse } from '@/types/ApiResponse'

const getRefsFromMeta = (meta: MetaDataApiResponse) => {
  return meta.attributes.reduce((refItems: EntityMetaRefs, attribute: MetaDataAttribute) => {
    if (attribute.refEntity) {
      refItems[attribute.name] = {
        refEntity: attribute.refEntity.name.toString(),
        fieldType: attribute.fieldType,
        labelAttribute: attribute.refEntity.labelAttribute.toString()
      }
    }
    return refItems
  }, <EntityMetaRefs>{})
}

const getAttributesfromMeta = (metaData: MetaDataApiResponse) => {
  return metaData.attributes
    .filter((attribute: MetaDataAttribute) => attribute.fieldType !== 'COMPOUND') // TODO:Compounds are out of scope for now because they will be treated differently in meta data api v3
    .map((attribute: MetaDataAttribute) => attribute.name)
}

export {
  getRefsFromMeta,
  getAttributesfromMeta
}
