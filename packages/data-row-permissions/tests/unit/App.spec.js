import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { routes } from '../../src/router'
import { mockMutations, mockState } from './mocks'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('App.vue', () => {
  let actions, uiContextActions, state, mutations, store, router

  beforeEach(() => {
    actions = {
      getAllUsers: jest.fn(),
      getAllPermissionsTypes: jest.fn()
    }

    uiContextActions = {
      fetchContext: jest.fn()
    }

    state = mockState
    mutations = mockMutations

    store = new Vuex.Store({
      state,
      actions,
      mutations,
      modules: {
        uiContext: {
          namespaced: true,
          actions: uiContextActions
        }
      }
    })

    router = new VueRouter({ routes })
  })

  it('retrieves the context, all permission types and all users on startup', () => {
    shallowMount(App, {
      store,
      router,
      localVue
    })

    expect(uiContextActions.fetchContext).toHaveBeenCalled()
    expect(actions.getAllPermissionsTypes).toHaveBeenCalled()
    expect(actions.getAllUsers).toHaveBeenCalled()
  })

  it('has a handle for unsyncing routersync on destroy', () => {
    const wrapper = shallowMount(App, {
      store,
      router,
      localVue
    })

    wrapper.vm.$data.unsync = jest.fn()
    wrapper.destroy()

    expect(wrapper.vm.$data.unsync).toHaveBeenCalled()
  })
})
