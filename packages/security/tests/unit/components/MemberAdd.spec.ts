import MemberAdd from '@/components/MemberAdd.vue'
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

describe('MemberAdd component', () => {
  let getters: any
  let mutations: any
  let actions: any
  let state: any
  let store: any

  let pushedRoute = {}
  const $router = {
    push: function (pushed: {}) {
      pushedRoute = pushed
    }
  }
  const $route = {
    path: '/group/my-group'
  }

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

  const users = [
    {
      id: 'user-1',
      username: 'bert'
    },
    {
      id: 'user-2',
      username: 'ans'
    },
    {
      id: 'user-3',
      username: 'nick'
    }
  ]

  describe('after created', () => {
    beforeEach(() => {
      state = {}

      actions = {
        tempFetchUsers: () => jest.fn(),
        fetchGroupRoles: () => jest.fn(),
        addMember: () => jest.fn()
      }

      getters = {
        groupRoles: () => groupRoles,
        users: () => users,
        groupMembers: () => groupMembers
      }

      mutations = {
        setLoginUser: jest.fn(),
        clearToast: jest.fn()
      }

      store = new Vuex.Store({ state, actions, getters, mutations })
    })

    const stubs = ['router-link', 'router-view']

    it('should return the groupRoles via a getter', () => {
      const wrapper = shallowMount(MemberAdd, { store, stubs, localVue })
      // @ts-ignore
      expect(wrapper.vm.groupRoles).toEqual(groupRoles)
    })

    it('should return the users via a getter', () => {
      const wrapper = shallowMount(MemberAdd, { store, stubs, localVue })
      // @ts-ignore
      expect(wrapper.vm.users).toEqual(users)
    })

    it('should return the groupMembers via a getter', () => {
      const wrapper = shallowMount(MemberAdd, { store, stubs, localVue })
      // @ts-ignore
      expect(wrapper.vm.groupMembers).toEqual(groupMembers)
    })

    describe('on add member', () => {
      it('should add a member', async (done) => {
        const wrapper = shallowMount(MemberAdd, {
          propsData: {
            groupName: 'group1'
          },
          mocks: { $router, $route },
          store,
          stubs,
          localVue
        })

        wrapper.setData({
          username: 'user-3',
          roleName: 'EDITOR',
          isAdding: false
        })

        // @ts-ignore
        wrapper.vm.onSubmit()

        await localVue.nextTick()
        await localVue.nextTick()
        expect(pushedRoute).toEqual({ name: 'groupDetail', params: { name: 'group1' } })
        done()
      })
    })
  })
})
