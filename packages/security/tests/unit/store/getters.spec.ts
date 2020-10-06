import getters from '@/store/getters.ts'

describe('getters', () => {
  describe('groups', () => {
    it('should return groups from the store', () => {
      const state: any = {
        groups: [
          { name: 'group1', label: 'group 1' },
          { name: 'group2', label: 'group 2' }
        ]
      }
      expect(getters.groups(state)).toEqual(state.groups)
    })
  })

  describe('groupMembers', () => {
    it('should return groupsMembers map from the store', () => {
      const state: any = {
        groupMembers: {
          myGroup: [
            {
              userId: 'abc-123',
              username: 'user1',
              roleName: 'VIEWER',
              roleLabel: 'Viewer'
            }
          ]
        }
      }
      expect(getters.groupMembers(state)).toEqual(state.groupMembers)
    })
  })

  describe('groupRoles', () => {
    it('should return groupRoles map from the store', () => {
      const state: any = {
        groupRoles: {
          myGroup: [
            {
              roleName: 'VIEWER',
              roleLabel: 'Viewer'
            }
          ]
        }
      }
      expect(getters.groupRoles(state)).toEqual(state.groupRoles)
    })
  })

  describe('groupPermissions', () => {
    it('should return groupPermissions map from the store', () => {
      const state: any = {
        groupPermissions: {
          myGroup: ['ADD_MEMBERSHIP', 'REMOVE_MEMBERSHIP']
        }
      }
      expect(getters.groupPermissions(state)).toEqual(state.groupPermissions)
    })
  })

  describe('users', () => {
    it('should return groups from the store', () => {
      const state: any = {
        users: [
          { id: 'a', username: 'user1' },
          { id: 'b', username: 'user2' }
        ]
      }
      expect(getters.users(state)).toEqual(state.users)
    })
  })

  describe('toast', () => {
    it('should return the toast object', () => {
      const state: any = {
        toast: { type: 'danger', message: 'how do you do' }
      }
      expect(getters.toast(state)).toEqual(state.toast)
    })
  })
  describe('getAnonymousGroupRightsBool', () => {
    it('should be false when data is not loaded', () => {
      const state: any = {
        groupRights: {
          anonymous: null
        }
      }
      expect(getters.getAnonymousGroupRightsBool(state)('test', 'Viewer')).toEqual(false)
    })

    it('should check if the selected roll has the selected permission', () => {
      const state: any = {
        groupRights: {
          anonymous: { includes: { items: [{ data: { name: 'GROUP_PERMISSION' } }] } }
        }
      }
      expect(getters.getAnonymousGroupRightsBool(state)('Group', 'Permission')).toEqual(true)
    })
  })

  describe('getUserGroupRightsString', () => {
    it('should be false when data is not loaded', () => {
      const state: any = {
        groupRights: {
          user: null
        }
      }
      expect(getters.getUserGroupRightsString(state)('test')).toEqual('')
    })

    it('should check if the selected roll has the selected permission', () => {
      const state: any = {
        groupRights: {
          user: { includes: { items: [{ data: { name: 'GROUP_VIEWER', label: 'Viewer' } }] } }
        }
      }
      expect(getters.getUserGroupRightsString(state)('Group')).toEqual('Viewer')
    })
  })
})
