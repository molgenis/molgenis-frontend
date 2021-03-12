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
    getRowDataWithReferenceLabels: jest.fn(),
  }
})

const mocks = { 
  $bvModal: { msgBoxConfirm: jest.fn() },
  router: { replace: jest.fn() }
}
const stubs = ['font-awesome-icon', 'router-link', 'b-tooltip']
const directives = { 'b-tooltip': () => {} }
let actions: any
let getters: any

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
      fetchTablePermissions: jest.fn()
    }

    getters = {
      hasAddRights: () => true,
      hasEditRights: () => true,
      hasDeleteRights: () => true
    }

    const store = new Vuex.Store({ actions, getters })
    wrapper = await shallowMount(EntityDetail, { store, localVue, stubs, mocks, directives })
    await wrapper.vm.$nextTick // wait for fetch mocks to resolve
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