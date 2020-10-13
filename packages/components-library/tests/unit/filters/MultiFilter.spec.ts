import { mount } from '@vue/test-utils'
import MultiFilter from '@/components/filters/MultiFilter.vue'
import { localVue as getLocalVue } from '../../lib/helpers'

const localVue = getLocalVue()

const checkboxLotsOptions = [
  { value: 'red', text: 'Red' },
  { value: 'green', text: 'Green' },
  { value: 'blue', text: 'Blue' },
  { value: 'yellow', text: 'Yellow' },
  { value: 'white', text: 'White' },
  { value: 'purple', text: 'Purple' },
  { value: 'black', text: 'Black' }
]

describe('MultiFilter.vue', () => {
  let wrapper: any
  const optionsPromise = jest.fn(() => Promise.resolve(checkboxLotsOptions))

  const propsData = {
    name: 'multi-filter',
    label: 'Filter with multiple options',
    collapsed: false,
    maxVisibleOptions: 3,
    options: optionsPromise,
    type: 'multi-filter'
  }

  beforeEach(() => {
    wrapper = mount(MultiFilter, { localVue, propsData })
  })

  it('does not show checkbox fields when input options are not resolved yet', () => {
    wrapper = mount(MultiFilter, { localVue, propsData })
    const background = wrapper.find('.checkbox-list')
    expect(background.exists()).toBeFalsy()
  })

  it('shows checkbox fields when input options are set', async () => {
    jest.useFakeTimers()
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    const background = wrapper.find('.checkbox-list')
    expect(background.exists()).toBeTruthy()

    const checkboxes = wrapper.findAll('input[type=checkbox]')
    expect(checkboxes.length).toEqual(propsData.maxVisibleOptions)
  })

  it('shows "show {maxVisibleOptions} more" text when input options exceed maxVisibleOptions', () => {
    wrapper.setData({ inputOptions: checkboxLotsOptions })

    const text = `Show ${propsData.maxVisibleOptions} more`
    expect(wrapper.find('.card-link').text()).toEqual(text)
  })

  it('shows next three items show more is clicked', async () => {
    wrapper.setData({ inputOptions: checkboxLotsOptions })
    await wrapper.find('.card-link').trigger('click')
    const checkboxes = wrapper.findAll('input[type=checkbox]')
    expect(checkboxes.length).toEqual(propsData.maxVisibleOptions * 2)
  })

  it('updates the selected value to its parent', async () => {
    wrapper.setData({ inputOptions: checkboxLotsOptions })
    await wrapper.find('input[type=checkbox]').trigger('click')
    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('shows the option as checked that has been given as a prop', async () => {
    const bmProps = {
      name: 'multi-filter',
      collapsed: false,
      options: optionsPromise,
      type: 'multi-filter',
      value: ['red']
    }

    const wrapperFromBookmark = mount(MultiFilter, { localVue, propsData: bmProps })
    wrapperFromBookmark.setData({ inputOptions: [checkboxLotsOptions.find(cb => cb.value === 'red')] })
    await localVue.nextTick()

    const checkboxes = wrapperFromBookmark.findAll('input[type=checkbox]')
    expect(checkboxes.length).toEqual(1)

    const checkbox = wrapperFromBookmark.find('input[type=checkbox]').element as HTMLInputElement
    expect(checkbox.value).toBe('red')
    expect(checkbox.checked).toBeTruthy()
  })

  it('should update the options list', async () => {
    optionsPromise.mockClear()
    jest.useFakeTimers()
    const searchInput = wrapper.find('input[name="multi-filter"]')
    await searchInput.setValue('Blue')
    jest.runAllTimers()
    expect(optionsPromise).toHaveBeenCalledWith({ nameAttribute: 'label', query: 'Blue' })
  })
})
