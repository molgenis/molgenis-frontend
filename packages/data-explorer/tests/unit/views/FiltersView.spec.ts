import { createLocalVue, shallowMount } from '@vue/test-utils'
import FiltersView from '@/views/FiltersView.vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import routes from '@/router'
import Router from 'vue-router'

const mocks = {
  $t: (msg: any) => msg
}

describe('FiltersView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(Router)
  localVue.filter('i18n', mocks.$t)
  let store: any
  let state: any
  let mutations: any
  let router = new Router({ routes })

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
      getters, state, mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(FiltersView, { store, localVue, router, mocks })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show/hides the filters', async () => {
    const wrapper = shallowMount(FiltersView, { store, localVue, router, mocks })
    expect(wrapper.vm.$router.currentRoute.query.filterbar).toBe('1')
    await wrapper.find('.hide-filters').trigger('click')
    expect(wrapper.vm.$router.currentRoute.query.filterbar).toBe('0')
  })
})
