import { shallowMount } from '@vue/test-utils'
import DataView from '@/views/DataView.vue'

describe('DataView.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(DataView)
    expect(wrapper.exists()).toBeTruthy()
  })
})
