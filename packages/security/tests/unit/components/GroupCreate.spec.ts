import GroupCreate from '@/components/GroupCreate.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const $t = (key: string | number) => {
  const translations = {}
  // @ts-ignore
  return translations[key]
}

describe('GroupCreate component', () => {
  let getters: any
  let actions: any
  let localVue: any
  let state: any
  let store: any

  const $router = {
    push: jest.fn()
  }
  const $route = {
    path: '/group'
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.filter('i18n', $t)

    getters = {
      hasSuperUserRights: jest.fn().mockReturnValue(true)
    }

    actions = {
      createGroup: jest.fn(),
      fetchGroups: jest.fn(),
      checkRootPackageExists: jest.fn()
    }

    store = new Vuex.Store({ state, actions, getters })
  })

  const stubs = ['router-link', 'router-view']

  it('should return the slugified text', (done) => {
    const wrapper = shallowMount(GroupCreate, { store, stubs, localVue })
    wrapper.find('#groupNameInput').setValue('test group')
    const groupIdentifier = wrapper.find('#groupIdentifierInput')
    setTimeout(() => {
      // @ts-ignore
      expect(groupIdentifier.element.value).toEqual('test-group')
      done()
    }, 300)
  })

  it('should check if the group identifier is taken', (done) => {
    const wrapper = shallowMount(GroupCreate, { mocks: { $router, $route }, store, stubs, localVue })
    actions.checkRootPackageExists.mockReturnValueOnce(true)
    wrapper.find('#groupNameInput').setValue('Test Group')
    setTimeout(() => {
      // @ts-ignore
      expect(wrapper.vm.groupIdentifierTaken).toEqual(true)
      // @ts-ignore
      expect(wrapper.vm.canSubmit).toEqual(false)
      done()
    }, 400)
  })

  it('should check if the group identifier is invalid', () => {
    const wrapper = shallowMount(GroupCreate, { mocks: { $router, $route }, store, stubs, localVue })
    wrapper.find('#groupNameInput').setValue('Test Group')
    wrapper.find('#groupIdentifierInput').setValue('test group?')
    // @ts-ignore
    expect(wrapper.vm.invalidGroupIdentifier).toEqual(true)
    // @ts-ignore
    expect(wrapper.vm.canSubmit).toEqual(false)
  })

  it('should create a new group', (done) => {
    const wrapper = shallowMount(GroupCreate, { mocks: { $router, $route }, store, stubs, localVue })
    actions.checkRootPackageExists.mockReturnValueOnce(false)
    wrapper.find('#groupNameInput').setValue('Test Group')
    setTimeout(() => {
      // @ts-ignore
      expect(wrapper.vm.canSubmit).toEqual(true)
      wrapper.find('#create-btn').trigger('click')
      expect(actions.createGroup).toHaveBeenCalledWith(expect.any(Object), {
        groupIdentifier: 'test-group',
        name: 'Test Group'
      })
      done()
    }, 400)
  })
})
