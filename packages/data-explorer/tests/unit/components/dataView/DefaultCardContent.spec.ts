import { createLocalVue, shallowMount } from '@vue/test-utils'
import DefaultCardContent from '@/components/dataView/DefaultCardContent.vue'

const mocks = { $t: (msg: any) => msg }

describe('DefaultCardContent.vue', () => {
  const localVue = createLocalVue()
  localVue.filter('i18n', mocks.$t)
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
  const wrapper = shallowMount(DefaultCardContent, { propsData, localVue, mocks })
  it('exists', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has a default collapseLimit of 5', () => {
    expect(wrapper.vm.$props.collapseLimit).toBe(5)
  })
  it('doesn\'t render expand button when numberOfAttributes < collapseLimit', () => {
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
    const wrapperWithLessAttrs = shallowMount(DefaultCardContent, { propsData, localVue, mocks })
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

  describe('when the card is closed', () => {
    const wrapper = shallowMount(DefaultCardContent, { propsData, localVue, mocks })
    wrapper.vm.$data.cardState = 'open'
    it('do something', () => {
      expect(wrapper.exists()).toBeTruthy()
    })
  })

  describe('dataToShow', () => {
    it('should reduce the cardData object to its visible properties', () => {
      let localThis: any = {
        dataContents: { key1: 'val1', key2: 'val2', key3: 'val3' },
        cardState: 'open',
        collapseLimit: 2,
        hiddenColumns: []
      }

      // @ts-ignore
      expect(DefaultCardContent.computed.dataToShow.call(localThis)).toEqual(
        { key1: 'val1', key2: 'val2', key3: 'val3' }
      )

      localThis.cardState = 'closed'
      // @ts-ignore
      expect(DefaultCardContent.computed.dataToShow.call(localThis)).toEqual(
        { key1: 'val1', key2: 'val2' }
      )

      localThis.cardState = 'open'
      localThis.hiddenColumns = 'key1'
      // @ts-ignore
      expect(DefaultCardContent.computed.dataToShow.call(localThis)).toEqual(
        { key2: 'val2', key3: 'val3' }
      )
    })
  })
})
