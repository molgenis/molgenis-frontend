import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ExecuteButton from '../../src/components/ExecuteButton'
import RunModal from '../../src/components/RunModal'

import ListScripts from '../../src/views/ListScripts'
import * as schemas from './test-schemas'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('views/ListScript.vue', () => {
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
    store.dispatch = jest.fn()
    wrapper = mount(ListScripts, {
      store,
      localVue,
      stubs: ['font-awesome-icon']
    })
  })

  it('simpleParameters simplifies api item parameter list', () => {
    const parameters = schemas.Script.items[3].parameters
    expect(wrapper.vm.simpleParameters(parameters)).toEqual(['x', 'y', 'age', 'name'])
  })

  it('will show a confirmation modal on remove button click', () => {
    expect(wrapper.vm.$data.confirmedToRemove).toBe('')
    expect(wrapper.vm.$data.showRemoveModal).toBeFalsy()
    wrapper.findAll('.removeButton').at(0).trigger('click')
    expect(wrapper.vm.$data.confirmedToRemove).toBe('Hello World')
    expect(wrapper.vm.$data.showRemoveModal).toBeTruthy()
  })

  it('will remove selected component on confirmation', () => {
    wrapper.findAll('.removeButton').at(0).trigger('click')
    expect(wrapper.vm.$data.confirmedToRemove).toBe('Hello World')
    expect(wrapper.vm.$data.showRemoveModal).toBeTruthy()
    wrapper.vm.confirmedRemove()
    expect(store.dispatch).toBeCalledWith('removeScript', 'Hello World')
    expect(wrapper.vm.$data.confirmedToRemove).toBe('')
  })
})

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
