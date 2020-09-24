import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import CheckboxFilter from '@/components/filters/CheckboxFilter.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
const stubs = ['font-awesome-icon']
const options = async () => {
  return [
    { value: 'foo', text: 'Foo' },
    { value: 'bar', text: 'Bar' },
    { value: 'baz', text: 'Baz' }
  ]
}

const buildWrapper = (value?: string[], maxVisibleOptions?: number) => {
  const wrapper = mount(CheckboxFilter, {
    localVue,
    stubs,
    propsData: {
      name: 'name',
      label: 'label',
      value,
      options,
      maxVisibleOptions
    },
    listeners: {
      input: (newVal: any) => { 
        wrapper.setProps({ value: newVal });
    }
  }
  })
  return wrapper
} 

describe('CheckboxFilter.vue', () => {
  let wrapper:any

  describe('render the component', () => {
    beforeEach(() => {
      wrapper = buildWrapper([])
    })
  
    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot()
    })

  })

  describe('when no items are selected', () => {
    beforeEach(() => {
      wrapper = buildWrapper([])
    })

    it('can set and unset values', async () => {
      const inputElements = wrapper.findAll('input')

      inputElements.at(0).trigger('click') // select foo
      inputElements.at(1).trigger('click') // select bar
      inputElements.at(2).trigger('click') // select baz
      inputElements.at(1).trigger('click') // deselect bar

      await localVue.nextTick()
      expect(wrapper.emitted('input')[0]).toEqual([['foo', 'baz']])
      expect(wrapper.findAll('input[type=checkbox]:checked').length).toEqual(2)
    })

    it('can select all', async () => {
      expect(wrapper.vm.toggleSelectText).toEqual('Select all')
      wrapper.find('a.toggle-select').trigger('click') // select all
      await localVue.nextTick()
      expect(wrapper.emitted('input')[0]).toEqual([['foo', 'bar', 'baz']])
    })
  })

  describe('when items are selected', () => {
    beforeEach(() => {
      wrapper = buildWrapper(['foo', 'bar'])
    })

    it('should show the deselect all option', () => {
      expect(wrapper.vm.toggleSelectText).toEqual('Deselect all')
    })

    it('can deselect all', async() => {
      wrapper.find('a.toggle-select').trigger('click') // deselect all
      await localVue.nextTick()
      expect(wrapper.emitted('input')[0]).toEqual([[]])
      expect(wrapper.findAll('input[type=checkbox]:checked').length).toEqual(0)
    })
  })

  describe('no initial value is passed', () => {
    beforeEach(() => {
      wrapper = buildWrapper(undefined)
    })

    it('should options deselected', () => {
      expect(wrapper.findAll('input[type=checkbox]:checked').length).toEqual(0)
    })

  })

  describe('maxVisibleOptions', () => {
    beforeEach(() => {
      wrapper = buildWrapper(undefined, 1)
    })

    it('can hide elements based on maxVisibleOptions', async () => {
      expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(1)
     
      wrapper.find('a.toggle-slice').trigger('click')
      await localVue.nextTick()
      
      expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(3)
      wrapper.find('a.toggle-slice').trigger('click')
      await localVue.nextTick()
   
      expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(1)
    })
  })
})