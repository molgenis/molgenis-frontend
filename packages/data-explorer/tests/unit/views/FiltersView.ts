import { shallowMount } from '@vue/test-utils'
import FiltersView from '@/views/FiltersView.vue'

describe('FiltersView.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(FiltersView)
    expect(wrapper.exists()).toBeTruthy()
  })
})
