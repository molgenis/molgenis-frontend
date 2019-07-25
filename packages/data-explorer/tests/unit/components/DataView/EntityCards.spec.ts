import { shallowMount } from '@vue/test-utils'
import EntityCards from '@/components/DataView/EntityCards.vue'

describe('EntityCards.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(EntityCards)
    expect(wrapper.exists()).toBeTruthy()
  })
})
