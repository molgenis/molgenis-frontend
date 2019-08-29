import * as dataRepository from '../../../src/repository/dataRepository'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

import meta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('dataRepository', () => {
  describe('getRowDataWithReference', () => {
    const tableId = 'books'
    const rowId = '101'

    api.get.mockResolvedValue(mockRowResponse)

    it('should fetch the row data and transform the result', async () => {
      const resp = await dataRepository.getRowDataWithReference(tableId, rowId, meta)
      expect(resp).toEqual({
        id: 1,
        label: 'my label'
      })
    })
  })
})
