import { shallowMount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent.vue', () => {
  it('renders MyComponent', () => {
    const wrapper = shallowMount(MyComponent)
    expect(wrapper.text()).toMatch('Hello My component')
  })
})
