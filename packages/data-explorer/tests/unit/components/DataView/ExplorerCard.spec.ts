import { shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/DataView/ExplorerCard.vue'

describe('EntityCard.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(EntityCard, { propsData: { id: 'none' } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
