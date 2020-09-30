import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import ActiveFilters from '@/components/filters/ActiveFilters.vue'
import { colorOptions } from '../../demo-data/filterMocks'
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('ActiveFilters.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve(colorOptions)
      }
    )
  }
  const startDate = new Date('10/20/2019')
  const endDate = new Date('10/10/2019')
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ActiveFilters, {
      propsData: {
        value: {
          string: 'blah',
          checkbox: ['red'],
          multi: ['blue', 'purple'],
          range: [-5, 5],
          datetime: [startDate, endDate]
        },
        filters: [{
          name: 'string',
          label: 'String',
          description: 'search by string',
          placeholder: 'placeholder',
          type: 'string-filter',
          collapsable: false
        }, {
          name: 'checkbox',
          label: 'Checkbox',
          collapsed: false,
          bulkOperation: true,
          options: optionsPromise,
          type: 'checkbox-filter'
        }, {
          name: 'multi',
          label: 'Checkbox',
          collapsed: false,
          bulkOperation: true,
          options: optionsPromise,
          type: 'multi-filter'
        }, {
          name: 'range',
          label: 'Range',
          min: -10,
          max: 10,
          collapsed: false,
          options: optionsPromise,
          type: 'range-filter'
        },
        {
          name: 'datetime',
          label: 'Datetime',
          collapsed: true,
          opens: 'right',
          type: 'date-time-filter'
        }]
      }
    })
  })

  it('removes filter values on click', () => {
    wrapper.vm.removeFilter({ key: 'string' })
    expect(wrapper.emitted().input[0][0]).toEqual({ checkbox: ['red'], datetime: [startDate, endDate], range: [-5, 5], multi: ['blue', 'purple'] })
    wrapper.vm.removeFilter({ key: 'checkbox', subKey: 'red' })
    expect(wrapper.emitted().input[1][0]).toEqual({ checkbox: [], datetime: [startDate, endDate], range: [-5, 5], multi: ['blue', 'purple'], string: 'blah' })
  })

  describe('rangeFilter', () => {
    it('will show less than values', async (done) => {
      await wrapper.setProps({ value: { range: [null, 2] } })
      expect(wrapper.vm.activeValues[0].value).toEqual('2 and less')
      done()
    })

    it('will show greater values', async (done) => {
      await wrapper.setProps({ value: { range: [1, null] } })
      expect(wrapper.vm.activeValues[0].value).toEqual('1 and more')
      done()
    })
  })

  describe('dateTimeFilter', () => {
    it('will show single date if start is equal to end dataTime', async (done) => {
      await wrapper.setProps({ value: { datetime: [startDate, startDate] } })
      expect(wrapper.vm.activeValues[0].value).toEqual('10/20/2019')
      done()
    })
  })
})
