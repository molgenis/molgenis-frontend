import * as dataRepository from '../../../src/repository/dataRepository'
import { MetaData } from '@/types/MetaData'

import meta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'

import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('dataRepository', () => {
  beforeEach(() => {
    // @ts-ignore
    axios.get.mockReset()
  })

  describe('getRowDataWithReference', () => {
    it('should fetch the row data and transform the result', async () => {
      const tableId = 'books'
      const rowId = '101'
      // @ts-ignore
      axios.get.mockResolvedValue({ data: mockRowResponse })
      meta.attributes[2].isReference = false
      meta.attributes[3].isReference = false
      const resp = await dataRepository.getRowDataWithReferenceLabels(tableId, rowId, meta as MetaData)
      expect(resp).toEqual({
        country: 'item',
        id: 1,
        label: 'my label row data'
      })
    })
  })

  describe('getTableDataWithLabel', () => {
    it('should fetch the table data and expand the query for the label data ', async () => {
      // @ts-ignore
      axios.get.mockResolvedValue({ data: { items: [
        mockRowResponse
      ] } })
      await dataRepository.getTableDataWithLabel('tableId', meta as MetaData, ['foo'])
      expect(axios.get).toBeCalledWith('/api/data/tableId?expand=&filter=foo,id,label')
    })
  })
})
