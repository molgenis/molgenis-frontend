import { createLocalVue, shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/DataView/EntityCard.vue'
import Vuex from 'vuex'

describe('EntityCard.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let mutations: any

  beforeEach(() => {
    mutations = {
      toggleShoppingItems: jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(EntityCard, { propsData: { id: 'none' } })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('add items to shoppingcart', () => {
    const wrapper = shallowMount(EntityCard, { store, localVue, propsData: { id: 'test', isSelected: false, isShop: true } })
    wrapper.find('shopping-button-stub').trigger('click')
    expect(mutations.toggleShoppingItems).toBeCalledTimes(1)
    wrapper.setProps({ id: 'test', isSelected: false, isShop: false })
    wrapper.find('shopping-button-stub').trigger('click')
    expect(mutations.toggleShoppingItems).toBeCalledTimes(1)
  })
})
