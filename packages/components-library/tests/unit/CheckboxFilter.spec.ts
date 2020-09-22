import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import CheckboxFilter from '@/components/filters/CheckboxFilter.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)


describe('CheckboxFilter.vue', () => {
  const optionsPromise = () => {
    return new Promise(
      function (resolve) {
        resolve([{ value: 'foo', text: 'Foo' }, { value: 'bar', text: 'Bar' }, { value: 'baz', text: 'Baz' }])
      }
    )
  }

  const wrapper = mount(CheckboxFilter, {
    localVue,
    stubs: [
        'font-awesome-icon',
    ],
    propsData: {
      name: 'name',
      label: 'label',
      value: [],
      options: optionsPromise
    }
  })

  const unselected = mount(CheckboxFilter, {
    localVue,
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      value: [],
      options: optionsPromise
    }
  })

  const selected = mount(CheckboxFilter, {
    localVue,
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      value: ['foo'],
      options: optionsPromise
    }
  })

  const maxVisible = mount(CheckboxFilter, {
    localVue,
    stubs: {
      'font-awesome-icon': '<div />'
    },
    propsData: {
      name: 'name',
      label: 'label',
      maxVisibleOptions: 1,
      value: [],
      options: optionsPromise
    }
  })

  it('matches the snapshot', () => {
    expect(wrapper.element).toMatchSnapshot()
  })


  it('can set and unset values', () => {
    const inputElements = wrapper.findAll('input')
    console.log("INPUT ELEMENTS", inputElements)
    inputElements.at(0).trigger('click') // select foo
    inputElements.at(1).trigger('click') // select bar
    inputElements.at(2).trigger('click') // select baz
    inputElements.at(1).trigger('click') // deselect bar
    console.log('EMITTED:', wrapper.emitted)
    // @ts-ignore
    expect(wrapper.emitted('input')[3]).toEqual([['foo', 'baz']])
  })

//   it('can select all and deselect all', () => {
//     unselected.find('a.toggle-select.card-link').trigger('click') // select all
//     expect(unselected.emitted('input')[0]).toEqual([['foo', 'bar', 'baz']])

//     selected.find('a.toggle-select.card-link').trigger('click') // deselect all
//     expect(selected.emitted('input')[0]).toEqual([undefined])
//   })

//   it('can hide elements based on maxVisibleOptions', () => {
//     expect(maxVisible.findAll('.custom-control.custom-checkbox').length).toBe(1)
//     maxVisible.find('a.toggle-slice.card-link').trigger('click')
//     expect(maxVisible.findAll('.custom-control.custom-checkbox').length).toBe(3)
//     maxVisible.find('a.toggle-slice.card-link').trigger('click')
//     expect(maxVisible.findAll('.custom-control.custom-checkbox').length).toBe(1)
//   })

//   it('use function as options property', (done) => {
//     const unselected = mount(CheckboxFilter, {
//       stubs: {
//         'font-awesome-icon': '<div />'
//       },
//       propsData: {
//         name: 'name',
//         label: 'label',
//         value: [],
//         options: optionsPromise
//       }
//     })

//     const selected = mount(CheckboxFilter, {
//       stubs: {
//         'font-awesome-icon': '<div />'
//       },
//       propsData: {
//         name: 'name',
//         label: 'label',
//         value: ['foo'],
//         options: optionsPromise
//       }
//     })

//     // wait one frame to let the options resolve by the created() function
//     wrapper.vm.$nextTick(() => {
//       unselected.find('a.toggle-select.card-link').trigger('click') // select all
//       expect(unselected.emitted('input')[0]).toEqual([['foo', 'bar', 'baz']])

//       selected.find('a.toggle-select.card-link').trigger('click') // deselect all
//       expect(selected.emitted('input')[0]).toEqual([undefined])

//       done()
//     })
//   })
})