import { shallowMount } from '@vue/test-utils'
import InfoIconButton from '@/components/InfoIconButton.vue'

describe('InfoIconButton.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(InfoIconButton, { propsData: { name: 'name' } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
