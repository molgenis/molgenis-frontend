import actions from '@/store/actions'
import { VOGroup } from '@/types/VOGroup'
import { VOGroupMember } from '@/types/VOGroupMember'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  delete_: jest.fn()
}))

describe('actions', () => {
  const commit = jest.fn()
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('fetchGroups', () => {
    it('should fetch a list of groups and commit them to the store', async (done) => {
      api.get.mockResolvedValueOnce({ test: true })
      await actions.fetchGroups({ commit })
      expect(commit).toBeCalledWith('setGroups', { test: true })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.get.mockRejectedValueOnce(error)
      await actions.fetchGroups({ commit })
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('fetchGroupRoles', () => {
    const groupName = 'my-group'
    it('should fetch a list of groups roles for a given group and commit them to the store', async (done) => {
      const roles = [
        { roleName: 'VIEWER', roleLabel: 'Viewer' },
        { roleName: 'ADMIN', roleLabel: 'Admin' }
      ]

      api.get.mockResolvedValueOnce(roles)
      await actions.fetchGroupRoles({ commit }, groupName)
      expect(commit).toBeCalledWith('setGroupRoles', { groupName, groupRoles: roles })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.get.mockRejectedValueOnce(error)
      await actions.fetchGroupRoles({ commit }, 'error-group')
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('tempFetchUsers', () => {
    it('should fetch a list of all users ( until we have a invite system)', async (done) => {
      const users = [
        { id: 'dsds-34324-2', username: 'user1' },
        { id: 'dsds-34324-3', username: 'user2' }
      ]
      api.get.mockResolvedValueOnce(users)
      await actions.tempFetchUsers({ commit })
      expect(commit).toBeCalledWith('setUsers', users)
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.get.mockRejectedValueOnce(error)
      await actions.tempFetchUsers({ commit })
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('tempFetchVOGroups', () => {
    it('should fetch a list of all VO groups', async () => {
      const voGroups: VOGroup[] = [
        { id: 'id1', name: 'group-1' },
        { id: 'id1', name: 'group-2' }
      ]
      const state = { voGroups: null }
      api.get.mockResolvedValueOnce(voGroups)
      await actions.tempFetchVOGroups({ commit, state })
      expect(commit).toBeCalledWith('setVOGroups', voGroups)
    })

    it('should do nothing if groups are already present', async () => {
      const state = { voGroups: [] }
      await actions.tempFetchVOGroups({ commit, state })
      expect(api.get).toHaveBeenCalledTimes(0)
    })

    it('should commit any errors to the store', async () => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      const state = { voGroups: null }
      api.get.mockRejectedValueOnce(error)
      await actions.tempFetchVOGroups({ commit, state })
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
    })
  })

  describe('fetchVOGroupMembers', () => {
    const groupName = 'my-group'

    it('should fetch a list of groups roles for a given group and commit them to the store', async (done) => {
      const members = [
        {
          VOGroup: { id: '123-abc', name: 'user1' },
          role: { roleName: 'ADMIN', roleLabel: 'Admin' }
        },
        {
          VOGroup: { id: '456-dfg', name: 'user2' },
          role: { roleName: 'VIEWER', roleLabel: 'Viewer' }
        }
      ]

      const voGroupMembers: VOGroupMember[] = [
        {
          groupId: members[0].VOGroup.id,
          groupName: members[0].VOGroup.name,
          roleName: members[0].role.roleName,
          roleLabel: members[0].role.roleLabel
        }, {
          groupId: members[1].VOGroup.id,
          groupName: members[1].VOGroup.name,
          roleName: members[1].role.roleName,
          roleLabel: members[1].role.roleLabel
        }
      ]
      api.get.mockResolvedValueOnce(members)
      await actions.fetchVOGroupMembers({ commit }, groupName)
      expect(commit).toBeCalledWith('setVOGroupMembers', { groupName, voGroupMembers })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.get.mockRejectedValueOnce(error)
      await actions.fetchVOGroupMembers({ commit }, 'error-group')
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('fetchGroupMembers', () => {
    const groupName = 'my-group'

    it('should fetch a list of groups roles for a given group and commit them to the store', async (done) => {
      const members = [
        {
          user: { id: '123-abc', username: 'user1' },
          role: { roleName: 'ADMIN', roleLabel: 'Admin' }
        },
        {
          user: { id: '456-dfg', username: 'user2' },
          role: { roleName: 'VIEWER', roleLabel: 'Viewer' }
        }
      ]

      const groupMembers = [
        {
          userId: members[0].user.id,
          username: members[0].user.username,
          roleName: members[0].role.roleName,
          roleLabel: members[0].role.roleLabel
        }, {
          userId: members[1].user.id,
          username: members[1].user.username,
          roleName: members[1].role.roleName,
          roleLabel: members[1].role.roleLabel
        }
      ]
      api.get.mockResolvedValueOnce(members)
      await actions.fetchGroupMembers({ commit }, groupName)
      expect(commit).toBeCalledWith('setGroupMembers', { groupName, groupMembers })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.get.mockRejectedValueOnce(error)
      await actions.fetchGroupMembers({ commit }, 'error-group')
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('fetchGroupPermissions', () => {
    const groupName = 'my-group'

    it('should fetch a list of groups roles for a given group and commit them to the store', async (done) => {
      const groupPermissions = ['ADD_MEMBERSHIP', 'REMOVE_MEMBERSHIP']
      api.get.mockResolvedValueOnce(groupPermissions)
      await actions.fetchGroupPermissions({ commit }, groupName)
      expect(commit).toBeCalledWith('setGroupPermissions', { groupName, groupPermissions })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.get.mockRejectedValueOnce(error)
      await actions.fetchGroupPermissions({ commit }, 'error-group')
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('createGroup', () => {
    it('should create a group and displays toast', async (done) => {
      const createGroupCommand = {
        groupIdentifier: 'test',
        name: 'test-name'
      }
      const response = {
        name: 'test',
        label: 'test-name'
      }
      api.post.mockResolvedValueOnce(response)
      await actions.createGroup({ commit }, createGroupCommand)
      expect(commit).toBeCalledWith('setGroups', response)
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Created test-name group' })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const createGroupCommand = {
        groupIdentifier: 'test',
        name: 'test group'
      }

      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.post.mockRejectedValueOnce(error)
      try {
        await actions.createGroup({ commit }, createGroupCommand)
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('addMember', () => {
    const groupName = 'my-group'
    const state = {
      voGroups: [{ id: 'id1', name: 'vo-group-1' }]
    }

    it('should add a member to the group and display toast', async (done) => {
      api.post.mockResolvedValueOnce()
      await actions.addMember({ commit, state },
        { groupName, name: 'user1', type: 'member', roleName: 'VIEWER' })
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Added member' })
      done()
    })

    it('should add a VO group member to the group', async (done) => {
      api.post.mockResolvedValueOnce()
      await actions.addMember({ commit, state },
        { groupName, name: 'vo-group-1', type: 'vo-group', roleName: 'VIEWER' })
      expect(api.post).toBeCalledWith('/api/identities/group/my-group/vo-group',
        { body: '{"roleName":"VIEWER","VOGroupID":"id1"}' })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.post.mockRejectedValueOnce(error)
      try {
        await actions.addMember({ commit, state },
          { groupName, name: 'user1', type: 'member', roleName: 'ERROR-ROLE' })
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('removeMember', () => {
    const state = {
      voGroups: [{ id: 'id1', name: 'vo-group-1' }]
    }
    const groupName = 'my-group'
    const memberName = 'user1'

    it('should remove a member from the group and display toast', async (done) => {
      api.delete_.mockResolvedValueOnce()
      await actions.removeMember({ commit, state }, { groupName, memberName, type: 'member' })
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Member removed from group' })
      done()
    })

    it('should remove a VO group member from the group', async (done) => {
      api.delete_.mockResolvedValueOnce()
      await actions.removeMember({ commit, state }, { groupName, memberName: 'vo-group-1', type: 'vo-group' })
      expect(api.delete_).toBeCalledWith('/api/identities/group/my-group/vo-group/id1')
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.delete_.mockRejectedValueOnce(error)
      try {
        await actions.removeMember({ commit, state }, { groupName, memberName, type: 'member' })
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('updateMember', () => {
    const groupName = 'my-group'
    const memberName = 'user1'
    const state = {
      voGroups: []
    }
    const updateMemberCommand = { roleName: 'NEW-ROLE' }

    it('should updateMember a member from the group and displays toast', async (done) => {
      api.put.mockResolvedValueOnce()
      await actions.updateMember({ commit, state }, { groupName, memberName, type: 'member', updateMemberCommand })
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Member updated' })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.put.mockRejectedValueOnce(error)
      try {
        await actions.updateMember({ commit, state }, { groupName, memberName, type: 'member', updateMemberCommand })
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('deleteGroup', () => {
    const groupName = 'my-group'

    it('should delete group and display toast', async (done) => {
      api.delete_.mockResolvedValueOnce()
      await actions.deleteGroup({ commit }, { groupName })
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Deleted Group' })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.delete_.mockRejectedValueOnce(error)
      try {
        await actions.deleteGroup({ commit }, { groupName })
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })

  describe('setGroupRight', () => {
    it('should set the requested roll/permission/group combination', async (done) => {
      const state = { groupRights: { roles: [{ roleName: 'GROUP1_RIGHT1' }] } }
      api.put.mockResolvedValueOnce()
      // @ts-ignore
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: 'right1' })
      expect(commit).not.toBeCalled()
      expect(api.put).toBeCalledTimes(1)
      done()
    })

    it('should do nothing if requested roll/permission/group combination exists', async (done) => {
      const state = { groupRights: { roles: [] } }
      api.put.mockResolvedValueOnce({})
      // @ts-ignore
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: 'right1' })
      expect(commit).not.toBeCalled()
      expect(api.put).not.toBeCalled()
      done()
    })

    it('should send a error if roll/permission/group combination requests fails', async (done) => {
      const state = { groupRights: { roles: [{ roleName: 'GROUP1_RIGHT1' }] } }
      api.put.mockResolvedValueOnce({ status: 404 })
      // @ts-ignore
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: 'right1' })
      expect(commit).toBeCalledWith('setToast', { message: 'An error has occurred.', type: 'danger' })
      expect(api.put).toBeCalledTimes(1)
      done()
    })

    it('should unset the requested roll/permission/group combination', async (done) => {
      const state = { groupRights: { roles: [{ roleName: 'GROUP1_RIGHT1' }] } }
      api.delete_.mockResolvedValueOnce()
      // @ts-ignore
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: '' })
      expect(commit).not.toBeCalled()
      expect(api.delete_).toBeCalledTimes(1)
      done()
    })

    it('should send a error if unset roll/permission/group combination fails', async (done) => {
      const state = { groupRights: { roles: [] } }
      api.delete_.mockResolvedValueOnce({ status: 404 })
      // @ts-ignore
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: '' })
      expect(commit).toBeCalledWith('setToast', { message: 'An error has occurred.', type: 'danger' })
      expect(api.delete_).toBeCalledTimes(1)
      done()
    })
  })

  describe('fetchGroupRights', () => {
    it('should fetch al the needed information to manipulate the group permissions', async (done) => {
      const groupPermissions = { items: [{ data: { name: 'ANONYMOUS' } }, { data: { name: 'USER' } }] }
      const roles = [{ hello: 'world' }]
      const groupName = 'group1'
      api.get.mockResolvedValueOnce(groupPermissions)
      api.get.mockResolvedValueOnce(roles)

      await actions.fetchGroupRights({ commit }, groupName)
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'anonymous', groupRights: null })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'user', groupRights: null })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'roles', groupRights: [] })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'anonymous', groupRights: { name: 'ANONYMOUS' } })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'user', groupRights: { name: 'USER' } })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'roles', groupRights: roles })
      done()
    })

    it('should commit any fetchGroupRights errors to the store', async (done) => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      const groupName = 'group1'
      api.get.mockRejectedValueOnce(error)
      api.get.mockRejectedValueOnce(error)
      await actions.fetchGroupRights({ commit }, groupName)
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'anonymous', groupRights: null })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'user', groupRights: null })
      expect(commit).toBeCalledWith('setGroupRights', { groupName: 'roles', groupRights: [] })
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })
})
