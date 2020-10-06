import GroupDetail from '@/components/GroupDetail.vue'
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

  const groupPermissions = {
    group1: ['ADD_MEMBERSHIP']
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.filter('i18n', $t)
    localVue.directive('b-modal', {})

    state = {
      groups: [],
      groupMembers: groupMembers,
      groupRoles: {},
      groupPermissions: { group1: ['ADD_MEMBERSHIP'] },
      users: [],
      toast: null
    }

    actions = {
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

  describe('When created', () => {
    it('should return the groupMembers via a getter', () => {
      const wrapper = shallowMount(GroupDetail, {
        propsData: {
          name: 'group1'
        },
        mocks: { $router, $route, $t },
        store,
        stubs,
        localVue
      })
      // @ts-ignore
      expect(wrapper.vm.groupMembers).toEqual(groupMembers)
    })

    it('should return determine if the user can add a member', () => {
      const wrapper = shallowMount(GroupDetail, {
        propsData: {
          name: 'group1'
        },
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
        propsData: {
          name: 'group1'
        },
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

  describe('when save permissions clicked', () => {
    it('should save permissions', async (done) => {
      const wrapper = shallowMount(GroupDetail, {
        propsData: {
          name: 'group1'
        },
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
        propsData: {
          name: 'group1'
        },
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
