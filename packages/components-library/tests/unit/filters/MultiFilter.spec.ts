import { createLocalVue, mount } from '@vue/test-utils'
import MultiFilter from '@/components/filters/MultiFilter.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)


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

  beforeEach(() => {
    wrapper = mount(MultiFilter, {localVue, propsData})
  })

  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve(checkboxLotsOptions)
      }
    )
  }

  const propsData = {
    name: 'multi-filter',
    label: 'Filter with multiple options',
    collapsed: false,
    maxVisibleOptions: 3,
    options: optionsPromise,
    type: 'multi-filter'
  }

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('does not show checkbox fields when input options are not resolved yet', () => {
    wrapper = mount(MultiFilter, {localVue, propsData})
    const background = wrapper.find('.checkbox-list')
    expect(background.exists()).toBeFalsy()
  })

  it('shows checkbox fields when input options are set', async () => {
    jest.useFakeTimers()
    wrapper.setData({ query: 'search' })
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
})
