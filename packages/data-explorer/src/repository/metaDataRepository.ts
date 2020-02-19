/* eslint-disable object-curly-spacing */
import axios, { AxiosResponse } from 'axios'
import * as mapper from './metaDataResponseMapper'
import { ResponseEntityType } from '../types/EntityTypeV3'
import { MetaData } from '../types/MetaData'

const metaDataCache:{ [s: string]: MetaData } = {}

const fetchMetaDataById = async (entityId: string): Promise<MetaData> => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }

  const response = await axios.get<ResponseEntityType>(`/api/metadata/${entityId}`, {
    params: {
      flattenAttributes: true
    }
  })
  const entityType = response.data
  const metadata = mapper.toMetaData(entityType)

  // Cache mapped response to improve speed
  metaDataCache[entityId] = metadata
  return metadata
}

const fetchMetaDataByURL = async (url: string): Promise<MetaData> => {
  // TODO: refactor to use url, note shared cache
  // @ts-ignore
  return fetchMetaDataById(url.split('/').pop())
}

export {
  fetchMetaDataById,
  fetchMetaDataByURL
}
