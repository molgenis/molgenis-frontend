import { createLocalVue, shallowMount } from '@vue/test-utils'
import EntityDetail from '@/views/EntityDetail.vue'
import { fetchMetaDataById } from '@/repository/metaDataRepository'
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'
import Vuex from 'vuex'

jest.mock('@/repository/metaDataRepository', () => {
  return {
    fetchMetaDataById: jest.fn()
  }
})

jest.mock('@/repository/dataRepository', () => {
  return {
    getRowDataWithReferenceLabels: jest.fn()
  }
})

const mocks = {
  $bvModal: { msgBoxConfirm: jest.fn() },
  router: { replace: jest.fn() },
  $route: {query: {foo: 'bar'}}
}
const stubs = ['font-awesome-icon', 'router-link', 'b-tooltip']
const directives = { 'b-tooltip': () => {} }
let actions: any
let getters: any
let state: any

describe('EntityDetail.vue', () => {
  let wrapper
  beforeEach(async () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    // @ts-ignore
    fetchMetaDataById.mockResolvedValue({
      label: 'my-entity-label',
      description: 'my-entity-desc',
      idAttribute: {
        name: 'id'
      }
    })
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
      deleteRow: jest.fn(),
      fetchTablePermissions: jest.fn(),
      fetchTableSettings: jest.fn()
    }

    getters = {
      hasAddRights: () => true,
      hasEditRights: () => true,
      hasDeleteRights: () => true,
      hasEditSettingsRights: () => true
    }

    state = {
      tableSettings: {
        customDetailCode: '<h1>I m not a template</h1>'
      }
    }

    const explorer = { state, actions, getters, namespaced: true }
    const store = new Vuex.Store({ modules: { explorer } })
    const propsData = { entityType: 'entityType', entity: 'entity' }
    wrapper = shallowMount(EntityDetail, { propsData, store, localVue, stubs, mocks, directives })
    // wait for meta, data and settings fetch mocks to resolve as mounted can not be awaited
    await wrapper.vm.$nextTick // meta
    await wrapper.vm.$nextTick // settings
    await wrapper.vm.$nextTick // data
  })

  describe('delete', () => {
    it('should  call the delete actions when the request is confirmed', async () => {
      actions.deleteRow.mockResolvedValueOnce(true)
      mocks.$bvModal.msgBoxConfirm.mockResolvedValueOnce(true)
      await wrapper.find('.delete-btn').trigger('click')
      await wrapper.vm.$nextTick()
      expect(actions.deleteRow).toHaveBeenCalled()
    })
    it('should not call the delete actions when the request is canceled', async () => {
      mocks.$bvModal.msgBoxConfirm.mockResolvedValueOnce(false)
      await wrapper.find('.delete-btn').trigger('click')
      await wrapper.vm.$nextTick()
      expect(actions.deleteRow).not.toHaveBeenCalled()
    })
  })
})
