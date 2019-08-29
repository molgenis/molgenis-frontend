import { shallowMount, createLocalVue } from '@vue/test-utils'
import ToolbarView from '@/views/ToolbarView.vue'
import Vuex from 'vuex'

describe('ToolbarView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any

  beforeEach(() => {
    state = {
      dataDisplayLayout: 'cards',
      hideFilters: true,
      tableSettings: {
        settingsTable: 'de_dataexplorer_table_settings',
        settingsRowId: null,
        collapseLimit: 5,
        isShop: false
      }
    }
    mutations = {
      setHideFilters: jest.fn(),
      setDataDisplayLayout: jest.fn()
    }
    store = new Vuex.Store({
      state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can change to card/table layout', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('.table-layout').trigger('click')
    expect(mutations.setDataDisplayLayout.mock.calls.length > 0).toBeTruthy()
  })
})
