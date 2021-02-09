import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableView from '@/views/TableView.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('TableView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(VueRouter)
  let router = new VueRouter({ routes: [{ path: '/mock-path', name: 'main-view' }] })
  let store: any
  let state: any
  let mutations: any
  let actions: any
  let getters: any

  beforeEach(() => {
    state = {
      showSelected: false,
      tableSettings: {
        isShop: false
      },
      sort: {
        sortColumnName: 'sortedColumnName',
        isSortOrderReversed: false
      },
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
      selectedItemIds: [1, 3],
      hiddenColumns: []
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
      router,
      propsData: {
        entitiesToShow: [{ id: '1' }]
      } })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('handleSortEvent on non sorted column', () => {
    it('sets the column to sort', () => {
      const wrapper = shallowMount(TableView, { store, localVue, router, propsData: { entitiesToShow: [{ id: '1' }] } })
      // @ts-ignore
      wrapper.vm.handleSortEvent('my-column-id')
      expect(router.currentRoute.query).toEqual({ 'sort': 'my-column-id' })
    })
  })

  describe('handleSortEvent on sorted column', () => {
    it('flips the sort order', () => {
      const wrapper = shallowMount(TableView, { store, localVue, router, propsData: { entitiesToShow: [{ id: '1' }] } })
      // @ts-ignore
      wrapper.vm.handleSortEvent(state.sort.sortColumnName)
      expect(router.currentRoute.query).toEqual({ 'sort': '-sortedColumnName' })
    })
  })

  describe('visibleColumns', () => {
    it('should reduce the metaData to a list of column objects that drives the table', () => {
      let localThis:any = {
        tableMeta: state.tableMeta,
        hiddenColumns: []
      }

      // @ts-ignore
      expect(TableView.computed.visibleColumns.call(localThis)).toEqual([
        { expression: undefined, id: '1', name: 'col1', refEntityType: undefined, type: undefined },
        { expression: undefined, id: '3', name: 'col3', refEntityType: undefined, type: undefined }
      ])

      localThis.hiddenColumns = ['col3']
      // @ts-ignore
      expect(TableView.computed.visibleColumns.call(localThis)).toEqual([
        { expression: undefined, id: '1', name: 'col1', refEntityType: undefined, type: undefined }
      ])
    })
  })
})
