import { shallowMount } from '@vue/test-utils'
import DropdownList from '@/components/DropdownList.vue'

describe('DropdownList', () => {
  let wrapper: any
  let propsData = {
    listId: 'list-1',
    isShown: false,
    items: [
      { id: 'i1', label: 'item1' },
      { id: 'i2', label: 'item2' },
      { id: 'i3', label: 'item3' }
    ]
  }

  beforeEach(() => {
    wrapper = shallowMount(DropdownList, { propsData })
  })

  it('should render the item list', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('li.dropdown-item').at(0).text()).toEqual('item1')
    expect(wrapper.findAll('li.dropdown-item').at(1).text()).toEqual('item2')
    expect(wrapper.findAll('li.dropdown-item').at(2).text()).toEqual('item3')
  })

  describe('isShown value changes when items already loaded', () => {
    it('should not go and fetch the items again', async (done) => {
      await wrapper.setProps({ isShown: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted().fetchItems).toBeFalsy()
      done()
    })
  })

  describe('isShown value changes when items not loaded', () => {
    beforeEach(() => {
      propsData = {
        listId: 'list-1',
        isShown: false,
        items: []
      }
      wrapper = shallowMount(DropdownList, { propsData })
    })
    it('should fire fetchItems event', async (done) => {
      await wrapper.setProps({ isShown: true })
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted().fetchItems).toBeTruthy()
      done()
    })
  })

  describe('onItemsFetched', () => {
    it('should set the list to the passed items', () => {
      wrapper.vm.onItemsFetched([{ id: 'ix', label: 'item x' }])
      expect(wrapper.vm.listItems).toEqual([{ id: 'ix', label: 'item x' }])
    })
  })
})
