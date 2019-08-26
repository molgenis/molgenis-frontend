import { getRefsFromMeta, getAttributesfromMeta } from '@/repository/metaDataService'
import { MetaDataApiResponse } from '@/types/ApiResponse'

describe('metaDataService', () => {
  const meta:MetaDataApiResponse = {
    href: 'blaat',
    hrefCollection: 'collection',
    name: 'table',
    label: 'Table',
    labelAttribute: 'id',
    idAttribute: 'id',
    description: 'description',
    lookupAttributes: ['id'],
    isAbstract: false,
    writable: true,
    permissions: [],
    languageCode: 'en',
    attributes: [
      {
        href: 'https://someurl.nl/api',
        name: 'id',
        nillable: false,
        readOnly: false,
        label: 'id',
        fieldType: 'STRING',
        unique: true,
        auto: true,
        labelAttribute: true,
        visible: true,
        lookupAttribute: true,
        isAggregatable: false
      },
      {
        href: 'https://someurl.nl/api',
        name: 'reference',
        label: 'reference',
        nillable: false,
        readOnly: false,
        refEntity: {
          name: 'pkg_refTable',
          labelAttribute: 'label'
        },
        fieldType: 'CATEGORICAL',
        unique: false,
        auto: false,
        labelAttribute: false,
        visible: true,
        lookupAttribute: false,
        isAggregatable: false
      },
      {
        href: 'https://someurl.nl/api',
        name: 'multi_reference',
        label: 'multi reference',
        nillable: false,
        readOnly: false,
        refEntity: {
          name: 'pkg_anotherRefTable',
          labelAttribute: 'label'
        },
        fieldType: 'CATEGORICAL_MREF',
        unique: false,
        auto: false,
        labelAttribute: false,
        visible: true,
        lookupAttribute: false,
        isAggregatable: false
      }
    ]
  }
  describe('getRefsFromMeta', () => {
    it('should convert meta data structure to object of references', () => {
      const expected = {
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

      const observed = getRefsFromMeta(meta)
      expect(observed).toEqual(expected)
    })
  })
  describe('getAttributesFromMeta', () => {
    it('should get a string array of attributes from meta object', () => {
      const expected_attributes = ['id', 'reference', 'multi_reference']
      const observed = getAttributesfromMeta(meta)
      expect(observed).toEqual(expected_attributes)
    })
  })
})
