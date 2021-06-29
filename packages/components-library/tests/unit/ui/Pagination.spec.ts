import { mount } from '@vue/test-utils'
import Pagination from '@/components/ui/Pagination.vue'
import { localVue as getLocalVue } from '../../lib/helpers'

const localVue: any = getLocalVue()

describe('Pagination.vue', () => {
  const propsData = {
    value: {
      count: 100, loading: false, size: 20, page: 3
    },
    visiblePages: 3
  }

  it('navigates to next page', async () => {
    const wrapper = mount(Pagination, { localVue, propsData })
    await wrapper.find('.t-page-next').trigger('click')
    expect(wrapper.emitted()).toEqual({input: [[{ count: 100, loading: false, page: 4, size: 20 }]]})
  })

  it('navigates to last page', async () => {
    const wrapper = mount(Pagination, { localVue, propsData })
    await wrapper.find('.t-page-last').trigger('click')
    expect(wrapper.emitted()).toEqual({input: [[{ count: 100, loading: false, page: 5, size: 20 }]]})
  })

  it('navigates to previous page', async () => {
    const wrapper = mount(Pagination, { localVue, propsData })
    await wrapper.find('.t-page-prev').trigger('click')
    expect(wrapper.emitted()).toEqual({input: [[{ count: 100, loading: false, page: 2, size: 20 }]]})
  })

  it('navigates to first page', async () => {
    const wrapper = mount(Pagination, { localVue, propsData })
    await wrapper.find('.t-page-first').trigger('click')
    expect(wrapper.emitted()).toEqual({input: [[{ count: 100, loading: false, page: 1, size: 20 }]]})
  })

  it('changes page size and moves to first page', async () => {
    const wrapper = mount(Pagination, { localVue, propsData })
    await wrapper.find('#page-size').setValue(10)
    expect(wrapper.emitted()).toEqual({input: [[{ count: 100, loading: false, page: 1, size: 10 }]]})
  })

  it('disables next buttons on last page', async () => {
    const lastPageProps = {
      value: {
        count: 100, loading: false, size: 20, page: 5
      },
      visiblePages: 3
    }
    const wrapper = mount(Pagination, { localVue, propsData: lastPageProps })
    expect(wrapper.find('.t-page-next[disabled]').exists()).toBe(true)
    expect(wrapper.find('.t-page-last[disabled]').exists()).toBe(true)
  })

  it('disables prev buttons on first page', async () => {
    const firstPageProps = {
      value: {
        count: 100, loading: false, size: 20, page: 1
      },
      visiblePages: 3
    }
    const wrapper = mount(Pagination, { localVue, propsData: firstPageProps })
    expect(wrapper.find('.t-page-prev[disabled]').exists()).toBe(true)
    expect(wrapper.find('.t-page-first[disabled]').exists()).toBe(true)
  })

  it('responds to page prop change', async () => {
    const firstPageProps = {
      value: {
        count: 100, loading: false, size: 20, page: 1
      },
      visiblePages: 3
    }
    const wrapper = mount(Pagination, { localVue, propsData })
    expect(wrapper.find('.btn.active').text()).toBe('3')
    await wrapper.setProps(firstPageProps)
    expect(wrapper.find('.btn.active').text()).toBe('1')
  })

  it('emits size selection', async () => {
    const firstPageProps = {
      value: {
        count: 100, loading: false, size: 20, page: 3
      },
      visiblePages: 3
    }
    const wrapper = mount(Pagination, { localVue, propsData: firstPageProps })
    await wrapper.find('#page-size').find('option').setSelected()
    expect(wrapper.emitted()).toEqual({input: [[{ count: 100, loading: false, page: 1, size: 10 }]]})
  })

  it('responds to size prop change', async () => {
    const smallPageProps = {
      value: {
        count: 100, loading: false, size: 10, page: 1
      },
      visiblePages: 3
    }
    const wrapper = mount(Pagination, { localVue, propsData })
    await wrapper.setProps(smallPageProps)
    expect((wrapper.find('#page-size').element as HTMLSelectElement).value).toBe('10')
    expect(wrapper.find('.btn.active').text()).toBe('1')
  })
})
