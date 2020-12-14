import getters from '@/store/getters'

jest.mock('@/mappers/rsqlMapper', () => {
  return {
    createRSQLQuery: () => 'rsql-query'
  }
})

describe('getters', () => {
  describe('filterRsql', () => {
    let state: any = {
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
    let rootState:any = {
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
    let rootState:any = {
      account: {
        context: null
      }
    }

    it('should return false if not authenticated', () => {
      expect(getters.isUserAuthenticated(state, getters, rootState)).toEqual(false)
    })
    it('should return true if authenticated', () => {
      let rootState:any = {
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
    let state: any

    it('should return false if not authenticated', () => {
      let localGetters = {
        isUserAuthenticated: false,
        userRoles: []
      }
      expect(getters.hasEditRights(state, localGetters)).toEqual(false)
    })

    it('should return true if authenticated and has edit role', () => {
      let localGetters = {
        isUserAuthenticated: true,
        userRoles: ['ROLE_EDITOR']
      }
      expect(getters.hasEditRights(state, localGetters)).toEqual(true)
      localGetters.userRoles = ['ROLE_MANAGER']
      expect(getters.hasEditRights(state, localGetters)).toEqual(true)
      localGetters.userRoles = ['ROLE_SU']
      expect(getters.hasEditRights(state, localGetters)).toEqual(true)
    })
  })

  describe('hasEditSettingsRights', () => {
    let state: any

    it('should return true if authenticated and has super user role', () => {
      let localGetters = {
        isUserAuthenticated: true,
        userRoles: ['ROLE_SU']
      }
      expect(getters.hasEditSettingsRights(state, localGetters)).toEqual(true)
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
    let state: any = {}

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
      let localGetters = {
        tableIdAttributeName: 'colA',
        tableLabelAttributeName: 'colB'
      }
      expect(getters.clipBoardItems(state, localGetters)).toEqual([
        { id: 'my-id', name: 'my-label' }
      ])
    })
  })
})
