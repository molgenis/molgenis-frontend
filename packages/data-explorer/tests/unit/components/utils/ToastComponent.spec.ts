import { shallowMount } from '@vue/test-utils'
import ToastComponent from '@/components/utils/ToastComponent.vue'

describe('ToastComponent.vue', () => {
  it('shows information', () => {
    const wrapper = shallowMount(ToastComponent, { propsData: { type: 'warning', message: 'test' } })
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.find('#message-span').text()).toBe('test')
    expect(wrapper.find('#alert-message').classes()).toContain('alert-warning')
  })
})
