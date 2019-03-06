import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import EditScript from '../../src/views/EditScript'
import * as schemas from './test-schemas'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('views/EditScript.vue', () => {
  let getters
  let actions
  let store
  let wrapper
  let $router

  beforeEach(() => {
    const $route = {
      path: '/edit/',
      hash: '',
      params: { id: 'test' },
      query: { q: '' }
    }
    $router = {
      push: jest.fn()
    }
    getters = {
      scripts: jest.fn().mockReturnValue(schemas.Script),
      scriptTypes: jest.fn().mockReturnValue(schemas.ScriptType),
      loaded: jest.fn().mockReturnValue(true)
    }
    actions = {
      saveParametersAndScripts: jest.fn().mockResolvedValue({}),
      addParameters: jest.fn().mockResolvedValue({}),
      editScript: jest.fn().mockResolvedValue({})
    }
    store = new Vuex.Store({
      actions, getters
    })
    wrapper = shallowMount(EditScript, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      stubs: ['font-awesome-icon']
    })
  })

  it('stores data on submit', (done) => {
    const form = { form: { parameters: ['x', 'y'] } }
    wrapper.setData(form)
    wrapper.vm.onSubmit()
    setTimeout(() => {
      expect(actions.saveParametersAndScripts).toHaveBeenCalled()
      expect($router.push).toBeCalledTimes(1)
      done()
    }, 300)
  })
})
