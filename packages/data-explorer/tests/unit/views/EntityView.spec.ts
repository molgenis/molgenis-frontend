import { shallowMount, createLocalVue } from '@vue/test-utils'
import EntityView from '@/views/EntityView.vue'
import Vuex from 'vuex'

describe('EntityView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any
  let getters: any

  beforeEach(() => {
    state = {
      shoppingFilter: false,
      entityMeta: { idAttribute: 'id' },
      shoppedEntityItems: ['1', '3'],
      dataDisplayLayout: 'cards'
    }
    mutations = {
      toggleShoppingItems: jest.fn()
    }
    getters = {
      activeEntityData: jest.fn().mockReturnValue({
        items: [
          { data: { id: '1' } },
          { data: { id: '2' } },
          { data: { id: '3' } }
        ] })
    }
    store = new Vuex.Store({
      state, mutations, getters
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(EntityView, { store, localVue, propsData: { isShop: false } })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can filter selected shop items', () => {
    const wrapper = shallowMount(EntityView, { store, localVue, propsData: { isShop: true } })
    expect(wrapper.findAll('entity-card-stub').length).toEqual(3)
    state.shoppingFilter = true
    expect(wrapper.findAll('entity-card-stub').length).toEqual(2)
  })
})
