import { shallowMount } from '@vue/test-utils'
import SortSelect from '@/components/SortSelect.vue'

describe('SortSelect', () => {
  let wrapper: any

  const directives = {
    'b-tooltip': () => { }
  }

  const stubs = [ 'font-awesome-icon' ]

  const propsData = {
    sort: {
      sortColumnName: null,
      isSortOrderReversed: false
    },
    sortOptions: [
      { id: 'i1', name: 'option1' },
      { id: 'i2', name: 'option2' },
      { id: 'i3', name: 'option3' }
    ]
  }

  beforeEach(() => {
    wrapper = shallowMount(SortSelect, { propsData, directives, stubs })
  })

  it('should render the sort select and button ', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.findAll('option').at(0).text()).toEqual('Order by:')
    expect(wrapper.findAll('option').at(1).text()).toEqual('option1')
    expect(wrapper.findAll('option').at(2).text()).toEqual('option2')
    expect(wrapper.findAll('option').at(3).text()).toEqual('option3')
    expect(wrapper.find('button.btn')).toBeDefined()
  })

  it('should emit a sort event when the selects value changes', async () => {
    const options = await wrapper.find('select').findAll('option')
    await options.at(1).setSelected()
    expect(wrapper.emitted().sort[0][0]).toEqual({
      sortColumnName: 'option1',
      isSortOrderReversed: false
    })
  })

  it('should emit a sort event with a flipped order when the button is clicked', async () => {
    wrapper = shallowMount(SortSelect, { propsData: { ...propsData, sortColumnName: 'some-col' }, directives, stubs })
    await wrapper.find('button.btn').trigger('click')
    expect(wrapper.emitted().sort[0][0]).toEqual({
      sortColumnName: 'option1',
      isSortOrderReversed: true
    })
  })
})
