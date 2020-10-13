import { mount } from '@vue/test-utils'
import RangeFilter from '@/components/filters/RangeFilter.vue'
import { localVue } from '../../lib/helpers'

describe('RangeFilter.vue', () => {
  let wrapper: any = null

  beforeEach(() => {
    wrapper = mount(RangeFilter, {
      localVue: localVue(),
      propsData: {
        name: 'name',
        value: [1, 2]
      }
    })
  })

  it('sets value property on inner input', () => {
    const inputElement1 = wrapper.find('.range-from').element
    expect(inputElement1.value).toBe('1')
    const inputElement2 = wrapper.find('.range-to').element
    expect(inputElement2.value).toBe('2')
  })

  it('triggers event after value change', async () => {
    await wrapper.find('.range-from').setValue(5)
    await wrapper.find('.range-to').setValue(20)
    await wrapper.find('.range-from').trigger('change')
    await wrapper.find('.range-to').trigger('change')
    expect(wrapper.emitted().input[1]).toEqual([[5, 20]])
  })

  it('can clear a value fields', async () => {
    await wrapper.find('.range-from').setValue(5)
    await wrapper.find('.range-to').setValue(20)
    await wrapper.find('.range-from').trigger('change')
    await wrapper.find('.range-to').trigger('change')
    expect(wrapper.emitted().input[1]).toEqual([[5, 20]])
    await wrapper.find('button.clear-from').trigger('click')
    await wrapper.find('button.clear-to').trigger('click')
    expect(wrapper.emitted().input[3]).toEqual([[null, null]])
  })

  it('reacts to having its filters cleared', async () => {
    expect(wrapper.vm.rangeValue).toEqual([1, 2])
    await wrapper.setProps({ value: [null, null] })
    expect(wrapper.vm.rangeValue).toEqual([null, null])
  })
})
