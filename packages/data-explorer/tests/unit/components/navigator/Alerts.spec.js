import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import td from 'testdouble'
import Alerts from '@/components/navigator/Alerts'

const localVue = createLocalVue()
const stubs = ['b-alert']
localVue.use(Vuex)

describe('Alerts.vue', () => {
  describe('removeAlert', () => {
    it('should remove the error alert', () => {
      const state = {
        alerts: [{ type: 'ERROR', message: 'error message', code: 'error code' },
          { type: 'INFO', message: 'info message' },
          { type: 'SUCCESS', message: 'success message', code: 'error code' },
          { type: 'WARNING', message: 'warning message', code: 'error code' }]
      }
      const removeAlert = td.function('__REMOVE_ALERT__')
      let store = new Vuex.Store({
        modules: { navigator: { state, mutations: { __REMOVE_ALERT__: removeAlert }, namespaced: true } }
      })

      const wrapper = shallowMount(Alerts, { store, localVue, stubs })
      wrapper.vm.removeAlert(0)
      td.verify(removeAlert(state, 0))
    })
  })
})
