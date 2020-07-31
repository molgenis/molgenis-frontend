import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppManagerContainer from '@/views/AppManagerContainer.vue'



describe('AppManagerContainer', () => {

  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let getters: any
  let actions: any
  let mutations: any

  beforeEach(() => {
    state = {
      apps: [],
      error: '',
      loading: true
    }
    getters = {}
    mutations = {
      SET_ERROR: jest.fn()
    }
    actions = {
      FETCH_APPS: jest.fn(),
      UPLOAD_APP:jest.fn()
    }
    store = new Vuex.Store({ state, getters, actions, mutations })
  })

  it('should dispatch FETCH_APPS when created', () => {
    shallowMount(AppManagerContainer, { store, localVue })
    expect(actions.FETCH_APPS).toBeCalled()
  })

  it('should compute a list of apps based on a search query', () => {
    state.apps = [{ label: 'test', description: 'match' }, { label: 'example', description: 'no match' }]
    store = new Vuex.Store({ actions, state })

    const wrapper = shallowMount(AppManagerContainer, { store, localVue })
    wrapper.setData({ searchQuery: 'test' })
    // @ts-ignore
    expect(wrapper.vm.apps).toEqual([{ label: 'test', description: 'match' }])
  })

  it('should compute the error message based on the state', () => {
    state.error = 'error'
    store = new Vuex.Store({ actions, state })
    const wrapper = shallowMount(AppManagerContainer, { store, localVue })
    // @ts-ignore
    expect(wrapper.vm.error).toEqual('error')
  })

  it('should compute the loading state based on the state', () => {
    store.state.loading = false
    const wrapper = shallowMount(AppManagerContainer, { store, localVue })
    // @ts-ignore
    expect(wrapper.vm.loading).toEqual(false)
  })

  it('should dispatch UPLOAD_APP when handleFileUpload is called', () => {
    const wrapper = shallowMount(AppManagerContainer, { store, localVue })
    const event = { target: { files: ['file'] } }
    // @ts-ignore
    wrapper.vm.handleFileUpload(event)
    expect(actions.UPLOAD_APP).toBeCalled()
  })
})