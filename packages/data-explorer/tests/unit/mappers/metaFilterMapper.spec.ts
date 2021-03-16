import { mapMetaToFilters } from '@/mappers/metaFilterMapper'
import { MetaData } from '@/types/MetaData'
import mockMetaData from '../mocks/metaDataResponseMock'

jest.mock('@/mappers/utils', () => ({
  getFieldOptions: () => {}
}))

describe('metaFilterMapper', () => {
  describe('mapMetaToFilters', () => {
    it('create an filter definition from metadata', async () => {
      const meta = mockMetaData
      meta.attributes.push({
        id: '/api/metadata/date',
        type: 'date',
        name: 'date',
        label: 'date',
        description: '',
        auto: false,
        nullable: false,
        readOnly: true,
        idAttribute: false,
        labelAttribute: false,
        unique: false,
        isReference: false,
        visible: true,
        aggregatable: false
      })
      meta.attributes.push({
        id: '/api/metadata/datetime',
        type: 'datetime',
        name: 'datetime',
        label: 'datetime',
        description: '',
        auto: false,
        nullable: false,
        readOnly: true,
        idAttribute: false,
        labelAttribute: false,
        unique: false,
        isReference: false,
        visible: true,
        aggregatable: false
      })
      meta.attributes.push({
        id: '/api/metadata/compound',
        type: 'compound',
        name: 'compound',
        label: 'compound label',
        description: '',
        auto: false,
        nullable: false,
        readOnly: true,
        idAttribute: false,
        labelAttribute: false,
        unique: false,
        isReference: false,
        visible: true,
        aggregatable: false
      })
      meta.attributes.push({
        id: '/api/metadata/compoundChild',
        type: 'int',
        name: 'int',
        label: 'int',
        range: { min: 0, max: 10 },
        description: '',
        auto: false,
        nullable: false,
        readOnly: true,
        idAttribute: false,
        labelAttribute: false,
        unique: false,
        isReference: false,
        visible: true,
        parentAttributeId: '/api/metadata/compound',
        aggregatable: false
      })
      const filters = await mapMetaToFilters(meta as MetaData)
      expect(filters.definition[0].type).toEqual('range-filter')
      expect(filters.definition[1].dataType).toEqual('string')
      expect(filters.definition[2].name).toEqual('country')
      expect(filters.definition[3].dataType).toEqual('categorical_mref')
      expect(filters.definition[4].type).toEqual('string-filter')
      expect(filters.definition[9].type).toEqual('date-time-filter')
      expect(filters.definition[10].time).toEqual(true)
      expect(filters.definition[11].type).toEqual('compound-title')
      expect(filters.definition[12].compound).toEqual('compound')
    })
  })
})
