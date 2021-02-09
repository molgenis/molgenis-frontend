import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ColumnSelection from '@/components/ColumnSelection.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store: any
let options: any

const mockRouter = jest.fn()

describe('ColumnSelection Component', () => {
  store = new Vuex.Store({
    state: {
      tableData: {
        items: [{ 'id': 'aaaac5244vsebbsyuwkbjdiaae', 'table': 'Authors', 'shop': true }, { 'id': 'aaaac52ktotexbsyuwkbjdiaai', 'table': 'Books', 'shop': true, 'randomProp': false }]
      },
      hiddenColumns: []
    }
  })
  options = {
    store,
    localVue,
    $router: mockRouter
  }

  it('renders unique inputs', async () => {
    const wrapper = mount(ColumnSelection, options)
    expect(wrapper.findAll('input').length).toBe(4)
  })
  it('renders inputs for all unique property names', async () => {
    const wrapper = mount(ColumnSelection, options)
    expect(wrapper.html()).toContain('value="id"')
    expect(wrapper.html()).toContain('value="table"')
    expect(wrapper.html()).toContain('value="shop"')
    expect(wrapper.html()).toContain('value="randomProp"')
  })
})
