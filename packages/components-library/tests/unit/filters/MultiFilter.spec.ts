import { mount } from '@vue/test-utils'
import MultiFilter from '@/components/filters/MultiFilter.vue'
import { localVue as getLocalVue } from '../../lib/helpers'

const localVue = getLocalVue()
jest.useFakeTimers()

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
    type: 'multi-filter',
    showSatisfyAllCheckbox: false
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
      value: ['red'],
      showSatisfyAllCheckbox: false
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

    const searchInput = wrapper.find('input[name="multi-filter"]')
    await searchInput.setValue('Blue')
    jest.runAllTimers()
    expect(optionsPromise).toHaveBeenCalledWith({ nameAttribute: 'label', query: 'Blue' })
  })

  it('should sort the list based on current selection when query is emptied', async () => {
    // Set the data to replicate the scenario where someone searched yellow and selected the checkbox with yellow
    wrapper.setData({ query: 'yellow', selection: ['yellow'] })

    // Assert that the order is still the way it was initialized
    expect(wrapper.vm.inputOptions[0]).toStrictEqual({
      text: 'Red',
      value: 'red'
    })

    // Find the searchbox
    const searchInput = wrapper.find('input[name="multi-filter"]')

    // give it an empty string, which would be the same as deleting the current input
    await searchInput.setValue('')
    jest.runAllTimers() // wait for the setTimeout
    await wrapper.vm.$nextTick() // await the Vue reactiveness

    // assert if Yellow is now indeed on top of the input options
    expect(wrapper.vm.inputOptions[0]).toStrictEqual({
      text: 'Yellow',
      value: 'yellow'
    })
  })

  it('does not emit an input event when value is set from outside the component', async () => {
    wrapper.setProps({ value: ['orange'] })
    expect(wrapper.emitted().input).toBeFalsy()
  })

  describe('prop: returnTypeAsObject', () => {
    it('should return only the value when falsy [default]', async () => {
      const checkbox = wrapper.find('input[type=checkbox]').element as HTMLInputElement
      await checkbox.click()
      expect(wrapper.emitted().input).toEqual([[['red']]])
    })

    it('should return the complete option object when true', async () => {
      wrapper.setProps({ returnTypeAsObject: true })
      const checkbox = wrapper.find('input[type=checkbox]').element as HTMLInputElement
      await checkbox.click()
      expect(wrapper.emitted().input).toEqual([[[{ text: 'Red', value: 'red' }]]])
    })
  })

  describe('SatisfyAllCheckbox', () => {
    const propsData = {
      name: 'multi-filter',
      label: 'Filter with multiple options',
      collapsed: false,
      maxVisibleOptions: 3,
      options: jest.fn(() => Promise.resolve([
        { value: 'red', text: 'Red' },
        { value: 'green', text: 'Green' },])),
      type: 'multi-filter',
    }
    beforeEach(() => {
      wrapper = mount(MultiFilter, { localVue, propsData })
    })

    it('checks that the satisfyAll checkbox is shown by default', async () => {
      // satisfyAllButton is always the fist one, as it is above all the others   
      const satisfyAllButton = wrapper.find('input[type=checkbox]')    
      await satisfyAllButton.trigger('click')
      expect(wrapper.emitted('satisfyAll')[0])
      
    })
    
    it('triggers the proper emit when the satisfyAll checkbos is clicked', async () => {
      // satisfyAllButton is always the fist one, as it is above all the others 
      const satisfyAllButton = wrapper.find('input[type=checkbox]')
      await satisfyAllButton.trigger('click')
      expect(wrapper.emitted('satisfyAll')[0])
      expect(wrapper.emitted('satisfyAll')[0]).toEqual([true])
    })
  })
})
