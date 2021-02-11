import { createLocalVue, shallowMount } from '@vue/test-utils'
import FiltersView from '@/views/FiltersView.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const mocks = { $t: (msg: any) => msg }

describe('FiltersView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(VueRouter)
  localVue.filter('i18n', mocks.$t)
  let store: any
  let state: any
  let mutations: any
  let router = new VueRouter()

  beforeEach(() => {
    state = {
      filters: {
        hideSidebar: false,
        definition: [],
        shown: [],
        selections: {}
      }
    }
    mutations = {
      setHideFilters: jest.fn(),
      setFiltersShown: jest.fn()
    }
    store = new Vuex.Store({
      state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(FiltersView, { store, localVue, router, mocks })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show/hides the filters', () => {
    const wrapper = shallowMount(FiltersView, { store, localVue, router, mocks })
    wrapper.find('.hide-filters').trigger('click')
    expect(mutations.setHideFilters.mock.calls.length > 0).toBeTruthy()
  })
})
