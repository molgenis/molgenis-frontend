import { shallowMount } from '@vue/test-utils'
import CustomCardContent from '@/components/dataView/CustomCardContent.vue'

describe('CustomCardContent.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(CustomCardContent, { propsData: { id: 'id', record: {}, customCode: '' } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
