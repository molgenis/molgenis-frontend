import { createLocalVue, shallowMount } from '@vue/test-utils'
import TableRow from '@/components/dataView/TableRow.vue'

const getWrapper = (propsData) => {
  const localVue = createLocalVue()
  const wrapper = shallowMount(TableRow, {
    directives: {
      'b-tooltip': () => {}
    },
    localVue,
    propsData: {
      ...propsData,
      id: 'id',
      tableName: 'tableName',
      showSelected: false
    }
  })

  return wrapper
}

describe('EntityTableRow.vue', () => {
  it('exists', () => {
    const wrapper = getWrapper({
      rowData: {},
      visibleColumns: []
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  it('renders table rows', () => {
    const wrapper = getWrapper({
      rowData: { name: 'name', title: 'title', content: 'content' },
      visibleColumns: [{ name: 'name' }, { name: 'title' }, { content: 'content' }]
    })
    expect(wrapper.findAll('td').length).toEqual(3)
    expect(wrapper.findAll('th').length).toEqual(1) // edit btn
  })

  it('only renders visible columns', () => {
    const wrapper = getWrapper({
      rowData: { name: 'name', title: 'title', content: 'content' },
      visibleColumns: [{ name: 'name' }, { content: 'content' }]
    })
    expect(wrapper.findAll('td').length).toEqual(2)
    expect(wrapper.findAll('th').length).toEqual(1) // edit btn
  })
})
