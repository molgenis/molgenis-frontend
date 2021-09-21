
import { createLocalVue, shallowMount } from '@vue/test-utils'
import RlsEntitySelector from '../../../src/views/RlsEntitySelector.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mockState } from '../mocks'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)

describe('RlsEntitySelector.vue', () => {
  let state, store

  beforeEach(() => {
    state = mockState

    store = new Vuex.Store({
      state
    })
  })

  it('returns true if responseStatus has been filled', () => {
    const wrapper = shallowMount(RlsEntitySelector, {
      store,
      localVue,
      mocks: { $t: (prop) => prop }
    })

    // assert initial state
    expect(wrapper.vm.loaded).toBeFalsy()

    // assert changed state reactiveness
    store.state.responseStatus = 200
    expect(wrapper.vm.loaded).toBeTruthy()
  })
})
