import { createLocalVue, shallowMount } from '@vue/test-utils'
import ShoppingButton from '@/components/Utils/TableSettingsButton.vue'
import Vuex from 'vuex'

describe('TableSettingsButton.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let mutations: any

  beforeEach(() => {
    mutations = {
      // Add mutations here
    }
    store = new Vuex.Store({
      // Add relevant store items
    })
  })

  it('loads button', () => {
    const wrapper = shallowMount(ShoppingButton, { store, localVue, propsData: { selectedTable: 'test', selectedRowId: 'testRow' } })
    expect(wrapper.classes()).toContain('btn-light')
  })
})
