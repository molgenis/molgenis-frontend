import { shallowMount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  const slots = {
    default: 'Hy there'
  }
  it('renders the button with the passed slot', () => {
    const wrapper = shallowMount(AppButton, { slots })
    expect(wrapper.text()).toMatch('Hy there')
  })
  it('fire "click" and "gator" event when clicked', async (done) => {
    const wrapper = shallowMount(AppButton, { slots })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().gator).toBeTruthy()
    done()
  })
})
