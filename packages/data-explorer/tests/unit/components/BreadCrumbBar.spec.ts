import { shallowMount } from '@vue/test-utils'
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'

describe('BreadcrumbBar', () => {
  let wrapper: any
  const propsData = {
    breadcrumbs: [
      { id: 'c1', label: 'crumb1', link: '/location/c1' },
      { id: 'c2', label: 'crumb2', link: '/location/c2' },
      { id: 'c3', label: 'crumb3', link: '/location/c3' }
    ]
  }

  beforeEach(() => {
    wrapper = shallowMount(BreadcrumbBar, { propsData })
  })

  it('should render breadcrumbs', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('li.breadcrumb-item').at(0).text()).toEqual('crumb3')
    expect(wrapper.findAll('li.breadcrumb-item').at(1).text()).toEqual('crumb2')
    expect(wrapper.findAll('li.breadcrumb-item').at(2).text()).toEqual('crumb1')
    expect(wrapper.findAll('li.breadcrumb-item').at(2).classes('active')).toBe(true)
  })

  describe('show dropdown handlers', () => {
    it('should add showDropdown prop to the crumb', () => {
      const crumb = { id: 'c1', label: 'crumb1', link: '/location/c1' }
      wrapper.vm.showDropdown({}, crumb)
      // @ts-ignore
      expect(crumb.showDropdown).toBeTruthy()
    })
  })

  describe('hide dropdown handlers', () => {
    it('should add showDropDown prop to the crumb', () => {
      const crumb = { id: 'c1', label: 'crumb1', link: '/location/c1' }
      wrapper.vm.hideDropdown({}, crumb)
      // @ts-ignore
      expect(crumb.showDropdown).toBeFalsy()
    })
  })
})
