import { shallowMount, createLocalVue } from '@vue/test-utils'
import mockState from '../mocks/mockState'
import ToolbarView from '@/views/ToolbarView.vue'
import Vuex from 'vuex'
import ApplicationState from '@/types/ApplicationState'
import { Sort } from '@/types/Sort'
import bootstrapVue from 'bootstrap-vue'

let actions:any
let mutations: any
let getters: any
let wrapper:any
let store: any
let state: ApplicationState

const $t = (msg: any) => msg
const mocks: any = {
  $route: { params: {}, query: {} },
  $router: { push: jest.fn() },
  $t
}

function getWrapper () {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(bootstrapVue)
  localVue.filter('i18n', $t)

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
    hasAddRights: jest.fn(),
    hasEditSettingsRights: jest.fn(),
    compressedRouteFilter: jest.fn()
  }

  getters.hasAddRights.mockReturnValue(true)
  store = new Vuex.Store({ actions, state, mutations, getters })

  return shallowMount(ToolbarView, {
    store,
    localVue,
    directives: {
      'b-tooltip': () => {}
    },
    mocks,
    stubs: ['router-link']
  })
}

describe('ToolbarView.vue', () => {
  beforeEach(() => {
    wrapper = getWrapper()
  })

  describe('when the search text model updates', () => {
    beforeEach(() => {
      wrapper.setData({ searchText: 'test' })
    })

    it('should mutate the value to the store', () => {
      expect(mutations.setSearchText).toHaveBeenCalled()
      expect(mocks.$router.push).toHaveBeenCalled()
    })
  })

  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('can change to table layout', () => {
    state.dataDisplayLayout = 'CardView'

    wrapper.find('button.table-layout').trigger('click')
    expect(mocks.$router.push).toHaveBeenCalledWith({
      name: 'de-view',
      params: { view: 'TableView' },
      query: {}
    })
  })

  it('can change to card layout', async () => {
    store.state.dataDisplayLayout = 'TableView'
    await wrapper.vm.$nextTick()
    wrapper.find('button.card-layout').trigger('click')
    expect(mocks.$router.push).toHaveBeenCalledWith({
      name: 'de-view',
      params: { view: 'CardView' },
      query: {}
    })
  })

  describe('add row button', () => {
    beforeEach(async () => {
      getters.hasAddRights.mockReturnValue(true)
    })

    it('should render the add button as a link to the data-row-edit', async () => {
      expect(wrapper.find('.add-row').exists()).toBe(true)
    })

    it('should not be shown in shoppingcart mode', () => {
      store.state.showSelected = true
      expect(wrapper.find('.btn-toolbar > a').exists()).toBe(false)
    })

    it('should not show the button without edit rights', () => {
      store.state.showSelected = true
      getters.hasEditRights.mockReturnValueOnce(false)
      expect(wrapper.find('.btn-toolbar > a').exists()).toBe(false)
    })

    afterEach(() => { store.state.showSelected = false })
  })

  describe('searchString value is set', () => {
    it('should persist the value in the store', () => {
      store.state.showSelected = true
      wrapper.setData({ searchText: 'demo' })
      expect(mutations.setSearchText).toHaveBeenCalled()
    })
  })

  describe('downloadData', () => {
    it('download action called', async () => {
      store.state.tableMeta = { id: '123', attributes: [] }
      // @ts-ignore
      await wrapper.vm.downloadData()
      expect(actions.downloadResources).toHaveBeenCalledWith(expect.anything(), [{ id: '123', type: 'ENTITY_TYPE' }])
    })
  })

  describe('sortOptions', () => {
    it('should return an empty list while metaData is empty', () => {
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
      // @ts-ignore
      expect(wrapper.vm.sortOptions).toEqual([{ id: '1', name: 'a' }])
    })
  })

  describe('handleSortSelectChange', () => {
    it('should update the route query', async () => {
      const sort: Sort = {
        sortColumnName: 'stars',
        isSortOrderReversed: true
      }
      // @ts-ignore
      await wrapper.vm.handleSortSelectChange(sort)
      expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'de-view', query: { sort: '-stars' } })
    })
  })
})
