import { shallowMount } from '@vue/test-utils'
import CustomEntityDetail from '@/components/dataView/CustomEntityDetail.vue'

describe('CustomEntityDetail.vue', () => {
  const propsData = {
    record: {
      'col1': 'Column 1',
      'col2': 'Column 2',
      'col3': 'Column 3'
    },
    metaData: {
      meta1: 'meta 1',
      meta2: 'meta 2'
    },
    template: '    <h1>Hello MOLGENIS!</h1>    ',
    isSelectable: true,
    isSelected: false
  }
  const wrapper = shallowMount(CustomEntityDetail, { propsData })
  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('should set the template', () => {
    // @ts-ignore
    expect(wrapper.vm.wrappedTemplate).toBe('<div class="custom-entity-detail-container"><h1>Hello MOLGENIS!</h1></div>')
  })
})
