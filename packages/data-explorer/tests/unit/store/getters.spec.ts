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

  describe('hasEditRights', () => {
    
    let state: any
    let rootState:any = {
      account: {
        context: null 
      }
    }

    it('should return false if context is not set', () => {
      rootState.account.context = null
      expect(getters.hasEditRights(state, getters, rootState)).toEqual(false)
    })

    it('should return false if not authenticated', () => {
      rootState.account.context = {
        authenticated: false
      }
      expect(getters.hasEditRights(state, getters, rootState)).toEqual(false)
    })

    it('should return true if authenticated and has edit role', () => {
      rootState.account.context = {
        authenticated: true,
        roles: ['ROLE_EDITOR']
      }
      expect(getters.hasEditRights(state, getters, rootState)).toEqual(true)
      rootState.account.context.roles = ['ROLE_MANAGER']
      expect(getters.hasEditRights(state, getters, rootState)).toEqual(true)
      rootState.account.context.roles = ['ROLE_SU']
      expect(getters.hasEditRights(state, getters, rootState)).toEqual(true)
    })

  })
})