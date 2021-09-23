import { createLocalVue, mount } from '@vue/test-utils'
import DataRowPermissions from '../../../src/views/DataRowPermissions.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { mockState, mockMutations, mockActions, mockGetters } from '../mocks'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)

describe('DataRowPermissions.vue', () => {
  let state, store, wrapper, permissionMock, roleMock, permissionByEntityMock, addPermissionMock, removePermissionMock, updatePermissionsMock

  beforeEach(() => {
    permissionMock = jest.fn()
    roleMock = jest.fn()
    permissionByEntityMock = jest.fn()
    addPermissionMock = jest.fn()
    removePermissionMock = jest.fn()
    updatePermissionsMock = jest.fn()

    state = mockState
    store = new Vuex.Store({
      state: {
        ...state,
        ...{
          permissionObject: {
            permissions: [{ permission: 'READWRITE', role: 'USER' }, { permission: 'READWRITE', user: 'USER' }]
          },
          userOptions: ['UnpickedUser'],
          roleOptions: ['UnpickedRole']
        }
      },
      actions: {
        ...mockActions,
        ...{
          getPermissionsForObject: permissionMock,
          getAllRoles: roleMock,
          getPermissionsByEntityId: permissionByEntityMock,
          addPermission: addPermissionMock,
          removePermission: removePermissionMock,
          updatePermissions: updatePermissionsMock
        }
      },
      mutations: { ...mockMutations },
      getters: { ...mockGetters }
    })

    wrapper = mount(DataRowPermissions, {
      store,
      localVue,
      router: new VueRouter({ routes: [{ name: 'SelectEntitityObject', path: '/' }] }),
      mocks: { $t: (prop) => prop },
      stubs: ['font-awesome-icon'],
      propsData: { entityId: '1', objectId: 'x' }
    })
  })

  it('calls the correct functions on startup', () => {
    expect(permissionMock).toHaveBeenCalled()
    expect(roleMock).toHaveBeenCalled()
    expect(permissionByEntityMock).toHaveBeenCalled()
  })

  it('changes toggles edit mode when the editmode button is pressed and pressed again', () => {
    const editButton = wrapper.find('#edit-button')

    expect(wrapper.vm.$data.editMode).toBeFalsy()
    editButton.trigger('click')
    expect(wrapper.vm.$data.editMode).toBeTruthy()
    editButton.trigger('click')
    expect(wrapper.vm.$data.editMode).toBeFalsy()
  })

  it('has a list of permissions', () => {
    expect(wrapper.vm.permissions).not.toBeUndefined()
  })

  it('can change a permission', () => {
    wrapper.vm.addPermissionChange(0, 'TEST')
    expect(wrapper.vm.$data.changedPermissionObjects).toEqual([{ permission: 'TEST', role: 'USER' }])
  })

  it('can add a permission and reset the view', () => {
    const newPermissionMock = { role: 'Tester', permission: 'Break things' }
    wrapper.vm.$data.newPermissionObject = newPermissionMock

    const addButton = wrapper.find('#add-button')
    addButton.trigger('click')

    // has the right flags
    expect(wrapper.vm.$data.addMode).toBeTruthy()
    expect(wrapper.vm.canAddPermission).toBeTruthy()

    wrapper.vm.add()
    expect(wrapper.vm.$data.addMode).toBeFalsy()
    expect(addPermissionMock).toHaveBeenCalledWith(expect.anything(), newPermissionMock)
    expect(wrapper.vm.$data.newPermissionObject).toEqual({})
  })

  it('can return a list of roles for the selection dropdown', () => {
    expect(wrapper.vm.selectableRoles).toEqual(['UnpickedRole'])
  })

  it('can return a list of users for the selection dropdown', () => {
    expect(wrapper.vm.selectableUsers).toEqual(['UnpickedUser'])
  })

  it('can update a permission and reset the view', () => {
    const updatePermissionMock = { role: 'USER', permission: 'Break things' }
    wrapper.vm.$data.changedPermissionObjects = [updatePermissionMock]

    const editButton = wrapper.find('#edit-button')
    editButton.trigger('click')

    // verify flags
    expect(wrapper.vm.$data.editMode).toBeTruthy()
    expect(wrapper.vm.hasChanges).toBeTruthy()

    wrapper.vm.update()
    expect(wrapper.vm.$data.editMode).toBeFalsy()
    expect(updatePermissionsMock).toHaveBeenCalledWith(expect.anything(), { permissions: [updatePermissionMock] })
    expect(wrapper.vm.$data.changedPermissionObjects).toEqual([])
  })

  it('can remove a permission', () => {
    wrapper.vm.remove(0)
    expect(removePermissionMock).toHaveBeenCalledWith(expect.anything(), { permission: 'READWRITE', role: 'USER' })
  })

  it('can reset role and user when changing type', () => {
    // no object has a role AND user, but it's valid for the test
    const newPermissionMock = { role: 'Tester', user: 'test', permission: 'Break things' }
    wrapper.vm.$data.newPermissionObject = newPermissionMock

    wrapper.vm.resetNewPermissionObject()
    expect(wrapper.vm.$data.newPermissionObject).toEqual({ permission: 'Break things' })
  })
})
