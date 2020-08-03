import { shallowMount } from '@vue/test-utils'
import SettingsUi from '@/components/SettingsUi.vue'
// @ts-ignore
import { EntityToFormMapper } from '@molgenis/molgenis-ui-form'
// @ts-ignore
import api from '@molgenis/molgenis-api-client'

jest.mock('@molgenis/molgenis-api-client', () => {
  return {
    post: jest.fn(),
    get: jest.fn()
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

describe('SettingsUi component', () => {
  it('Should have "SettingsUi" as name.', () => {
    expect(SettingsUi.name).toEqual('SettingsUi')
  })

  it('Should have a "data" function.', () => {
    // @ts-ignore
    expect(typeof SettingsUi.data).toEqual('function')
  })

  describe('Data should initialize', () => {
    // @ts-ignore
    const data = SettingsUi.data()

    it('selectedSetting to null.', () => {
      expect(data.selectedSetting).toEqual(null)
    })

    it('formState as a empty object.', () => {
      expect(data.formState).toEqual({})
    })

    it('formFields as a empty array.', () => {
      expect(data.formFields).toEqual([])
    })

    it('formData as a empty object.', () => {
      expect(data.formData).toEqual({})
    })

    it('settingsOptions as a empty array.', () => {
      expect(data.settingsOptions).toEqual([])
    })

    it('alert to null.', () => {
      expect(data.alert).toEqual(null)
    })

    it('showForm to false.', () => {
      expect(data.showForm).toEqual(false)
    })

    it('settingLabel as empty string.', () => {
      expect(data.settingLabel).toEqual('')
    })
  })

  describe('On created', () => {
    const settingItem = function () {
      return {
        formFields: [],
        formData: {}
      }
    }

    const settingsOptions = { items: [{id: '1', label: 'set1'}, {id: '2', label: 'set2'}] }

    const settingResponse = {
      items: [settingItem],
      meta: {
        label: 'my-setting'
      }
    }

    // '/api/v2/sys_md_EntityType?sort=label&num=1000&&q=isAbstract==false;package.id==sys_set'
    api.get.mockResolvedValueOnce(settingsOptions)

    // '/api/v2/test-setting'
    api.get.mockResolvedValueOnce(settingResponse)

    EntityToFormMapper.generateForm.mockReturnValueOnce(settingItem)

    let pushedRoute = {}
    const $router = {
      push: function (pushed: {}) {
        pushedRoute = pushed
      }
    }
    const $route = {
      params: {
        setting: 'test-setting'
      }
    }
    const wrapper = shallowMount(SettingsUi, {
      mocks: {
        $router,
        $route
      }
    })

    it('Should fetch the settings data.', () => {
      expect(pushedRoute).toEqual({path: '/test-setting'})
    })

    it('Should make the route setting the selected setting.', () => {
      // @ts-ignore
      expect(wrapper.vm.selectedSetting).toEqual('test-setting')
    })

    describe('After creating', () => {
      it('Calling clear alert, clear the alert', () => {
        // @ts-ignore
        wrapper.vm.clearAlert()
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual(null)
      })

      it('Calling onValueChanged should pass state of the form to settings data', () => {
        // @ts-ignore
        wrapper.vm.onValueChanged({foo: 'bar'})
        // @ts-ignore
        expect(wrapper.vm.formData).toEqual({foo: 'bar'})
      })

      it('Calling handle error, sets the alert', () => {
        // @ts-ignore
        wrapper.vm.handleError('test-error')
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual({
          message: 'test-error',
          type: 'danger'
        })
      })

      it('Calling handle error with not passing a string sets the alert the default alert', () => {
        // @ts-ignore
        wrapper.vm.handleError({foo: 'bar'})
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual({
          message: 'An error has occurred.',
          type: 'danger'
        })
      })

      it('Calling the success handler resets the form and signals succes to the user', () => {
        // @ts-ignore
        wrapper.vm.formState._reset = function () {}
        // @ts-ignore
        wrapper.vm.handleSuccess()
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual({
          message: 'Settings saved',
          type: 'success'
        })
      })

      it('Submitting the form triggers post and triggers success handeler ', () => {
        // @ts-ignore
        wrapper.vm.formState._reset = function () {
        }
        wrapper.setData({formData: {id: 'test_id', a: 'a'}})

        // '/api/v1/test-setting/test_id?_method=PUT' , // {body: '{"id":"test_id","a":"a"}'}
        api.post.mockResolvedValueOnce({status: 'OKE'})
        // @ts-ignore
        wrapper.vm.onSubmit()
        // @ts-ignore
        expect(wrapper.vm.alert).toEqual({
          message: 'Settings saved',
          type: 'success'
        })
      })
    })
  })
})
