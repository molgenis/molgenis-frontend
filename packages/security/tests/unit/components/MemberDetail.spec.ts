import MemberDetail from '@/components/MemberDetail.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const $t = (key: string | number) => {
  const translations = {}
  // @ts-ignore
  return translations[key]
}

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.filter('i18n', $t)

const $router = {
  push: jest.fn()
}
const $route = {
  path: '/group/my-group'
}

describe('MemberDetail component', () => {
  const stubs = ['router-link', 'router-view']

  const groupRoles = {
    group1: [
      {
        roleName: 'VIEWER',
        roleLabel: 'Viewer'
      },
      {
        roleName: 'MANAGER',
        roleLabel: 'Manager'
      },
      {
        roleName: 'EDITOR',
        roleLabel: 'Editor'
      }
    ]
  }

  const groupMembers = {
    group1: [
      {
        userId: 'user-1',
        username: 'bert',
        roleName: 'VIEWER',
        roleLabel: 'Viewer'
      },
      {
        userId: 'user-2',
        username: 'ans',
        roleName: 'MANAGER',
        roleLabel: 'Manager'
      }
    ]
  }

  const groupPermissions = {
    group1: ['REMOVE_MEMBERSHIP']
  }

  const state: any = {
    loginUser: {},
    groups: [],
    voGroups: [],
    voGroupMembers: {},
    groupMembers: {},
    groupRoles: {},
    groupPermissions: groupPermissions,
    users: [],
    toast: null
  }

  const actions: any = {
    tempFetchVOGroups: jest.fn(),
    fetchVOGroupMembers: jest.fn(),
    fetchGroupMembers: jest.fn(),
    fetchGroupRoles: jest.fn(),
    fetchGroupPermissions: jest.fn(),
    removeMember: jest.fn(),
    updateMember: jest.fn()
  }

  const getters: any = {
    groupRoles: () => groupRoles,
    groupMembers: () => groupMembers,
    groupPermissions: () => groupPermissions
  }

  const mutations: any = {}

  const store: any = new Vuex.Store({ state, actions, getters, mutations })

  describe('created with empty store', () => {
    const propsData = {
      groupName: 'group1',
      memberName: 'member1',
      type: 'member'
    }

    beforeEach(() => {
      const emptyGetters = {
        groupRoles: () => { return {} },
        groupMembers: () => { return {} },
        groupPermissions: () => { return {} }
      }
      const emptyStore = new Vuex.Store({ state, actions, getters: emptyGetters, mutations })
      shallowMount(MemberDetail, { propsData, store: emptyStore, stubs, localVue })
    })

    it('should fetch the group members', () => {
      expect(actions.fetchGroupMembers).toHaveBeenCalled()
    })

    it('should fetch the group roles', () => {
      expect(actions.fetchGroupRoles).toHaveBeenCalled()
    })

    it('should fetch the group permissions', () => {
      expect(actions.fetchGroupPermissions).toHaveBeenCalled()
    })
  })

  describe('created with filled up store', () => {
    const propsData = {
      groupName: 'group1',
      memberName: 'member1',
      type: 'member'
    }

    beforeEach(() => {
      shallowMount(MemberDetail, { propsData, store, stubs, localVue })
    })

    it('should fetch the group members', () => {
      expect(actions.fetchGroupMembers).toHaveBeenCalled()
    })

    it('should fetch the group roles', () => {
      expect(actions.fetchGroupRoles).toHaveBeenCalled()
    })

    it('should fetch the group permissions', () => {
      expect(actions.fetchGroupPermissions).toHaveBeenCalled()
    })
  })

  describe('getters', () => {
    let wrapper: any
    const propsData = {
      groupName: 'group1',
      memberName: 'ans',
      type: 'member'
    }

    beforeEach(() => {
      wrapper = shallowMount(MemberDetail, { propsData, store, stubs, localVue })
    })

    it('should return the groupRoles via a getter', () => {
      expect(wrapper.vm.member).toEqual(groupMembers.group1[1])
    })

    it('should return the sortedRoles via a getter', () => {
      const actual = wrapper.vm.sortedRoles[0].roleLabel
      const expected = 'Editor'
      expect(actual).toEqual(expected)
    })

    it('should tell if the current user can remove members', () => {
      expect(wrapper.vm.canRemoveMember).toEqual(true)
    })

    it('should tell if the current user can update members', () => {
      expect(wrapper.vm.canUpdateMember).toEqual(false)
    })
  })

  describe('methods', () => {
    let wrapper: any
    const propsData = {
      groupName: 'group1',
      memberName: 'ans',
      type: 'member'
    }

    beforeEach(() => {
      wrapper = shallowMount(MemberDetail,
        {
          propsData,
          mocks: { $router, $route },
          store,
          stubs,
          localVue
        })
    })

    it('onEditRole should set the selected role and activate the edit mode', () => {
      expect(wrapper.vm.selectedRole).toEqual('')
      expect(wrapper.vm.isEditRoleMode).toEqual(false)
      wrapper.vm.onEditRole()
      expect(wrapper.vm.selectedRole).toEqual('MANAGER')
      expect(wrapper.vm.isEditRoleMode).toEqual(true)
    })

    it('onRemoveMember should call the removeMember action', () => {
      expect(wrapper.vm.isRemoving).toEqual(false)
      wrapper.vm.onRemoveMember()
      expect(wrapper.vm.isRemoving).toEqual(true)
      expect(actions.removeMember).toHaveBeenCalled()
    })

    it('onUpdateMember should call the updateMember action', () => {
      expect(wrapper.vm.isUpdating).toEqual(false)
      wrapper.vm.onUpdateMember()
      expect(wrapper.vm.isUpdating).toEqual(true)
      expect(actions.updateMember).toHaveBeenCalled()
    })
  })
})
