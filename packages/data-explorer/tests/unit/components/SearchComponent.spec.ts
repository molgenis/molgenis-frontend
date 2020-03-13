import { shallowMount, Wrapper } from '@vue/test-utils'
import SearchComponent from '@/components/SearchComponent.vue'

describe('SearchComponent', () => {
  let wrapper: Wrapper<SearchComponent>

  beforeEach(() => {
    wrapper = shallowMount(SearchComponent, { propsData: { value: 'demo' } })
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
      wrapper.find('button').trigger('click')
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
})
