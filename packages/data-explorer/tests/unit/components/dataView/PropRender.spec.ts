import { shallowMount } from '@vue/test-utils'
import PropRender from '@/components/dataView/PropRender.vue'

describe('PropRender.vue', () => {
  const propsData = {
    object: {
      'col1': 'Column 1',
      'col2': ['Column 2', 'Column 2b'],
      'col3': {
        'col4': 'Col 4'
      }
    }
  }
  const wrapper = shallowMount(PropRender, { propsData })
  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
