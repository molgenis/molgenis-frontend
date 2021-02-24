import { mount } from '@vue/test-utils'
import ChangeFilters from '@/components/filters/ChangeFilters.vue'
import { localVue } from '../../lib/helpers'

describe('ChangeFilters.vue', () => {
  let wrapper: any
  const options = {
    localVue: localVue(),
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

  it('can select all and deselect all with compounds', async () => {
    // Select all
    await wrapper.findAll('.custom-control-input').at(1).trigger('click')
    expect(wrapper.emitted().input[0]).toEqual([['search', 'compound-title', 'string', 'checkbox']])
    // Deselect all
    await wrapper.findAll('.custom-control-input').at(1).trigger('click')
    expect(wrapper.emitted().input[1]).toEqual([['search']])
  })

  it('can select and deselect sub-compounds', async () => {
    // Select all sub-compounds (with all sub-compounds selected compound parent also gets selected)
    await wrapper.findAll('.custom-control-input').at(2).trigger('click')
    await wrapper.findAll('.custom-control-input').at(3).trigger('click')
    expect(wrapper.emitted().input[1]).toEqual([['compound-title', 'search', 'string', 'checkbox']])
    // partial selection of sub-compounds
    await wrapper.findAll('.custom-control-input').at(2).trigger('click')
    expect(wrapper.emitted().input[2]).toEqual([['search', 'checkbox']])
    // deselect all sub-compounds
    await wrapper.findAll('.custom-control-input').at(3).trigger('click')
    expect(wrapper.emitted().input[3]).toEqual([['search']])
  })
})
