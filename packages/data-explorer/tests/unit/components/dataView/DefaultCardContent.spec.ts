import { shallowMount } from '@vue/test-utils'
import DefaultCardContent from '@/components/dataView/DefaultCardContent.vue'

describe('CustomCardContent.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(DefaultCardContent, { propsData: { dataLabel: '', dataContents: {}, numberOfAttributes: 5, collapseLimit: 5 } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
