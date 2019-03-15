import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '../../src/App'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.filter('i18n', jest.fn())

describe('App.vue', () => {
  let actions
  let store

  it('shows an error when api is not available', (done) => {
    actions = {
      requestScripts: jest.fn().mockRejectedValue({})
    }
    store = new Vuex.Store({
      actions
    })

    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: ['router-link', 'router-view', 'b-alert']
    })
    expect(wrapper.vm.$data.showError).toBeFalsy()

    actions.requestScripts().catch(() => {
      localVue.nextTick(() => {
        expect(wrapper.vm.$data.showError).toBeTruthy()
        expect(actions.requestScripts).toBeCalled()
        done()
      })
    })
  })
})
