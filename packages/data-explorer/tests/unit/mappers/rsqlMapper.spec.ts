import * as rsqlMapper from '@/mappers/rsqlMapper'
import { FilterGroup } from '@/types/ApplicationState'
import { Value, transformToRSQL } from '@molgenis/rsql'

describe('rsqlMapper', () => {
  describe('createInQuery', () => {
    it('create an inQuery', async () => {
      const selections: Value[] = ['NL', 'DE']
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

  describe('createSearchQuery', () => {
    it('create an search Query', async () => {
      const selections: Value = 'search term'
      const query = rsqlMapper.createSearchQuery(selections)
      const rsql = transformToRSQL(query)
      expect(rsql).toEqual('*=q=\'search term\'')
    })
  })

  describe('createRSQLQuery', () => {
    let filterState: FilterGroup = {
      hideSidebar: false,
      definition: [],
      shown: [],
      selections: {}
    }
    it('will return null with empty filters', async () => {
      const rsqlQuery = rsqlMapper.createRSQLQuery(filterState)
      expect(rsqlQuery).toEqual(null)
    })

    it('should adds search if optional search term is passed', async () => {
      const rsqlQuery = rsqlMapper.createRSQLQuery(filterState, 'search-term')
      expect(rsqlQuery).toEqual('*=q=search-term')
    })

    it('will create a rsql string from the given filterState', () => {
      filterState.selections = {
        search: 'Hello',
        country: ['DE', 'NL'],
        age: ['10', '30'],
        money: ['0', null],
        amount: [null, 100],
        comply: ['yes'],
        date: [new Date(1), new Date(2)],
        xref: ['bla'],
        default: true
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
      }, {
        name: 'money',
        label: 'money',
        type: 'range-filter',
        dataType: 'int'
      }, {
        name: 'amount',
        label: 'amount',
        type: 'range-filter',
        dataType: 'int'
      }, {
        name: 'comply',
        label: 'You want in?',
        type: 'checkbox-filter',
        dataType: 'bool'
      }, {
        name: 'date',
        label: 'date',
        type: 'date-time-filter',
        dataType: 'date'
      }, {
        name: 'xref',
        label: 'xref',
        type: 'multi-filter',
        dataType: 'xref'
      }, {
        name: 'default',
        label: 'default',
        type: 'default-filter',
        dataType: 'default'
      })
      const rsqlQuery = rsqlMapper.createRSQLQuery(filterState)
      expect(rsqlQuery).toEqual('search=like=Hello;country=in=(DE,NL);age=ge=10;age=le=30;money=ge=0;amount=ge=100;comply==(yes);date=ge=1970-01-01T00:00:00.001Z;date=le=1970-01-01T00:00:00.002Z;xref=in=(bla)')
    })
  })
})
