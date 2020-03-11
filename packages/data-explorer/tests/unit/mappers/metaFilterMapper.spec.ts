import { mapMetaToFilters } from '@/mappers/metaFilterMapper'
import { MetaData } from '@/types/MetaData'
import mockMetaData from '../mocks/metaDataResponseMock'

jest.mock('@/mappers/utils', () => ({
  getFieldOptions: () => {}
}))

describe('metaFilterMapper', () => {
  describe('mapMetaToFilters', () => {
    it('create an filter definition from metadata', async () => {
      let meta = mockMetaData
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
      const filters = await mapMetaToFilters(meta as MetaData)
      expect(filters.definition[0].type).toEqual('range-filter')
      expect(filters.definition[1].dataType).toEqual('string')
      expect(filters.definition[2].name).toEqual('country')
      expect(filters.definition[3].dataType).toEqual('categorical_mref')
      expect(filters.definition[4].type).toEqual('string-filter')
      expect(filters.definition[8].type).toEqual('date-time-filter')
      expect(filters.definition[9].time).toEqual(true)
    })
  })
})
