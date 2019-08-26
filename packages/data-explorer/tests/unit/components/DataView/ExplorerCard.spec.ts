import { shallowMount } from '@vue/test-utils'
import EntityCard from '@/components/DataView/ExplorerCard.vue'

describe('EntityCard.vue', () => {
  it('exists', () => {
    const propsData = {
      id: 'none',
      dataLabel: 'dataLabel',
      dataContents: {
        id: 155143544,
        myField: 'myValue'
      }
    }
    const wrapper = shallowMount(EntityCard, { propsData })
    expect(wrapper.exists()).toBeTruthy()
  })
})
