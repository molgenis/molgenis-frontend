import { mount } from '@vue/test-utils'
import StringFilter from '@/components/filters/StringFilter.vue'
import { localVue as getLocalVue } from '../../lib/helpers'

const localVue = getLocalVue()

describe('StringFilter.vue', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = mount(StringFilter, {
      localVue,
      propsData: {
        name: 'name',
        label: 'label',
        value: 'value'
      }
    })
  })

  it('sets value property on inner input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('value')
  })

  it('emits undefined when clear button is clicked', () => {
    wrapper.find('button').trigger('click')
    // @ts-ignore
    expect(wrapper.emitted().input[0]).toEqual([undefined])
  })

  it('should emit an input event when the input value changes', async () => {
    const input = wrapper.find('input')
    // @ts-ignore
    input.element.value = 'change me'
    await input.trigger('input')
    // @ts-ignore
    expect(wrapper.emitted().input[0]).toEqual(['change me'])
  })

  describe('not passing a model prop', () => {
    const wrapper = mount(StringFilter, {
      localVue,
      propsData: {
        name: 'name',
        label: 'label'
      }
    })
    it('should use a empty string as default value', () => {
      const inputElement = wrapper.find('input').element as HTMLInputElement
      expect(inputElement.value).toBe('')
    })
  })
})
