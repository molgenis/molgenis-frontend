import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppCard from '@/components/AppCard.vue'

describe('AppCard', () => {
  let actions: any
  let localVue: any
  let store: any

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    actions = {
      ACTIVATE_APP: jest.fn(),
      DEACTIVATE_APP: jest.fn(),
      DELETE_APP: jest.fn()
    }

    store = new Vuex.Store({ actions })
  })

  const app = { id: 'test', isActive: false }
  const propsData = { app: app }
  it('should dispatch DELETE_APP when deleteApp method is called', () => {
    const wrapper = shallowMount(AppCard, { propsData, store, localVue })
    // @ts-ignore
    wrapper.vm.deleteApp(app)
    expect(actions.DELETE_APP).toBeCalled()
  })

  it('should dispatch ACTIVATE_APP when app is inActive', () => {
    const wrapper = shallowMount(AppCard, { propsData, store, localVue })
    // @ts-ignore
    wrapper.vm.toggleAppActiveState(app)
    expect(actions.ACTIVATE_APP).toHaveBeenCalledWith(expect.any(Object), 'test')
  })

  it('should dispatch DEACTIVATE_APP when app is active', () => {
    app.isActive = true
    propsData.app = app
    const wrapper = shallowMount(AppCard, { propsData, store, localVue })
    // @ts-ignore
    wrapper.vm.toggleAppActiveState(app)
    expect(actions.DEACTIVATE_APP).toHaveBeenCalledWith(expect.any(Object), 'test')
  })
})
