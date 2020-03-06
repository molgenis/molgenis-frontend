import { mapMetaToFilters } from '@/mappers/metaFilterMapper'
import axios from 'axios'
import { MetaData, Attribute } from '@/types/MetaData'
import mockMetaData from '../mocks/metaDataResponseMock'

jest.mock('@/mappers/utils', () => ({
  getFieldOptions: () => {}
}))

describe('metaFilterMapper', () => {
  describe('mapMetaToFilters', () => {
    it('create an filter definition from metadata', async () => {
      const filters = await mapMetaToFilters(mockMetaData as MetaData)
      expect(filters.definition[0].type).toEqual('range-filter')
      expect(filters.definition[1].dataType).toEqual('string')
      expect(filters.definition[2].name).toEqual('country')
      expect(filters.definition[3].dataType).toEqual('categorical_mref')
      expect(filters.definition[4].type).toEqual('string-filter')
    })
  })
})
