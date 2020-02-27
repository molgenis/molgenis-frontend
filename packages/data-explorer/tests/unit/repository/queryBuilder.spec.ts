import { buildExpandedAttributesQuery } from '@/repository/queryBuilder'
import meta from '../mocks/metaDataResponseMock'
import { MetaData } from '@/types/MetaData'

describe('metaDataService', () => {
  describe('buildExpandedAttributesQuery', () => {
    it('should build a query with expand and filter to get all attributes', () => {
      const expected = 'expand=&filter=id,reference,multi_reference'
      // TODO: should this function expand its variables again?
      // const expected = 'expand=reference,multi_reference&filter=id,reference(label),multi_reference(label)'
      const attributes = ['id', 'reference', 'multi_reference']
      const observed = buildExpandedAttributesQuery(meta as MetaData, attributes)
      expect(observed).toEqual(expected)
    })
  })
})
