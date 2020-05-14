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
  let mutations: any

  beforeEach(() => {
    state = {
      settingsTable: 'settings-table',
      dataDisplayLayout: 'cards',
      tableSettings: {}
    }
    getters = {
      activeEntityData: jest.fn()
    }
    mutations = {
      setSearchText: jest.fn()
    }
    actions = {
      getTableData: jest.fn()
    }
    store = new Vuex.Store({
      state, getters, actions, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(DataView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when the search text model updates', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(DataView, { store, localVue })
      wrapper.setData({ searchText: 'test' })
    })
    it('should mutate the value to the store', () => {
      expect(mutations.setSearchText).toHaveBeenCalled()
    })
  })
})
