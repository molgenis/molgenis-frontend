import { shallowMount } from '@vue/test-utils'
import TableHeader from '@/components/DataView/TableHeader.vue'

describe('TableHeader.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(TableHeader, { propsData: { header: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('renders table headers', () => {
    const wrapper = shallowMount(TableHeader, { propsData: { header: ['1', '2', '3'] } })
    expect(wrapper.findAll('th').length).toEqual(3)
  })
})
