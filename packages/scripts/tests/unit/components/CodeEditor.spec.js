/* eslint-disable no-template-curly-in-string */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CodeEditor from '../../../src/components/CodeEditor'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.filter('i18n', jest.fn())

describe('components/CodeEditor.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CodeEditor, {
      localVue,
      propsData: {
        scriptType: 'non-magma'
      }
    })
  })

  describe('on create', () => {
    it('should place in inital data in the code editor', () => {
      wrapper = shallowMount(CodeEditor, {
        localVue,
        propsData: {
          initialData: 'some data this is',
          scriptType: 'non-magma'
        }
      })
      expect(wrapper.vm.codeEditorData.content).toEqual('some data this is')
    })
  })

  it('can find parameters in a string', () => {
    const content = 'test ${x}${y} $age{} ${} ${age}'
    wrapper.vm.onValueChanged({ content })
    expect(wrapper.vm.parameters).toEqual(['x', 'y', 'age'])
  })
})
