import { shallowMount } from '@vue/test-utils'
import CartSelectionToast from '@/components/CartSelectionToast.vue'

describe('CartSelectionToast.vue', () => {
  it('renders the CartSelectionToast', () => {
    const wrapper = shallowMount(CartSelectionToast)
    expect(wrapper.text()).toMatch('Request items')
  })
})
