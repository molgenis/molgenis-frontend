import { shallowMount, createLocalVue } from '@vue/test-utils'
import DataView from '@/views/DataView.vue'
import Vuex from 'vuex'

describe('DataView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let getters: any
  let actions: any

  beforeEach(() => {
    state = {
      dataDisplayLayout: 'cards'
    }
    getters = {
      activeEntityData: jest.fn()
    }
    actions = {
      loadEntity: jest.fn()
    }
    store = new Vuex.Store({
      state, getters, actions
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(DataView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })
})
