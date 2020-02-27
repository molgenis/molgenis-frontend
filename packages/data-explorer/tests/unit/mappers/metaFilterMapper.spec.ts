import * as metaFilterMapper from '@/mappers/metaFilterMapper'
import axios from 'axios'
import { MetaData, Attribute } from '@/types/MetaData'
import mockMetaData from '../mocks/metaDataResponseMock'

jest.mock('axios', () => ({
  get: jest.fn()
}))
/*
jest.mock('../mocks/metaDataResponseMock', () => ({
  getCategoricals: jest.fn().mockResolvedValue(mockMetaData.attributes)
}))
*/
describe('metaFilterMapper', () => {
  describe('mapMetaToFilters', () => {
    it('create an filter definition from metadata', async () => {
      /* TODO attach to new mapper
      // api.get.mockReturnValueOnce(countryOptions)
      // api.get.mockReturnValueOnce(ageGroupOptions)
      const resp = await metaFilterMapper.mapMetaToFilters(mockMetaData as MetaData)
      expect(resp.definition).toBeDefined()
      expect(resp.shown).toEqual([
        'country',
        'age_groups'
      ])
      expect(resp.definition.length).toEqual(2)
      expect(resp.definition[0].options).toBeInstanceOf(Function)
      expect(resp.definition[0].collapsable).toEqual(true)
      expect(resp.definition[0].collapsed).toEqual(false)
      expect(resp.definition[0].label).toEqual('country')
      expect(resp.definition[0].name).toEqual('country')
      expect(resp.definition[0].type).toEqual('checkbox-filter')
       */
    })
  })
})
