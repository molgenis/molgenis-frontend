import { createLocalVue, shallowMount } from '@vue/test-utils'
import EntityCards from '@/components/DataView/EntityCards.vue'
import Vuex from 'vuex'

describe('EntityCards.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any

  beforeEach(() => {
    state = {
      shoppingFilter: false,
      entityMeta: { idAttribute: 'id' },
      shoppedEntityItems: ['1', '3']
    }
    store = new Vuex.Store({
      state
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(EntityCards, { store,
      localVue,
      propsData: {
        entities: { items: [
          { data: { id: '1' } }
        ] }
      } })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can filter selected shop items', () => {
    const wrapper = shallowMount(EntityCards, { store,
      localVue,
      propsData: {
        entities: { items: [
          { data: { id: '1' } },
          { data: { id: '2' } },
          { data: { id: '3' } }
        ] },
        isShop: true
      } })
    expect(wrapper.findAll('entity-card-stub').length).toEqual(3)
    state.shoppingFilter = true
    expect(wrapper.findAll('entity-card-stub').length).toEqual(2)
  })
})
