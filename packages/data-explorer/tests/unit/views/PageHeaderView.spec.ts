import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BootstrapVue } from 'bootstrap-vue'
import PageHeaderView from '@/views/PageHeaderView.vue'

describe('PageHeaderView', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(BootstrapVue)
  let store: any
  let state: any
  let actions: any
  let getters: any
  let modules: any

  beforeEach(() => {
    state = {
      tableSettings: {},
      settingsTable: 'settingsTable',
      tableMeta: {
        id: 'self-id',
        label: 'lbl',
        description: 'desc'
      }
    }

    actions = {}

    getters = {
      hasEditSettingsRights: jest.fn()
    }

    modules = {
      header: {
        namespaced: true,
        state: {}
      }
    }

    store = new Vuex.Store({
      state, actions, getters, modules
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(PageHeaderView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show table table-settings-button and description', () => {
    const wrapper = shallowMount(PageHeaderView, { store, localVue })
    expect(wrapper.find('table-settings-button-stub')).toBeDefined()
    expect(wrapper.find('em').text()).toEqual('desc')
  })
})
