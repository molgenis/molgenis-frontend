import actions from '@/store/actions'
import ApplicationState from '@/types/ApplicationState'
import mockState from '../mocks/mockState'
import * as metaDataRepository from '@/repository/metaDataRepository'
import * as dataRepository from '@/repository/dataRepository'
import * as metaDataService from '@/repository/metaDataService'
import * as metaFilterMapper from '@/mappers/metaFilterMapper'
import Vue from 'vue'

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
  '/api/data/entity': { 'loaded': true },
  '/api/v2/sys_job_ResourceDownloadJobExecution/failure': {
    data: {
      progressMessage: 'failed',
      status: 'FAILED'
    }
  },
  '/api/v2/sys_job_ResourceDownloadJobExecution/success': {
    data: {
      progressMessage: 'progress',
      resultUrl: '/foo/bar',
      status: 'SUCCESS'
    }
  },
  '/api/data/entity?expand=xcategorical_value&filter=id,xbool,xcategorical_value(label)': dataResponse,
  '/api/v2/entity?num=0': metaResponse,
  '/api/data/sys_ts_DataExplorerEntitySettings?q=table=="tableWithOutSettings"': { data: { items: [] } },
  '/api/data/sys_ts_DataExplorerEntitySettings?q=table=="tableWithSettings"': { data: { items: [{ data: { id: 'ent-set', shop: true, collapse_limit: 5 } }] } },
  '/api/data/sys_ts_DataExplorerEntitySettings': {}
}

const mockPostResponses = {
  '/plugin/navigator/download': {
    '{"resources":[{"id":"success","type":"ENTITY_TYPE"}]}': {
      data: { identifier: 'success' }
    },
    '{"resources":[{"id":"failure","type":"ENTITY_TYPE"}]}': {
      data: { identifier: 'failure' }
    }
  }
}

jest.mock('@/lib/client', () => {
  return {
    get: (url: string) => {
      const mockResp = mockResponses[url]
      if (!mockResp) {
        console.warn(`mock url (${url}) called but not found in ${mockResponses}`)
      }
      return Promise.resolve(mockResp)
    },
    post: (url: string, postData) => {
      const mockRespons = mockPostResponses[url][JSON.stringify(postData)]
      if (!mockRespons) {
        console.warn(`mock url (${url}) called but not found inz ${JSON.stringify(mockPostResponses, null, 4)}`)
      }
      return Promise.resolve(mockPostResponses[url][JSON.stringify(postData)])
    }
  }
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
    deleteRow: jest.fn()
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

describe('actions', () => {
  beforeEach(() => {
    state = mockState()
    state.tableName = 'it_emx_datatypes_TypeTest'
    getters = {
      filterRsql: null
    }
  })

  describe('fetchTableMeta', () => {
    it('should fetch settings and meta', async () => {
      const commit = jest.fn()
      // @ts-ignore ts does not know its a mock
      metaFilterMapper.mapMetaToFilters.mockResolvedValue({ definition: 'def' })
      // @ts-ignore
      metaDataRepository.fetchMetaDataById.mockResolvedValue('meta')
      await actions.fetchTableMeta({ commit, state }, { tableName: 'tableWithOutSettings' })
      expect(commit.mock.calls).toEqual([
        [ 'setTableSettings', {} ],
        [ 'setMetaData', null ],
        [ 'setFilterDefinition', [] ],
        [ 'setFiltersShown', [] ],
        [ 'setFilterSelection', {} ],
        [ 'setSearchText', '' ],
        [ 'setMetaData', 'meta' ],
        [ 'setFilterDefinition', 'def' ],
        [ 'setFiltersShown', [] ]
      ])
    })

    it('should commit table settings from server only if present', async () => {
      const commit = jest.fn()
      // @ts-ignore ts does not know its a mock
      metaFilterMapper.mapMetaToFilters.mockResolvedValue({ definition: 'def' })
      // @ts-ignore
      metaDataRepository.fetchMetaDataById.mockResolvedValue('meta')
      await actions.fetchTableMeta({ commit, state }, { tableName: 'tableWithSettings' })
      expect(commit.mock.calls).toEqual([
        [ 'setTableSettings', {} ],
        [ 'setMetaData', null ],
        [ 'setFilterDefinition', [] ],
        [ 'setFiltersShown', [] ],
        [ 'setFilterSelection', {} ],
        [ 'setSearchText', '' ],
        [
          'setTableSettings',
          { id: 'ent-set', shop: true, collapse_limit: 5 }
        ],
        [ 'setMetaData', 'meta' ],
        [ 'setFilterDefinition', 'def' ],
        [ 'setFiltersShown', [] ]
      ])
    })

    it('should only commit bookmark if set', async () => {
      const commit = jest.fn()
      // @ts-ignore ts does not know its a mock
      metaFilterMapper.mapMetaToFilters.mockResolvedValue({ definition: 'def' })
      // @ts-ignore
      metaDataRepository.fetchMetaDataById.mockResolvedValue('meta')
      await actions.fetchTableMeta({ commit, state }, { tableName: 'tableWithSettings' })
      expect(commit.mock.calls).not.toContain([ [ 'applyBookmark' ] ])
    })

    it('should commit bookmark if set', async () => {
      state = mockState()
      state.bookmark = 'bookmark'
      const commit = jest.fn()
      // @ts-ignore ts does not know its a mock
      metaFilterMapper.mapMetaToFilters.mockResolvedValue({ definition: 'def' })
      // @ts-ignore
      metaDataRepository.fetchMetaDataById.mockResolvedValue('meta')
      await actions.fetchTableMeta({ commit, state }, { tableName: 'tableWithSettings' })
      expect(commit.mock.calls.pop()[0]).toEqual('applyBookmark')
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
      dataRepository.getTableDataDeepReference.mockResolvedValue(['data'])

      await actions.fetchCardViewData({ commit, state, getters })

      expect(dataRepository.getTableDataDeepReference).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setTableData', ['data'])
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
      dataRepository.getTableDataWithLabel.mockResolvedValue(['data'])

      await actions.fetchCardViewData({ commit, state, getters })

      expect(dataRepository.getTableDataDeepReference).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setTableData', ['data'])
    })

    it('should throw a error if the state table name', async () => {
      const commit = jest.fn()
      state.tableName = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchCardViewData({ commit, state, getters }))
        .rejects
        .toThrow(new Error('cannot load card data without table name'))
    })

    it('should throw a error if the state does not meta data', async () => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      state.tableMeta = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchCardViewData({ commit, state, getters }))
        .rejects
        .toThrow(new Error('cannot load table data without meta data'))
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

    it('should throw a error if the state table name', async () => {
      const commit = jest.fn()
      state.tableName = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchRowDataLabels({ commit, state, getters }, { rowId: 'rowId' }))
        .rejects
        .toThrow(new Error('cannot fetch row data without table name'))
    })

    it('should throw a error if the state does not meta data', async () => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      state.tableMeta = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchRowDataLabels({ commit, state, getters }, { rowId: 'rowId' }))
        .rejects
        .toThrow(new Error('cannot fetch row data without meta data'))
    })
  })

  describe('fetch fetchTableViewData', () => {
    it('should add the filter if it is set', async () => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      const mockMeta:any = 'tableMeta'
      state.tableMeta = mockMeta
      getters.filterRsql = 'a==b'

      // @ts-ignore ts does not know its a mock
      dataRepository.getTableDataWithLabel.mockResolvedValue({ mock: 'data' })
      // @ts-ignore ts does not know its a mock
      metaDataService.getAttributesfromMeta.mockReturnValue(['attr'])

      await actions.fetchTableViewData({ commit, state, getters }, { tableName: 'entity' })

      expect(commit).toHaveBeenCalledWith('setTableData', [])
      expect(dataRepository.getTableDataWithLabel).toHaveBeenCalledWith('tableName', 'tableMeta', ['attr'], 'a==b', 100)
      expect(commit).toHaveBeenCalledWith('setTableData', { mock: 'data' })
    })

    it('should throw a error if the state table name', async () => {
      const commit = jest.fn()
      state.tableName = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchTableViewData({ commit, state, getters }, { tableName: 'entity' }))
        .rejects
        .toThrow(new Error('cannot fetch table view data without table name'))
    })

    it('should throw a error if the state does not meta data', async () => {
      const commit = jest.fn()
      state.tableName = 'tableName'
      state.tableMeta = null
      // workaround for jest issue: https://github.com/facebook/jest/issues/1700
      expect(actions.fetchTableViewData({ commit, state, getters }, { tableName: 'entity' }))
        .rejects
        .toThrow(new Error('cannot fetch table view data without meta data'))
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
      await actions.downloadResources({ state, commit }, [{ id: 'failure', type: 'ENTITY_TYPE' }])
      jest.advanceTimersByTime(1000)
      await Vue.nextTick()
      expect(setInterval).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).nthCalledWith(1, 'addToast', { message: 'failed', type: 'info' })
      expect(commit).nthCalledWith(2, 'addToast', { message: 'failed', type: 'danger', timeout: 0 })
    })
  })
})
