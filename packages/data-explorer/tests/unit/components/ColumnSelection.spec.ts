import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ColumnSelection from '@/components/ColumnSelection.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let store: any
let options: any

const mockRouterPush = jest.fn()
const router = new VueRouter()

let expectedInputCount: number
let wrapper: any

describe('ColumnSelection Component', () => {
  beforeEach(() => {
    expectedInputCount = 4

    router.push = mockRouterPush

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
      }
    })
    options = {
      store,
      localVue,
      router
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

    expect(mockRouterPush).toHaveBeenCalledWith({ 'name': null, 'query': { 'hide': 'id' } })
  })

  it('emits a router change without the value when input is re-selected', () => {
    const inputToTest = wrapper.find('input[value="id"]')
    inputToTest.trigger('click')
    inputToTest.trigger('click')

    expect(mockRouterPush).toHaveBeenLastCalledWith({ 'name': null, 'query': { 'hide': '' } })
  })
})
