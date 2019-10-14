import { createLocalVue, shallowMount } from '@vue/test-utils'
import TableSettingsButton from '@/components/utils/TableSettingsButton.vue'
import Vuex from 'vuex'

describe('TableSettingsButton.vue', () => {
  describe('when row settings row has previously been created', () => {
    let wrapper:any

    beforeEach(() => {
      wrapper = shallowMount(TableSettingsButton, { propsData: { selectedTable: 'test' } })
    })

    it('the button should link to datarow plugin in add mode', () => {
      expect(wrapper.attributes('href')).toBe('/plugin/data-row-edit/test')
    })
  })

  describe('when there already is a settings row.vue', () => {
    let wrapper:any

    beforeEach(() => {
      wrapper = shallowMount(TableSettingsButton, { propsData: { selectedTable: 'test', selectedRowId: 'testRow' } })
    })

    it('the button should link to datarow plugin in edit mode', () => {
      expect(wrapper.attributes('href')).toBe('/plugin/data-row-edit/test/testRow')
    })
  })
})
