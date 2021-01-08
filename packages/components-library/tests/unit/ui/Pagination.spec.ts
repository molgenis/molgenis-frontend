import { mount } from '@vue/test-utils'
import Pagination from '@/components/ui/Pagination.vue'
import { localVue as getLocalVue } from '../../lib/helpers'
import VueRouter from 'vue-router'

let wrapper: any

const localVue: any = getLocalVue()
localVue.use(VueRouter)

let propsData: any

const buildWrapper = async (propsData: any, attrs: any = null) => {
  wrapper = await mount(Pagination, {
    listeners: {
      input: async function (e: any) {
        propsData.value = e
      }
    },
    localVue,
    mocks: {
      $tc: (msg: any) => msg,
      $t: (msg: any) => msg
    },
    propsData,
    ...attrs
  })

  return wrapper
}

describe('Pagination.vue', () => {
  describe('Regardless of using a router', () => {
    it('navigates within a paginated range', async () => {
      propsData = {
        fetchItems: async function () {},
        useRouter: false,
        value: {
          count: 100, loading: false, size: 20, page: 4
        }
      }
      const wrapper = await buildWrapper(propsData)
      // The model is leading to determine the current page:
      expect(wrapper.vm.localValue).toEqual({ count: 100, loading: false, page: 4, size: 20 })
      await wrapper.find('.t-page-next').trigger('click')
      expect(propsData.value.page).toEqual(4)
      // // Next page is disabled when on the last page:
      expect(wrapper.find('.t-page-next[disabled]').exists()).toBe(true)

      await wrapper.find('.t-page-prev').trigger('click')
      expect(propsData.value.page).toEqual(4)
    })
  })

  describe('While using a router', () => {
    let router: any

    beforeEach(() => {
      router = new VueRouter()
    })

    it('redirects to a route with a valid pagination state', async () => {
      router.replace = jest.fn()
      propsData = { fetchItems: function () {}, useRouter: true, value: { page: 3, size: 20 } }
      await buildWrapper(propsData, { router })

      // The url is leading to determine the current page:
      expect(router.replace).toHaveBeenCalledWith({ path: '/', query: { page: 1, size: 20 } })
    })

    it('leaves existing querystring data intact', async () => {
      router.push({ path: '/', query: { bookmark: 'base64_encoded_string' } })
      propsData = { fetchItems: function () {}, useRouter: true, value: { count: 100, size: 20 } }
      await buildWrapper(propsData, { router })

      expect(router.currentRoute.fullPath).toEqual('/?bookmark=base64_encoded_string&page=1&size=20')
      expect(propsData.value).toEqual({ count: 100, loading: false, page: 1, size: 20 })
    })

    it('triggers the fetch method on route change', async () => {
      router.push({ path: '/', query: { page: 3, size: 10 } })
      propsData = { fetchItems: function () {}, useRouter: true, value: { count: 100, size: 20 } }
      await buildWrapper(propsData, { router })
      expect(propsData.value.page).toEqual(3)
      router.push({ path: '/', query: { page: 4, size: 10 } })
      await wrapper.vm.$nextTick()
      await wrapper.vm.$nextTick()
      expect(propsData.value.page).toEqual(3)
    })
  })
})
