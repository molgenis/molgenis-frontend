import * as dataRepository from '../../../src/repository/dataRepository'
import { MetaData } from '@/types/MetaData'

import mockmeta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'

import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn()
}))

jest.mock('@/repository/metaDataRepository', () => ({
  fetchMetaDataByURL: () => { return { data: mockmeta, ...mockmeta } }
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
      const resp = await dataRepository.getRowDataWithReferenceLabels(tableId, rowId, mockmeta as MetaData)
      expect(resp).toEqual({
        country: 'label',
        id: 1,
        label: 'my label row data'
      })
    })
  })

  describe('getTableDataWithLabel', () => {
    beforeEach(() => {
      // @ts-ignore
      axios.get.mockResolvedValue({ data: { items: [
        mockRowResponse
      ] } })
    })

    it('should fetch the table data and expand the query for the label data ', async (done) => {
      await dataRepository.getTableDataWithLabel('tableId', mockmeta as MetaData, ['foo'])
      expect(axios.get).toBeCalledWith('/api/data/tableId?expand=&filter=foo,id,label')
      done()
    })

    it('should url encode the filter values if needed ', async (done) => {
      await dataRepository.getTableDataWithLabel('tableId', mockmeta as MetaData, ['foo'], 'bloodtype=in=(A-,A+)')
      expect(axios.get).toBeCalledWith('/api/data/tableId?expand=&filter=foo,id,label&q=bloodtype=in=(A-,A%2B)')
      done()
    })
  })

  describe('deleteRow', () => {
    it('should send delete request', async (done) => {
      await dataRepository.deleteRow('my-table', 'my-row')
      expect(axios.delete).toBeCalledWith('/api/data/my-table/my-row')
      done()
    })
  })
})
