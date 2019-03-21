import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ExecuteButton from '../../../src/components/ExecuteButton'
import * as schemas from '../../test-schemas'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.filter('i18n', jest.fn())

describe('components/ExecuteButton.vue', () => {
  let store
  let wrapper

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        scripts: schemas.Script,
        scriptTypes: schemas.ScriptType,
        loaded: true
      }
    })
    store.dispatch = jest.fn().mockResolvedValue({})
    wrapper = mount(ExecuteButton, {
      store,
      localVue,
      propsData: {
        parameters: ['x', 'y', 'age'],
        name: 'test',
        doSave: true,
        form: {}
      },
      stubs: ['font-awesome-icon']
    })
  })

  it('will open modal if given parameters', () => {
    expect(wrapper.vm.showModal).toBeFalsy()
    wrapper.vm.run()
    expect(wrapper.vm.showModal).toBeTruthy()
  })

  it('can save state if given "doSave: true" prop', () => {
    wrapper.vm.execute()
    expect(store.dispatch).toBeCalled()
  })
})
