import actions from '@/store/actions'
import ApplicationState from '@/types/ApplicationState'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'

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
  '/api/data/settingsEntity?q=table=="entity"': { items: [{ data: { id: 'blaat', shop: true, collapse_limit: 5 } }] }
}
jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    get: (url: string) => Promise.resolve(mockResponses[url]),
    post: jest.fn()
  }
})

jest.mock('@/repository/metaDataRepository', () => {
  return {
    fetchMetaData: jest.fn()
  }
})

jest.mock('@/repository/dataRepository', () => {
  return {
    getTableDataDeepReference: jest.fn(),
    getTableDataWithLabel: jest.fn(),
    getRowDataWithReferenceLabels: jest.fn()
  }
})

jest.mock('@/repository/metaDataService', () => {
  return {
    getRefsFromMeta: jest.fn(),
    getAttributesfromMeta: jest.fn()
  }
})

let state: ApplicationState
let getters: any

describe('actions', () => {
  beforeEach(() => {
    state = {
      toast: null,
      tableName: 'it_emx_datatypes_TypeTest',
      tableData: null,
      tableMeta: null,
      dataDisplayLayout: 'CardView',
      defaultEntityData: null,
      entityMetaRefs: {},
      filters: {
        hideSidebar: false,
        definition: [],
        shown: [],
        selections: {}
      },
      showShoppingCart: false,
      shoppedEntityItems: [],
      tableSettings: {
        isShop: false,
        settingsRowId: null,
        customCardCode: null,
        customCardAttrs: '',
        settingsTable: 'de_dataexplorer_table_settings',
        collapseLimit: 5
      }
    }

    getters = {
      filterRsql: null
    }
  })

  describe('getTableSettings', () => {
    it('gets the settings for the selected table', async (done) => {
      const commit = jest.fn()
      const state = { tableSettings: { isShop: false, settingsRowId: '', settingsTable: 'settingsEntity', collapseLimit: 0 } }
      await actions.getTableSettings({ commit, state }, { tableName: 'entity' })
      expect(commit).toHaveBeenCalledWith('setTableSettings', { shop: true, collapse_limit: 5, id: 'blaat' })
      done()
    })
  })

  describe('fetchCardViewData', () => {
    it('should fetch the table data from the backend', async () => {
      const commit = jest.fn()
      state.tableName = 'entity'
      // @ts-ignore ts does not know its a mock
      metaDataService.getAttributesfromMeta.mockReturnValue([])

      // @ts-ignore ts does not know its a mock
      metaDataRepository.fetchMetaData.mockResolvedValue({ attributes: [] })
      // @ts-ignore ts does not know its a mock
      dataRepository.getTableDataWithLabel.mockResolvedValue({ mock: 'data' })
      await actions.fetchCardViewData({ commit, state, getters })
      expect(commit).toHaveBeenCalledWith('setMetaData', { attributes: [] })
      expect(commit).toHaveBeenCalledWith('setTableData', { mock: 'data' })
    })

    it('should throw a error if the state does not contain a string table name', async () => {
      const commit = jest.fn()
      state.tableName = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchCardViewData({ commit, state, getters })).rejects.toEqual(new Error('cannot load table data for non string table id'))
    })
  })

  describe('fetch row data', () => {
    it('should fetch the data for a single row', async () => {
      state.tableName = 'tableName'
      const commit = jest.fn()
      // @ts-ignore ts does not know its a mock
      metaDataRepository.fetchMetaData.mockResolvedValue({ meta: 'data' })
      await actions.fetchRowDataLabels({ commit, state, getters }, { rowId: 'rowId' })
      expect(commit).toBeCalledWith('setMetaData', { meta: 'data' })
    })
  })

  describe('fetch fetchTableViewData', () => {
    it('should add the filter if it is set', async () => {
      state.tableName = 'tableName'
      const commit = jest.fn()

      getters.filterRsql = 'a==b'

      // @ts-ignore ts does not know its a mock
      metaDataRepository.fetchMetaData.mockResolvedValue({ attributes: [] })
      // @ts-ignore ts does not know its a mock
      dataRepository.getTableDataWithLabel.mockResolvedValue({ mock: 'data' })

      await actions.fetchTableViewData({ commit, getters }, { tableName: 'entity' })

      expect(commit).toHaveBeenCalledWith('setMetaData', { attributes: [] })
      expect(commit).toHaveBeenCalledWith('setTableData', [])
      expect(commit).toHaveBeenCalledWith('setTableData', { mock: 'data' })
      expect(dataRepository.getTableDataWithLabel).toHaveBeenCalledWith('entity', { attributes: [] }, [], 'a==b')
    })
  })
})
