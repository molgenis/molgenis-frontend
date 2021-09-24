import api from '@molgenis/molgenis-api-client'
import { actions } from '../../../src/store/actions'

jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    post: jest.fn(),
    get: jest.fn(),
    delete_: jest.fn()
  }
})
/**
 * Not going to test the exact reponses, only if the correct urls and commits are being called.
 * Mutations will test that the processing is done correctly
 * This way the tests don't break if API responses change.
 */

describe('Actions.js', () => {
  let commit, dispatch

  const state = {
    route: {
      params: {
        entityId: 1,
        objectId: 2
      }
    }
  }

  beforeEach(() => {
    commit = jest.fn()
    dispatch = jest.fn()
  })

  it('can call endpoint and commit setRoleOptions with the response as parameter', async () => {
    api.get.mockResolvedValueOnce('RoleOptionResponse')

    // you have to await the actions :)
    await actions.getAllRoles({ commit })

    expect(api.get).toHaveBeenCalledWith('/api/data/sys_sec_Role')
    expect(commit).toHaveBeenCalledWith('setRoleOptions', 'RoleOptionResponse')
  })

  it('can call endpoint and commit SetUserOptions with the response as parameter', async () => {
    api.get.mockResolvedValueOnce('UserOptionResponse')

    await actions.getAllUsers({ commit })

    expect(api.get).toHaveBeenCalledWith('/api/identities/user')
    expect(commit).toHaveBeenCalledWith('setUserOptions', 'UserOptionResponse')
  })

  it('can call endpoint and commit SetRlsProperties with the response as parameter and (re)set setResponseStatus', async () => {
    api.get.mockResolvedValueOnce('PermissionsTypesResponse')

    await actions.getAllPermissionsTypes({ commit })

    expect(api.get).toHaveBeenCalledWith('/api/permissions/types')
    expect(commit).toHaveBeenNthCalledWith(1, 'setResponseStatus', { status: 0 })
    expect(commit).toHaveBeenNthCalledWith(2, 'setRlsEntities', 'PermissionsTypesResponse')
    expect(commit).toHaveBeenNthCalledWith(3, 'setResponseStatus', 'PermissionsTypesResponse')
  })

  it('can call endpoint and commit SetAvailablePermissions with the response as parameter', async () => {
    api.get.mockResolvedValueOnce('AvailablePermissionResponse')

    await actions.getPermissionsByEntityId({ commit }, 1)

    expect(api.get).toHaveBeenCalledWith('/api/permissions/types/permissions/1')
    expect(commit).toHaveBeenCalledWith('setAvailablePermissions', 'AvailablePermissionResponse')
  })

  it('can call endpoint and commit SetRlsProperties with the response as parameter and (re)set setResponseStatus', async () => {
    api.get.mockResolvedValueOnce('RlsObjectsResponse')

    await actions.getAllRlsObjects({ commit }, 1)

    expect(api.get).toHaveBeenCalledWith('/api/permissions/1')
    expect(commit).toHaveBeenNthCalledWith(1, 'setResponseStatus', { status: 0 })
    expect(commit).toHaveBeenNthCalledWith(2, 'setRlsObjects', 'RlsObjectsResponse')
    expect(commit).toHaveBeenNthCalledWith(3, 'setResponseStatus', 'RlsObjectsResponse')
  })

  it('can call endpoint and commit SetPermissionObject & setStartInAddMode and with the response as parameter and (re)set setResponseStatus for GetPermissions', async () => {
    api.get.mockResolvedValueOnce('PermissionsForObjectsResponse')

    await actions.getPermissionsForObject({ commit, state })

    expect(api.get).toHaveBeenCalledWith('/api/permissions/1/2')
    expect(commit).toHaveBeenNthCalledWith(1, 'setResponseStatus', { status: 0 })
    expect(commit).toHaveBeenNthCalledWith(2, 'setPermissionObject', 'PermissionsForObjectsResponse')
    expect(commit).toHaveBeenNthCalledWith(3, 'setResponseStatus', 'PermissionsForObjectsResponse')
    expect(commit).toHaveBeenNthCalledWith(4, 'setStartInAddMode', 'PermissionsForObjectsResponse')
  })

  it('can call endpoint and dispatch getPermissionsForObject for AddPermission', async () => {
    api.post.mockResolvedValueOnce('AddPermissionResponse')

    await actions.addPermission({ commit, state, dispatch }, { role: 'USER', permission: 'VIEW' })

    expect(api.post).toHaveBeenCalledWith('/api/permissions/1/2', { body: '{"permissions":[{"role":"USER","permission":"VIEW"}]}' })
    expect(dispatch).toHaveBeenCalledWith('getPermissionsForObject')
  })

  it('can call endpoint and dispatch getPermissionsForObject for DeletePermission', async () => {
    api.delete_.mockResolvedValueOnce('AddPermissionResponse')

    await actions.removePermission({ commit, state, dispatch }, { role: 'USER', permission: '' })

    expect(api.delete_).toHaveBeenCalledWith('/api/permissions/1/2', { body: '{"role":"USER","permission":""}' })
    expect(dispatch).toHaveBeenCalledWith('getPermissionsForObject')
  })
})
