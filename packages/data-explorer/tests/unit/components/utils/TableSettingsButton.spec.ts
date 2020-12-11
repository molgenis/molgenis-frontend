import { shallowMount } from '@vue/test-utils'
import TableSettingsButton from '@/components/utils/TableSettingsButton.vue'

describe('TableSettingsButton.vue', () => {
  describe('when no settings row has previously been created', () => {
    let wrapper:any

    beforeEach(() => {
      wrapper = shallowMount(TableSettingsButton, {
        directives: {
          'b-tooltip': () => {}
        },
        propsData: {
          settingsTableId: 'my-settings-table'
        }
      })
    })

    it('the button should link to datarow plugin in add mode', () => {
      expect(wrapper.attributes('href')).toBe('/plugin/data-row-edit/my-settings-table')
    })
  })

  describe('when there already is a settings row.vue', () => {
    let wrapper:any

    beforeEach(() => {
      wrapper = shallowMount(TableSettingsButton, {
        directives: {
          'b-tooltip': () => {}
        },
        propsData: {
          settingsTableId: 'my-settings-table',
          settingsRowId: 'settings-row-id'
        }
      })
    })

    it('the button should link to datarow plugin in edit mode', () => {
      expect(wrapper.attributes('href')).toBe('/plugin/data-row-edit/my-settings-table/settings-row-id')
    })
  })
})
