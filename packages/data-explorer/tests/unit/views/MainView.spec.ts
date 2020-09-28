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
    $eventBus: bus,
    $bvModal: {
      msgBoxConfirm: jest.fn()
    }
  }

  beforeEach(() => {
    state = {
      dataDisplayLayout: 'CardView',
      tableName: 'tableName',
      activeEntity: 'it_emx_datatypes_TypeTest',
      filters: {
        hideSidebar: false
      }
    }

    mutations = {
      clearToast: jest.fn(),
      setHideFilters: jest.fn(),
      setActiveEntity: jest.fn(),
      setTableName: jest.fn()
    }

    getters = {
      isUserAuthenticated: jest.fn()
    }

    actions = {
      deleteRow: jest.fn(),
      fetchTableMeta: jest.fn(),
      fetchCardViewData: jest.fn(),
      fetchTableViewData: jest.fn(),
      hasSettingsTable: jest.fn()
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

  describe('fetchViewData', () => {
    it('if table name is changed, should fetch settings and metaData ', async (done) => {
      // @ts-ignore
      await wrapper.vm.fetchViewData('new table name')
      expect(actions.fetchTableMeta).toHaveBeenCalled()
      expect(mutations.setTableName).toHaveBeenCalled()
      done()
    })

    it('if table name is not changed, should not fetch settings and meta ', async (done) => {
      actions.fetchTableMeta.mockReset()
      mutations.setTableName.mockReset()
      // @ts-ignore
      await wrapper.vm.fetchViewData('tableName')
      expect(actions.fetchTableMeta).not.toHaveBeenCalled()
      expect(mutations.setTableName).not.toHaveBeenCalled()
      done()
    })

    it('if selected view is cardView, should fetch card data', async (done) => {
      // @ts-ignore
      await wrapper.vm.fetchViewData('tableName')
      expect(actions.fetchCardViewData).toHaveBeenCalled()
      done()
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
      expect(modules.header.actions.fetchBreadcrumbs).toHaveBeenCalled()
    })
  })
})
