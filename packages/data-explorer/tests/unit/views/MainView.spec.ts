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
  let actions: any
  const mocks: any = {
    $route: { params: {} },
    $eventBus: bus,
    $bvModal: {
      msgBoxConfirm: jest.fn()
    }
  }

  beforeEach(() => {
    state = {
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

    actions = {
      deleteRow: jest.fn(),
      getTableSettings: jest.fn(),
      fetchTableMeta: jest.fn(),
      fetchCardViewData: jest.fn(),
      fetchTableViewData: jest.fn()
    }

    store = new Vuex.Store({
      state, mutations, actions
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(MainView, { store, localVue, mocks })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('handle delete events', () => {
    describe('when user confirms delete', () => {
      it('should call the deleteRow action passing the key', async (done) => {
        mocks.$bvModal.msgBoxConfirm.mockResolvedValue(true)
        const wrapper = shallowMount(MainView, { store, localVue, mocks })
        // @ts-ignore
        wrapper.vm.$eventBus.$emit('delete-item', 'my-key')
        await wrapper.vm.$nextTick()
        expect(actions.deleteRow).toHaveBeenCalledWith(expect.anything(), { rowId: 'my-key' }, undefined)
        done()
      })
    })

    describe('when user cancels delete', () => {
      it('should not call the delete row action', async (done) => {
        mocks.$bvModal.msgBoxConfirm.mockResolvedValue(false)
        const wrapper = shallowMount(MainView, { store, localVue, mocks })
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
      const wrapper = shallowMount(MainView, { store, localVue, mocks })
      wrapper.destroy()
      expect(offSpy).toHaveBeenCalled()
    })
  })
})
