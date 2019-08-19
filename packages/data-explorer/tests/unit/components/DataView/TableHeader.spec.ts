import { shallowMount } from '@vue/test-utils'
import EntityTableHeader from '@/components/DataView/TableHeader.vue'

describe('EntityTableHeader.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(EntityTableHeader, { propsData: { header: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('renders table headers', () => {
    const wrapper = shallowMount(EntityTableHeader, { propsData: { header: ['1', '2', '3'] } })
    expect(wrapper.findAll('th').length).toEqual(3)
  })
})
