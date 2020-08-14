import { shallowMount, createLocalVue } from '@vue/test-utils'
import DataRowEdit from '@/components/DataRowEdit.vue'
// @ts-ignore
import * as repository from '@/repository/dataRowRepository'
// @ts-ignore
import { EntityToFormMapper } from '@molgenis/molgenis-ui-form'
import Vue from 'vue'

jest.mock('@/repository/dataRowRepository', () => {
  return {
    fetch: jest.fn(),
    save: jest.fn(),
    fetchOption: jest.fn()
  }
})

jest.mock('@molgenis/molgenis-ui-form', () => {
  return {
      FormComponent: {},
      EntityToFormMapper: {
        generateForm: jest.fn()
      }
    }
})

const localVue = createLocalVue()
localVue.filter('i18n', jest.fn())

Object.defineProperty(window, '__INITIAL_STATE__', {
  value: {
    dataExplorerBaseUrl: 'dataExplorerBaseUrl',
  }
})

describe('DataRowEdit.vue', () => {

  let wrapper: any

  const mappedCreateData = {
    formFields: [{id: 'a', type: 'text'}],
    formData: {a: 'b'},
    formLabel: 'form label'
  }

  let formState: any

  beforeEach(async(done) => {
    // @ts-ignore
    repository.save.mockReset()
    // @ts-ignore ts does not know its a mock
    repository.fetch.mockResolvedValue({ 
      meta: {
        label: 'lbl',
        attributes: [{
          name: 'my-attr',
          refEntity: {
            name: 'myref'
          }
        }]
      },
      rowData: 'mock-rowData'
    })
    // @ts-ignore
    repository.save.mockResolvedValue({})

    EntityToFormMapper.generateForm.mockReturnValue(mappedCreateData)

    formState = {
      $valid: true,
      a: {
        $touched: false,
      }
    }

    wrapper = await shallowMount(DataRowEdit, {
      localVue,
      propsData: { 
        dataTableId: 'dataTableId'
      },
      mocks: {
        $t: () => 'default-msg'
      }
    })
    done()
  })

  it('renders', () => {
    expect(wrapper).toBeDefined()
  })

  it('on create should fetch the form data and map the result', () => {
    expect(repository.fetch).toHaveBeenCalled()
    expect(EntityToFormMapper.generateForm).toHaveBeenCalled()
  })

  it('onValueChanged should update the formData', () => {
    const formUpdate = {"foo": "bar"}
    wrapper.vm.onValueChanged(formUpdate)
    expect(wrapper.vm.formData).toEqual(formUpdate)
  })

  it('onSubmit should post the form data formData', () => {
    wrapper.setData({ formState })
    wrapper.vm.onSubmit()
    expect(repository.save).toHaveBeenCalled()
  })

  it('onSumbit if the form is invalid save should not be called', () => {
    formState.$valid = false
    wrapper.setData({ formState })
    wrapper.vm.onSubmit()
    expect(repository.save).not.toHaveBeenCalled()
  })

  it('onSumbit when a error is thrown during save, a alert should be shown', async(done) => {
    wrapper.setData({ formState })
    // @ts-ignore
    repository.save.mockRejectedValue('my error')
    await wrapper.vm.onSubmit()
    expect(wrapper.find('#message-span').text()).toEqual('my error')
    done()
  })

  it('dismissing the alert removes it', async(done) => {
    wrapper.setData({ formState })
    // @ts-ignore
    repository.save.mockRejectedValue('my error')
    await wrapper.vm.onSubmit()
    expect(wrapper.find('#message-span').text()).toEqual('my error')
    wrapper.find('#alert-message button').trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).not.toContain('message-span')
    done()
  })

  it('set de default msg in case of non string error prop', () => {
    wrapper.vm.handleError({foo: 'bar'})
    expect(wrapper.vm.alert).toEqual({"message": 'default-msg', "type": "danger"})
  })

  describe('when passing a rowId', () => {

    beforeEach(async(done) => {
      // @ts-ignore
      EntityToFormMapper.generateForm.mockReset()
      wrapper = await shallowMount(DataRowEdit, {
        localVue,
        propsData: { 
          dataTableId: 'dataTableId',
          dataRowId: 'dataRowId'
        },
        mocks: {
          $t: () => 'default-msg'
        }
      })
      done()
    })


    it('the mapper should run in update mode', () => {
      expect(EntityToFormMapper.generateForm).toHaveBeenCalledWith(
        {
          label: 'lbl',
          attributes: [{
            name: 'my-attr',
            refEntity: {
              name: 'myref'
            }
          }]
        },
        'mock-rowData',
        expect.objectContaining({mapperMode: 'UPDATE'})
      )
    })
    
  })
})
