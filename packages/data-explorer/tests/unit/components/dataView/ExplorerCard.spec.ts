import { shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/dataView/ExplorerCard.vue'

describe('ExplorerCard.vue', () => {
  it('exists', () => {
    const propsData = {
      id: 'none',
      dataLabel: 'dataLabel',
      dataContents: {
        id: 155143544,
        myField: 'myValue'
      },
      collapseLimit: 5
    }
    const wrapper = shallowMount(EntityCard, { propsData })
    expect(wrapper.exists()).toBeTruthy()
  })
})
