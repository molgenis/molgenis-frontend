import { mount, createLocalVue } from '@vue/test-utils'
import NumberFilter from '@/components/filters/NumberFilter.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('NumberFilter.vue', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = mount(NumberFilter, {
      localVue,
      propsData: {
        name: 'name',
        label: 'label',
        value: 42
      }
    })
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets value property on inner input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toBe('42')
  })

  it('triggers event after value change', () => {
    wrapper.find('input').setValue(20)
    wrapper.find('input').trigger('change')
    expect(wrapper.emitted()).toEqual({ input: [[20]] })
  })

  it('emits undefined when value is set empty string ', () => {
    wrapper.find('input').setValue('')
    wrapper.find('input').trigger('change')
    expect(wrapper.emitted()).toEqual({ input: [[undefined]] })
  })
})
