import { shallowMount } from '@vue/test-utils'
import TableHeader from '@/components/dataView/TableHeader.vue'

describe('TableHeader.vue', () => {
  it('exists', () => {
    const wrapper = shallowMount(TableHeader, { propsData: { visibleColumns: [] }, stubs: [ 'font-awesome-icon' ] })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('renders table headers', () => {
    const wrapper = shallowMount(TableHeader, { propsData: { visibleColumns: [ '1', '2', '3' ] }, stubs: [ 'font-awesome-icon' ] })
    expect(wrapper.findAll('th').length).toEqual(4) // length + 1 for edit btn
  })
})
