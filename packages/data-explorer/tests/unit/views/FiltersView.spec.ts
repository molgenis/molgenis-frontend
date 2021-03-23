import { createLocalVue, shallowMount } from '@vue/test-utils'
import FiltersView from '@/views/FiltersView.vue'
import Vuex from 'vuex'
import getters from '@/store/explorer/getters'
import Router from 'vue-router'
import { routes } from '@/routes'

const mocks = {
  $t: (msg: any) => msg
}

const stubs = ['font-awesome-icon']

describe('FiltersView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Router)

  let store: any
  let state: any
  let mutations: any
  const router = new Router({ routes })

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
      modules: {
        explorer: { getters, mutations, namespaced: true, state }
      }
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(FiltersView, { store, localVue, router, mocks, stubs })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show/hides the filters', async () => {
    const wrapper = shallowMount(FiltersView, { store, localVue, router, mocks, stubs })
    expect(wrapper.vm.$router.currentRoute.query.hideSidebar).toBe('false')
    await wrapper.find('.hide-filters').trigger('click')
    expect(wrapper.vm.$router.currentRoute.query.hideSidebar).toBe('true')
  })
})
