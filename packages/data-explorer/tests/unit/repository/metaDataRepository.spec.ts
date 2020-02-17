import * as metaDataRepository from '../../../src/repository/metaDataRepository'
import * as metaDataResponseMapper from '../../../src/repository/metaDataResponseMapper'
import axios from 'axios'

jest.mock('axios', () => ({
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
    axios.get.mockResolvedValue(mockResponse)
    // @ts-ignore
    metaDataResponseMapper.toMetaData.mockReturnValue({
      meta: 'meta'
    })

    it('should fetch the meta data', async () => {
      const resp = await metaDataRepository.fetchMetaData(tableId)
      expect(resp).toEqual(mockResponse.data)
      expect(axios.get).toHaveBeenCalled()
    })

    it('should cache the results and use the cache', async () => {
      await metaDataRepository.fetchMetaData(tableId)
      const resp = await metaDataRepository.fetchMetaData(tableId)
      expect(resp).toEqual(mockResponse.data)
      expect(axios.get).toHaveBeenCalledTimes(1)
    })
  })
})
