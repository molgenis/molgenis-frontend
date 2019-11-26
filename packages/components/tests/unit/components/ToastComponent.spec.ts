import { shallowMount } from '@vue/test-utils'
import ToastComponent from '@/components/ToastComponent.vue'

describe('ToastComponent.vue', () => {
  it('shows information', () => {
    const wrapper = shallowMount(ToastComponent, { propsData: { type: 'warning', message: 'test' } })
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.find('#message-span').text()).toBe('test')
    expect(wrapper.find('#alert-message').classes()).toContain('alert-warning')
  })
})

describe('ToastComponent.vue', () => {
  it('can hide after some set time', (done) => {
    const wrapper = shallowMount(ToastComponent, { propsData: { type: 'warning', message: 'time test', autoHideOnType: ['warning'], autoHideTime: 10 } })
    expect(wrapper.emitted().toastCloseBtnClicked).not.toBeDefined()
    setTimeout(() => {
      expect(wrapper.emitted().toastCloseBtnClicked).toBeDefined()
      done()
    }, 15)
  })
})
