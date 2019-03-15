import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import EditScript from '../../src/views/EditScript'
import * as schemas from './test-schemas'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.filter('i18n', jest.fn())

describe('views/EditScript.vue', () => {
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
    actions = {
      saveParametersAndScripts: jest.fn().mockResolvedValue({}),
      addParameters: jest.fn().mockResolvedValue({}),
      editScript: jest.fn().mockResolvedValue({})
    }
    store = new Vuex.Store({
      state: {
        scripts: schemas.Script,
        scriptTypes: schemas.ScriptType,
        loaded: true
      },
      actions
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
