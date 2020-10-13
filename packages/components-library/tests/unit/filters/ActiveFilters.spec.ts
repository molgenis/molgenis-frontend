import { mount } from '@vue/test-utils'
import ActiveFilters from '@/components/filters/ActiveFilters.vue'
import { filters } from '../../lib/mocks'
import { findItemByText, localVue } from '../../lib/helpers'

describe('ActiveFilters.vue', () => {
  let endDate: Date
  let startDate: Date
  let wrapper: any

  beforeEach(() => {
    startDate = new Date('09/11/2019')
    endDate = new Date('10/10/2020')
    wrapper = mount(ActiveFilters, {
      localVue: localVue(),
      propsData: {
        filters,
        value: {
          name: 'john',
          age: [2, 8],
          checkbox: ['blue', 'purple'],
          datetime: [startDate, endDate],
          search: 'kimkierkegaard',
          fruit: ['orange', 'apple']
        }
      },
      listeners: {
        input: (newVal: any) => {
          wrapper.setProps({ value: newVal })
        }
      }
    })
  })

  it('will show default filter with its label and value ', async () => {
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Label: john')).toBeTruthy()
  })

  it('will show range type values as "[lower] to [upper]"', async () => {
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Age: 2 to 8')).toBeTruthy()
  })

  it('will show range type values with only upper bound as "[value] and less"', async () => {
    await wrapper.setProps({ value: { age: [null, 2] } })
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Age: 2 and less')).toBeTruthy()
  })

  it('will show range type values with only lower bound as "[value] and more"', async () => {
    await wrapper.setProps({ value: { age: [1, null] } })
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Age: 1 and more')).toBeTruthy()
  })

  it('will show dateTime type as "[start] - [end]"', async () => {
    const expectedDatetime = `Datetime: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    expect(findItemByText(wrapper.findAll('button.active-filter'), expectedDatetime)).toBeTruthy()
  })

  it('will show dateTime type single date if start is equal to end dataTime', async () => {
    await wrapper.setProps({ value: { datetime: [startDate, startDate] } })
    const expectedDatetime = `Datetime: ${startDate.toLocaleDateString()}`
    expect(findItemByText(wrapper.findAll('button.active-filter'), expectedDatetime)).toBeTruthy()
  })

  it('will show separate items for each selected checkbox type ', async () => {
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Checkbox: Blue')).toBeTruthy()
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Checkbox: Purple')).toBeTruthy()
  })

  it('removes filter values on click', async () => {
    // Remove 'john' filter
    const items = wrapper.findAll('button.active-filter')
    expect(items.length).toEqual(8)
    const toRemove: any = findItemByText(items, 'Label: john')
    expect(toRemove).toBeTruthy()
    await toRemove.trigger('click') // remove item
    await wrapper.vm.$nextTick() // second await needed to wait for async 'buildActiveValues' to update the dom
    await wrapper.vm.$nextTick() // third await needed to wait for async options fetch when updating checkbox options
    let itemsAfterRemove = wrapper.findAll('button.active-filter')
    expect(itemsAfterRemove.length).toEqual(7)
    expect(findItemByText(itemsAfterRemove, 'Label: john')).toBeFalsy()

    // Remove 'Blue' filter
    const checkboxToRemove: any = findItemByText(wrapper.findAll('button.active-filter'), 'Checkbox: Blue')
    expect(checkboxToRemove).toBeTruthy()
    await checkboxToRemove.trigger('click') // remove item
    await wrapper.vm.$nextTick() // second await needed to wait for async 'buildActiveValues' to update the dom
    await wrapper.vm.$nextTick() // third await needed to wait for async options fetch when updating checkbox options
    itemsAfterRemove = wrapper.findAll('button.active-filter')
    expect(itemsAfterRemove.length).toEqual(6)
    expect(findItemByText(itemsAfterRemove, 'Checkbox: Blue')).toBeFalsy()
    expect(findItemByText(itemsAfterRemove, 'Checkbox: Purple')).toBeTruthy()
  })
})
