import GroupOverview from '@/components/GroupOverview.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const $t = (key: string | number) => {
  const translations = {}
  // @ts-ignore
  return translations[key]
}

describe('GroupOverview component', () => {
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

  const groups = [
    { name: 'group1', label: 'My group 1' },
    { name: 'group2', label: 'My group 2' }
  ]

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.filter('i18n', $t)

    state = {
    }

    actions = {
      fetchGroups: () => jest.fn()
    }

    getters = {
      groups: () => groups,
      hasSuperUserRights: jest.fn().mockReturnValue(true)
    }

    mutations = {
      clearToast: jest.fn()
    }

    store = new Vuex.Store({ state, actions, getters, mutations })
  })

  const stubs = ['router-link', 'router-view']

  it('should return the groups via a getter', () => {
    const wrapper = shallowMount(GroupOverview, { store, stubs, localVue })
    // @ts-ignore
    expect(wrapper.vm.groups).toEqual(groups)
  })
  it('should navigate to the group add page', () => {
    const wrapper = shallowMount(GroupOverview, { mocks: { $router, $route }, store, stubs, localVue })
    wrapper.find('#add-group-btn').trigger('click')
    expect(pushedRoute).toEqual({ name: 'createGroup' })
    expect(mutations.clearToast(state, undefined))
  })
})
