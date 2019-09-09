import { shallowMount } from '@vue/test-utils'
import DefaultCardContent from '@/components/dataView/DefaultCardContent.vue'

describe('DefaultCardContent.vue', () => {
  const propsData = {
    dataLabel: 'dataLabel',
    dataId: 'dataId',
    dataTable: 'myTable',
    dataContents: {
      id: 155143544,
      myField: 'myValue'
    },
    numberOfAttributes: 10
  }
  window.location.assign = jest.fn()
  const wrapper = shallowMount(DefaultCardContent, { propsData })
  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has a default collapseLimit of 5', () => {
    expect(wrapper.vm.$props.collapseLimit).toBe(5)
  })
  it('doesnt render expand button when numberOfAttributes < collapseLimit', () => {
    const propsData = {
      dataLabel: 'dataLabel',
      dataId: 'dataId',
      dataTable: 'myTable',
      dataContents: {
        id: 155143544,
        myField: 'myValue'
      },
      collapseLimit: 5,
      numberOfAttributes: 3
    }
    const wrapperWithLessAttrs = shallowMount(DefaultCardContent, { propsData })
    const button = wrapperWithLessAttrs.find('button.mg-card-expand')
    expect(button.exists()).toBe(false)
  })
  it('expands when card is closed and button is clicked', () => {
    const button = wrapper.find('button.mg-card-expand')
    button.trigger('click')
    expect(wrapper.vm.$data.cardState).toBe('open')
  })
  it('closes when card is open and button is clicked', () => {
    const button = wrapper.find('button.mg-card-expand')
    wrapper.vm.$data.cardState = 'open'
    button.trigger('click')
    expect(wrapper.vm.$data.cardState).toBe('closed')
  })
  it('redirects to detail URL when info button is clicked', () => {
    const button = wrapper.find('button.mg-info-btn')
    button.trigger('click')
    expect(window.location.assign).toBeCalledWith('/menu/main/dataexplorer/details/myTable/dataId')
  })
})
