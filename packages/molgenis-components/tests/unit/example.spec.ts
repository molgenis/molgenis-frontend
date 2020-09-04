import { shallowMount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('renders the button with the passed slot', () => {
    const wrapper = shallowMount(AppButton, {
      slots: {
        default: 'Hy there'
      }
    })
    expect(wrapper.text()).toMatch('Hy there')
  })
})
