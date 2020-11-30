import { mount } from '@vue/test-utils'
import FilterContainer from '@/components/filters/containers/FilterContainer.vue'
import { filters } from '../../../lib/mocks'
import { localVue } from '../../../lib/helpers'

describe('FilterContainer.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(FilterContainer, {
      localVue: localVue(),
      propsData: {
        value: { checkbox: ['red'], string: 'blah' },
        filters,
        filtersShown: ['string', 'checkbox']
      }
    })
  })

  it('consolidates all filter output and sends them via input event', async () => {
    await wrapper.find('input[name="string"]').setValue('test')
    await wrapper.find('input[value="red"]').trigger('click')

    expect(wrapper.emitted().input).toEqual([
      [{ checkbox: ['red'], string: 'test' }],
      [{ checkbox: [], string: 'blah' }]
    ])
  })

  it('cannot remove filters by default', () => {
    expect(wrapper.find('.remove-button').exists()).toBe(false)
  })

  it('can remove filters when editable', async () => {
    await wrapper.setProps({ canEdit: true })
    await wrapper.find('.remove-button').trigger('click')
    expect(wrapper.emitted().update).toEqual([[['checkbox']]])
    expect(wrapper.emitted().input).toEqual([[{ checkbox: ['red'] }]])
  })

  it('can add filters when editable', async () => {
    await wrapper.setProps({ canEdit: true })
    expect(wrapper.find('button.dropdown-toggle')).toBeTruthy()
  })

  it('shows the filters in the correct order ( based on filtersToShow ) ', async () => {
    expect((wrapper.vm).listOfVisibleFilters[0].label).toBe('String')
    expect((wrapper.vm).listOfVisibleFilters[1].label).toBe('Checkbox')
    await wrapper.setData({ filtersToShow: ['checkbox', 'string'] }) // flip order
    expect((wrapper.vm).listOfVisibleFilters[0].label).toBe('Checkbox')
    expect((wrapper.vm).listOfVisibleFilters[1].label).toBe('String')
  })

  it('emits the filtersToShow when selection is changed', async () => {
    await wrapper.setProps({ canEdit: true })
    expect(wrapper.findAll('.card-header').length).toEqual(2)
    await wrapper.find('.change-filters button.btn').trigger('click')
    await wrapper.find('.change-filters ul form input[type=checkbox').trigger('click')
    expect(wrapper.findAll('.card-header').length).toEqual(3)
  })

  it('by default uses a dropdown to select active filters', async () => {
    await wrapper.setProps({ canEdit: true })
    await wrapper.find('.dropdown-toggle').trigger('click')
    expect(wrapper.find('.dropdown-menu')).toBeDefined()
  })

  it('uses a modal to select active filters if dialogStyle is set to modal', async () => {
    await wrapper.setProps({ canEdit: true, dialogStyle: 'modal' })
    await wrapper.find('.btn.btn-block.btn-primary').trigger('click')
    expect(wrapper.find('.modal-dialog')).toBeDefined()
  })
})
