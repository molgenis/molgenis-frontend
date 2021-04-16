import { createLocalVue, shallowMount } from '@vue/test-utils'
import DefaultEntityDetail from '@/components/dataView/DefaultEntityDetail.vue'
import Vuex from 'vuex'

const stubs = ['font-awesome-icon', 'router-link', 'b-tooltip']
const directives = { 'b-tooltip': () => {} }

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DefaultEntityDetail.vue', () => {
  let wrapper

  const metaData = {
    label: 'my-entity-label',
    description: 'my-entity-desc',
    idAttribute: {
      name: 'id'
    }
  }

  const record = {
    id: 'abc-123',
    key1: 'val1',
    key2: ['val2', 'val3'],
    key3: {
      key4: 'val'
    }
  }
  let state: any

  beforeEach(async () => {
    state = {
      tableSettings: {
        isShop: false
      }
    }

    const explorer = { state, namespaced: true }
    const store = new Vuex.Store({ modules: { explorer } })

    wrapper = await shallowMount(DefaultEntityDetail, { stubs, directives, store, propsData: { metaData, record }, localVue })
  })

  it('exists', async () => {
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('can access the isShop property', () =>{
    expect(wrapper.vm.isShop).not.toBe(undefined)
  })
})
