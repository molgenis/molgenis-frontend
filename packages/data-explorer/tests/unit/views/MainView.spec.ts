import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainView from '@/views/MainView.vue'
import Vuex from 'vuex'
import Vue from 'vue'

let mocks: any
let state: any
let mutations: any
let getters: any
let actions: any
let wrapper: any
let offSpy: any

function getWrapper (options:any = {}) {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const bus = new Vue()
  offSpy = jest.spyOn(bus, '$off')

  mocks = {
    $route: { params: {}, query: { view: 'CardView' } },
    $router: {
      currentRoute: { name: 'currentRouteName', path: 'currentRoutePath' },
      push: jest.fn()
    },
    $eventBus: bus,
    $bvModal: {
      msgBoxConfirm: jest.fn()
    },
    $t: (msg: any) => msg
  }

  mutations = {
    clearToast: jest.fn(),
    setToasts: jest.fn(),
    setHideFilters: jest.fn(),
    setActiveEntity: jest.fn(),
    setTableName: jest.fn(),
    setFilterSelection: jest.fn(),
    setSearchText: jest.fn(),
    setPagination: jest.fn(),
    setRouteQuery: jest.fn(),
    setDataDisplayLayout: jest.fn(),
    setLoading: jest.fn()
  }

  if (!options.getters) {
    getters = {
      isUserAuthenticated: jest.fn(),
      compressedRouteFilter: jest.fn()
    }
  }

  actions = {
    deleteRow: jest.fn(),
    fetchTableMeta: jest.fn(),
    fetchTablePermissions: jest.fn(),
    fetchCardViewData: jest.fn(),
    fetchTableViewData: jest.fn(),
    fetchViewData: jest.fn()
  }

  state = {
    toasts: [],
    dataDisplayLayout: 'CardView',
    tableName: 'tableName',
    activeEntity: 'it_emx_datatypes_TypeTest',
    filters: {
      hideSidebar: false,
      definition: [],
      shown: [],
      selections: {}
    },
    tablePagination: { count: 0, loading: false, page: 1, size: 20 }
  }

  const modules = {
    account: {
      namespaced: true,
      actions: {
        fetchContext: jest.fn()
      }
    },
    header: {
      namespaced: true,
      actions: {
        fetchBreadcrumbs: jest.fn()
      },
      state: { breadcrumbs: [] }
    }
  }

  const store = new Vuex.Store({ state, mutations, actions, getters, modules })
  return shallowMount(MainView, { store, localVue, mocks, stubs: ['b-overlay', 'font-awesome-icon'] })
}

jest.mock('@/views/FiltersView.vue')

describe('MainView.vue', () => {
  beforeEach(() => {
    wrapper = getWrapper()
  })

  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('saveFilterState method', () => {
    it('should clear the search text if search is not part of the filter', () => {
      const newSelections = {}
      // @ts-ignore
      wrapper.vm.saveFilterState(newSelections)
      expect(mutations.setSearchText).toHaveBeenCalled()
      expect(mocks.$router.push).toHaveBeenCalled()
    })

    it('should not clear the search text if search is part of the filter', () => {
      const newSelections = { _search: 'mock selection' }
      // @ts-ignore
      wrapper.vm.saveFilterState(newSelections)
      expect(mutations.setSearchText).not.toHaveBeenCalled()
      expect(mocks.$router.push).toHaveBeenCalled()
    })
  })

  describe('handle delete events', () => {
    describe('when user confirms delete', () => {
      it('should call the deleteRow action passing the key', async (done) => {
        mocks.$bvModal.msgBoxConfirm.mockResolvedValue(true)
        // @ts-ignore
        wrapper.vm.$eventBus.$emit('delete-item', 'my-key')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(actions.deleteRow).toHaveBeenCalledWith(expect.anything(), { rowId: 'my-key' })
        done()
      })
    })

    describe('when user cancels delete', () => {
      it('should not call the delete row action', async (done) => {
        mocks.$bvModal.msgBoxConfirm.mockResolvedValue(false)
        // @ts-ignore
        wrapper.vm.$eventBus.$emit('delete-item', 'my-key')
        await wrapper.vm.$nextTick()
        expect(actions.deleteRow).not.toHaveBeenCalledWith()
        done()
      })
    })
  })

  describe('when destroyed', () => {
    it('should remove the delete-item event listener', () => {
      wrapper.destroy()
      expect(offSpy).toHaveBeenCalled()
    })
  })

  describe('before route update', () => {
    it('fetch data before calling next', async (done) => {
      actions.fetchTableMeta.mockClear()
      // @ts-ignore
      actions.fetchTableViewData.mockResolvedValue()
      const next = jest.fn()
      const from = {
        params: {
          entity: 'entity'
        },
        query: { view: 'CardView' }
      }
      const to = {
        params: {
          entity: 'entity'
        },
        query: { view: 'CardView' }
      }
      // @ts-ignore use call to pass vm context
      await wrapper.vm.$options.beforeRouteUpdate.call(wrapper.vm, to, from, next)
      expect(actions.fetchTableMeta).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
      done()
    })

    it('fetch metadata and data before calling next', async (done) => {
      actions.fetchTableMeta.mockClear()
      // @ts-ignore
      actions.fetchTableViewData.mockResolvedValue()
      const next = jest.fn()
      const from = {
        params: {
          entity: 'entity'
        },
        query: { view: 'CardView' }
      }
      const to = {
        params: {
          entity: 'other'
        },
        query: { view: 'CardView' }
      }
      // @ts-ignore use call to pass vm context
      await wrapper.vm.$options.beforeRouteUpdate.call(wrapper.vm, to, from, next)
      expect(actions.fetchTableMeta).toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
      done()
    })
  })

  describe('when user is authenticated', () => {
    it('should add the Breadcrumb bar', async () => {
      getters.isUserAuthenticated.mockReturnValue(true)
      wrapper = getWrapper({ getters })
      expect(wrapper.find('breadcrumb-bar-stub').exists()).toBeTruthy()
    })
  })

  describe('toasts getter and setter called', () => {
    it('should trigger getter and setter for toasts', async () => {
      expect(mutations.setToasts).toHaveBeenCalledTimes(0)
      wrapper.vm.toasts = [{ message: 'bar', type: 'success' }]
      expect(mutations.setToasts).toHaveBeenCalledTimes(1)
    })
  })
})
