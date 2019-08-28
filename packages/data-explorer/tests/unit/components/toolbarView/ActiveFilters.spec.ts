import { shallowMount } from '@vue/test-utils'
import ActiveFilters from '@/components/toolbarView/ActiveFilters.vue'

describe('ActiveFilters.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(ActiveFilters)
    expect(wrapper.exists()).toBeTruthy()
  })
})
