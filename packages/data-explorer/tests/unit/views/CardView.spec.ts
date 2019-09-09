import { shallowMount, createLocalVue } from '@vue/test-utils'
import CardView from '@/views/CardView.vue'
import Vuex from 'vuex'

describe('CardView.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let mutations: any
  let actions: any
  let getters: any

  beforeEach(() => {
    state = {
      shoppingFilter: false,
      tableMeta: { idAttribute: 'tableID', labelAttribute: 'label' },
      dataDisplayLayout: 'ClipboardView',
      shoppedEntityItems: ['1', '3']
    }
    mutations = {
      toggleShoppingItems: jest.fn()
    }
    actions = {
      fetchRowData: jest.fn()
    }
    getters = {
      activeEntityData: jest.fn().mockReturnValue({
        items: [
          { tableID: '1', label: 'blaat1' },
          { tableID: '2', label: 'blaat2' },
          { tableID: '3', label: 'blaat3' }
        ] })
    }
    store = new Vuex.Store({
      state, mutations, getters, actions
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(CardView, { store,
      localVue,
      propsData: { entitiesToShow: [] } })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('returns id of entity', () => {
    const wrapper = shallowMount(CardView, {
      store,
      localVue,
      propsData: { entitiesToShow: [] }
    })
    const entity = { tableID: '1', label: 'blaat1' }
    // @ts-ignore
    expect(wrapper.vm.getEntityId(entity)).toBe('1')
  })

  it('returns label of entity', () => {
    const wrapper = shallowMount(CardView, {
      store,
      localVue,
      propsData: { entitiesToShow: [] }
    })
    const entity = { tableID: '1', label: 'blaat1' }
    // @ts-ignore
    expect(wrapper.vm.getEntityLabel(entity)).toBe('blaat1')
  })

  it('returns id if label attribute is not defined', () => {
    state = {
      shoppingFilter: false,
      tableMeta: { idAttribute: 'tableID' },
      dataDisplayLayout: 'ClipboardView',
      shoppedEntityItems: [1, 3]
    }
    store = new Vuex.Store({
      state, mutations, getters
    })
    const wrapper = shallowMount(CardView, {
      store,
      localVue,
      propsData: { entitiesToShow: [] }
    })
    const entity = { tableID: '1', label: 'blaat1' }
    // @ts-ignore
    expect(wrapper.vm.getEntityLabel(entity)).toBe('1')
  })

  it('returns true for selected shopping item', () => {
    const wrapper = shallowMount(CardView, {
      store,
      localVue,
      propsData: { entitiesToShow: [] }
    })
    const entity = { tableID: '1', label: 'blaat1' }
    // @ts-ignore
    expect(wrapper.vm.isSelected(entity)).toBe(true)
  })

  it('returns false for item that is not selected', () => {
    const wrapper = shallowMount(CardView, {
      store,
      localVue,
      propsData: { entitiesToShow: [] }
    })
    const entity = { tableID: '2', label: 'blaat2' }
    // @ts-ignore
    expect(wrapper.vm.isSelected(entity)).toBe(false)
  })

  it('fetches data when card is expanded', () => {
    const wrapper = shallowMount(CardView, {
      store,
      localVue,
      propsData: { entitiesToShow: [] }
    })
    const entity = { tableID: '2', label: 'blaat2' }
    // @ts-ignore
    wrapper.vm.handleExpandCard(entity)
    expect(actions.fetchRowData).toBeCalled()
  })
})
