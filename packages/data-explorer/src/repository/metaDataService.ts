import { MetaData } from '@/types/MetaData'

const getAttributesfromMeta = (metaData: MetaData) => {
  return metaData.attributes
    .filter((attribute) => attribute.type !== 'compound') // TODO:Compounds are out of scope for now because they will be treated differently in meta data api v3
    .map((attribute) => attribute.name)
}

export {
  getAttributesfromMeta
}
