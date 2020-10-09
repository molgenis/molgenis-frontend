import { mount } from '@vue/test-utils'
import FilterCard from '@/components/filters/containers/FilterCard.vue'

import { localVue as getLocalVue} from '../../../lib/helpers'

const localVue = getLocalVue()
const name = 'name'

describe('FilterCard.vue', () => {
  describe('starts closed', () => {
    const wrapper = mount(FilterCard, { localVue, propsData: { name } })
    it('can open and close', async () => {
      expect(wrapper.find('div#name').element.style.display).toEqual('none') // Closed
      await wrapper.find('.card-header').trigger('click')
      expect(wrapper.find('div#name').element.style.display).toEqual('') // Open
      await wrapper.find('.card-header').trigger('click')
      expect(wrapper.find('div#name').element.style.display).toEqual('none') // Closed again
    })
  })

  describe('starts open', () => {
    const wrapper = mount(FilterCard, { localVue, propsData: { name, collapsed: false } })
    it('can open and close (starts open)', async () => {
      expect(wrapper.find('div#name').element.style.display).toEqual('') // Open
      await wrapper.find('.card-header').trigger('click')
      expect(wrapper.find('div#name').element.style.display).toEqual('none') // Closed
      await wrapper.find('.card-header').trigger('click')
      expect(wrapper.find('div#name').element.style.display).toEqual('') // Open again
    })
  })

  describe('setting collapsable to false', () => {
    const wrapper = mount(FilterCard, { localVue, propsData: { name, collapsable: false, collapsed: true } })
    it('will force the card to be open all the time', async () => {
      expect(wrapper.find('div#name').element.style.display).toEqual('') // Open
      await wrapper.find('.card-header').trigger('click')
      expect(wrapper.find('div#name').element.style.display).toEqual('') // Still open, no collapsable
    })
  })

  it('emits an event if the close button is clicked', async () => {
    const close = mount(FilterCard, {
      localVue,
      propsData: {
        name,
        collapsable: false,
        collapsed: true,
        canRemove: true
      }
    })
    expect(close.emitted().removeFilter).toBeUndefined()
    await close.find('.remove-button').trigger('click')
    // @ts-ignore
    expect(close.emitted().removeFilter[0]).toEqual(['name'])
  })
})