import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PageHeaderView from '@/views/PageHeaderView.vue'

describe('PageHeaderView', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: any
  let state: any
  let actions: any

  beforeEach(() => {
    state = {
      tableSettings: {},
      tableMeta: {
        label: 'lbl',
        description: 'desc'
      }
    }

    actions = {
      getTableSettings: jest.fn()
    }

    store = new Vuex.Store({
      state, actions
    })
  })

  it('exists', () => {
    const wrapper = shallowMount(PageHeaderView, { store, localVue })
    expect(wrapper.exists()).toBeTruthy()
  })

  it('show table name and description', () => {
    const wrapper = shallowMount(PageHeaderView, { store, localVue })
    expect(wrapper.find('h1').text()).toEqual('lbl')
    expect(wrapper.find('em').text()).toEqual('desc')
  })
})
