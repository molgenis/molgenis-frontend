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
      localVue
    })
  })

  it('can find parameters in a string', () => {
    const content = 'test ${x}${y} $age{} ${} ${age}'
    wrapper.vm.onValueChanged({ content })
    expect(wrapper.emitted().valueChange[0][0].content).toEqual(content)
    expect(wrapper.emitted().valueChange[0][0].parameters).toEqual(['x', 'y', 'age'])
  })

  it('can extract parameters via findParameters', () => {
    expect(wrapper.vm.findParameters('test ${x}${y} $age{} ${} ${age}')).toEqual(['x', 'y', 'age'])
  })
})
