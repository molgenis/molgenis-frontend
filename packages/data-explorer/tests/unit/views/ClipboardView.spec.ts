import { shallowMount, createLocalVue } from '@vue/test-utils'
import ClipboardView from '@/views/ClipboardView.vue'
import Vuex from 'vuex'

describe('ClipboardView.vue', () => {
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
          { id: '1' },
          { id: '2' },
          { id: '3' }
        ]
      }
    }
    store = new Vuex.Store({ state })
  })

  it('exists', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })
})
