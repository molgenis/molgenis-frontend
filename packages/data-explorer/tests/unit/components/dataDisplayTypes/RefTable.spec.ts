import { createLocalVue, shallowMount } from '@vue/test-utils'
import RefTable from '@/components/dataDisplayTypes/RefTable.vue'

describe('RefTable.vue', () => {
  const stubs = [ 'b-spinner' ]
  const localVue = createLocalVue()

  let isDataLoaded = false
  const entitiesToShow = []
  let metaData = {}

  it('exists', () => {
    const wrapper = shallowMount(RefTable, { propsData: { isDataLoaded, entitiesToShow, metaData }, localVue, stubs })
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('visibleColumns when data is loaded', () => {
    it('return a list of visible column objects', () => {
      isDataLoaded = true
      metaData = {
        attributes: [
          {
            visible: true,
            id: 'id',
            name: 'name',
            type: 'type',
            refEntityType: 'refEntityType'
          }
        ]
      }
      const wrapper = shallowMount(RefTable, { propsData: { isDataLoaded, entitiesToShow, metaData }, localVue, stubs })
      // @ts-ignore
      expect(wrapper.vm.visibleColumns).toEqual([ {
        id: 'id',
        name: 'name',
        type: 'type',
        refEntityType: 'refEntityType'
      } ])
    })
  })
})
