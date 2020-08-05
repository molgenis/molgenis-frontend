import actions from '@/store/actions.ts'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import asyncUtilService from '@/service/asyncUtilService'

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn(),
  put: jest.fn(),
  post: jest.fn(),
  delete_: jest.fn()
}))

describe('actions', () => {
/*
  beforeEach(() => {
    td.reset()
    td.replace(asyncUtilService, 'callAfter', (f) => f())
  })
*/
  const commit: any = jest.fn()

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

    it('should add a member to the group and displays toast', async (done) => {
      const addMemberCommand = { username: 'user1', roleName: 'VIEWER' }
      api.post.mockResolvedValueOnce()
      await actions.addMember({ commit }, { groupName, addMemberCommand })
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Added member' })
      done()
    })

    it('should commit any errors to the store', async (done) => {
      const addMemberCommand = { username: 'user1', roleName: 'ERROR-ROLE' }
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      api.post.mockRejectedValueOnce(error)
      try {
        await actions.addMember({ commit }, { groupName, addMemberCommand })
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })
  describe('removeMember', () => {
    const groupName = 'my-group'
    const memberName = 'user1'

    it('should remove a member from the group and displays toast', async (done) => {
      api.delete_.mockResolvedValueOnce()
      await actions.removeMember({ commit }, { groupName, memberName })
      expect(commit).toBeCalledWith('setToast', { type: 'success', message: 'Member removed from group' })
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
        await actions.removeMember({ commit }, { groupName, memberName })
      } catch {
      }
      expect(commit).toBeCalledWith('setToast', { type: 'danger', message: 'Error when calling (backend)' })
      done()
    })
  })
  describe('updateMember', () => {
    const groupName = 'my-group'
    const memberName = 'user1'

    const updateMemberCommand = { roleName: 'NEW-ROLE' }

    it('should updateMember a member from the group and displays toast', async (done) => {
      api.put.mockResolvedValueOnce()
      await actions.updateMember({ commit }, { groupName, memberName, updateMemberCommand })
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
        await actions.updateMember({ commit }, { groupName, memberName, updateMemberCommand })
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
    it('should set the requested roll/permission/group combination', async () => {
      const put = td.function('api.put')
      const url = '/api/identities/group/group1/role/role1'
      const payload = { body: JSON.stringify({ role: 'GROUP1_RIGHT1' }) }
      td.when(put(url, payload))
        .thenResolve({ state: true })
      td.replace(api, 'put', put)

      const commit = sinon.spy()
      const state = { groupRights: { roles: [ ] } }
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: 'right1' })
      td.verify(put(url, payload))
    })
    it('should unset the requested roll/permission/group combination', async () => {
      const delete_ = td.function('api.delete_')
      const url = '/api/identities/group/group1/role/role1'
      td.when(delete_(url))
        .thenResolve({ state: true })
      td.replace(api, 'delete_', delete_)

      const commit = sinon.spy()
      const state = { groupRights: { roles: [ ] } }
      await actions.setGroupRight({ commit, state }, { name: 'group1', role: 'role1', right: '' })
      td.verify(delete_(url))
    })
  })

  describe('fetchGroupRights', () => {
    it('should fetch al the needed information to manipulate the group permissions', done => {
      const groupPermissions = { items: [ { data: { name: 'ANONYMOUS' } }, { data: { name: 'USER' } } ] }
      const roles = [{ hello: 'world' }]
      const groupName = 'group1'

      const get = td.function('api.get')
      td.when(get('/api/data/sys_sec_Role?expand=includes&q=name==ANONYMOUS,name==USER')).thenResolve(groupPermissions)
      td.when(get(`/api/identities/group/${groupName}/role`)).thenResolve(roles)
      td.replace(api, 'get', get)

      const options = {
        payload: groupName,
        expectedMutations: [
          { type: 'setGroupRights', payload: { groupName: 'anonymous', groupRights: null } },
          { type: 'setGroupRights', payload: { groupName: 'user', groupRights: null } },
          { type: 'setGroupRights', payload: { groupName: 'roles', groupRights: [] } },
          { type: 'setGroupRights', payload: { groupName: 'anonymous', groupRights: { name: 'ANONYMOUS' } } },
          { type: 'setGroupRights', payload: { groupName: 'user', groupRights: { name: 'USER' } } },
          { type: 'setGroupRights', payload: { groupName: 'roles', groupRights: roles } }
        ]
      }
      testUtils.testAction(actions.fetchGroupRights, options, done)
    })
    it('should commit any fetchGroupRights errors to the store', done => {
      const error = {
        errors: [{
          message: 'Error when calling',
          code: 'backend'
        }]
      }
      const groupName = 'group1'

      const get = td.function('api.get')
      td.when(get('/api/data/sys_sec_Role?expand=includes&q=name==ANONYMOUS,name==USER')).thenReject(error)
      td.when(get(`/api/identities/group/${groupName}/role`)).thenReject(error)
      td.replace(api, 'get', get)

      const options = {
        payload: groupName,
        expectedMutations: [
          { type: 'setGroupRights', payload: { groupName: 'anonymous', groupRights: null } },
          { type: 'setGroupRights', payload: { groupName: 'user', groupRights: null } },
          { type: 'setGroupRights', payload: { groupName: 'roles', groupRights: [] } },
          {
            type: 'setToast',
            payload: {type: 'danger', message: 'Error when calling (backend)'}
          },
          {
            type: 'setToast',
            payload: {type: 'danger', message: 'Error when calling (backend)'}
          }
        ]
      }
      testUtils.testAction(actions.fetchGroupRights, options, done)
    })
  })
})
