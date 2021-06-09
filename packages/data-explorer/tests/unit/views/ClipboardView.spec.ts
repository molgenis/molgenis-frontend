import { shallowMount, createLocalVue } from '@vue/test-utils'
import ClipboardView from '@/views/ClipboardView.vue'
import Vuex from 'vuex'

describe('ClipboardView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store: any
  let state: any
  let mutations: any
  let actions: any
  let getters: any
  const stubs = ['font-awesome-icon']

  beforeEach(() => {
    state = {
      showSelected: false,
      sort: {
        sortColumnName: 'sortedColumnName',
        isSortOrderReversed: false
      },
      tableMeta: {
        idAttribute: { name: 'tableID' },
        attributes: [
          {
            id: '1',
            name: 'col1',
            visible: true,
            idAttribute: true,
            labelAttribute: true
          },
          {
            id: '2',
            name: 'col2',
            visible: false,
            idAttribute: false,
            labelAttribute: false
          },
          {
            id: '3',
            name: 'col3',
            visible: true,
            lookupAttributeIndex: 0
          }
        ] },
      selectedItemIds: ['1', '3'],
      tableData: {
        items: [
          { tableID: '1' },
          { tableID: '2' },
          { tableID: '3' }
        ]
      },
      tableName: 'tableID'
    }
    mutations = {
      setShowSelected: jest.fn(),
      setHideFilters: jest.fn()
    }

    actions = {
      fetchTableViewData: jest.fn()
    }

    getters = {
      tableIdAttributeName: jest.fn()
    }
    getters.tableIdAttributeName.mockReturnValue('tableID')
    store = new Vuex.Store({
      modules: {
        explorer: { actions, getters, mutations, namespaced: true, state }
      }
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue, stubs })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('closes shoppingcart', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue, stubs })
    const button = wrapper.find('button.cart-back')
    button.trigger('click')
    expect(mutations.setShowSelected).toHaveBeenCalledWith(state, false)
    expect(mutations.setHideFilters).toHaveBeenCalledWith(state, false)
  })

  it('returns true for selected shopping item', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue, stubs })
    const entity = { tableID: '1', label: 'blaat1' }
    // @ts-ignore
    expect(wrapper.vm.isSelected(entity)).toBe(true)
  })

  it('returns false for item that is not selected', () => {
    const wrapper = shallowMount(ClipboardView, { store, localVue, stubs })
    const entity = { tableID: '2', label: 'blaat2' }
    // @ts-ignore
    expect(wrapper.vm.isSelected(entity)).toBe(false)
  })
})
