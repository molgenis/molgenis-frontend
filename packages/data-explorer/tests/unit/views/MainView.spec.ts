import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainView from '@/views/MainView.vue'
import Vuex from 'vuex'

describe('MainView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any
  const mocks: any = { '$route': { params: {} } }

  beforeEach(() => {
    state = {
      activeEntity: 'it_emx_datatypes_TypeTest',
      hideFilters: true
    }
    mutations = {
      setActiveEntity: jest.fn()
    }
    store = new Vuex.Store({
      state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(MainView, { store, localVue, mocks })
    expect(wrapper.exists()).toBeTruthy()
  })
})
