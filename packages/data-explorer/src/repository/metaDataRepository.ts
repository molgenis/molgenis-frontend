import client from '@/lib/client'
import { AxiosResponse } from 'axios'
import * as mapper from './metaDataResponseMapper'
import { ResponseEntityType } from '../types/EntityTypeV3'
import { MetaData } from '../types/MetaData'

const metaDataCache:{ [s: string]: MetaData } = {}
const metaDataCue: { [s: string]: Promise<AxiosResponse<ResponseEntityType>> } = {}

const mapAndStore = (entityId:string, response: AxiosResponse<ResponseEntityType>) => {
  const entityType = response.data
  const metadata = mapper.toMetaData(entityType)

  // Cache mapped response to improve speed
  metaDataCache[entityId] = metadata
  return metadata
}

const fetchMetaDataById = async (entityId: string): Promise<MetaData> => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }
  if (metaDataCue[entityId]) {
    return metaDataCue[entityId].then((result) => {
      if (metaDataCache[entityId]) {
        return metaDataCache[entityId]
      }
      return mapAndStore(entityId, result)
    })
  }

  const response = client.get<ResponseEntityType>(`/api/metadata/${entityId}`, {
    params: {
      flattenAttributes: true
    }
  })

  metaDataCue[entityId] = response
  const resolved = await response
  return mapAndStore(entityId, resolved)
}

const fetchMetaDataByURL = async (url: string): Promise<MetaData> => {
  // @ts-ignore
  return fetchMetaDataById(url.split('/').pop())
}

export {
  fetchMetaDataById,
  fetchMetaDataByURL
}
