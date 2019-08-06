import { shallowMount, createLocalVue } from '@vue/test-utils'
import ToolbarView from '@/views/ToolbarView.vue'
import Vuex from 'vuex'

describe('ToolbarView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any

  beforeEach(() => {
    state = {
      dataDisplayLayout: 'cards',
      showFilters: true
    }
    mutations = {
      setShowFilters: jest.fn(),
      setDataDisplayLayout: jest.fn()
    }
    store = new Vuex.Store({
      state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show/hides the filters', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('info-icon-button-stub[name="Hide filter"]').trigger('click')
    expect(mutations.setShowFilters.mock.calls.length > 0).toBeTruthy()
  })

  it('can change to card/table layout', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('info-icon-button-stub[name="Table layout"]').trigger('click')
    expect(mutations.setDataDisplayLayout.mock.calls.length > 0).toBeTruthy()
  })
})
