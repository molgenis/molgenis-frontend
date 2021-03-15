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

describe('DataRowEdit.vue', () => {
  let wrapper: any

  const mappedCreateData = {
    formFields: [
      { id: 'a', type: 'text' },
      { id: 'c', type: 'field-group', children: [{ id: 'f', type: 'text' }] }
    ],
    formData: { a: 'b', c: 'd', f: 'g' },
    formLabel: 'form label'
  }

  let formState: any

  beforeEach(async (done) => {
    // @ts-ignore
    repository.save.mockReset()
    // @ts-ignore ts does not know its a mock
    repository.fetch.mockResolvedValue({
      meta: {
        id: 'my-id',
        label: 'lbl',
        idAttribute: 'id',
        labelAttribute: 'label',
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
        $touched: false
      },
      f: {
        $touched: false
      }
    }

    wrapper = await shallowMount(DataRowEdit, {
      localVue,
      propsData: {
        entity: 'entity'
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
    const formUpdate = { 'foo': 'bar' }
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

  it('onSumbit when a error is thrown during save, a alert should be shown', async (done) => {
    wrapper.setData({ formState })
    // @ts-ignore
    repository.save.mockRejectedValue('my error')
    await wrapper.vm.onSubmit()
    expect(wrapper.find('#message-span').text()).toEqual('my error')
    // @ts-ignore
    repository.save.mockRejectedValue({ errors: [{ message: 'my error', code: 'my code' }] })
    await wrapper.vm.onSubmit()
    expect(wrapper.find('#message-span').text()).toEqual('my error (my code)')
    done()
  })

  it('onCancelClick when no parent is set should call goBackToPluginCaller', () => {
    const goSpy = jest.spyOn(window.history, 'go')
    wrapper.vm.onCancelClick()
    expect(goSpy).toBeCalled()
  })

  it('dismissing the alert removes it', async (done) => {
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
    wrapper.vm.handleError({ foo: 'bar' })
    expect(wrapper.vm.alert).toEqual({ 'message': 'default-msg', 'type': 'danger' })
  })

  describe('when passing a rowId', () => {
    beforeEach(async (done) => {
      // @ts-ignore
      EntityToFormMapper.generateForm.mockReset()
      wrapper = await shallowMount(DataRowEdit, {
        localVue,
        propsData: {
          entity: 'entity',
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
          id: 'my-id',
          label: 'lbl',
          idAttribute: 'id',
          labelAttribute: 'label',
          attributes: [{
            name: 'my-attr',
            refEntity: {
              name: 'myref'
            }
          }]
        },
        'mock-rowData',
        expect.objectContaining({ mapperMode: 'UPDATE' })
      )
    })
  })

  describe('when adding a reference option', () => {
    it('should add a child data row edit', async (done) => {
      const optionCreatedCallback = jest.fn()
      const sourceField = {
        id: 'my-attr'
      }
      wrapper.vm.onAddOptionRequest(optionCreatedCallback, {}, sourceField)
      expect(wrapper.find('div.container div.container').exists()).toBeTruthy()
      done()
    })
  })

  describe('when saving a child option', () => {
    const callBack = jest.fn()
    const mockRemoveChild = jest.fn()

    beforeEach(async (done) => {
      // @ts-ignore
      repository.save.mockResolvedValue({
        headers: {
          get: () => {
            return 'created-ref-location'
          }
        }
      })

      // @ts-ignore
      repository.fetchOption.mockResolvedValue({
        id: 'option-id',
        label: 'option-label'
      })

      const mockParent = await shallowMount(DataRowEdit, {
        localVue,
        propsData: {
          entity: 'entity'
        },
        mocks: {
          $t: () => 'default-msg'
        }
      })

      // @ts-ignore
      mockParent.optionCreatedCallback = callBack
      // @ts-ignore
      mockParent.setRef = () => null
      // @ts-ignore
      mockParent.$refs = {
        refContainer: {
          removeChild: mockRemoveChild
        }
      }

      wrapper = await shallowMount(DataRowEdit, {
        localVue,
        propsData: {
          entity: 'refTableId',
          parent: mockParent
        },
        mocks: {
          $t: () => 'default-msg'
        }
      })
      done()
    })

    it('save the new option and call the createOption callback with the new option', async (done) => {
      wrapper.setData({ formState })
      await wrapper.vm.onSubmit()
      expect(repository.save).toHaveBeenCalled()
      expect(callBack).toBeCalledWith({ id: 'option-id', value: 'option-id', label: 'option-label' })
      done()
    })

    it('when aborting the new option creation', () => {
      wrapper.vm.onCancelClick()
      expect(mockRemoveChild).toBeCalled()
    })
  })
})
