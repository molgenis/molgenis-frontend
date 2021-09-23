import { createLocalVue, shallowMount } from '@vue/test-utils'
import RlsObjectSelector from '../../../src/views/RlsObjectSelector.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mockState, mockMutations, mockActions } from '../mocks'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)

describe('RlsObjectSelector.vue', () => {
  let state, store, rlsMock, wrapper

  beforeEach(() => {
    rlsMock = jest.fn()
    state = mockState
    store = new Vuex.Store({
      state: { ...state, ...{ rlsEntities: [{ id: '1', label: 'test label' }, { id: '2', label: 'test label2' }] } },
      actions: { ...mockActions, ...{ getAllRlsObjects: rlsMock } },
      mutations: { ...mockMutations }
    })

    wrapper = shallowMount(RlsObjectSelector, {
      store,
      localVue,
      mocks: { $t: (prop) => prop },
      stubs: ['font-awesome-icon'],
      propsData: { entityId: '1' }
    })
  })

  it('returns true if responseStatus has been filled', () => {
    // assert initial state
    expect(wrapper.vm.loaded).toBeFalsy()

    // assert changed state reactiveness
    store.state.responseStatus = 200
    expect(wrapper.vm.loaded).toBeTruthy()
  })

  it('loads rls objects on startup', () => {
    expect(rlsMock).toHaveBeenCalled()
  })

  it('returns the current label from retrieved entities', async () => {
    expect(wrapper.vm.currentLabel).toBe('test label')
  })
})
