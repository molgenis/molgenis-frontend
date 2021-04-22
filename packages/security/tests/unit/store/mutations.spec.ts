import mutations from '@/store/mutations'
import Vue from 'vue'

describe('mutations', () => {
  describe('setGroups', () => {
    it('should set an list of groups in the store', () => {
      const state: any = {
        groups: []
      }

      const payload: any = [
        { name: 'group1', label: 'group 1' },
        { name: 'group2', label: 'group 2' }
      ]

      mutations.setGroups(state, payload)

      expect(state.groups).toEqual(payload)
    })
  })
  describe('setVOGroups', () => {
    it('should set a list of VO groups in the store', () => {
      const state: any = {
        voGroups: []
      }

      const payload: any = [
        { name: 'group1', id: 'id1' }
      ]

      mutations.setVOGroups(state, payload)

      expect(state.voGroups).toEqual(payload)
    })
  })
  describe('setUsers', () => {
    it('should set an list of users in the store', () => {
      const state: any = {
        users: []
      }

      const payload: any = [
        { id: 'a', username: 'john' },
        { id: 'b', username: 'paul' }
      ]

      mutations.setUsers(state, payload)

      expect(state.users).toEqual(payload)
    })
  })
  describe('setGroupMembers', () => {
    const state: any = {
      groupMembers: {}
    }

    const payload: any = {
      groupName: 'my-group',
      groupMembers: [
        {
          userId: 'abc-123',
          username: 'user1',
          roleName: 'VIEWER',
          roleLabel: 'Viewer'
        }
      ]
    }

    beforeEach(function () {
      mutations.setGroupMembers(state, payload)
    })

    it('should set an list members in the groupsMembers map', (done) => {
      Vue.nextTick(() => {
        expect(state.groupMembers[payload.groupName]).toEqual(payload.groupMembers)
        done()
      })
    })
  })

  describe('setVOGroupMembers', () => {
    const state: any = {
      voGroupMembers: {}
    }

    const payload: any = {
      groupName: 'my-group',
      voGroupMembers: [
        {
          groupId: 'abc-123',
          groupName: 'user1',
          roleName: 'VIEWER',
          roleLabel: 'Viewer'
        }
      ]
    }

    it('should set a list op VO group members in the groupsMembers map', (done) => {
      mutations.setVOGroupMembers(state, payload)
      Vue.nextTick(() => {
        expect(state.voGroupMembers[payload.groupName]).toEqual(payload.voGroupMembers)
        done()
      })
    })
  })

  describe('setGroupRoles', () => {
    const state: any = {
      groupRoles: {}
    }

    const payload: any = {
      groupName: 'my-group',
      groupRoles: [
        {
          roleName: 'role-name',
          roleLabel: 'ROLE'
        }
      ]
    }

    beforeEach(function () {
      mutations.setGroupRoles(state, payload)
    })

    it('should set an list of roles in the groupsRoles map', (done) => {
      Vue.nextTick(() => {
        expect(state.groupRoles[payload.groupName]).toEqual(payload.groupRoles)
        done()
      })
    })
  })
  describe('setGroupPermissions', () => {
    const state: any = {
      groupPermissions: {}
    }

    const payload: any = {
      groupName: 'my-group',
      groupPermissions: [
        ['ADD_MEMBERSHIP', 'REMOVE_MEMBERSHIP']
      ]
    }

    beforeEach(function () {
      mutations.setGroupPermissions(state, payload)
    })

    it('should set an list of permissions in the groupPermissions map', (done) => {
      Vue.nextTick(() => {
        expect(state.groupPermissions[payload.groupName]).toEqual(payload.groupPermissions)
        done()
      })
    })
  })
  describe('clearToast', () => {
    it('should clears the toast message', () => {
      const state: any = {
        toast: {
          type: 'danger',
          message: 'How do you do'
        }
      }

      mutations.clearToast(state)

      expect(state.toast).toEqual(null)
    })
  })
  describe('setToast', () => {
    it('should set the toast in the store', () => {
      const state: any = {
        toast: {}
      }

      const payload: any = [
        { type: 'danger', message: 'How do you do' }
      ]

      mutations.setToast(state, payload)

      expect(state.toast).toEqual(payload)
    })
  })
})
