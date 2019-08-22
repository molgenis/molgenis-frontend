import { shallowMount, createLocalVue } from '@vue/test-utils'
import CartView from '@/views/CartView.vue'
import Vuex from 'vuex'

describe('CartView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.filter('i18n', jest.fn())
  let store: any
  let state: any

  beforeEach(() => {
    state = {
      tableMeta: { idAttribute: 'id' },
      shoppedEntityItems: [1, 3],
      tableData: {
        items: [
          { data: { id: '1' } },
          { data: { id: '2' } },
          { data: { id: '3' } }
        ]
      }
    }
    store = new Vuex.Store({ state })
  })

  it('exists', () => {
    const wrapper = shallowMount(CartView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })
})
