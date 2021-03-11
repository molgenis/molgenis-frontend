import { shallowMount } from '@vue/test-utils'
import EntityDetail from '@/views/EntityDetail.vue'
import { fetchMetaDataById } from '@/repository/metaDataRepository'
import { getRowDataWithReferenceLabels } from '@/repository/dataRepository'

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

describe('EntityDetail.vue', () => {

  let wrapper
  beforeEach(async () => {
 
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
    wrapper = await shallowMount(EntityDetail, { stubs: ['font-awesome-icon', 'router-link', 'b-tooltip'] })
  })
  
  it('exists', async () => {
      expect(wrapper.exists()).toBeTruthy()
      await wrapper.vm.$nextTick
      expect(wrapper.html()).toMatchSnapshot()
  })
})