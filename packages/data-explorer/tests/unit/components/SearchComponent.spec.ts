import { createLocalVue, shallowMount } from '@vue/test-utils'
import SearchComponent from '@/components/SearchComponent.vue'
import Router from 'vue-router'
import { routes } from '@/routes'

const mocks = { $t: (msg: any) => msg }
const stubs = ['font-awesome-icon']

describe('SearchComponent', () => {
  let wrapper: any

  beforeEach(() => {
    // @ts-ignore
    const localVue = createLocalVue()
    localVue.use(Router)
    const router = new Router({ routes })
    wrapper = shallowMount(SearchComponent, { localVue, propsData: { value: 'demo' }, router, directives: { 'b-tooltip': () => { } }, mocks, stubs })
  })

  it('should render the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('should place the passed value in the input', () => {
    const inputElement = wrapper.find('input').element as HTMLInputElement
    expect(inputElement.value).toEqual('demo')
  })

  describe('when the search button is clicked', () => {
    beforeEach(() => {
      wrapper.find('button').trigger('submit')
    })

    it('should fire a input event passing the searchText', () => {
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')[0]).toEqual(['demo'])
    })
  })

  describe('when the value prop is changed to empty string', () => {
    beforeEach(() => {
      wrapper.setProps({ value: '' })
    })

    it('should clear the search box', () => {
      wrapper.vm.$nextTick().then(() => {
        const inputElement = wrapper.find('input').element as HTMLInputElement
        expect(inputElement.value).toEqual('')
      })
    })
  })

  describe('when the searchString value is changed to empty string (by html5 search clear action)', () => {
    beforeEach(async () => {
      await wrapper.setProps({ value: '' })
    })
    it('should emit an event from the search component', async () => {
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')[0]).toEqual([''])
    })
  })
})
