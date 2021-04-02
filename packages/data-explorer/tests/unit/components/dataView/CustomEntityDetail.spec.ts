import { createLocalVue, shallowMount } from '@vue/test-utils'
import CustomEntityDetail from '@/components/dataView/CustomEntityDetail.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


let wrapper: any

describe('CustomEntityDetail.vue', () => {
  const state = {
    tableSettings: {
      isShop: false
    }
  }

  const explorer = { state, namespaced: true }
  const store = new Vuex.Store({ modules: { explorer } })

  const propsData = {
    record: {
      'col1': 'Column 1',
      'col2': 'Column 2',
      'col3': 'Column 3'
    },
    metaData: {
      meta1: 'meta 1',
      meta2: 'meta 2'
    },
    template: '    <h1>Hello MOLGENIS!</h1>    '
  }
  wrapper = shallowMount(CustomEntityDetail, { propsData, store, localVue })
  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('should set the template', () => {
    expect(wrapper.vm.wrappedTemplate).toBe('<div class="custom-entity-detail-container"><h1>Hello MOLGENIS!</h1></div>')
  })

  it('can access the isShop property', () => {
    expect(wrapper.vm.isShop).not.toBe(undefined)
  })
})
