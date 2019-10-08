import * as rsqlMapper from '@/mappers/rsqlMapper'
import { FilterSelections } from '@/types/ApplicationState'
import { MetaDataAttribute } from '@/types/ApiResponse'
import { Value, transformToRSQL } from '@molgenis/rsql'

// @ts-ignore
import api from '@molgenis/molgenis-api-client'

const attributes: MetaDataAttribute[] = [
  {
    href: '/api/v2/test/meta/country',
    fieldType: 'CATEGORICAL',
    name: 'country',
    label: 'country',
    attributes: [],
    auto: false,
    nillable: false,
    readOnly: true,
    labelAttribute: false,
    unique: true,
    visible: true,
    lookupAttribute: true,
    isAggregatable: false
  },
  {
    href: '/api/v2/test/meta/age_groups',
    fieldType: 'CATEGORICAL_MREF',
    name: 'age_groups',
    label: 'age_groups',
    attributes: [],
    auto: false,
    nillable: false,
    readOnly: true,
    labelAttribute: false,
    unique: true,
    visible: true,
    lookupAttribute: true,
    isAggregatable: false
  },
  {
    href: '/api/v2/test/meta/name',
    fieldType: 'STRING',
    name: 'name',
    label: 'name',
    attributes: [],
    auto: false,
    nillable: false,
    readOnly: true,
    labelAttribute: false,
    unique: true,
    visible: true,
    lookupAttribute: true,
    isAggregatable: false
  }
]


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
      const rsqlQuery = await rsqlMapper.createRSQLQuery(selections, attributes)
      expect(rsqlQuery).toEqual('country=in=(DE,NL)')
    })
    it('create query with and operator', async () => {
      const selections: FilterSelections = {
        country: ['DE', 'NL'],
        age_groups: [ '1', '2', '3']
      }
      const rsqlQuery = await rsqlMapper.createRSQLQuery(selections, attributes)
      expect(rsqlQuery).toEqual('country=in=(DE,NL);age_groups=in=(1,2,3)')
    })
    it('if selections are empty return null', async () => {
      const selections: FilterSelections = {}
      const rsqlQuery = await rsqlMapper.createRSQLQuery(selections, attributes)
      expect(rsqlQuery).toEqual(null)
    })
  })
})
