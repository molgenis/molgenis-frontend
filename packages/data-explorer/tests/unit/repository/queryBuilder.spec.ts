import { buildExpandedAttributesQuery } from '@/repository/queryBuilder'
import { EntityMetaRefs } from '@/types/ApplicationState'

describe('metaDataService', () => {
  const metaRefs:EntityMetaRefs = {
    'reference': {
      refEntity: 'pkg_refTable',
      labelAttribute: 'label',
      fieldType: 'CATEGORICAL'
    },
    'multi_reference': {
      refEntity: 'pkg_anotherRefTable',
      labelAttribute: 'label',
      fieldType: 'CATEGORICAL_MREF'
    }
  }
  describe('buildExpandedAttributesQuery', () => {
    it('should build a query with expand and filter to get all attributes', () => {
      const expected = 'expand=reference,multi_reference&filter=id,reference(label),multi_reference(label)'
      const attributes = ['id', 'reference', 'multi_reference']
      const observed = buildExpandedAttributesQuery(metaRefs, attributes, true)
      expect(observed).toEqual(expected)
    })
  })
})
