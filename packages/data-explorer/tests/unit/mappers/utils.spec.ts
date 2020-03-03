import * as utils from '@/mappers/utils'
import mock from '../mocks/metaDataResponseMock'
import { Attribute } from '@/types/MetaData'

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue(mock)
}))

jest.mock('@/repository/metaDataRepository', () => ({
  fetchMetaDataByURL: () => jest.fn()
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
  })
})
