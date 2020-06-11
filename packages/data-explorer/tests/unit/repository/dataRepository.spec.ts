import * as dataRepository from '../../../src/repository/dataRepository'
import { MetaData } from '@/types/MetaData'
import { buildExpandedAttributesQuery } from '@/repository/queryBuilder'

import mockmeta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'

import api from '@/lib/api'

jest.mock('@/lib/api', () => ({
  delete: jest.fn(),
  get: jest.fn()
}))

jest.mock('@/repository/metaDataRepository', () => ({
  fetchMetaDataByURL: () => { return { data: mockmeta, ...mockmeta } }
}))

jest.mock('@/repository/queryBuilder', () => ({
  buildExpandedAttributesQuery: jest.fn()
}))

describe('dataRepository', () => {
  beforeEach(() => {
    // @ts-ignore
    api.get.mockReset()
  })

  describe('getRowDataWithReference', () => {
    it('should fetch the row data and transform the result', async () => {
      const tableId = 'books'
      const rowId = '101'
      // @ts-ignore
      api.get.mockResolvedValue({ data: mockRowResponse })
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
      api.get.mockResolvedValue({ data: { items: [
        mockRowResponse
      ] } })
      // @ts-ignore
      buildExpandedAttributesQuery.mockReturnValue('expanded-attributes-query')
    })

    it('should fetch the table data and expand the query for the label data ', async (done) => {
      await dataRepository.getTableDataWithLabel('tableId', mockmeta as MetaData, ['foo'])
      expect(api.get).toBeCalledWith('/api/data/tableId?expanded-attributes-query')
      done()
    })

    it('should url encode the filter values if needed ', async (done) => {
      await dataRepository.getTableDataWithLabel('tableId', mockmeta as MetaData, ['foo'], 'bloodtype=in=(A-,A+)')
      expect(api.get).toBeCalledWith('/api/data/tableId?expanded-attributes-query&q=bloodtype=in=(A-,A%2B)')
      done()
    })
  })

  describe('getTableDataDeepReference', () => {
    beforeEach(() => {
      // @ts-ignore
      api.get.mockResolvedValue({ data: { items: [
        mockRowResponse
      ] } })
      // @ts-ignore
      buildExpandedAttributesQuery.mockReturnValue('expanded-attributes-query')
    })

    it('should build query with deep ref', async (done) => {
      const tableId = 'tableId'
      const metaData = mockmeta as MetaData
      const coloms = ['foo']
      const rsqlQuery = 'rsqlQuery'
      const dataDisplayLimit = 10
      await dataRepository.getTableDataDeepReference(tableId, metaData, coloms, rsqlQuery, dataDisplayLimit)
      expect(api.get).toBeCalledWith('/api/data/tableId?size=10&expanded-attributes-query&q=rsqlQuery')
      done()
    })
  })

  describe('deleteRow', () => {
    it('should send delete request', async (done) => {
      await dataRepository.deleteRow('my-table', 'my-row')
      expect(api.delete).toBeCalledWith('/api/data/my-table/my-row')
      done()
    })
  })
})
