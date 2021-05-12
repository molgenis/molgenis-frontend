import { shallowMount } from '@vue/test-utils'
import RefDisplay from '@/components/table/dataDisplayTypes/RefDisplay.vue'
import Vue from 'vue'

describe('RefDisplay.vue', () => {
  const stubs = ['font-awesome-icon']
  const value = {
    id: 'id',
    label: 'label'
  }
  const metadata = {
    refEntityType: 'refEntityType'
  }

  it('should display the label value', () => {
    const wrapper = shallowMount(RefDisplay, { propsData: { value, metadata }, stubs })
    expect(wrapper.find('span').text()).toEqual('label')
  })

  it('should display the label list in case of multiple values', () => {
    const value = [{ id: 'id', label: 'label' }, { id: 'id-2', label: 'label-2' }]
    const wrapper = shallowMount(RefDisplay, { propsData: { value, metadata }, stubs })
    expect(wrapper.find('span').text()).toEqual('label, label-2')
  })

  it('should not show refLink if list is empty', () => {
    const value:[] = []
    const wrapper = shallowMount(RefDisplay, { propsData: { value, metadata }, stubs })
    expect(wrapper.find('font-awesome-icon-stub').exists()).toBeFalsy()
  })

  it('should fire a show ref table event when the div is clicked', async () => {
    const eventBus = new Vue()
    const mocks = { $eventBus: eventBus }
    const value = { id: 'id', label: 'label' }
    const wrapper = shallowMount(RefDisplay, { propsData: { value, metadata }, stubs, mocks })
    await wrapper.find('div.mouse-ref').trigger('click')
    expect(wrapper.emitted()).toBeTruthy()
  })
})
