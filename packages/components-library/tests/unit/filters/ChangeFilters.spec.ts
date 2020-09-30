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

  it('can add a filter', (done) => {
    wrapper.find('button.dropdown-toggle').trigger('click')
    wrapper.vm.$nextTick(() => {
      wrapper.findAll('.custom-control-input').at(1).trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().input[0]).toEqual([['search', 'compound-title', 'string', 'checkbox']])
        done()
      })
    })
  })

  it('can remove a filter', (done) => {
    wrapper.find('button.dropdown-toggle').trigger('click')
    wrapper.vm.$nextTick(() => {
      wrapper.findAll('.custom-control-input').at(0).trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().input[0]).toEqual([[]])
        done()
      })
    })
  })

  it('can select all and deselect all with compounds', (done) => {
    wrapper.find('button.dropdown-toggle').trigger('click')
    wrapper.vm.$nextTick(() => {
      // Select all
      wrapper.findAll('.custom-control-input').at(1).trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().input[0]).toEqual([['search', 'compound-title', 'string', 'checkbox']])
        // Deselect all
        wrapper.findAll('.custom-control-input').at(1).trigger('click')
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().input[1]).toEqual([['search']])
          done()
        })
      })
    })
  })

  it('can select and deselect sub-compounds', (done) => {
    wrapper.find('button.dropdown-toggle').trigger('click')
    wrapper.vm.$nextTick(() => {
      // Select all sub-compounds (with all sub-compounds selected compound parent also gets selected)
      wrapper.findAll('.custom-control-input').at(2).trigger('click')
      wrapper.findAll('.custom-control-input').at(3).trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().input[1]).toEqual([['compound-title', 'search', 'string', 'checkbox']])

        // partial selection of sub-compounds
        wrapper.findAll('.custom-control-input').at(2).trigger('click')
        wrapper.vm.$nextTick(() => {
          expect(wrapper.emitted().input[2]).toEqual([['search', 'checkbox']])

          // deselect all sub-compounds
          wrapper.findAll('.custom-control-input').at(3).trigger('click')
          wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted().input[3]).toEqual([['search']])
            done()
          })
        })
      })
    })
  })

  it('can make a array unique', () => {
    // @ts-ignore
    expect(['a', 'b', 'b', 'c', 'c', 'c'].filter(wrapper.vm.unique)).toEqual(['a', 'b', 'c'])
  })
})
