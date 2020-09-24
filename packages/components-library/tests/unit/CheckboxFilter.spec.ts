import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import CheckboxFilter from '@/components/filters/CheckboxFilter.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)


describe('CheckboxFilter.vue', () => {
  let wrapper:any

  beforeEach(() => {
    wrapper = mount(CheckboxFilter, {
      localVue,
      stubs: [
          'font-awesome-icon',
      ],
      propsData: {
        bulkOperation: true,
        name: 'name',
        label: 'label',
        value: [],
        options: async () => {
          return [
            { value: 'foo', text: 'Foo' },
            { value: 'bar', text: 'Bar' },
            { value: 'baz', text: 'Baz' }
          ]
        }
      }
    })
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('can set and unset values', async () => {
    const inputElements = wrapper.findAll('input')

    inputElements.at(0).trigger('click') // select foo
    inputElements.at(1).trigger('click') // select bar
    inputElements.at(2).trigger('click') // select baz
    inputElements.at(1).trigger('click') // deselect bar

    await localVue.nextTick()
    expect(wrapper.emitted('input')[0]).toEqual([['foo', 'baz']])
  })

  it.only('can select all and deselect all', async () => {
    console.log('VALUE', wrapper.vm.value)
    wrapper.find('a.toggle-select').trigger('click') // select all
    expect(wrapper.emitted('input')[0]).toEqual([['foo', 'bar', 'baz']])
    await localVue.nextTick()
    wrapper.find('a.toggle-select').trigger('click') // deselect all
    console.log('VALUE', wrapper.emitted('input'))
    expect(wrapper.emitted('input')[0]).toEqual([undefined])
  })

  it('can hide elements based on maxVisibleOptions', async () => {
    expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(1)
    console.log('BEFORE CLICK')
    wrapper.find('a.toggle-slice').trigger('click')
    await localVue.nextTick()
    console.log('AFTER CLICK')
    expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(3)
    wrapper.find('a.toggle-slice').trigger('click')
    await localVue.nextTick()
    expect(wrapper.findAll('.custom-control.custom-checkbox').length).toBe(1)
  })

  it('use function as options property', async (done) => {
    // wait one frame to let the options resolve by the created() function
    await localVue.nextTick()
    wrapper.find('a.toggle-select.card-link').trigger('click') // select all
    expect(wrapper.emitted('input')[0]).toEqual([['foo', 'bar', 'baz']])

    wrapper.find('a.toggle-select.card-link').trigger('click') // deselect all
    await localVue.nextTick()
    expect(wrapper.emitted('input')[0]).toEqual([undefined])

  })
})