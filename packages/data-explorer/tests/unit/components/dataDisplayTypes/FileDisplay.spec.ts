import { shallowMount } from '@vue/test-utils'
import FileDisplay from '@/components/dataDisplayTypes/FileDisplay.vue'
import Vue from 'vue'

describe('FileDisplay.vue', () => {
  const stubs = ['font-awesome-icon']
  let value = {
    id: 'id',
    filename: 'file-name',
    contentType: 'content-type',
    label: 'label',
    size: 1024,
    url: 'http://some/files/file-id'
  }

  it('should display the file and download link', () => {
    const wrapper = shallowMount(FileDisplay, { propsData: { value }, stubs })
    expect(wrapper.html()).toMatchSnapshot()
  })
})