// @ts-ignore
import { createLocalVue, mount } from '@vue/test-utils'
import DateTimeFilter from '@/components/filters/DateTimeFilter.vue'
import { BootstrapVue } from 'bootstrap-vue'


const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('Datetimefilter.vue', () => {
  const propsData = {
    name: 'datetime',
    label: 'Datetime',
    collapsed: false,
    max: null,
    min: null,
    opens: 'right',
    range: true,
    time: true,
    type: 'date-time-filter'
  }

  const wrapper = mount(DateTimeFilter, {
    listeners: {
      input: (newVal: any) => {
        wrapper.setProps({ value: newVal })
      }
    },
    localVue,
    propsData
  })
  const vm:any = wrapper.vm

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sets a date range', async () => {
    await wrapper.find('.vue-daterange-picker div').trigger('click')
    await wrapper.findAll('.yearselect').setValue('2020')

    await wrapper.find('.drp-calendar.left .monthselect').setValue('3')
    await wrapper.find('.drp-calendar.left .monthselect').setValue('3')

    await wrapper.find('.vue-daterange-picker div table tr:nth-child(2) td:nth-child(7)').trigger('click')
    await wrapper.find('.vue-daterange-picker div table tr:nth-child(4) td:nth-child(1)').trigger('click')
    await wrapper.find('.applyBtn').trigger('click')

    expect(vm.dateRange.startDate.toISOString()).toBe('2020-03-01T12:00:00.000Z')
    expect(vm.dateRange.endDate.toISOString()).toBe('2020-03-09T12:00:00.000Z')
    expect(wrapper.emitted().input).toBeTruthy()
    await wrapper.find('.t-btn-clear').trigger('click')
    expect(vm.dateRange.startDate).toBe(null)
    expect(vm.dateRange.endDate).toBe(null)
  })
})
