import mutations from '@/store/mutations'
import state from '@/store/state'

describe('mutations', () => {
  describe('setToast', () => {
    it('replace the toast with the passed toast', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setToast(baseAppState, { type: 'danger', message: 'message' })
      expect(baseAppState.toast).toEqual({ type: 'danger', message: 'message' })
    })
  })

  describe('clearToast', () => {
    it('clears the toast', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setToast(baseAppState, { type: 'danger', message: 'message' })
      mutations.clearToast(baseAppState)
      expect(baseAppState.toast).toEqual(null)
    })
  })

  describe('setDataDisplayLayout', () => {
    it('sets the display layout', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setDataDisplayLayout(baseAppState, 'table')
      expect(baseAppState.dataDisplayLayout).toEqual('table')
    })
  })

  describe('setEntityData', () => {
    it('sets the entity data', () => {
      let baseAppState = Object.assign({}, state)
      const entityData = {
        items: [
          {
            data: { id: '1', label: 'blaat' },
            links: { 'self': 'https://beautiful_link.nl/1' }
          }],
        links: { 'self': 'https://beautiful_link.nl' },
        page: {
          size: 1,
          totalElements: 1,
          totalPages: 1,
          number: 0
        }
      }
      mutations.setEntityData(baseAppState, entityData)
      expect(baseAppState.entityData).toEqual(entityData)
    })
  })

  describe('setShowFilters', () => {
    it('sets if the filters should be shown', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setShowFilters(baseAppState, false)
      expect(baseAppState.showFilters).toEqual(false)
    })
  })

  describe('setActiveEntity', () => {
    it('sets the active entity', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setActiveEntity(baseAppState, 'table')
      expect(baseAppState.activeEntity).toEqual('table')
    })
  })

  describe('setShoppingFilter', () => {
    it('sets if the table is a store', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setShowShoppingCart(baseAppState, true)
      expect(baseAppState.showShoppingCart).toEqual(true)
    })
  })

  describe('toggleShoppingItems', () => {
    it('adds item to shopping cart', () => {
      let baseAppState = Object.assign({}, state)
      mutations.toggleShoppingItems(baseAppState, 'item1')
      expect(baseAppState.shoppedEntityItems).toEqual(['item1'])
    })
    it('adds another item to shopping cart', () => {
      let baseAppState = Object.assign({ shoppedEntityItems: ['item1'] }, state)
      mutations.toggleShoppingItems(baseAppState, 'item2')
      expect(baseAppState.shoppedEntityItems).toEqual(['item1', 'item2'])
    })
    it('removes an existing item from shopping cart', () => {
      let baseAppState = Object.assign({ shoppedEntityItems: ['item1', 'item2'] }, state)
      mutations.toggleShoppingItems(baseAppState, 'item2')
      expect(baseAppState.shoppedEntityItems).toEqual(['item1'])
    })
  })

  describe('setMetaData', () => {
    it('sets the meta data', () => {
      let baseAppState = Object.assign({}, state)
      const entityMetaData = {
        'href': '/api/v2/test',
        'hrefCollection': '/api/v2/test',
        'name': 'test',
        'label': 'Test',
        'description': 'Beautiful description',
        'attributes': [
          {
            'href': '/api/v2/test/meta/id',
            'fieldType': 'INT',
            'name': 'id',
            'label': 'id',
            'attributes': [],
            'auto': false,
            'nillable': false,
            'readOnly': true,
            'labelAttribute': false,
            'unique': true,
            'visible': true,
            'lookupAttribute': true,
            'isAggregatable': false
          },
          {
            'href': '/api/v2/test/meta/label',
            'fieldType': 'STRING',
            'name': 'label',
            'label': 'label',
            'attributes': [],
            'auto': false,
            'nillable': false,
            'readOnly': true,
            'labelAttribute': true,
            'unique': true,
            'visible': true,
            'lookupAttribute': true,
            'isAggregatable': false
          }
        ],
        'labelAttribute': 'label',
        'idAttribute': 'id',
        'lookupAttributes': [
          'id'
        ],
        'isAbstract': false,
        'writable': true,
        'languageCode': 'en',
        'permissions': [
          'DELETE_DATA',
          'READ_METADATA',
          'READ_DATA',
          'UPDATE_METADATA',
          'AGGREGATE_DATA',
          'DELETE_METADATA',
          'UPDATE_DATA',
          'COUNT_DATA',
          'ADD_DATA'
        ]
      }
      mutations.setMetaData(baseAppState, entityMetaData)
      expect(baseAppState.entityMeta).toEqual(entityMetaData)
    })
  })
})
