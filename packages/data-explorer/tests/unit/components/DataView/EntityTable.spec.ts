import { shallowMount } from '@vue/test-utils'
import EntityTable from '@/components/DataView/EntityTable.vue'

describe('EntityTable.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(EntityTable)
    expect(wrapper.exists()).toBeTruthy()
  })
})
