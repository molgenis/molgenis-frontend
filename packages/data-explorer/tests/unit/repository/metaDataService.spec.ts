import { getRefsFromMeta, getAttributesfromMeta } from '@/repository/metaDataService'
import { MetaDataApiResponse } from '@/types/ApiResponse'
import { MetaData } from '@/types/MetaData'

describe('metaDataService', () => {
  const meta:MetaData = {
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
        id: 'https://someurl.nl/api',
        idAttribute: true,
        description: 'the id',
        isReference: false,
        name: 'id',
        nullable: false,
        readOnly: false,
        label: 'id',
        type: 'string',
        unique: true,
        auto: true,
        labelAttribute: true,
        visible: true,
        lookupAttributeIndex: 1,
        aggregatable: false
      },
      {
        id: 'https://someurl.nl/api',
        name: 'reference',
        idAttribute: false,
        description: 'the ref',
        isReference: true,
        label: 'reference',
        nullable: false,
        readOnly: false,
        refEntityType: 'https://someurl.nl/ref-id',
        type: 'categorical',
        unique: false,
        auto: false,
        labelAttribute: false,
        visible: true,
        lookupAttributeIndex: 2,
        aggregatable: false
      },
      {
        id: 'https://someurl.nl/api',
        name: 'multi_reference',
        idAttribute: false,
        description: 'the multi',
        isReference: true,
        label: 'multi reference',
        nullable: false,
        readOnly: false,
        refEntityType: 'https://someurl.nl/ref-id',
        type: 'categorical_mref',
        unique: false,
        auto: false,
        labelAttribute: false,
        visible: true,
        lookupAttributeIndex: 3,
        aggregatable: false
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
      const expectedAttributes = ['id', 'reference', 'multi_reference']
      const observed = getAttributesfromMeta(meta)
      expect(observed).toEqual(expectedAttributes)
    })
  })
})
