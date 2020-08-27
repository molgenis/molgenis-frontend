import mutations from '@/store/header/mutations'

describe('header mutations', () => {
  let state:any
  beforeEach(() => {
    state = {
      packageTables: [],
      breadcrumbs: []
    }
  })

  describe('setPackageTables', () => {
    it('replace the toast with the passed toast', () => {
      mutations.setPackageTables(state, ['pt'])
      expect(state.packageTables).toEqual(['pt'])
    })
  })

  describe('clearBreadcrumbs', () => {
    it('clear the list of crumbs', () => {
      state.breadcrumbs = ['a', 'b', 'c']
      mutations.clearBreadcrumbs(state)
      expect(state.breadcrumbs).toEqual([])
    })
  })

  describe('addBreadcrumb', () => {
    it('add a crumb to the start of the list', () => {
      state.breadcrumbs = ['a']
      mutations.addBreadcrumb(state, 'b')
      expect(state.breadcrumbs).toEqual(['b', 'a'])
    })
  })
})
