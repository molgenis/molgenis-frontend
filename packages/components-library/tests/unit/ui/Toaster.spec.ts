import { shallowMount } from '@vue/test-utils'
import Toaster from '@/components/ui/Toaster.vue'
import { localVue as getLocalVue } from '../../lib/helpers'
import { Toast } from '@/types/Toast'

const localVue = getLocalVue()

const toasts: Toast[] = []

const propsData = {
  value: toasts
}
describe('Toaster.vue', () => {
  it('renders the Toaster with default position', () => {
    const wrapper = shallowMount(Toaster, { localVue, propsData })
    expect(wrapper.html()).toMatch('<div class="c-toaster bottom-right"></div>')
  })

  it('renders the Toaster with default position and remove it after timeout', async () => {
    jest.useFakeTimers()
    const toast: Toast = {
      message: 'a message to you',
      type: 'dark',
      timeout: 1000
    }
    propsData.value = [toast]
    const wrapper = shallowMount(Toaster, { localVue, propsData })
    expect(wrapper.find('.mg-toast-message').text()).toMatch('a message to you')
    expect(wrapper.findAll('.mg-toast').length).toEqual(1)
    jest.runAllTimers()
    await localVue.nextTick()
    expect(wrapper.findAll('.mg-toast').length).toEqual(0)
  })

  it('uses default timeout if none is passed', async () => {
    jest.useFakeTimers()
    const toast: Toast = {
      message: 'time test',
      type: 'dark'
    }
    propsData.value = [toast]
    const wrapper = shallowMount(Toaster, { localVue, propsData })

    expect(wrapper.findAll('.mg-toast').length).toEqual(1)
    jest.runAllTimers()
    await localVue.nextTick()
    expect(wrapper.findAll('.mg-toast').length).toEqual(0)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000)
  })
})
