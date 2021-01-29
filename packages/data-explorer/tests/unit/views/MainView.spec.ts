import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainView from '@/views/MainView.vue'
import Vuex from 'vuex'
import Vue from 'vue'
import FiltersView from '@/views/FiltersView.vue'

jest.mock('@/views/FiltersView.vue')

describe('MainView.vue', () => {
  const localVue = createLocalVue()
  const bus = new Vue()
  const offSpy = jest.spyOn(bus, '$off')
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any
  let getters: any
  let actions: any
  let wrapper: any
  let modules: any
  const mocks: any = {
    $route: { params: {} },
    $router: {
      currentRoute: {
        name: 'currentRouteName',
        path: 'currentRoutePath'
      },
      push: jest.fn()
    },
    $eventBus: bus,
    $bvModal: {
      msgBoxConfirm: jest.fn()
    }
  }

  beforeEach(() => {
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

    mutations = {
      clearToast: jest.fn(),
      setToasts: jest.fn(),
      setHideFilters: jest.fn(),
      setActiveEntity: jest.fn(),
      setTableName: jest.fn(),
      setFilterSelection: jest.fn(),
      setSearchText: jest.fn(),
      setPagination: jest.fn(),
      setRouteQuery: jest.fn()
    }

    getters = {
      isUserAuthenticated: jest.fn(),
      compressedRouteFilter: jest.fn()
    }

    actions = {
      deleteRow: jest.fn(),
      fetchTableMeta: jest.fn(),
      fetchCardViewData: jest.fn(),
      fetchTableViewData: jest.fn(),
      fetchViewData: jest.fn()
    }

    modules = {
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
        state: {
          breadcrumbs: []
        }
      }
    }

    store = new Vuex.Store({
      state, mutations, actions, getters, modules
    })
    wrapper = shallowMount(MainView, { store, localVue, mocks })
  })

  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('saveFilterState method', () => {
    let wrapper: any
    beforeEach(() => {
      wrapper = shallowMount(MainView, { store, localVue, mocks })
    })

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
        expect(actions.deleteRow).toHaveBeenCalledWith(expect.anything(), { rowId: 'my-key' }, undefined)
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
      // @ts-ignore
      actions.fetchTableViewData.mockResolvedValue()
      const next = jest.fn()
      const from = {}
      const to = {
        params: {
          entity: 'entity'
        }
      }
      // @ts-ignore use call to pass vm context
      await wrapper.vm.$options.beforeRouteUpdate.call(wrapper.vm, to, from, next)
      expect(next).toHaveBeenCalled()
      done()
    })
  })

  describe('when user is authenticated', () => {
    beforeEach(async (done) => {
      getters.isUserAuthenticated.mockReturnValueOnce(true)
      store.getters = getters
      wrapper = shallowMount(MainView, { store, localVue, mocks })
      done()
    })
    it('should add the Breadcrumb bar', () => {
      expect(wrapper.find('breadcrumb-bar-stub').exists()).toBeTruthy()
    })
  })

  describe('toasts getter and setter called', () => {
    beforeEach(async (done) => {
      wrapper = shallowMount(MainView, { store, localVue, mocks })
      done()
    })
    it('should trigger getter and setter for toasts', async () => {
      expect(mutations.setToasts).toHaveBeenCalledTimes(0)
      wrapper.vm.toasts = [{ message: 'bar', type: 'success' }]
      expect(mutations.setToasts).toHaveBeenCalledTimes(1)
    })
  })
})
