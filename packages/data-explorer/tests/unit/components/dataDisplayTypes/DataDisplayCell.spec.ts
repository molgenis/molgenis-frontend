import { shallowMount } from '@vue/test-utils'
import DataDisplayCell from '@/components/dataDisplayTypes/DataDisplayCell.vue'
import Vue from 'vue'

describe('DataDisplayCell.vue', () => {
  // String, Object, Array, Number, Boolean
  const value = 'value'
  const rowIndex = 1
  let metadata:any = {
    type: 'string'
  }
  const propsData = { value, metadata, rowIndex }

  it('should render stringDisplay for type string', () => {
    const wrapper = shallowMount(DataDisplayCell, { propsData })
    expect(wrapper.find('stringdisplay-stub')).toBeTruthy()
  })

  it('should fallback to string display when type is missing', () => {
    propsData.metadata.type = null
    const wrapper = shallowMount(DataDisplayCell, { propsData })
    expect(wrapper.find('stringdisplay-stub')).toBeTruthy()
  })
})
