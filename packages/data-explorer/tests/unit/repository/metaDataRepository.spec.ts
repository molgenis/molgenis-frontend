import * as metaDataRepository from '../../../src/repository/metaDataRepository'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('metaDataRepository', () => {
  const mockResponse = {
    meta: {
      meta: 'data'
    }
  }

  describe('fetchMetaData', () => {
    const tableId = 'books'

    api.get.mockResolvedValue(mockResponse)

    it('should fetch the meta data', async () => {
      const resp = await metaDataRepository.fetchMetaData(tableId)
      expect(resp).toEqual(mockResponse.meta)
      expect(api.get).toHaveBeenCalled()
    })

    it('should cache the results and use the cache', async () => {
      let resp = await metaDataRepository.fetchMetaData(tableId)
      resp = await metaDataRepository.fetchMetaData(tableId)
      expect(resp).toEqual(mockResponse.meta)
      expect(api.get).toHaveBeenCalledTimes(1)
    })
  })
})
