import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import UpdateApp from '@/components/UpdateApp.vue'

describe('UpdateApp', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(BootstrapVue)

  let store: any
  let state: any
  let getters: any
  let actions: any
  let mutations: any

  beforeEach(() => {
    state = { }
    getters = {}
    mutations = {
      SET_ERROR: jest.fn()
    }
    actions = {
      UPDATE_APP: jest.fn()
    }
    store = new Vuex.Store({ state, getters, actions, mutations })
  })

  it('should dispatch UPDATE_APP when handleFileUpload is called', () => {
    const wrapper = shallowMount(UpdateApp, { store, localVue, propsData: { appId: '1337' } })
    wrapper.setData({
      file: 'test-file-contents',
      updateRuntimeOptions: false
    })
    // @ts-ignore
    wrapper.vm.handleFileUpload()
    expect(actions.UPDATE_APP).toBeCalledWith(expect.anything(), { id: '1337', file: 'test-file-contents', updateRuntimeOptions: false })
  })
})
