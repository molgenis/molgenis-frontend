import actions from '@/store/actions'
import ApplicationState from '@/types/ApplicationState'

const metaResponse = {
  meta: {
    loaded: true,
    attributes: [
      {
        'href': '/api/v2/it_emx_datatypes_TypeTest/meta/id',
        'fieldType': 'INT',
        'name': 'id',
        'label': 'id label',
        'attributes': [],
        'auto': false,
        'nillable': false,
        'readOnly': true,
        'labelAttribute': true,
        'unique': true,
        'visible': true,
        'lookupAttribute': true,
        'isAggregatable': false
      },
      {
        'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xbool',
        'fieldType': 'BOOL',
        'name': 'xbool',
        'label': 'xbool',
        'description': 'TypeTest boolean attribute',
        'attributes': [],
        'auto': false,
        'nillable': false,
        'readOnly': false,
        'defaultValue': 'false',
        'labelAttribute': false,
        'unique': false,
        'visible': true,
        'lookupAttribute': false,
        'isAggregatable': true
      },
      {
        'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound',
        'fieldType': 'COMPOUND',
        'name': 'xcompound',
        'label': 'xcompound label',
        'description': 'TypeTest compound attribute',
        'attributes': [
          {
            'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcompound_int',
            'fieldType': 'INT',
            'name': 'xcompound_int',
            'label': 'xcompound_int label',
            'attributes': [],
            'auto': false,
            'nillable': true,
            'readOnly': false,
            'defaultValue': '1',
            'labelAttribute': false,
            'unique': false,
            'visible': true,
            'lookupAttribute': false,
            'isAggregatable': true
          }
        ],
        'auto': false,
        'nillable': false,
        'readOnly': false,
        'labelAttribute': false,
        'unique': false,
        'visible': true,
        'lookupAttribute': false,
        'isAggregatable': false
      },
      {
        'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xcategorical_value',
        'fieldType': 'CATEGORICAL',
        'name': 'xcategorical_value',
        'label': 'xcategorical_value label',
        'description': 'TypeTest categorical attribute',
        'attributes': [],
        'refEntity': {
          'href': '/api/v2/it_emx_datatypes_TypeTestRef',
          'hrefCollection': '/api/v2/it_emx_datatypes_TypeTestRef',
          'name': 'it_emx_datatypes_TypeTestRef',
          'label': 'TypeTestRef',
          'description': 'MOLGENIS Data types test ref entity',
          'attributes': [
            {
              'href': '/api/v2/it_emx_datatypes_TypeTestRef/meta/value',
              'fieldType': 'STRING',
              'name': 'value',
              'label': 'value label',
              'description': 'TypeTestRef value attribute',
              'attributes': [],
              'maxLength': 255,
              'auto': false,
              'nillable': false,
              'readOnly': true,
              'labelAttribute': false,
              'unique': true,
              'visible': true,
              'lookupAttribute': true,
              'isAggregatable': false
            },
            {
              'href': '/api/v2/it_emx_datatypes_TypeTestRef/meta/label',
              'fieldType': 'STRING',
              'name': 'label',
              'label': 'label label',
              'description': 'TypeTestRef label attribute',
              'attributes': [],
              'maxLength': 255,
              'auto': false,
              'nillable': false,
              'readOnly': false,
              'labelAttribute': true,
              'unique': false,
              'visible': true,
              'lookupAttribute': true,
              'isAggregatable': false
            }
          ],
          'labelAttribute': 'label',
          'idAttribute': 'value',
          'lookupAttributes': [
            'value',
            'label'
          ],
          'isAbstract': false,
          'writable': false,
          'languageCode': 'en',
          'permissions': [
            'READ_METADATA',
            'COUNT_DATA',
            'AGGREGATE_DATA',
            'READ_DATA'
          ]
        },
        'auto': false,
        'nillable': false,
        'readOnly': false,
        'defaultValue': 'ref1',
        'labelAttribute': false,
        'unique': false,
        'visible': true,
        'lookupAttribute': false,
        'isAggregatable': false
      }]
  }
}

const dataResponse = {
  'links': {
    'self': 'https://data-v3.dev.molgenis.org/api/data/it_emx_datatypes_TypeTest'
  },
  'items': [
    {
      'links': {
        'self': 'https://data-v3.dev.molgenis.org/api/data/it_emx_datatypes_TypeTest/1'
      },
      'data': {
        'id': 1,
        'xbool': true,
        'xcategorical_value': {
          'links': {
            'self': 'https://data-v3.dev.molgenis.org/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          'data': {
            'label': 'label1'
          }
        }
      }
    },
    {
      'links': {
        'self': 'https://data-v3.dev.molgenis.org/api/data/it_emx_datatypes_TypeTest/2'
      },
      'data': {
        'id': 2,
        'xbool': false,
        'xcategorical_value': {
          'links': {
            'self': 'https://data-v3.dev.molgenis.org/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          'data': {
            'label': 'label2'
          }
        }
      }
    }
  ],
  'page': {
    'size': 2,
    'totalElements': 2,
    'totalPages': 1,
    'number': 0
  }
}

const mockResponses: {[key:string]: Object} = {
  '/api/data/entity': { 'loaded': true },
  '/api/data/entity?expand=xcategorical_value&filter=id,xbool,xcategorical_value(label)': dataResponse,
  '/api/v2/entity?num=0': metaResponse,
  '/api/data/settingsEntity?q=table=="entity"': { items: [{ data: { id: 'blaat', shop: true, collapse_limit: 5} }] }
}
jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    get: (url: string) => Promise.resolve(mockResponses[url]),
    post: jest.fn()
  }
})

describe('actions', () => {
  describe('loadTableData', () => {
    it('loads the selected table data', async (done) => {
      const commit = jest.fn()
      const state = { tableName: 'entity' }
      await actions.loadTableData({ commit, state })
      expect(commit).toHaveBeenCalledWith('setTableData', { 'loaded': true })
      done()
    })
  })

  describe('getTableSettings', () => {
    it('gets the settings for the selected table', async (done) => {
      const commit = jest.fn()
      const state = { tableSettings: {isShop: false, settingsRowId: '', settingsTable: 'settingsEntity', collapseLimit: 0} }
      await actions.getTableSettings({ commit, state }, { tableName: 'entity' })
      expect(commit).toHaveBeenCalledWith('setTableSettings', {shop: true, collapse_limit: 5, id: 'blaat'})
      done()
    })
  })

  describe('getTableData', () => {
    let state: ApplicationState
    beforeEach(() => {
      state = {
        toast: null,
        tableName: 'it_emx_datatypes_TypeTest',
        tableData: null,
        tableMeta: null,
        dataDisplayLayout: 'CardView',
        defaultEntityData: null,
        entityMetaRefs: {},
        hideFilters: true,
        showShoppingCart: false,
        shoppedEntityItems: [],
        tableSettings: {
          isShop: false,
          settingsRowId: null,
          settingsTable: 'de_dataexplorer_table_settings',
          collapseLimit: 5
        }
      }
    })
    it('should fetch the table data from the backend', async () => {
      const commit = jest.fn()
      state.tableName = 'entity'
      jest.setTimeout(6000)
      await actions.getTableData({ commit, state })
      expect(commit).toHaveBeenCalledWith('setMetaData', metaResponse.meta)
      const data = [
        {
          id: 1,
          xbool: true,
          xcategorical_value: 'label1'
        }, {
          id: 2,
          xbool: false,
          xcategorical_value: 'label2'
        }]
      const convertedResponse = JSON.parse(JSON.stringify(dataResponse))
      convertedResponse.items = data
      expect(commit).toHaveBeenCalledWith('setTableData', convertedResponse)
    })
  })
})
