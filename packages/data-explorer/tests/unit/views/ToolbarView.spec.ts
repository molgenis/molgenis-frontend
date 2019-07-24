import { shallowMount } from '@vue/test-utils'
import ToolbarView from '@/views/ToolbarView.vue'

describe('ToolbarView.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(ToolbarView)
    expect(wrapper.exists()).toBeTruthy()
  })
})
