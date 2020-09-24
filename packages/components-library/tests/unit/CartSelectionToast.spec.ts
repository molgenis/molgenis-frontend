import { shallowMount, createLocalVue } from '@vue/test-utils'
import CartSelectionToast from '@/components/CartSelectionToast.vue'

import { BootstrapVue } from 'bootstrap-vue'
const localVue = createLocalVue()
localVue.use(BootstrapVue)

const propsData = { clickHandler: () => {}, cartSelectionText: 'test' }
describe('CartSelectionToast.vue', () => {
  it('renders the CartSelectionToast', () => {
    const wrapper = shallowMount(CartSelectionToast, { localVue, propsData })
    expect(wrapper.text()).toMatch('Request items')
  })
  it('Can remove items from the given (value/v-model) list', async () => {
    const wrapper = shallowMount(CartSelectionToast, { localVue, propsData: { ...propsData, value: ['1', '2', '3'] } })
    // @ts-ignore
    wrapper.vm.removeItem('2')
    await wrapper.vm.$nextTick()
    // @ts-ignore
    expect(wrapper.emitted().input[0][0]).toEqual(['1', '3'])
  })
  it('Can display items even if (value/v-model) is a list of objects', async () => {
    const wrapper = shallowMount(CartSelectionToast, { localVue, propsData: { ...propsData, labelAttribute: 'label' } })
    // @ts-ignore
    expect(wrapper.vm.previewLabel('string')).toEqual('string')
    // @ts-ignore
    expect(wrapper.vm.previewLabel({name: 'wrong labelAttribute'})).toEqual('')
    // @ts-ignore
    expect(wrapper.vm.previewLabel({label: 'object'})).toEqual('object')
  })
  it('Can displays show/hide according to previewToggle status', () => {
    const wrapper = shallowMount(CartSelectionToast, { localVue, propsData })
    // @ts-ignore
    expect(wrapper.vm.selectionText).toMatch('Show') // Default value
    // @ts-ignore
    wrapper.vm.previewToggle = true
    // @ts-ignore
    expect(wrapper.vm.selectionText).toMatch('Hide')
    // @ts-ignore
    wrapper.vm.previewToggle = false
    // @ts-ignore
    expect(wrapper.vm.selectionText).toMatch('Show')
  })
})
