import * as metaDataRepository from '../../../src/repository/metaDataRepository'
import * as metaDataResponseMapper from '../../../src/repository/metaDataResponseMapper'
import client from '@/lib/client'

jest.mock('@/lib/client', () => ({
  get: jest.fn()
}))

jest.mock('../../../src/repository/metaDataResponseMapper', () => ({
  toMetaData: jest.fn()
}))

describe('metaDataRepository', () => {
  const mockResponse = {
    data: {
      meta: 'meta'
    }
  }

  describe('fetchMetaData', () => {
    const tableId = 'books'

    // @ts-ignore
    client.get.mockResolvedValue(mockResponse)
    // @ts-ignore
    metaDataResponseMapper.toMetaData.mockReturnValue({
      meta: 'meta'
    })

    it('should fetch the meta data', async () => {
      const resp = await metaDataRepository.fetchMetaDataById(tableId)
      expect(resp).toEqual(mockResponse.data)
      expect(client.get).toHaveBeenCalled()
    })

    it('should cache the results and use the cache', async () => {
      await metaDataRepository.fetchMetaDataById(tableId)
      const resp = await metaDataRepository.fetchMetaDataById(tableId)
      expect(resp).toEqual(mockResponse.data)
      expect(client.get).toHaveBeenCalledTimes(1)
    })
  })
})
