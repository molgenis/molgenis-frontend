// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { StringMap } from '../types/GeneralTypes'

const metaDataCache:StringMap = {}

// Todo placeholder until we have a metadataApi
const fetchMetaData = async (entityId: string) => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }

  const resp = await api.get(`/api/v2/${entityId}?num=0`)
  metaDataCache[entityId] = resp.meta
  return resp.meta
}

export {
  fetchMetaData
}
