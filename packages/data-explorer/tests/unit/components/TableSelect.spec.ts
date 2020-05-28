import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableSelect from '@/components/TableSelect.vue'
import { BootstrapVue } from 'bootstrap-vue'

describe('SearchComponent', () => {
  let wrapper: any
  const localVue = createLocalVue()
  localVue.use(BootstrapVue)

  beforeEach(() => {
    wrapper = shallowMount(TableSelect, { localVue,
      propsData: {
        label: 'label',
        packageTables: [{ id: 'pt-id', label: 'pt-lbl' }]
      }
    })
  })

  it('should render the component', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })
})
