import GroupDetail from '@/components/GroupDetail.vue'
import { VOGroupMember } from '@/types/VOGroupMember'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const $t = (key: string | number) => {
  const translations = {}
  // @ts-ignore
  return translations[key]
}

describe('GroupDetail component', () => {
  let getters: any
  let mutations: any
  let actions: any
  let localVue: any
  let state: any
  let store: any

  let pushedRoute = {}
  const $router = {
    push: function (pushed: {}) {
      pushedRoute = pushed
    }
  }
  const $route = {
    path: '/group'
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

  const voGroupMember: VOGroupMember = { groupId: 'vo-1', groupName: 'vo-group-1', roleLabel: 'Viewer', roleName: 'VIEWER' }

  const groupPermissions = {
    group1: ['ADD_MEMBERSHIP']
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.filter('i18n', $t)
    localVue.directive('b-modal', {})

    state = {
      voGroups: null,
      voGroupMembers: { group1: [voGroupMember] },
      groups: [],
      groupMembers: groupMembers,
      groupRoles: {},
      groupPermissions: { group1: ['ADD_MEMBERSHIP'] },
      users: [],
      toast: null
    }

    actions = {
      tempFetchVOGroups: () => jest.fn(),
      fetchVOGroupMembers: () => jest.fn(),
      fetchGroupMembers: () => jest.fn(),
      fetchGroupPermissions: () => jest.fn(),
      deleteGroup: jest.fn().mockResolvedValue({ test: true }),
      fetchGroupRights: jest.fn().mockResolvedValue({ test: true }),
      setGroupRight: jest.fn().mockResolvedValue({ test: true })
    }

    getters = {
      groupMembers: () => groupMembers,
      groupPermissions: () => groupPermissions,
      getAnonymousGroupRightsBool: () => jest.fn(),
      getUserGroupRightsString: () => jest.fn(),
      hasSuperUserRights: jest.fn().mockReturnValue(true)
    }

    mutations = {
      clearToast: jest.fn(),
      setToast: jest.fn(),
      setGroupRights: jest.fn()
    }
    store = new Vuex.Store({ state, actions, getters, mutations })
  })

  const stubs = ['router-link', 'router-view', 'b-button', 'b-modal']
  const propsData = {
    name: 'group1',
    type: 'member'
  }

  describe('When created', () => {
    it('should return the groupMembers via a getter', () => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      // @ts-ignore
      expect(wrapper.vm.groupMembers).toEqual(groupMembers)
    })

    it('should return myVOGroupMembers via a getter', () => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      // @ts-ignore
      expect(wrapper.vm.myVOGroupMembers).toEqual([voGroupMember])
    })

    it('should return determine if the user can add a member', () => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      // @ts-ignore
      expect(wrapper.vm.canAddMember).toEqual(true)
    })
  })

  describe('when the add member button is clicked', () => {
    it('should navigate to the add member page', () => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      wrapper.find('#add-member-btn').trigger('click')
      expect(pushedRoute).toEqual({ name: 'addMember', params: { groupName: 'group1' } })
      expect(mutations.clearToast).toHaveBeenCalledWith(state, undefined)
    })
  })

  describe('the vo group members', () => {
    it('should be hidden when there are no VO groups', (done) => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      expect(wrapper.find('#add-vo-group-member-btn').exists()).toBe(false)
      store.state.voGroups = []
      localVue.nextTick(() => {
        expect(wrapper.find('#add-vo-group-member-btn').exists()).toBe(false)
        store.state.voGroups = [{ id: 'vo-1', name: 'vo-group-1' }]
        localVue.nextTick(() => {
          expect(wrapper.find('#add-vo-group-member-btn').exists()).toBe(true)
          done()
        })
      })
    })
  })

  describe('when the add VO group member button is clicked', () => {
    it('should navigate to the VO group add member page', (done) => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      store.state.voGroups = [{ id: 'vo-1', name: 'vo-group-1' }]
      localVue.nextTick(() => {
        wrapper.find('#add-vo-group-member-btn').trigger('click')
        expect(pushedRoute).toEqual({ name: 'addVOGroupMember', params: { groupName: 'group1' } })
        expect(mutations.clearToast).toHaveBeenCalledWith(state, undefined)
        done()
      })
    })
  })

  describe('when save permissions clicked', () => {
    it('should save permissions', async (done) => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })

      // @ts-ignore
      await wrapper.vm.savePermissions()
      expect(actions.setGroupRight.mock.calls[0][1]).toEqual({ name: 'group1', role: 'ANONYMOUS', right: '' })
      expect(actions.setGroupRight.mock.calls[1][1]).toEqual({ name: 'group1', role: 'USER', right: '' })
      expect(actions.fetchGroupRights.mock.calls[0][1]).toEqual('group1')
      done()
    })
  })

  describe('when delete group clicked', () => {
    it('should delete the group', async (done) => {
      const wrapper = shallowMount(GroupDetail, {
        propsData,
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })

      // @ts-ignore
      wrapper.vm.deleteGroupHandler()
      localVue.nextTick(() => {
        expect(actions.deleteGroup).toBeCalled()
        expect(actions.deleteGroup).toBeCalledWith(expect.any(Object), { groupName: 'group1' })
        localVue.nextTick(() => {
          expect(pushedRoute).toEqual({ name: 'groupOverView' })
          done()
        })
      })
    })
  })
})
