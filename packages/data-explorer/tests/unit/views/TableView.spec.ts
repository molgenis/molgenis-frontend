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
      tableSettings: {
        isShop: false
      },
      sortColumnId: 'sortedColumnId',
      isSortOrderReversed: false,
      tableMeta: {
        idAttribute: { name: 'id' },
        attributes: [
          {
            id: '1',
            name: 'col1',
            visible: true
          },
          {
            id: '2',
            name: 'col2',
            visible: false
          },
          {
            id: '3',
            name: 'col3',
            visible: true
          }
        ]
      },
      dataDisplayLayout: 'TableView',
      tableName: 'tableName',
      selectedItemIds: [1, 3]
    }
    mutations = {
      toggleSelectedItems: jest.fn(),
      setSortColumn: jest.fn(),
      setIsSortOrderReversed: jest.fn()
    }
    actions = {
      fetchTableViewData: jest.fn()
    }
    getters = {
      filterRsql: jest.fn().mockReturnValue(null),
      hasEditRights: jest.fn().mockReturnValue(true)
    }
    store = new Vuex.Store({
      state, mutations, actions, getters
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(TableView, { store,
      localVue,
      propsData: {
        entitiesToShow: [{ id: '1' }]
      } })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('handleSortEvent on non sorted column', () => {
    it('sets the column to sort', () => {
      const wrapper = shallowMount(TableView, { store, localVue, propsData: { entitiesToShow: [{ id: '1' }] } })
      // @ts-ignore
      wrapper.vm.handleSortEvent('my-column-id')
      expect(mutations.setSortColumn).toHaveBeenCalledWith(expect.objectContaining({}), 'my-column-id')
    })
  })

  describe('handleSortEvent on sorted column', () => {
    it('flips the sort order', () => {
      const wrapper = shallowMount(TableView, { store, localVue, propsData: { entitiesToShow: [{ id: '1' }] } })
      // @ts-ignore
      wrapper.vm.handleSortEvent(state.sortColumnId)
      expect(mutations.setIsSortOrderReversed).toHaveBeenCalledWith(expect.objectContaining({}), true)
    })
  })
})
