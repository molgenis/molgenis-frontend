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
  describe('levelNRowMapper', () => {
    it('should remove items & data attributes', async () => {
      expect(dataRepository.levelNRowMapper(complexRowDataResponseMock)).toEqual(complexRowLevelNMapperResponse)
    })
  })

  describe('getMappedData', () => {
    it('should remap data to remove "data" and "items" attributes 1 level deep', () => {
      expect(
        dataRepository.getMappedData(getMappedDataResponseMock, getMappedDataMetaMock, false)
      ).toEqual(
        getMappedDataResultLevel1.items
      )
    })
    it('should remap data to remove "data" and "items" attributes multiple levels deep', () => {
      expect(
        dataRepository.getMappedData(getMappedDataResponseMock, getMappedDataMetaMock, true)
      ).toEqual(
        getMappedDataResultLevelN.items
      )
    })
  })

  describe('getTableDataWithReference', () => {
    api.get.mockResolvedValue(tableDataResponseMock)
    it('should prepare data to be used', async () => {
      const response = await dataRepository.getTableDataWithReference('id', meta,
        {
          settingsTable: '',
          customCardCode: '',
          customCardAttrs: '',
          settingsRowId: 'id',
          collapseLimit: 5,
          isShop: true
        }, false)
      expect(response.items[0]).toEqual({
        id: 1,
        label: 'my label table data'
      })
    })
  })

  describe('getRowDataWithReference', () => {
    it('should fetch the row data and transform the result', async () => {
      const tableId = 'books'
      const rowId = '101'
      api.get.mockResolvedValue(mockRowResponse)
      const resp = await dataRepository.getRowDataWithReference(tableId, rowId, meta)
      expect(resp).toEqual({
        id: 1,
        label: 'my label row data'
      })
    })
  })
})
