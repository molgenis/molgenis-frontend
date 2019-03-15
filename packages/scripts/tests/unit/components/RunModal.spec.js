import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import RunModal from '../../../src/components/RunModal'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.filter('i18n', jest.fn())

describe('components/RunModal.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RunModal, {
      localVue,
      propsData: {
        parameters: ['x', 'y', 'age'],
        name: 'test'
      }
    })
    window.open = jest.fn()
  })

  it('Adds parameters to start script url', () => {
    const form = { values: ['1', '2', '33'] }
    wrapper.setData(form)
    wrapper.vm.run()
    expect(window.open).toHaveBeenCalledWith('/scripts/test/start?x=1&y=2&age=33&', '_blank')
  })
})
