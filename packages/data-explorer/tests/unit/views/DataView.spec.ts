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
      activeEntityData: jest.fn(),
      tableIdAttributeName: jest.fn(),
      tableLabelAttributeName: jest.fn(),
      clipBoardItems: jest.fn()
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

  describe('cartSelectionToast component', () => {
    it('should hide filters and change to selection list when openSelectionList is called', () => {
      const wrapper = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      wrapper.vm.openSelectionList()
      expect(mutations.setShowSelected).toHaveBeenCalledWith(state, true)
      expect(mutations.setHideFilters).toHaveBeenCalledWith(state, true)
    })

    it('should add names to display to the items in the shopping cart', () => {
      getters.clipBoardItems.mockReturnValueOnce([{ name: 'item1', id: '1' }])
      const wrapper = shallowMount(DataView, { store, localVue })
      // @ts-ignore
      expect(wrapper.vm.handleSelectionItems).toEqual([{ name: 'item1', id: '1' }])
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
