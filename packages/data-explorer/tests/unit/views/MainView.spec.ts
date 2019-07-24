import { shallowMount } from '@vue/test-utils'
import MainView from '@/views/MainView.vue'

describe('MainView.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(MainView)
    expect(wrapper.exists()).toBeTruthy()
  })
})
