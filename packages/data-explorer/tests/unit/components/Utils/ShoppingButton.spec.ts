import { shallowMount } from '@vue/test-utils'
import ShoppingButton from '@/components/Utils/ShoppingButton.vue'

describe('ShoppingButton.vue', () => {
  it('toggles state', () => {
    const wrapper = shallowMount(ShoppingButton, { propsData: { showShop: true } })
    expect(wrapper.classes()).toContain('btn-primary')
    wrapper.setProps({ showShop: false })
    expect(wrapper.classes()).toContain('btn-outline-primary')
  })
})
