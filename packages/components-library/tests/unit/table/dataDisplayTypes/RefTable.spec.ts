import { createLocalVue, shallowMount } from '@vue/test-utils'
import RefTable from '@/components/table/dataDisplayTypes/RefTable.vue'

describe('RefTable.vue', () => {
  const stubs = ['b-spinner']
  const mocks = { $t: (msg: any) => msg }
  const localVue = createLocalVue()

  let isDataLoaded = false
  const entitiesToShow:any = []
  let metaData = {}


  it('exists', () => {
    const wrapper = shallowMount(RefTable, { propsData: { isDataLoaded, entitiesToShow, metaData }, localVue, stubs, mocks })
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
      const wrapper = shallowMount(RefTable, { propsData: { isDataLoaded, entitiesToShow, metaData }, localVue, stubs, mocks })
      // @ts-ignore
      expect(wrapper.vm.visibleColumns).toEqual([{
        id: 'id',
        name: 'name',
        type: 'type',
        refEntityType: 'refEntityType'
      }])
    })
  })
})
