import { createLocalVue, shallowMount } from '@vue/test-utils'
import ChangeOwnership from '../../../src/components/ChangeOwnership.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mockState, mockMutations, mockActions } from '../mocks'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)

describe('RlsObjectSelector.vue', () => {
  let state, store, updatePermissionsMock, wrapper

  beforeEach(() => {
    updatePermissionsMock = jest.fn()
    state = mockState
    store = new Vuex.Store({
      state: {
        ...state,
        ...{
          roleOptions: [{ value: 'Administrator' }, { value: 'Tester' }, { value: 'Anonymous' }],
          userOptions: [{ value: 'a.b@tester.com' }, { value: 'Admin' }],
          permissionObject: { ownedByRole: 'Administrator' }
        }
      },
      actions: { ...mockActions, ...{ updatePermissions: updatePermissionsMock } },
      mutations: { ...mockMutations }
    })

    wrapper = shallowMount(ChangeOwnership, {
      store,
      localVue,
      mocks: { $t: (prop) => prop },
      propsData: { value: true }
    })
  })

  it('calls UpdatePermissions on save with the correct data', () => {
    wrapper.vm.$data.newOwner = 'Admin'
    wrapper.vm.save()

    expect(updatePermissionsMock).toHaveBeenCalledWith(expect.anything(), { ownedByUser: 'Admin' })
    expect(wrapper.emitted().input).toEqual([[false]])
  })

  it('resets UpdatePermissions on save with the correct data', () => {
    wrapper.vm.$data.newOwner = 'a.b@tester.com'
    wrapper.vm.cancel()

    expect(wrapper.vm.$data.newOwner).toBe('Administrator')
    expect(wrapper.emitted().input).toEqual([[false]])
  })
})
