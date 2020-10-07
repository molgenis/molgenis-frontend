import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import ChangeFilters from '@/components/filters/ChangeFilters.vue'
const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('ChangeFilters.vue', () => {
  let wrapper: any
  const options = {
    localVue,
    propsData: {
      filters: [{
        name: 'search',
        label: 'Search',
        type: 'string-filter'
      }, {
        name: 'compound-title',
        label: 'compound-title',
        type: 'compound-title'
      }, {
        name: 'string',
        label: 'String',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        compound: 'compound-title'
      }, {
        name: 'checkbox',
        label: 'Checkbox',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        compound: 'compound-title',
        type: 'checkbox-filter'
      }],
      value: ['search']
    }
  }

  beforeEach(() => {
    wrapper = mount(ChangeFilters, options)
  })

  it('can add a filter', async () => {
    await wrapper.find('button.dropdown-toggle').trigger('click')
    await wrapper.findAll('.custom-control-input').at(1).trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([['search', 'compound-title', 'string', 'checkbox']])
  })

  it('can remove a filter', async () => {
    await wrapper.find('button.dropdown-toggle').trigger('click')
    await wrapper.findAll('.custom-control-input').at(0).trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([[]])
  })

  it('can select all and deselect all with compounds', async () => {
    wrapper.find('button.dropdown-toggle').trigger('click')
    // Select all
    wrapper.findAll('.custom-control-input').at(1).trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([['search', 'compound-title', 'string', 'checkbox']])
    // Deselect all
    wrapper.findAll('.custom-control-input').at(1).trigger('click')
    expect(wrapper.emitted().input[1]).toEqual([['search']])
  })

  it('can select and deselect sub-compounds', () => {
    wrapper.find('button.dropdown-toggle').trigger('click')
    // Select all sub-compounds (with all sub-compounds selected compound parent also gets selected)
    wrapper.findAll('.custom-control-input').at(2).trigger('click')
    wrapper.findAll('.custom-control-input').at(3).trigger('click')
    expect(wrapper.emitted().input[1]).toEqual([['compound-title', 'search', 'string', 'checkbox']])
    // partial selection of sub-compounds
    wrapper.findAll('.custom-control-input').at(2).trigger('click')
    expect(wrapper.emitted().input[2]).toEqual([['search', 'checkbox']])
    // deselect all sub-compounds
    wrapper.findAll('.custom-control-input').at(3).trigger('click')
    expect(wrapper.emitted().input[3]).toEqual([['search']])
  })
})
