import { shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/dataView/ExplorerCard.vue'

describe('ExplorerCard.vue', () => {
  it('exists', () => {
    const propsData = {
      id: 'none',
      dataLabel: 'dataLabel',
      dataTable: 'myTable',
      dataId: 'myId',
      dataContents: {
        id: 155143544,
        myField: 'myValue'
      },
      collapseLimit: 5,
      numberOfAttributes: 3
    }
    const wrapper = shallowMount(EntityCard, { propsData })
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has default collapseLimit of 5', () => {
    const propsData = {
      id: 'none',
      dataLabel: 'dataLabel',
      dataTable: 'myTable',
      dataId: 'myId',
      dataContents: {
        id: 155143544,
        myField: 'myValue'
      },
      numberOfAttributes: 3
    }
    const wrapper = shallowMount(EntityCard, { propsData })
    expect(wrapper.vm.$props.collapseLimit).toBe(5)
  })
})
