import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NavigatorSearch from '@/components/navigator/NavigatorSearch'

const localVue = createLocalVue()
const stubs = ['b-input-group', 'font-awesome-icon', 'b-btn', 'b-input-group-append', 'b-form-input']
localVue.use(Vuex)

describe('NavigatorSearch.vue', () => {
  describe('search input', () => {
    it('should exist', () => {
      const state = {
        route: {
          query: {
            q: 'search text'
          }
        }
      }

      let store = new Vuex.Store({
        state: state
      })

      const wrapper = shallowMount(NavigatorSearch, {
        store,
        localVue,
        mocks: {
          $t: () => {}
        },
        stubs
      })

      expect(wrapper.find('b-form-input-stub').exists()).toBe(true)
    })
  })
})
