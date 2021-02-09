import { shallowMount, createLocalVue } from '@vue/test-utils'
import mockState from '../mocks/mockState'
import ToolbarView from '@/views/ToolbarView.vue'
import Vuex from 'vuex'
import ApplicationState from '@/types/ApplicationState'
import { Sort } from '@/types/Sort'
import bootstrapVue from 'bootstrap-vue'

describe('ToolbarView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(bootstrapVue)
  let actions: any
  let store: any
  let state: ApplicationState
  let mutations: any
  let getters: any
  let directives: any
  const mocks: any = {
    $route: { params: {}, query: {} },
    $router: {
      push: jest.fn()
    }
  }

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
      hasEditRights: jest.fn(),
      hasEditSettingsRights: jest.fn(),
      compressedRouteFilter: jest.fn()
    }

    store = new Vuex.Store({
      actions, state, mutations, getters
    })

    directives = {
      'b-tooltip': () => {}
    }
  })

  describe('when the search text model updates', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      wrapper.setData({ searchText: 'test' })
    })

    it('should mutate the value to the store', () => {
      expect(mutations.setSearchText).toHaveBeenCalled()
      expect(mocks.$router.push).toHaveBeenCalled()
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can change to table layout', () => {
    state.dataDisplayLayout = 'CardView'
    store = new Vuex.Store({
      state, mutations, getters
    })
    const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
    wrapper.find('button.table-layout').trigger('click')
    expect(mocks.$router.push).toHaveBeenCalledWith({
      name: 'main-view',
      params: { view: 'TableView' },
      query: {}
    })
  })

  it('can change to card layout', () => {
    state.dataDisplayLayout = 'TableView'
    store = new Vuex.Store({
      state, mutations, getters
    })
    const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
    wrapper.find('button.card-layout').trigger('click')
    expect(mocks.$router.push).toHaveBeenCalledWith({
      name: 'main-view',
      params: { view: 'CardView' },
      query: {}
    })
  })

  describe('add row button', () => {
    beforeEach(() => getters.hasEditRights.mockReturnValueOnce(true))

    it('should render the add button as a link to the data-row-edit', () => {
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      expect(wrapper.find('.btn-toolbar > div > a.add-row').attributes().href).toEqual('/plugin/data-row-edit/root_hospital_patients')
    })

    it('should not be shown in shoppingcart mode', () => {
      store.state.showSelected = true
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      expect(wrapper.find('.btn-toolbar > a').exists()).toBe(false)
    })

    it('should not show the button without edit rights', () => {
      store.state.showSelected = true
      getters.hasEditRights.mockReturnValueOnce(false)
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      expect(wrapper.find('.btn-toolbar > a').exists()).toBe(false)
    })

    afterEach(() => { store.state.showSelected = false })
  })

  describe('searchString value is set', () => {
    it('should persist the value in the store', () => {
      store.state.showSelected = true
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      wrapper.setData({ searchText: 'demo' })
      expect(mutations.setSearchText).toHaveBeenCalled()
    })
  })

  describe('downloadData', () => {
    it('download action called', async () => {
      store.state.tableMeta = { id: '123', attributes: [] }
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      // @ts-ignore
      await wrapper.vm.downloadData()
      expect(actions.downloadResources).toHaveBeenCalledWith(expect.anything(), [{ id: '123', type: 'ENTITY_TYPE' }], undefined)
    })
  })

  describe('sortOptions', () => {
    it('should return an empty list while metaData is empty', () => {
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      // @ts-ignore
      expect(wrapper.vm.sortOptions).toEqual([])
    })

    it('should return a list of options ( id, name ) ignoring non visible items and compound types', () => {
      store.state.tableMeta = {
        id: '123',
        attributes: [
          { visible: true, id: '1', name: 'a', type: 'not a compound' },
          { visible: false, id: '2', name: 'b', type: 'not a compound' },
          { visible: true, id: '3', name: 'c', type: 'compound' }
        ]
      }
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      // @ts-ignore
      expect(wrapper.vm.sortOptions).toEqual([{ id: '1', name: 'a' }])
    })
  })

  describe('handleSortSelectChange', () => {
    it('should update the route query', async () => {
      const wrapper = shallowMount(ToolbarView, { store, localVue, directives, mocks })
      const sort: Sort = {
        sortColumnName: 'stars',
        isSortOrderReversed: true
      }
      // @ts-ignore
      await wrapper.vm.handleSortSelectChange(sort)
      expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'main-view', query: { sort: '-stars' } })
    })
  })
})
