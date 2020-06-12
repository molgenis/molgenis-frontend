import { shallowMount, createLocalVue } from '@vue/test-utils'
import ToolbarView from '@/views/ToolbarView.vue'
import Vuex from 'vuex'
import ApplicationState from '@/types/ApplicationState'

describe('ToolbarView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: ApplicationState
  let mutations: any

  beforeEach(() => {
    state = {
      toast: null,
      settingsTable: 'de_dataexplorer_table_settings',
      tableName: 'root_hospital_patients',
      tableData: null,
      tableMeta: null,
      dataDisplayLayout: 'CardView',
      dataDisplayLimit: 100,
      defaultEntityData: null,
      showShoppingCart: false,
      shoppedEntityItems: [],
      tableSettings: {
        defaultFilters: [],
        settingsRowId: null,
        collapseLimit: 5,
        customCardCode: null,
        customCardAttrs: '',
        isShop: false
      },
      filters: {
        hideSidebar: false,
        definition: [],
        shown: [],
        selections: {}
      },
      bookmark: '',
      searchText: '',
      componentRoute: false
    }
    mutations = {
      setHideFilters: jest.fn(),
      setDataDisplayLayout: jest.fn(),
      setShowShoppingCart: jest.fn(),
      setFilterSelection: jest.fn(),
      setSearchText: jest.fn()
    }
    store = new Vuex.Store({
      state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can change to table layout', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('button.table-layout').trigger('click')
    // @ts-ignore
    expect(mutations.setDataDisplayLayout).toHaveBeenCalledWith(state, 'TableView')
  })

  it('can change to card layout', () => {
    state.dataDisplayLayout = 'TableView'
    store = new Vuex.Store({
      state, mutations
    })
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('button.card-layout').trigger('click')
    // @ts-ignore
    expect(mutations.setDataDisplayLayout).toHaveBeenCalledWith(state, 'CardView')
  })

  it('opens shoppingcart', () => {
    state.tableSettings.isShop = true
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    const button = wrapper.find('button.show-cart')
    button.trigger('click')
    expect(mutations.setShowShoppingCart).toHaveBeenCalledWith(state, true)
    expect(mutations.setHideFilters).toHaveBeenCalledWith(state, true)
  })

  describe('add row button', () => {
    it('should render the add button as a link to the data-row-edit', () => {
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > div > a').attributes().href).toEqual('/plugin/data-row-edit/root_hospital_patients')
    })

    it('should not be shown in shoppingcart mode', () => {
      store.state.showShoppingCart = true
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > a').exists()).toBe(false)
    })

    afterEach(() => { store.state.showShoppingCart = false })
  })

  describe('searchString value is set', () => {
    it('should persist the value in the store', () => {
      store.state.showShoppingCart = true
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      wrapper.setData({ searchText: 'demo' })
      expect(mutations.setSearchText).toHaveBeenCalled()
    })
  })
})
