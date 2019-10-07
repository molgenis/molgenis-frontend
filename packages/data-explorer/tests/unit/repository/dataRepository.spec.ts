import * as dataRepository from '../../../src/repository/dataRepository'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

import meta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('dataRepository', () => {
  beforeEach(() => {
    api.get.mockReset()
  })

  describe('getRowDataWithReference', () => {
    it('should fetch the row data and transform the result', async () => {
      const tableId = 'books'
      const rowId = '101'
      api.get.mockResolvedValue(mockRowResponse)
      const resp = await dataRepository.getRowDataWithReferenceLabels(tableId, rowId, meta)
      expect(resp).toEqual({
        id: 1,
        label: 'my label row data'
      })
    })
  })

  describe('getTableDataWithLabel', () => {
    it('should fetch the table data and expand the query for the label data ', async () => {
      api.get.mockResolvedValue({ items: [
        mockRowResponse
      ] })
      await dataRepository.getTableDataWithLabel('tableId', meta, ['foo'])
      expect(api.get).toBeCalledWith('/api/data/tableId?expand=&filter=foo,id,label')
    })
  })
})
