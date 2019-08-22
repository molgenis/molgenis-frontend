import { shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/DataView/ExplorerCard.vue'

describe('ExplorerCard.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(EntityCard, { propsData: { id: 'none', isShop: true } })
    expect(wrapper.exists()).toBeTruthy()
  })
})
