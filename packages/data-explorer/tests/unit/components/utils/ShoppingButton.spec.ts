import { createLocalVue, shallowMount } from '@vue/test-utils'
import ShoppingButton from '@/components/utils/ShoppingButton.vue'
import Vuex from 'vuex'

describe('ShoppingButton.vue', () => {
  const localVue = createLocalVue()
  const stubs = [ 'font-awesome-icon' ]
  localVue.use(Vuex)
  let store: any
  let mutations: any

  beforeEach(() => {
    mutations = {
      toggleSelectedItems: jest.fn()
    }
    store = new Vuex.Store({ modules: { explorer: { mutations, namespaced: true } } })
  })

  it('toggles state', async () => {
    const wrapper = shallowMount(ShoppingButton, { store, stubs, localVue, propsData: { id: 'test', isSelected: true } })
    expect(wrapper.classes()).toContain('btn-primary')
    await wrapper.setProps({ isSelected: false })
    expect(wrapper.classes()).toContain('btn-outline-secondary')
  })
  it('add items to shoppingcart', async () => {
    const wrapper = shallowMount(ShoppingButton, { store, stubs, localVue, propsData: { id: 'test', isSelected: false } })
    await wrapper.find('.shopping-button').trigger('click')
    expect(mutations.toggleSelectedItems).toBeCalledTimes(1)
  })
})
