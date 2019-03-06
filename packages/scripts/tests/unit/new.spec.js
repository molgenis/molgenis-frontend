import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewScript from '../../src/views/NewScript'
import * as schemas from './test-schemas'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('views/NewScript.vue', () => {
  let getters
  let store
  let wrapper

  beforeEach(() => {
    getters = {
      scripts: jest.fn().mockReturnValue(schemas.Script),
      scriptTypes: jest.fn().mockReturnValue(schemas.ScriptType),
      loaded: jest.fn().mockReturnValue(true)
    }
    store = new Vuex.Store({
      getters
    })
    store.dispatch = jest.fn()
    wrapper = shallowMount(NewScript, {
      store,
      localVue,
      stubs: ['font-awesome-icon']
    })
  })

  it('can check if the chosen name is unique', () => {
    wrapper.setData({ form: { name: 'Jan modaal' } })
    expect(wrapper.vm.isUniqueName).toBeTruthy()
    wrapper.setData({ form: { name: 'test' } })
    expect(wrapper.vm.isUniqueName).toBeFalsy()
  })
})
