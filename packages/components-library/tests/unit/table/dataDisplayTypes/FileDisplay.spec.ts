import { createLocalVue, shallowMount } from '@vue/test-utils'
import FileDisplay from '@/components/dataDisplayTypes/FileDisplay.vue'

describe('FileDisplay.vue', () => {
  const localVue = createLocalVue()

  const stubs = ['b-modal', 'font-awesome-icon']
  const value = {
    id: 'id',
    filename: 'file-name',
    contentType: 'content-type',
    label: 'label',
    size: 1024,
    url: 'http://some/files/file-id'
  }

  it('should display the file and download link', () => {
    const wrapper = shallowMount(FileDisplay, { localVue, propsData: { value }, stubs })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
