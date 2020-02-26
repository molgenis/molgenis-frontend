import * as rsqlMapper from '@/mappers/rsqlMapper'
import { FilterSelections } from '@/types/ApplicationState'
import { Value, transformToRSQL } from '@molgenis/rsql'
import meta from '../mocks/metaDataResponseMock'
import { MetaData, Attribute } from '@/types/MetaData'

// @ts-ignore
import api from '@molgenis/molgenis-api-client'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn()
}))

describe('rsqlMapper', () => {
  beforeEach(() => {
    api.get.mockReset()
  })

  describe('createInQuery', () => {
    it('create an inQuery', async () => {
      const selections: Value[] = [ 'NL', 'DE' ]
      const inQuery = rsqlMapper.createInQuery('country', selections)
      const rsql = transformToRSQL(inQuery)
      expect(rsql).toEqual('country=in=(NL,DE)')
    })
  })

  describe('createRSQLQuery', () => {
    it('skip empty selections', async () => {
      const selections: FilterSelections = {
        country: ['DE', 'NL']
      }
      const rsqlQuery = await rsqlMapper.createRSQLQuery(selections, meta.attributes as Attribute[])
      expect(rsqlQuery).toEqual('country=in=(DE,NL)')
    })
    it('create query with and operator', async () => {
      const selections: FilterSelections = {
        country: ['DE', 'NL'],
        age_groups: [ '1', '2', '3' ]
      }
      const rsqlQuery = await rsqlMapper.createRSQLQuery(selections, meta.attributes as Attribute[])
      expect(rsqlQuery).toEqual('country=in=(DE,NL);age_groups=in=(1,2,3)')
    })
    it('if selections are empty return null', async () => {
      const selections: FilterSelections = {}
      const rsqlQuery = await rsqlMapper.createRSQLQuery(selections, meta.attributes as Attribute[])
      expect(rsqlQuery).toEqual(null)
    })
  })
})
