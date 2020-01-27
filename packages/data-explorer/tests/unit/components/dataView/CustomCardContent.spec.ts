import { shallowMount } from '@vue/test-utils'
import CustomCardContent from '@/components/dataView/CustomCardContent.vue'

describe('CustomCardContent.vue', () => {
  const propsData = {
    id: 'myRecord1',
    record: {
      'id': '1',
      'col1': 'Column 1',
      'col2': 'Column 2',
      'col3': 'Column 3'
    },
    customCode: '    <h1>Hello MOLGENIS!</h1>    '
  }
  const wrapper = shallowMount(CustomCardContent, { propsData })
  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('should set the template', () => {
    // @ts-ignore
    expect(wrapper.vm.template).toBe('<div><h1>Hello MOLGENIS!</h1></div>')
  })
})
