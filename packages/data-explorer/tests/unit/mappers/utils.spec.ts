import * as utils from '@/mappers/utils'
import mock from '../mocks/metaDataResponseMock'
import { Attribute } from '@/types/MetaData'
import client from '@/lib/client'

jest.mock('@/lib/client', () => ({
  get: jest.fn().mockResolvedValue({ data: { items: [{ data: { id: 'id', label: 'label' } }] } })
}))

jest.mock('@/repository/metaDataRepository', () => ({
  fetchMetaDataByURL: () => mock
}))

describe('Mapper utils', () => {
  describe('getCategoricals', () => {
    it('filters out the categorical options', () => {
      expect(utils.getCategoricals(mock.attributes as Attribute[]).length).toEqual(2)
    })
  })
  describe('getFieldOptions', () => {
    it('string filter not to return options', async () => {
      expect(await utils.getFieldOptions(mock.attributes[1] as Attribute)).toEqual(null)
    })
    it('categorical filter returns some options', async () => {
      const res = await utils.getFieldOptions(mock.attributes[2] as Attribute)
      // @ts-ignore
      expect(await res()).toEqual([{ value: 'id', text: 'label' }])
    })
    it('returns some options when it is of type enum', async (done) => {
      const res = await utils.getFieldOptions(mock.attributes[6] as Attribute)
      // @ts-ignore
      expect(await res()).toEqual([{ 'text': { 'text': 'option A', 'value': 'a' }, 'value': { 'text': 'option A', 'value': 'a' } }, { 'text': { 'text': 'option B', 'value': 'b' }, 'value': { 'text': 'option B', 'value': 'b' } }, { 'text': { 'text': 'option C', 'value': 'c' }, 'value': { 'text': 'option C', 'value': 'c' } }])
      done()
    })
    it('returns true/false with yes and no textt options when it is of type bool', async (done) => {
      const res = await utils.getFieldOptions(mock.attributes[7] as Attribute)
      // @ts-ignore
      expect(await res()).toEqual([{ 'text': 'Yes', 'value': true }, { 'text': 'No', 'value': false }])
      done()
    })
    it('can select a count option elements to return', async (done) => {
      const res = await utils.getFieldOptions(mock.attributes[2] as Attribute)
      // @ts-ignore
      await res({ count: 3 })
      expect(client.get).toBeCalledWith('/api/data/country', { 'params': { 'flattenAttributes': true, 'size': 3 } })
      done()
    })
    it('can have fields set to change the query ', async (done) => {
      const res = await utils.getFieldOptions(mock.attributes[2] as Attribute)
      // @ts-ignore
      await res({ nameAttribute: 3, queryType: 'in', query: 'test' })
      expect(client.get).toBeCalledWith('/api/data/country', { 'params': { 'flattenAttributes': true, 'q': 'label=in=(test)' } })
      done()
    })
  })
})
