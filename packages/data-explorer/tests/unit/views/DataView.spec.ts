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
      tableSettings: {},
      showSelected: false,
      selectedItemIds: [],
      tableMeta: {},
      tableData: {},
      filters: {
        hideSidebar: false,
        definition: [],
        shown: [],
        selections: {}
      },
      searchText: ''
    }
    getters = {
      activeEntityData: jest.fn()
    }
    mutations = {
      setSearchText: jest.fn(),
      setHideFilters: jest.fn(),
      setShowSelected: jest.fn(),
      setSelectedItems: jest.fn(),
      setFilterSelection: jest.fn()
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

  describe('cartSelectionToast component', () => {
    it('should hide filters and change to selection list when openSelectionList is called', () => {
      const wrapper = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      wrapper.vm.openSelectionList()
      expect(mutations.setShowSelected).toHaveBeenCalledWith(state, true)
      expect(mutations.setHideFilters).toHaveBeenCalledWith(state, true)
    })

    it('should find a name to use as display label', () => {
      const wrapper = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      expect(wrapper.vm.displayName).toEqual('name')

      store.state.tableMeta = { labelAttribute: { name: 'label' } }
      const wrapper2 = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      expect(wrapper2.vm.displayName).toEqual('label')
    })

    it('should add names to display to the items in the shoppingcart', () => {
      const wrapper = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      expect(wrapper.vm.handleSelectionItems).toEqual([])

      store.state.tableMeta = { labelAttribute: { name: 'label' } }
      store.state.tableData = { items: [{ label: 'item1', id: '1' }, { label: 'item2', id: '2' }] }
      store.state.selectedItemIds = ['1', '2']

      const wrapper2 = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      expect(wrapper2.vm.handleSelectionItems).toEqual([{ name: 'item1', id: '1' }, { name: 'item2', id: '2' }])
    })

    it('should remove names to display from items before returning them', () => {
      const wrapper = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      wrapper.vm.handleSelectionItems = [{ name: 'item1', id: '1' }, { name: 'item2', id: '2' }]
      expect(mutations.setSelectedItems).toHaveBeenCalledWith(state, ['1', '2'])
    })
  })

  describe('when the search text is non empty', () => {
    let wrapper: any
    beforeEach(() => {
      store.state.searchText = 'my search'
      wrapper = shallowMount(DataView, { store, localVue })
    })

    it('should add search to the active filter selection', () => {
      // @ts-ignore
      expect(wrapper.vm.activeFilterSelections).toEqual({ _search: 'my search' })
    })

    it('should add search to the active filter selection', () => {
      // @ts-ignore
      expect(wrapper.vm.filterDefinitions).toEqual([{
        type: 'string',
        label: 'search',
        name: '_search'
      } ])
    })
  })
})
