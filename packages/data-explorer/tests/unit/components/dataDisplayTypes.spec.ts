import { createLocalVue, shallowMount } from '@vue/test-utils'
import mockmeta from '../mocks/metaDataV3ResponseMock'
import RefTable from '@/components/dataDisplayTypes/RefTable.vue'

const getWrapper = (propsData) => {
  const localVue = createLocalVue()
  const wrapper = shallowMount(RefTable, {
    localVue,
    propsData: { ...propsData },
    stubs: ['font-awesome-icon', 'table-row']
  })

  return wrapper
}

const tableData = [ { id: 'entityId', label: 'entity', refEntityType: 'xref' } ]
const mockResponses: {[key:string]: Object} = {
  '/api/metadata/entity': { data: mockmeta }
}

jest.mock('@/repository/dataRepository', () => {
  return {
    getTableDataWithLabel: async () => {
      return { items: [ { id: 'entityId', label: 'entity', refEntityType: 'xref' } ] }
    }
  }
})

jest.mock('@/lib/client', () => {
  return {
    get: (url: string) => {
      const mockResp = mockResponses[url]
      return Promise.resolve(mockResp)
    }
  }
})

describe('RefTable', () => {
  let wrapper: any
  let propsData = {
    tableId: 'entity',
    type: 'xref',
    value: 'entity'
  }

  beforeEach(() => {
    wrapper = getWrapper(propsData)
  })

  it('loads the reference entity', () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.vm.$data.refData).toEqual(tableData)
    expect(wrapper.vm.$data.loaded).toBe(true)
  })
})
