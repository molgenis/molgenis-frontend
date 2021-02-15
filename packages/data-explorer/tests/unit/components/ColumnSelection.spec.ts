import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import bootstrapVue from 'bootstrap-vue'
import ColumnSelection from '@/components/ColumnSelection.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(bootstrapVue)

let store: any
let options: any

let mockPersistToState: any
let expectedInputCount: number
let wrapper: any

describe('ColumnSelection Component', () => {
  beforeEach(() => {
    expectedInputCount = 4
    mockPersistToState = jest.fn()

    store = new Vuex.Store({
      state: {
        tableMeta: {
          attributes: [
            {
              id: 'aaaac52ktuzcnbsyuwkbjdiadu',
              name: 'id',
              type: 'int'
            },
            {
              id: 'aaaac52ktuzcnbsyuwkbjdiady',
              name: 'bool',
              type: 'bool'
            },
            {
              id: 'aaaac52ktuzcnbsyuwkbjdiad4',
              name: 'html',
              type: 'string'
            },
            {
              id: 'aaaac2322ktuzcnbsyuwkbjdiad4',
              name: 'string',
              type: 'string'
            }

          ]
        },
        hiddenColumns: []
      },
      mutations: {
        persistToRoute: mockPersistToState
      }
    })
    options = {
      store,
      localVue,
      mocks: {
        $router: 'mockRouter'
      }
    }
    wrapper = mount(ColumnSelection, options)
  })

  it('renders unique inputs', () => {
    expect(wrapper.findAll('input').length).toBe(expectedInputCount)
  })
  it('renders inputs for all unique property names', () => {
    expect(wrapper.html()).toContain('value="id"')
    expect(wrapper.html()).toContain('value="bool"')
    expect(wrapper.html()).toContain('value="html"')
    expect(wrapper.html()).toContain('value="string"')
  })

  it('emits a router change with the value when input is de-selected', () => {
    const inputToTest = wrapper.find('input[value="id"]')
    inputToTest.trigger('click')

    // argument #1 is expect.anything() because it's the injected state.
    expect(mockPersistToState).toHaveBeenCalledWith(expect.anything(), { router: 'mockRouter', query: { 'hide': 'id' } })
  })

  it('emits a router change without the value when input is re-selected', () => {
    const inputToTest = wrapper.find('input[value="id"]')
    inputToTest.trigger('click')
    inputToTest.trigger('click')

    expect(mockPersistToState).toHaveBeenLastCalledWith(expect.anything(), { router: 'mockRouter', query: { 'hide': '' } })
  })

  it('emits a router change with all columns when deselect all is clicked', () => {
    const inputToTest = wrapper.find('#selection-toggle')
    inputToTest.trigger('click')
    expect(mockPersistToState).toHaveBeenCalledWith(expect.anything(), { router: 'mockRouter', query: { 'hide': 'id,bool,html,string' } })
  })

  it('emits a router change with no columns when select all is clicked', async () => {
    const inputToTest = wrapper.find('#selection-toggle')
    await inputToTest.trigger('click') // deselect first
    await inputToTest.trigger('click')
    expect(mockPersistToState).toHaveBeenLastCalledWith(expect.anything(), { router: 'mockRouter', query: { 'hide': '' } })
  })
})
