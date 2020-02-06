import GroupCreate from '../../../../src/components/GroupCreate'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import td from 'testdouble'
import Vuex from 'vuex'

const $t = (key) => {
  const translations = {}
  return translations[key]
}

describe('GroupCreate component', () => {
  let getters
  let actions
  let localVue
  let state
  let store

  const $router = {
    push: function (pushed) {}
  }
  const $route = {
    path: '/group'
  }

  const loginUser = {
    name: 'admin',
    isSuperUser: true
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.filter('i18n', $t)

    state = {
      loginUser: loginUser
    }

    getters = {
      getLoginUser: () => loginUser
    }

    actions = {
      createGroup: td.function(),
      fetchGroups: td.function(),
      checkRootPackageExists: td.function()
    }

    store = new Vuex.Store({state, actions, getters})
  })

  const stubs = ['router-link', 'router-view']

  it('should return the slugified text', () => {
    const wrapper = shallowMount(GroupCreate, {store, stubs, localVue})
    wrapper.find('#groupNameInput').setValue('test group')
    let groupIdentifier = wrapper.find('#groupIdentifierInput')
    expect(groupIdentifier.element.value).to.equal('test-group')
  })

  it('should check if the group identifier is taken', (done) => {
    const wrapper = shallowMount(GroupCreate, {mocks: {$router, $route}, store, stubs, localVue})
    td.when(actions.checkRootPackageExists(td.matchers.anything(), 'test-group', undefined)).thenReturn(Promise.resolve(true))
    wrapper.find('#groupNameInput').setValue('Test Group')
    setTimeout(() => {
      expect(wrapper.vm.groupIdentifierTaken).to.equal(true)
      expect(wrapper.vm.canSubmit).to.equal(false)
      done()
    }, 400)
  })

  it('should check if the group identifier is invalid', () => {
    const wrapper = shallowMount(GroupCreate, {mocks: {$router, $route}, store, stubs, localVue})
    wrapper.find('#groupNameInput').setValue('Test Group')
    wrapper.find('#groupIdentifierInput').setValue('test group?')
    expect(wrapper.vm.invalidGroupIdentifier).to.equal(true)
    expect(wrapper.vm.canSubmit).to.equal(false)
  })

  it('should create a new group', (done) => {
    const wrapper = shallowMount(GroupCreate, {mocks: {$router, $route}, store, stubs, localVue})
    td.when(actions.checkRootPackageExists(td.matchers.anything(), 'test-group', undefined)).thenReturn(Promise.resolve(false))
    wrapper.find('#groupNameInput').setValue('Test Group')
    setTimeout(() => {
      expect(wrapper.vm.canSubmit).to.equal(true)
      wrapper.find('#create-btn').trigger('click')
      td.verify(actions.createGroup(td.matchers.anything(), {
        groupIdentifier: 'test-group',
        name: 'Test Group'
      }, undefined))
      done()
    }, 400)
  })
})
