import { createLocalVue, shallowMount } from '@vue/test-utils'
import EditDetailTemplate from '@/views/EditDetailTemplate.vue'
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
import { defaultDetailsView } from '@/lib/defaultTemplate/defaultDetailsView'
import Vuex from 'vuex'

jest.mock('@/repository/dataRepository', () => {
  return {
    getRowDataWithReferenceLabels: jest.fn()
  }
})

const mocks = {
  $bvModal: { msgBoxConfirm: jest.fn() },
  $router: { push: jest.fn() },
  $route: { query: { foo: 'bar' } }
}
const stubs = ['font-awesome-icon', 'router-link', 'b-tooltip']
const directives = { 'b-tooltip': () => {} }
let actions: any
let getters: any
let state: any
const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditDetailTemplate.vue', () => {
  let wrapper
  beforeEach(async () => {

    // @ts-ignore
    getRowDataWithReferenceLabels.mockResolvedValue({
      id: 'abc-123',
      key1: 'val1',
      key2: ['val2', 'val3'],
      key3: {
        key4: 'val'
      }
    })

    actions = {
      fetchTablePermissions: jest.fn(),
      fetchTableSettings: jest.fn(),
      fetchTableMeta: jest.fn(),
      saveEntityDetailTemplate: jest.fn()
    }

    getters = {
      hasAddRights: () => true,
      hasEditRights: () => true,
      hasDeleteRights: () => true,
      hasEditSettingsRights: () => true
    }

    state = {
      tableMeta: {
        label: 'my label',
        description: 'my description',
        idAttribute: {
          name: 'id'
        }
      } ,
      tableSettings: {
        customDetailCode: '<h1>I m not a template</h1>'
      }
    }

    const explorer = { state, actions, getters, namespaced: true }
    const store = new Vuex.Store({ modules: { explorer } })
    const propsData = { entityType: 'entityType', entity: 'entity' }

    wrapper = shallowMount(EditDetailTemplate, { propsData, store, localVue, stubs, mocks, directives })
    await wrapper.vm.$nextTick // meta
    await wrapper.vm.$nextTick // settings
    await wrapper.vm.$nextTick // data
  })

  afterAll(() => {
    wrapper.destroy()
  })

  it('should render the editor', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when the template is edited', () => {
    beforeEach(async() => {
      await wrapper.setData({ template: '<p>edit</p>' })
    })

    it('should update the template', () => {
      expect(wrapper.vm.template).toEqual('<p>edit</p>')
    })
  })

  describe('when the template is saved', () => {
    beforeEach(async() => {
      await wrapper.setData({ template: '<p>edit</p>' })
      await wrapper.find('button[type=submit]').trigger('click')
    })

    it('should update the template', async () => {
      expect(actions.saveEntityDetailTemplate).toHaveBeenCalledWith(expect.anything(), { template: "<p>edit</p>" } )
    })
  })

  describe('when no template is set', () => {
    beforeEach(async() => {
      state = {
        tableMeta: {
          label: 'my label',
          description: 'my description',
          idAttribute: {
            name: 'id'
          }
        } ,
        tableSettings: {
          customDetailCode: null
        }
      }
      const explorer = { state, actions, getters, namespaced: true }
      const store = new Vuex.Store({ modules: { explorer } })
      const propsData = { entityType: 'entityType', entity: 'entity' }
      wrapper = shallowMount(EditDetailTemplate, { propsData, store, localVue, stubs, mocks, directives })
    })

    it('should render the default template if no custom code is specified', () => {
      expect(wrapper.vm.template).toEqual(defaultDetailsView)
    })
  })

})
