import { shallowMount, createLocalVue } from '@vue/test-utils'
import mockState from '../mocks/mockState'
import ToolbarView from '@/views/ToolbarView.vue'
import Vuex from 'vuex'
import ApplicationState from '@/types/ApplicationState'

describe('ToolbarView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let actions: any
  let store: any
  let state: ApplicationState
  let mutations: any
  let getters: any

  beforeEach(() => {
    state = mockState()
    state.tableName = 'root_hospital_patients'

    actions = {
      downloadResources: jest.fn()
    }

    mutations = {
      setDataDisplayLayout: jest.fn(),
      setFilterSelection: jest.fn(),
      setSearchText: jest.fn()
    }

    getters = {
      hasEditRights: jest.fn()
    }

    store = new Vuex.Store({
      actions, state, mutations, getters
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can change to table layout', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('button.table-layout').trigger('click')
    // @ts-ignore
    expect(mutations.setDataDisplayLayout).toHaveBeenCalledWith(state, 'TableView')
  })

  it('can change to card layout', () => {
    state.dataDisplayLayout = 'TableView'
    store = new Vuex.Store({
      state, mutations, getters
    })
    const wrapper = shallowMount(ToolbarView, { store, localVue })
    wrapper.find('button.card-layout').trigger('click')
    // @ts-ignore
    expect(mutations.setDataDisplayLayout).toHaveBeenCalledWith(state, 'CardView')
  })

  describe('add row button', () => {
    beforeEach(() => getters.hasEditRights.mockReturnValueOnce(true))

    it('should render the add button as a link to the data-row-edit', () => {
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > div > a').attributes().href).toEqual('/plugin/data-row-edit/root_hospital_patients')
    })

    it('should not be shown in shoppingcart mode', () => {
      store.state.showSelected = true
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > a').exists()).toBe(false)
    })

    it('should not show the button without edit rights', () => {
      store.state.showSelected = true
      getters.hasEditRights.mockReturnValueOnce(false)
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      expect(wrapper.find('.toolbar > a').exists()).toBe(false)
    })

    afterEach(() => { store.state.showSelected = false })
  })

  describe('searchString value is set', () => {
    it('should persist the value in the store', () => {
      store.state.showSelected = true
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      wrapper.setData({ searchText: 'demo' })
      expect(mutations.setSearchText).toHaveBeenCalled()
    })
  })

  describe('downloadData', () => {
    it.only('download action called', async () => {
      store.state.tableMeta = { id: '123' }
      const wrapper = shallowMount(ToolbarView, { store, localVue })
      // @ts-ignore
      await wrapper.vm.downloadData()
      expect(actions.downloadResources).toHaveBeenCalledWith(expect.anything(), [{ id: '123', type: 'ENTITY_TYPE' }], undefined)
    })
  })
})
