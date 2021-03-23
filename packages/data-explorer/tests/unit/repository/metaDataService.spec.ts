import { getAttributesfromMeta } from '@/repository/metaDataService'
import { MetaData, Attribute } from '@/types/MetaData'

describe('metaDataService', () => {
  const IdAndLabelAttribute:Attribute = {
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
  }

  const meta:MetaData = {
    id: 'blaat',
    labelAttribute: IdAndLabelAttribute,
    idAttribute: IdAndLabelAttribute,
    description: '',
    package: null,
    label: '',
    abstract: false,
    attributes: [
      IdAndLabelAttribute,
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
  describe('getAttributesFromMeta', () => {
    it('should get a string array of attributes from meta object', () => {
      const expectedAttributes = [ 'id', 'reference', 'multi_reference' ]
      const observed = getAttributesfromMeta(meta)
      expect(observed).toEqual(expectedAttributes)
    })
  })
})
