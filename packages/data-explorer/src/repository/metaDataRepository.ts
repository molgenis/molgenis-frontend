import axios from 'axios'
import { MetaDataApiResponseAttributes } from '@/types/ApiResponse'

const metaDataCache: { [s: string]: MetaDataApiResponseAttributes } = {}

// Todo placeholder until we have a metadataApi
const fetchMetaData = async (entityId: string) => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }

  const response = <MetaDataApiResponseAttributes> await axios.get(`/api/metadata/${entityId}`)
  metaDataCache[entityId] = response
  return response
}

export {
  fetchMetaData
}
