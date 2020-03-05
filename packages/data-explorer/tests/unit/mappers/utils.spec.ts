import * as utils from '@/mappers/utils'
import mock from '../mocks/metaDataResponseMock'
import { Attribute } from '@/types/MetaData'
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: { items: [ { data: { id: 'id', label: 'label' } } ] } })
}))

jest.mock('@/repository/metaDataRepository', () => ({
  fetchMetaDataByURL: () => mock
}))

describe('Mapper utils', () => {
  describe('getCategoricals', () => {
    it('filters out the catogorical options', () => {
      expect((mock.attributes as Attribute[]).length).toEqual(5)
      expect(utils.getCategoricals(mock.attributes as Attribute[]).length).toEqual(2)
    })
  })
  describe('getFieldOptions', () => {
    it('string filter not to return options', async () => {
      expect(await utils.getFieldOptions(mock.attributes[1] as Attribute)).toEqual(null)
    })
    it('categorical filter returns some options', async () => {
      let res = await utils.getFieldOptions(mock.attributes[2] as Attribute)
      // @ts-ignore
      expect(await res()).toEqual([ { value: 'id', text: 'label' } ])
    })
  })
})
