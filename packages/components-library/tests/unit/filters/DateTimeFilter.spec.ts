// @ts-ignore
import { createLocalVue, mount } from '@vue/test-utils'
import DateTimeFilter from '@/components/filters/DateTimeFilter.vue'
import { BootstrapVue } from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

const buildWrapper = (propsData: any) => {
  const wrapper = mount(DateTimeFilter, {
    listeners: {
      input: (newVal: any) => {
        wrapper.setProps({ value: newVal })
      }
    },
    localVue,
    propsData
  })

  return wrapper
}

describe('Datetimefilter.vue', () => {
  describe('in date time mode', () => {
    const wrapper = buildWrapper({
      name: 'datetime',
      label: 'Datetime',
      collapsed: false,
      max: null,
      min: null,
      opens: 'right',
      range: true,
      time: true
    })
    const vm: any = wrapper.vm

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

    describe('when createDateFromValue is passed a string value', () => {
      const parsed = vm.createDateFromValue('04 Dec 1995 00:12:00 GMT')
      it('should parse the string to date', () => {
        expect(parsed).toEqual(new Date(Date.parse('04 Dec 1995 00:12:00 GMT')))
      })
    })
  })

  describe('in date only mode', () => {
    const wrapper = buildWrapper({
      name: 'datetime',
      label: 'Datetime',
      max: null,
      min: null,
      range: true,
      time: false
    })
    const vm: any = wrapper.vm

    it('formatDate should leave of the time part', async () => {
      const date = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'))
      expect(vm.formatDate(date)).toEqual(date.toLocaleDateString())
    })
  })
})
