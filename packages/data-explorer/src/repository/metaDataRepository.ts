/* eslint-disable object-curly-spacing */
import axios, { AxiosResponse } from 'axios'
import * as mapper from './metaDataResponseMapper'
import { ResponseEntityType } from '../types/EntityTypeV3'
import { MetaData } from '../types/MetaData'

const metaDataCache:{ [s: string]: MetaData } = {}

const fetchMetaData = async (entityId: string) => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }

  const response = await axios.get<ResponseEntityType>(`/api/metadata/${entityId}`)
  const entityType = response.data
  const metadata = mapper.toMetaData(entityType)
  metaDataCache[entityId] = metadata
  return response.data
}

export {
  fetchMetaData
}
