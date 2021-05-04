import getters from '@/store/explorer/getters'

jest.mock('@/mappers/rsqlMapper', () => {
  return {
    createRSQLQuery: () => 'rsql-query'
  }
})

describe('getters', () => {
  describe('filterRsql', () => {
    const state: any = {
      tableMeta: null
    }
    it('should return false if metaData was not set', () => {
      expect(getters.filterRsql(state)).toEqual(null)
    })
    it('should return createRSQLQuery string metaData was set', () => {
      state.tableMeta = {}
      expect(getters.filterRsql(state)).toEqual('rsql-query')
    })
  })

  describe('userRoles', () => {
    let state: any
    const rootState:any = {
      account: {
        context: {
          roles: ['r1', 'r2']
        }
      }
    }

    it('should return the user roles from the context', () => {
      expect(getters.userRoles(state, getters, rootState)).toEqual(['r1', 'r2'])
    })

    it('should return empty list if context not yet set', () => {
      rootState.account.context = null
      expect(getters.userRoles(state, getters, rootState)).toEqual([])
    })
  })

  describe('isUserAuthenticated', () => {
    let state: any
    const rootState:any = {
      account: {
        context: null
      }
    }

    it('should return false if not authenticated', () => {
      expect(getters.isUserAuthenticated(state, getters, rootState)).toEqual(false)
    })
    it('should return true if authenticated', () => {
      const rootState:any = {
        account: {
          context: {
            authenticated: true
          }
        }
      }
      expect(getters.isUserAuthenticated(state, getters, rootState)).toEqual(true)
    })
  })

  describe('hasEditRights', () => {
    const state: any = {}
    state.tablePermissions = []

    it('should return false user does not have update rights', () => {
      expect(getters.hasEditRights(state)).toEqual(false)
    })

    it('should return true if authenticated and has edit rights', () => {
      state.tablePermissions = ['UPDATE_DATA']
      expect(getters.hasEditRights(state)).toEqual(true)
    })
  })

  describe('hasAddRights', () => {
    const state: any = {}
    state.tablePermissions = []

    it('should return false user does not have add rights', () => {
      expect(getters.hasAddRights(state)).toEqual(false)
    })

    it('should return true if authenticated and has add rights', () => {
      state.tablePermissions = ['ADD_DATA']
      expect(getters.hasAddRights(state)).toEqual(true)
    })
  })

  describe('hasDeleteRights', () => {
    const state: any = {}
    state.tablePermissions = []

    it('should return false user does not have delete rights', () => {
      expect(getters.hasDeleteRights(state)).toEqual(false)
    })

    it('should return true if authenticated and has delete rights', () => {
      state.tablePermissions = ['DELETE_DATA']
      expect(getters.hasDeleteRights(state)).toEqual(true)
    })
  })

  describe('hasEditSettingsRights', () => {
    let state: any

    it('should return true if authenticated and has super user role', () => {
      const localGetters = {
        isUserAuthenticated: true,
        userRoles: ['ROLE_SU']
      }
      expect(getters.hasEditSettingsRights(state, localGetters)).toEqual(true)
    })
  })

  describe('hasNoResults', () => {
    const state: any = {
      loading: true,
      tableData: null,
    }
    it('should return false if application is loading or has no metadata', () => {
      expect(getters.hasNoResults(state)).toEqual(false)
    })
    it('should return a boolean when tableData is not null', () => {
      state.tableData = { items: [] };
      expect(getters.hasNoResults(state)).toEqual(false)
    })
  })

  describe('tableIdAttributeName', () => {
    let state: any = {}

    it('should return undefined if not set', () => {
      expect(getters.tableIdAttributeName(state)).toEqual(undefined)
    })

    it('should return name of the id field if set', () => {
      state = {
        tableMeta: {
          idAttribute: {
            name: 'some-name'
          }
        }
      }
      expect(getters.tableIdAttributeName(state)).toEqual('some-name')
    })
  })

  describe('tableLabelAttributeName', () => {
    let state: any = {}

    it('should return undefined if not set', () => {
      expect(getters.tableLabelAttributeName(state)).toEqual(undefined)
    })

    it('should return name of the label field if set', () => {
      state = {
        tableMeta: {
          labelAttribute: {
            name: 'some-label'
          }
        }
      }
      expect(getters.tableLabelAttributeName(state)).toEqual('some-label')
    })
  })

  describe('clipBoardItems', () => {
    const state: any = {}

    it('should return an empty list if table has no items', () => {
      expect(getters.clipBoardItems(state, {})).toEqual([])
    })

    it('should return a list of selected items if set', () => {
      state.tableData = {
        items: [
          { colA: 'my-id', colB: 'my-label' }
        ]
      }
      state.selectedItemIds = ['my-id']
      const localGetters = {
        tableIdAttributeName: 'colA',
        tableLabelAttributeName: 'colB'
      }
      expect(getters.clipBoardItems(state, localGetters)).toEqual([
        { id: 'my-id', name: 'my-label' }
      ])
    })
  })

  describe('routeFilter', () => {
    const state: any = {
      filters: {
        shown: ['a', 'b'],
        selections: {
          'f1': 'val1',
          'f2': ['val2', 'val3'],
          'f3': [new Date('2021-01-01T11:00:00.000Z')],
          'non-in-result': []
        }
      }
    }
    const mockGetter = {
      getDataTypeForFilter: jest.fn()
    }
    mockGetter.getDataTypeForFilter
      .mockReturnValueOnce('string')
      .mockReturnValueOnce('xref')
      .mockReturnValueOnce('date')
      .mockReturnValueOnce('mref')

    it('should build the bookmark object based on the state of the store', () => {
      expect(getters.routeFilter(state, mockGetter)).toEqual({
        f1: 'val1',
        f2: 'val2,val3',
        f3: '2021-01-01T11:00:00.000Z',
        searchText: undefined,
        shown: 'a,b'
      })
    })
  })

  describe('compressedRouteFilter', () => {
    const state: any = {}
    const mockGetter = {
      routeFilter: { book: 'mark' }
    }
    it('should return the compressed and encoded the filter object', () => {
      expect(getters.compressedRouteFilter(state, mockGetter)).toEqual('N4IgRg9hDWIFwgLYEMBOsC+Q')
    })
  })

  describe('getDataTypeForFilter', () => {
    const state: any = {
      filters: {
        definition: [
          { name: 'filer1', dataType: 'my-filter-type' },
          { label: 'filer2', dataType: 'my-filter-type' }
        ]
      }
    }

    it('should lookup the filter type using the filter name or label', () => {
      expect(getters.getDataTypeForFilter(state)('filer1')).toEqual('my-filter-type')
      expect(getters.getDataTypeForFilter(state)('filer2')).toEqual('my-filter-type')
    })

    it('should throw an error if the type is not found', () => {
      try {
        getters.getDataTypeForFilter(state)('missing')
      } catch (e) {
        expect(e.toString()).toEqual('Error: Missing filter definition for identifier: missing')
      }
    })
  })

  describe('parseRouteFilter', () => {
    const state: any = {}
    const mockGetter = {
      getDataTypeForFilter: () => () => 'my-filter-type'
    }
    it('should take a encoded bookmark and use the state to decode it in a filter object', () => {
      const encodedBookmark = 'N4IgzgFg9g7gdiAXOaAHANAFwIYCMA2ApiOuIdgE4DGEAKoQB6ZIiaFjOmRSosBm2fGGIBfIA==='
      expect(getters.parseRouteFilter(state, mockGetter)(encodedBookmark)).toEqual({
        searchText: 'test',
        selections: { 'shop': undefined },
        shown: ['shop', 'table']
      })
    })
  })
})
