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
      tableName: 'root_hospital_patients',
      tableData: null,
      tableMeta: null,
      dataDisplayLayout: 'CardView',
      defaultEntityData: null,
      showShoppingCart: false,
      shoppedEntityItems: [],
      isSettingsLoaded: false,
      tableSettings: {
        defaultFilters: [],
        settingsTable: 'de_dataexplorer_table_settings',
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
      searchText: ''
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

  describe('saveFilterState method', () => {
    let wrapper: any
    beforeEach(() => {
      wrapper = shallowMount(ToolbarView, { store, localVue })
    })
    it('should clear the search text if search is not part of the filter', () => {
      const newSelections = {}
      wrapper.vm.saveFilterState(newSelections)
      expect(mutations.setSearchText).toHaveBeenCalled()
    })
    it('should not clear the search text if search is part of the filter', () => {
      const newSelections = { _search: 'mock selection' }
      wrapper.vm.saveFilterState(newSelections)
      expect(mutations.setSearchText).not.toHaveBeenCalled()
    })
  })

  describe('when the search text is non empty', () => {
    let wrapper: any
    beforeEach(() => {
      store.state.searchText = 'my search'
      wrapper = shallowMount(ToolbarView, { store, localVue })
    })

    it('should add search to the active filter selection', () => {
      expect(wrapper.vm.activeFilterSelections).toEqual({ _search: 'my search' })
    })

    it('should add search to the active filter selection', () => {
      expect(wrapper.vm.filterDefinitions).toEqual([{
        type: 'string',
        label: 'search',
        name: '_search'
      } ])
    })
  })

  describe('add row button', () => {
    it('should render the add button as a line to the data-row-edit', () => {
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > a').attributes().href).toEqual('/plugin/data-row-edit/root_hospital_patients')
    })

    it('should not be shown in shoppingcart mode', () => {
      store.state.showShoppingCart = true
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > a').exists()).toBe(false)
    })

    afterEach(() => { store.state.showShoppingCart = false })
  })
})
