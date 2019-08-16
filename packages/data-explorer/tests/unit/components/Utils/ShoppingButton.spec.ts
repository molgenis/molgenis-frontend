import { shallowMount } from '@vue/test-utils'
import ShoppingButton from '@/components/Utils/ShoppingButton.vue'

describe('ShoppingButton.vue', () => {
  it('toggles state', () => {
    const wrapper = shallowMount(ShoppingButton, { propsData: { isSelected: true } })
    expect(wrapper.classes()).toContain('btn-primary')
    wrapper.setProps({ isSelected: false })
    expect(wrapper.classes()).toContain('btn-outline-secondary')
  })
})
