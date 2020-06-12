import { shallowMount } from '@vue/test-utils'
import SearchComponent from '@/components/SearchComponent.vue'
import router from '@/router'

describe('SearchComponent', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = shallowMount(SearchComponent, { propsData: { value: 'demo' }, router })
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
    beforeEach(() => {
      wrapper.setProps({ searchText: '' })
    })

    it('should emit a event from the search component', () => {
      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.emitted('input')).toBeTruthy()
        expect(wrapper.emitted('input')[0]).toEqual([''])
      })
    })
  })
})
