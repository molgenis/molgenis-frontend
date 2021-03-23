import { shallowMount, createLocalVue } from '@vue/test-utils'
import DataView from '@/views/DataView.vue'
import Vuex from 'vuex'
import Vue from 'vue'

describe('DataView.vue', () => {
  const localVue = createLocalVue()
  localVue.directive('b-modal', {})
  const stubs = ['b-modal']
  const eventBus = new Vue()

  localVue.use(Vuex)
  let store: any
  let state: any
  let getters: any
  let actions: any
  let mutations: any
  let modules: any
  const mocks: any = {
    $eventBus: eventBus,
    $bvModal: {
      show: jest.fn()
    }
  }

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

    modules = {
      explorer: { actions, getters, mutations, namespaced: true, state },
      reference: {
        namespaced: true,
        actions: {
          fetchRefData: jest.fn()
        }
      }
    }

    const metaData = {
      label: 'reLabel',
      id: 'idLabel'
    }
    const data = [{
      id: 'id',
      label: 'label'
    }]
    modules.reference.actions.fetchRefData.mockResolvedValue({ metaData, data })

    store = new Vuex.Store({ modules })
  })

  it('exists', () => {
    const wrapper = shallowMount(DataView, { store, localVue, mocks, stubs })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('cartSelectionToast component', () => {
    it('should hide filters and change to selection list when openSelectionList is called', () => {
      const wrapper = shallowMount(DataView, { store, localVue, mocks, stubs })
      // @ts-ignore
      wrapper.vm.openSelectionList()
      expect(mutations.setShowSelected).toHaveBeenCalledWith(state, true)
      expect(mutations.setHideFilters).toHaveBeenCalledWith(state, true)
    })

    it('should add names to display to the items in the shopping cart', () => {
      getters.clipBoardItems.mockReturnValueOnce([{ name: 'item1', id: '1' }])
      const wrapper = shallowMount(DataView, { store, localVue, mocks, stubs })
      // @ts-ignore
      expect(wrapper.vm.handleSelectionItems).toEqual([{ name: 'item1', id: '1' }])
    })

    it('should remove names to display from items before returning them', () => {
      const wrapper = shallowMount(DataView, { store, localVue, mocks, stubs })
      // @ts-ignore
      wrapper.vm.handleSelectionItems = [{ name: 'item1', id: '1' }, { name: 'item2', id: '2' }]
      expect(mutations.setSelectedItems).toHaveBeenCalledWith(state, ['1', '2'])
    })
  })

  describe('when the search text is non empty', () => {
    let wrapper: any
    beforeEach(() => {
      store.state.explorer.searchText = 'my search'
      wrapper = shallowMount(DataView, { store, localVue, mocks, stubs })
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
      }])
    })
  })

  describe('handle show ref table event', () => {
    let wrapper: any
    beforeEach(() => {
      wrapper = shallowMount(DataView, { store, localVue, mocks, stubs })
    })
    it('should fetch the refData and then update the ref data and set isLoaded to true', async (done) => {
      const refEntityType = 'myRefType'
      const value = 'myValue'
      // @ts-ignore
      await wrapper.vm.$eventBus.$emit('show-reference-table', { refEntityType, value })
      await wrapper.vm.$nextTick()
      expect(modules.reference.actions.fetchRefData).toHaveBeenCalled()
      expect(wrapper.vm.refTableData).toEqual([{
        label: 'label',
        id: 'id'
      }])
      expect(wrapper.vm.refTableMetaData).toEqual({
        label: 'reLabel',
        id: 'idLabel'
      })
      expect(wrapper.vm.isReferenceModalDataLoaded).toBe(true)

      wrapper.vm.resetRefState()
      expect(wrapper.vm.refTableData).toEqual([])
      expect(wrapper.vm.refTableMetaData).toEqual({})
      expect(wrapper.vm.isReferenceModalDataLoaded).toBe(false)
      done()
    })
  })
})
