import * as dataRepository from '../../../src/repository/dataRepository'
import { MetaData } from '@/types/MetaData'
import { buildExpandedAttributesQuery } from '@/repository/queryBuilder'

import mockmeta from '../mocks/metaDataResponseMock'
import mockRowResponse from '../mocks/rowDataResponseMock'
import { defaultPagination } from '@/store/state'
import client from '@/lib/client'

jest.mock('@/lib/client', () => ({
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
    client.get.mockReset()
  })

  describe('getRowDataWithReference', () => {
    it('should fetch the row data and transform the result', async () => {
      const tableId = 'books'
      const rowId = '101'
      // @ts-ignore
      client.get.mockResolvedValue({ data: mockRowResponse })
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
      client.get.mockResolvedValue({ data: { items: [
        mockRowResponse
      ] } })
      // @ts-ignore
      buildExpandedAttributesQuery.mockReturnValue('expanded-attributes-query')
    })

    it('should fetch the table data and expand the query for the label data ', async (done) => {
      await dataRepository.getTableDataWithLabel('tableId', mockmeta as MetaData, ['foo'])
      expect(client.get).toBeCalledWith('/api/data/tableId?expanded-attributes-query')
      done()
    })

    it('should url encode the filter values if needed ', async (done) => {
      await dataRepository.getTableDataWithLabel('tableId', mockmeta as MetaData, ['foo'], 'bloodtype=in=(A-,A+)')
      expect(client.get).toBeCalledWith('/api/data/tableId?expanded-attributes-query&q=bloodtype=in=(A-,A%2B)')
      done()
    })
  })

  describe('getTableDataDeepReference', () => {
    beforeEach(() => {
      // @ts-ignore
      client.get.mockResolvedValue({ data: { items: [
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
      const pagination = defaultPagination
      await dataRepository.getTableDataDeepReference(tableId, metaData, coloms, rsqlQuery, pagination)
      expect(client.get).toBeCalledWith('/api/data/tableId?size=10&page=1&expanded-attributes-query&q=rsqlQuery')
      done()
    })
  })

  describe('deleteRow', () => {
    it('should send delete request', async (done) => {
      await dataRepository.deleteRow('my-table', 'my-row')
      expect(client.delete).toBeCalledWith('/api/data/my-table/my-row')
      done()
    })
  })
})
