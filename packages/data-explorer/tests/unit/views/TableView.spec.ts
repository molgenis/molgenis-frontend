import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableView from '@/views/TableView.vue'
import Vuex from 'vuex'

describe('TableView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any
  let actions: any
  let getters: any

  beforeEach(() => {
    state = {
      shoppingFilter: false,
      tableMeta: { idAttribute: 'id' },
      dataDisplayLayout: 'TableView',
      shoppedEntityItems: [1, 3]
    }
    mutations = {
      toggleShoppingItems: jest.fn()
    }
    actions = {
      fetchTableViewData: jest.fn()
    }
    getters = {
      filterRsql: jest.fn().mockReturnValue(null)
    }
    store = new Vuex.Store({
      state, mutations, actions, getters
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(TableView, { store,
      localVue,
      propsData: { entitiesToShow: [{ id: '1' }] } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
