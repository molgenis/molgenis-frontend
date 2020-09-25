import { createLocalVue, shallowMount } from '@vue/test-utils'
import ShoppingButton from '@/components/utils/ShoppingButton.vue'
import Vuex from 'vuex'

describe('ShoppingButton.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let mutations: any

  beforeEach(() => {
    mutations = {
      toggleSelectedItems: jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
  })

  it('toggles state', () => {
    const wrapper = shallowMount(ShoppingButton, { store, localVue, propsData: { id: 'test', isSelected: true } })
    expect(wrapper.classes()).toContain('btn-primary')
    wrapper.setProps({ isSelected: false })
    expect(wrapper.classes()).toContain('btn-outline-secondary')
  })
  it('add items to shoppingcart', () => {
    const wrapper = shallowMount(ShoppingButton, { store, localVue, propsData: { id: 'test', isSelected: false } })
    wrapper.find('.shopping-button').trigger('click')
    expect(mutations.toggleSelectedItems).toBeCalledTimes(1)
  })
})
