import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import ActiveFilters from '@/components/filters/ActiveFilters.vue'
import { filters, fruitOptions } from '../../demo-data/filterMocks'
import { findItemByText, logWrapperArray } from '../__testhelpers__/vueTestUtilHelpers'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

// Mock filtered query result for multi-filter example
// Returns options without search filter
// @ts-ignore
filters[3].options = () => Promise.resolve(fruitOptions)

describe('ActiveFilters.vue', () => {
  const startDate = new Date('10/20/2019')
  const endDate = new Date('10/10/2019')
  let wrapper: any

  beforeEach(() => {

    wrapper = mount(ActiveFilters, {
      propsData: {
        filters,
        value: {
          name: 'john',
          age: [2, 8],
          checkbox: ['blue', 'purple'],
          datetime: [startDate, endDate],
          search: 'kimkierkegaard',
          fruit: ['orange']
        }
      },
      listeners: {
        input: (newVal: any) => {
          wrapper.setProps({ value: newVal })
        }
      }
    })
  })

  it('will show range type values with only upper bound as "[value] and less"', async () => {
    await wrapper.setProps({ value: { age: [null, 2] } })
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Age: 2 and less')).toBeTruthy()
  })

  it('will show range type values with only lower bound as "[value] and more"', async () => {
    await wrapper.setProps({ value: { age: [1, null] } })
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Age: 1 and more')).toBeTruthy()
  })

  it('will show dateTime type single date if start is equal to end dataTime', async () => {
    await wrapper.setProps({ value: { datetime: [startDate, startDate] } })
    expect(findItemByText(wrapper.findAll('button.active-filter'), 'Datetime: 10/20/2019')).toBeTruthy()
  })

  it('removes filter values on click', async () => {
    // Remove 'john' filter
    const items = wrapper.findAll('button.active-filter')
    expect(items.length).toEqual(7)
    const toRemove: any = findItemByText(items, 'Label: john')
    expect(toRemove).toBeTruthy()
    await toRemove.trigger('click') // remove item
    await Vue.nextTick() // second await needed to wait for async 'buildActiveValues' to update the dom
    await Vue.nextTick() // third await needed to wait for async options fetch when updating checkbox options
    let itemsAfterRemove = wrapper.findAll('button.active-filter')
    expect(itemsAfterRemove.length).toEqual(6)
    expect(findItemByText(itemsAfterRemove, 'Label: john')).toBeFalsy()

    // Remove 'Blue' filter
    const checkboxToRemove: any = findItemByText(wrapper.findAll('button.active-filter'), 'Checkbox: Blue')
    expect(checkboxToRemove).toBeTruthy()
    await checkboxToRemove.trigger('click') // remove item
    await Vue.nextTick() // second await needed to wait for async 'buildActiveValues' to update the dom
    await Vue.nextTick() // third await needed to wait for async options fetch when updating checkbox options
    itemsAfterRemove = wrapper.findAll('button.active-filter')
    expect(itemsAfterRemove.length).toEqual(5)
    expect(findItemByText(itemsAfterRemove, 'Checkbox: Blue')).toBeFalsy()
    expect(findItemByText(itemsAfterRemove, 'Checkbox: Purple')).toBeTruthy()
  })

})
