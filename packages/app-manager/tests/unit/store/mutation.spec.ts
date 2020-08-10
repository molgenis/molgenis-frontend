import mutations from '@/store/mutations'

describe('mutations', () => {
  describe('SET_ERROR', () => {
    it('should set the error variable in the state with the payload', () => {
      const state: any = { error: '' }
      mutations.SET_ERROR(state, 'new error!')
      expect(state.error).toEqual('new error!')
    })
  })

  describe('SET_LOADING', () => {
    it('should set the loading variable in the state with the payload', () => {
      const state: any = { loading: true }
      mutations.SET_LOADING(state, false)
      expect(state.loading).toEqual(false)
    })
  })

  describe('UPDATE_APPS', () => {
    it('should set the apps variable in the state with the payload', () => {
      const state: any = { apps: [] }
      const apps: any[] = [{ id: 'app1' }, { id: 'app2' }]
      mutations.UPDATE_APPS(state, apps)
      expect(state.apps).toEqual([{ id: 'app1' }, { id: 'app2' }])
    })
  })
})
