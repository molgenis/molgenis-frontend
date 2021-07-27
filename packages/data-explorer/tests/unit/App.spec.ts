import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import Vuex from 'vuex'

describe('App.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let actions: any

  beforeEach(() => {
    state = {
      dataDisplayLayout: 'ClipboardView'
    }
    actions = {
      fetchFormSettings: jest.fn()
    }
    store = new Vuex.Store({ modules: { explorer: { namespaced: true, state, actions } } })
  })

  it('exists', () => {
    const wrapper = shallowMount(App, { store, localVue, stubs: ['router-view'] })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('fetches form settings', () => {
    shallowMount(App, { store, localVue, stubs: ['router-view'] })
    expect(actions.fetchFormSettings).toHaveBeenCalled()
  })
})
