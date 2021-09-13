import actions from '@/store/explorer/actions'
import ApplicationState from '@/types/ApplicationState'
import mockState from '../../mocks/mockState'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'
import * as metaFilterMapper from '@/mappers/metaFilterMapper'
import Vue from 'vue'
import client from '@/lib/client'
import { AxiosResponse } from 'axios'

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
        'fieldType': 'compound',
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
  '/api/data/entity': {},
  '/api/v2/sys_job_ResourceDownloadJobExecution/failure': {
    progressMessage: 'failed',
    status: 'FAILED'
  },
  '/api/v2/sys_job_ResourceDownloadJobExecution/success': {
    progressMessage: 'progress',
    resultUrl: '/foo/bar',
    status: 'SUCCESS'
  },
  '/api/data/entity?expand=xcategorical_value&filter=id,xbool,xcategorical_value(label)': dataResponse,
  '/api/v2/entity?num=0': metaResponse,
  '/api/data/sys_ts_DataExplorerEntitySettings?q=table=="tableWithOutSettings"': { items: [] },
  '/api/data/sys_ts_DataExplorerEntitySettings?q=table=="tableWithSettings"': { items: [{ data: { id: 'ent-set', shop: true, collapse_limit: 5 } }] },
  '/api/data/sys_ts_DataExplorerEntitySettings': {},
  '/api/data/sys_set_forms/forms': { "data":{ "addEnumNullOption":false,"addBooleanNullOption":false,"addCategoricalNullOption":false,"id":"forms" } },
  '/api/v2/my-table?start=0&num=0': {
    meta: {
      permissions: ['PERM_A']
    }
  }
}

jest.mock('@/lib/client', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn()
  }
})

// typed mock functions
const clientGet = (client.get as jest.MockedFunction<typeof client.get>)
const clientPost = (client.post as jest.MockedFunction<typeof client.post>)

clientGet.mockImplementation((url: string): Promise<AxiosResponse> => {
  const mockResp = mockResponses[url]
  if (!mockResp) {
    // eslint-disable-next-line no-console
    console.warn(`mock url (${url}) called but not found in ${JSON.stringify(mockResponses, null, 4)}`)
  }
  return Promise.resolve({ data: mockResp, status: 200, statusText: 'OK', headers: {}, config: {} })
})

jest.mock('@/repository/metaDataRepository', () => {
  return {
    fetchMetaDataById: jest.fn()
  }
})

jest.mock('@/repository/dataRepository', () => {
  return {
    getTableDataDeepReference: jest.fn(),
    getTableDataWithLabel: jest.fn(),
    getRowDataWithReferenceLabels: jest.fn(),
    deleteRow: jest.fn().mockReturnValue({ status: 204 })
  }
})

jest.mock('@/repository/metaDataService', () => {
  return {
    getAttributesfromMeta: jest.fn()
  }
})

jest.mock('@/mappers/metaFilterMapper', () => {
  return {
    mapMetaToFilters: jest.fn()
  }
})

let state: ApplicationState
let getters: any
let commit, dispatch: any

describe('actions', () => {
  beforeEach(() => {
    state = mockState()
    state.tableName = 'it_emx_datatypes_TypeTest'
    state.tablePagination = { count: 0, loading: false, page: 1, size: 10 }

    getters = {
      filterRsql: null,
      isUserAuthenticated: jest.fn()
    }

    commit = jest.fn()
    dispatch = jest.fn()

    clientPost.mockReset()
  })

  describe('fetchTableMeta', () => {
    it('should fetch settings and meta', async () => {
      const commit = jest.fn()
      // @ts-ignore ts does not know its a mock
      metaFilterMapper.mapMetaToFilters.mockResolvedValue({ definition: 'def' })
      // @ts-ignore
      metaDataRepository.fetchMetaDataById.mockResolvedValue('meta')
      await actions.fetchTableMeta({ commit, getters, dispatch }, { tableName: 'tableWithOutSettings' })
      expect(commit.mock.calls).toEqual([
        ['setMetaData', null],
        ['setFilterDefinition', []],
        ['setTableName', 'tableWithOutSettings'],
        ['setMetaData', 'meta'],
        ['setFilterDefinition', 'def']
      ])
    })
  })

  describe('fetchViewData', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('if selected view is cardView, should fetch card data', async (done) => {
      state.dataDisplayLayout = 'CardView'
      await actions.fetchViewData({ commit, dispatch, getters, state })
      expect(dispatch).toHaveBeenCalledWith('fetchCardViewData')
      done()
    })

    it('if selected view not cardView, should fetch table data', async (done) => {
      state.dataDisplayLayout = 'TableView'
      await actions.fetchViewData({ commit, dispatch, getters, state })
      expect(dispatch).toHaveBeenCalledWith('fetchTableViewData')
      done()
    })
  })

  describe('fetchCardViewData', () => {
    it('should fetch the table data from the backend', async () => {
      const commit = jest.fn()
      const getters = jest.fn()
      const state:any = {
        tableName: 'tableName',
        tableMeta: 'tableMeta',
        dataDisplayLayout: 'CardView',
        tableSettings: {
          customCardCode: true,
          customCardAttrs: 'x, y, z'
        }
      }
      // @ts-ignore ts does not know its a mock
      dataRepository.getTableDataDeepReference.mockResolvedValue({ data: 'data', page: { totalElements: 21 } })
      await actions.fetchCardViewData({ commit, state, getters })

      expect(dataRepository.getTableDataDeepReference).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setTableData', { data: 'data', page: { totalElements: 21 } })
    })

    it('should fetch collapseLimit cols in case of default card', async () => {
      const commit = jest.fn()
      const getters = jest.fn()
      const state:any = {
        tableName: 'tableName',
        tableMeta: 'tableMeta',
        dataDisplayLayout: 'CardView',
        tableSettings: {
          customCardCode: false
        }
      }
      // @ts-ignore ts does not know its a mock
      metaDataService.getAttributesfromMeta.mockReturnValue(['attr'])
      // @ts-ignore ts does not know its a mock
      dataRepository.getTableDataWithLabel.mockResolvedValue({ data: 'data', page: { totalElements: 21 } })

      await actions.fetchCardViewData({ commit, state, getters })

      expect(dataRepository.getTableDataDeepReference).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setTableData', { data: 'data', page: { totalElements: 21 } })
    })

    it('should show warning if the table name is not set', async (done) => {
      const commit = jest.fn()
      state.tableName = null
      await actions.fetchCardViewData({ commit, state, getters })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot load card data without table name', type: 'danger' })
      done()
    })

    it('should show warning if the table meta is not set', async (done) => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      state.tableMeta = null
      await actions.fetchCardViewData({ commit, state, getters })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot load card data without meta data', type: 'danger' })
      done()
    })
  })

  describe('fetchTableViewData', () => {
    it('should add the filter if it is set', async () => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      const mockMeta:any = 'tableMeta'
      state.tableMeta = mockMeta
      getters.filterRsql = 'a==b'

      // @ts-ignore ts does not know its a mock
      dataRepository.getTableDataWithLabel.mockResolvedValue({ data: 'data', page: { totalElements: 21 } })
      // @ts-ignore ts does not know its a mock
      metaDataService.getAttributesfromMeta.mockReturnValue(['attr'])

      await actions.fetchTableViewData({ commit, state, getters })

      expect(commit).toHaveBeenCalledWith('setPaginationCount', 21)
      expect(commit).toHaveBeenCalledWith('setTableData', { data: 'data', page: { totalElements: 21 } })
      expect(dataRepository.getTableDataWithLabel).toHaveBeenCalledWith(
        'tableName',
        'tableMeta',
        ['attr'], 'a==b',
        { 'count': 0, 'loading': false, 'page': 1, 'size': 10 },
        { 'isSortOrderReversed': false, 'sortColumnName': null })
    })

    it('should show warning if the table name is not set', async (done) => {
      const commit = jest.fn()
      state.tableName = null
      await actions.fetchTableViewData({ commit, state, getters })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot fetch table view data without table name', type: 'danger' })
      done()
    })

    it('should show warning if the table meta is not set', async (done) => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      state.tableMeta = null
      await actions.fetchTableViewData({ commit, state, getters })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot fetch table view data without meta data', type: 'danger' })
      done()
    })
  })

  describe('fetchRowDataLabels', () => {
    it('should fetch the data for a single row', async () => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      const mockMeta:any = 'tableMeta'
      state.tableMeta = mockMeta

      // @ts-ignore ts does not know its a mock
      dataRepository.getRowDataWithReferenceLabels.mockResolvedValue('rowData')

      await actions.fetchRowDataLabels({ commit, state, getters }, { rowId: 'rowId' })

      expect(commit).toBeCalledWith('updateRowData', { rowData: 'rowData', rowId: 'rowId' })
    })

    it('should show warning if the table name is not set', async (done) => {
      const commit = jest.fn()
      state.tableName = null
      await actions.fetchRowDataLabels({ commit, state, getters }, { rowId: 'rowId' })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot fetch row data without table name', type: 'danger' })
      done()
    })

    it('should show warning if the table meta is not set', async (done) => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      state.tableMeta = null
      await actions.fetchRowDataLabels({ commit, state, getters }, { rowId: 'rowId' })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot fetch row data without meta data', type: 'danger' })
      done()
    })
  })

  describe('deleteRow', () => {
    let commit: any
    beforeEach(() => {
      commit = jest.fn()
    })

    it('should call deleteRow on the dataRepository and update the state', async (done) => {
      state.tableName = 'my-table'
      await actions.deleteRow({ state, commit }, { rowId: 'my-row' })
      expect(dataRepository.deleteRow).toHaveBeenCalledWith('my-table', 'my-row')
      expect(commit).toHaveBeenCalledWith('removeRow', { rowId: 'my-row' })
      done()
    })

    it('should throw an error when the table name is not set', async (done) => {
      state.tableName = null
      await actions.deleteRow({ state, commit }, { rowId: 'my-row' })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot delete row from unknown table', type: 'danger' })

      done()
    })
  })

  describe('downloadResources', () => {

    it('downloads the data', async () => {
      jest.useFakeTimers()
      const commit = jest.fn()
      const resources = [{ id: 'success', type: 'ENTITY_TYPE' }]
      // @ts-ignore
      client.post.mockResolvedValueOnce({ data: { identifier: 'success' } })

      await actions.downloadResources({ state, commit }, resources)
      jest.advanceTimersByTime(1000)
      await Vue.nextTick()
      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).nthCalledWith(1, 'addToast', { message: 'progress', type: 'info' })
      expect(commit).nthCalledWith(2, 'addToast', { message: 'Download data from <a href="/foo/bar">/foo/bar</a>', type: 'success', timeout: 0 })
    })

    it('fails to download data', async () => {
      jest.useFakeTimers()
      const commit = jest.fn()
      // @ts-ignore
      client.post.mockResolvedValueOnce({ data: { identifier: 'failure' } })
      await actions.downloadResources({ state, commit }, [{ id: 'failure', type: 'ENTITY_TYPE' }])
      jest.advanceTimersByTime(1000)
      await Vue.nextTick()
      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).nthCalledWith(1, 'addToast', { message: 'failed', type: 'info' })
      expect(commit).nthCalledWith(2, 'addToast', { message: 'failed', type: 'danger', timeout: 0 })
    })
  })

  describe('fetchTablePermissions', () => {
    it('fetch the permissions for the given table', async () => {
      await actions.fetchTablePermissions({ commit }, { tableName: 'my-table' })
      expect(commit).toHaveBeenCalledWith('setTablePermissions', ['PERM_A'])
    })
  })

  describe('fetchTableSetttings', () => {
    it('should clear the current settings, fetch the settings for passed tableName and commit them to the store', async () => {
      await actions.fetchTableSettings({ commit, state }, { tableName: 'tableWithSettings' })
      expect(commit).nthCalledWith(1, 'setTableSettings', {})
      expect(commit).nthCalledWith(2, 'setTableSettings', { id: 'ent-set', shop: true, collapse_limit: 5 })
    })

    it('should not commit settings to the if not set for given table', async () => {
      await actions.fetchTableSettings({ commit, state }, { tableName: 'tableWithOutSettings' })
      expect(commit).toHaveBeenCalledWith('setTableSettings', {})
      expect(commit).not.toHaveBeenCalledWith('setTableSettings', { id: 'ent-set', shop: true, collapse_limit: 5 })
    })
  })

  describe('fetchFormSettings', () => {
    it('should fetch the form settings and commit them to the store', async () => {
      await actions.fetchFormSettings({ commit, state })
      expect(commit).toHaveBeenCalledWith('setFormSettings',
        { "addEnumNullOption":false,"addBooleanNullOption":false,"addCategoricalNullOption":false,"id":"forms" })
    })

    it('should warn and use defaults if fetching the form settings fails', async () => {
      clientGet.mockRejectedValueOnce(new Error("No permission to fetch form settings"))
      await actions.fetchFormSettings({ commit, state })
      expect(commit).toHaveBeenCalledWith('setFormSettings',
        { "addEnumNullOption":true,"addBooleanNullOption":true,"addCategoricalNullOption":true })
      expect(commit).toHaveBeenCalledWith('addToast', { "message": "Failed to fetch form settings. No permission to fetch form settings", "type": "danger" })
    })
  })

  describe('saveEntityDetailTemplate', () => {
    it('should show warning if the table meta is not set', async () => {
      const commit = jest.fn()
      state.tableMeta = null
      await actions.saveEntityDetailTemplate({ commit, state }, { template: 'template' })
      expect(commit).toHaveBeenCalledWith('addToast', { message: 'cannot save template without meta data', type: 'danger' })
    })

    it('should create new settings row if there is none', async () => {
      const commit = jest.fn()
      const state:any = {
        tableSettings: {
          settingsRowId: null
        },
        tableMeta: {
          id:'tableWithOutSettings'
        },
        settingsTable: 'sys_ts_DataExplorerEntitySettings'
      }
      clientPost.mockResolvedValueOnce({ data: 'success' })
      await actions.saveEntityDetailTemplate({ commit, state }, { template: 'template' })
      expect(client.post).toHaveBeenCalledWith('/api/data/sys_ts_DataExplorerEntitySettings', {
        detail_template: 'template',
        table: 'tableWithOutSettings'
      })
    })

    it('should update the template if there is a settings row', async () => {
      const commit = jest.fn()
      const state:any = {
        tableSettings: {
          settingsRowId: '101'
        },
        tableMeta: {
          id: 'tableWithSettings'
        },
        settingsTable: 'sys_ts_DataExplorerEntitySettings'
      }
      clientPost.mockResolvedValueOnce({ data: 'success' })
      await actions.saveEntityDetailTemplate({ commit, state }, { template: 'template' })
      expect(client.patch).toHaveBeenCalledWith('/api/data/sys_ts_DataExplorerEntitySettings/101', {
        detail_template: 'template',
      })
    })
  })
})
