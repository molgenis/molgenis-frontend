import * as dataRepository from '../../../src/repository/dataRepository'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

import meta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'
import tableDataResponseMock from '../mocks/tableDataResponseMock'
import complexRowDataResponseMock from '../mocks/complexRowDataResponseMock'
import complexRowLevelNMapperResponse from '../mocks/complexRowLevelNMapperResponse'
import getMappedDataMetaMock from '../mocks/getMappedDataMetaMock'
import getMappedDataResponseMock from '../mocks/getMappedDataResponseMock'
import getMappedDataResultLevel1 from '../mocks/getMappedDataResultLevel1'
import getMappedDataResultLevelN from '../mocks/getMappedDataResultLevelN'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))
describe('dataRepository', () => {
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
})
