import axios, { AxiosResponse } from 'axios'
import { EntityType } from '../types/MetaResponseV3'
import { MetaData } from '../types/MetaData'

const metaDataCache:{ [s: string]: EntityType } = {}

const fetchMetaData = async (entityId: string) => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }

  const response = await axios.get<EntityType>(`/api/metadata/${entityId}`)
  const entityType = response.data
  metaDataCache[entityId] = entityType
  return response.data
}

const map = (entityType: EntityType): MetaData => {
  if(!entityType.data) {
    throw "metadata response is missing expected data property"
  }
  const entityTypeData =  entityType.data

  if(entityTypeData.id === undefined || entityTypeData === null) {
    throw "metadata response is missing expected id property"
  }
  
  return {
    id: entityTypeData.id
  package: entityTypeData.package, // url
  extends?: MetaData,
  description: string,
  label: string,
  abstract: boolean,
  attributes: Attribute[]
  }
}

export {
  fetchMetaData
}
