import { shallowMount, createLocalVue } from '@vue/test-utils'
import mutations from '@/store/mutations'
import SelectLayoutView from '@/views/SelectLayoutView.vue'
import Vuex from 'vuex'

describe('SelectLayoutView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any

  beforeEach(() => {
    state = {
      tableMeta: { idAttribute: 'id' },
      dataDisplayLayout: 'CardView',
      tableData: {
        items: [
          { data: { id: '1' } },
          { data: { id: '2' } },
          { data: { id: '3' } }
        ] }
    }
    store = new Vuex.Store({
      mutations, state
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(SelectLayoutView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can switch layout', async () => {
    const wrapper = shallowMount(SelectLayoutView, { store,
      localVue
    })
    expect(wrapper.findAll('cardview-stub').length).toEqual(1)
    state.dataDisplayLayout = 'TableView'
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('tableview-stub').length).toEqual(1)
  })
})
