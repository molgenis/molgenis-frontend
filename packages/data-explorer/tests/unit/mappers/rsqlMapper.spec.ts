import * as rsqlMapper from '@/mappers/rsqlMapper'
import { FilterGroup } from '@/types/ApplicationState'
import { Value, transformToRSQL } from '@molgenis/rsql'

describe('rsqlMapper', () => {
  describe('createInQuery', () => {
    it('create an inQuery', async () => {
      const selections: Value[] = [ 'NL', 'DE' ]
      const inQuery = rsqlMapper.createInQuery('country', selections)
      const rsql = transformToRSQL(inQuery)
      expect(rsql).toEqual('country=in=(NL,DE)')
    })
  })

  describe('createEqualsQuery', () => {
    it('create an equals Query', async () => {
      const selections: Value = 'NL'
      const inQuery = rsqlMapper.createEqualsQuery('country', selections)
      const rsql = transformToRSQL(inQuery)
      expect(rsql).toEqual('country==NL')
    })
  })

  describe('createRSQLQuery', () => {
    let filterState:FilterGroup = {
      hideSidebar: false,
      definition: [],
      shown: [],
      selections: {}
    }
    it('will return null with empty filters', async () => {
      const rsqlQuery = await rsqlMapper.createRSQLQuery(filterState)
      expect(rsqlQuery).toEqual(null)
    })

    it('will', async () => {
      filterState.selections = {
        search: 'Hello',
        country: ['DE', 'NL'],
        age: [ '10', '30' ]
      }
      filterState.definition.push({
        name: 'search',
        label: 'search',
        type: 'string-filter',
        dataType: 'string'
      }, {
        name: 'country',
        label: 'country',
        type: 'checkbox-filter',
        dataType: 'mref'
      }, {
        name: 'age',
        label: 'age',
        type: 'range-filter',
        dataType: 'int'
      })
      const rsqlQuery = await rsqlMapper.createRSQLQuery(filterState)
      expect(rsqlQuery).toEqual('search=like=Hello;country=in=(DE,NL);age=rng=(10,30)')
    })
  })
})
