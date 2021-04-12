import EntityResult from 'components/EntityResult.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.filter('i18n', x => x)
localVue.use(Vuex)

describe('EntityResult', () => {
  let store

  const propsData = {
    entityType: {
      id: 'it_emx_TypeTest',
      nrOfMatchingEntities: 2,
      label: 'Type Test',
      attributes: []
    },
    dataexplorer: '/menu/main/dataexplorer',
    highlight: x => x
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        query: 'test'
      }
    })
  })

  describe('dataExplorerLink', () => {
    it('should escape url parameters', () => {
      const wrapper = shallowMount(EntityResult, { store, localVue, propsData })
      const link = wrapper.findAll('a').at(1)
      expect(link.text()).to.equal('2 rows-found-label')
      const href = link.attributes('href')
      expect(href).to.equal('/menu/main/dataexplorer?entity=it_emx_TypeTest&query%5Bq%5D%5B0%5D%5Boperator%5D=SEARCH&query%5Bq%5D%5B0%5D%5Bvalue%5D=test')
    })
  })
})
