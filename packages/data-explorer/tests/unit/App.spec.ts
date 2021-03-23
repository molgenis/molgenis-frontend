import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import Vuex from 'vuex'

describe('App.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any

  beforeEach(() => {
    state = {
      dataDisplayLayout: 'ClipboardView'
    }
    store = new Vuex.Store({ modules: { explorer: { namespaced: true, state } } })
  })

  it('exists', () => {
    const wrapper = shallowMount(App, { store, localVue, stubs: ['router-view'] })
    expect(wrapper.exists()).toBeTruthy()
  })
})
