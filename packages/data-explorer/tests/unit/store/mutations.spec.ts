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
      mutations.setDataDisplayLayout(baseAppState, 'TableView')
      expect(baseAppState.dataDisplayLayout).toEqual('TableView')
    })
  })

  describe('setTableData', () => {
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
      mutations.setTableData(baseAppState, entityData)
      expect(baseAppState.tableData).toEqual(entityData)
    })
  })

  describe('setHideFilters', () => {
    it('sets if the filters should be shown', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setHideFilters(baseAppState, false)
      expect(baseAppState.hideFilters).toEqual(false)
    })
  })

  describe('setTableName', () => {
    it('sets the active entity', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setTableName(baseAppState, 'table')
      expect(baseAppState.tableName).toEqual('table')
    })
  })

  describe('setShowShoppingCart', () => {
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
      mutations.setTableMetaData(baseAppState, entityMetaData)
      expect(baseAppState.tableMeta).toEqual(entityMetaData)
    })
  })
  describe('setTableSettings', () => {
    it('sets the tableSettings', () => {
      let baseAppState = Object.assign({}, state)
      mutations.setTableSettings(baseAppState, {shop: 'true', collapse_limit: '5', id: 'blaat'})
      expect(baseAppState.tableSettings.isShop).toEqual(true)
      expect(baseAppState.tableSettings.collapseLimit).toEqual(5)
      expect(baseAppState.tableSettings.settingsRowId).toEqual('blaat')
    })
  })
  describe('setMetaDataRefLabels', () => {
    it('sets the object with the labels for all ref entities', () => {
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
          },
          {
            'href': '/api/v2/it_emx_datatypes_TypeTest/meta/xmrefnillable_value',
            'fieldType': 'MREF',
            'name': 'xmrefnillable_value',
            'label': 'xmrefnillable_value',
            'attributes': [],
            'refEntity': {
              'href': '/api/v2/it_emx_datatypes_TypeTestRef',
              'hrefCollection': '/api/v2/it_emx_datatypes_TypeTestRef',
              'name': 'it_emx_datatypes_TypeTestRef',
              'label': 'TypeTestRef',
              'description': 'MOLGENIS Data types test ref entity',
              'attributes': [
                {
                  'href': '/api/v2/it_emx_datatypes_TypeTestRef/meta/value',
                  'fieldType': 'STRING',
                  'name': 'value',
                  'label': 'value label',
                  'description': 'TypeTestRef value attribute',
                  'attributes': [],
                  'maxLength': 255,
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
                  'href': '/api/v2/it_emx_datatypes_TypeTestRef/meta/label',
                  'fieldType': 'STRING',
                  'name': 'label',
                  'label': 'label label',
                  'description': 'TypeTestRef label attribute',
                  'attributes': [],
                  'maxLength': 255,
                  'auto': false,
                  'nillable': false,
                  'readOnly': false,
                  'labelAttribute': true,
                  'unique': false,
                  'visible': true,
                  'lookupAttribute': true,
                  'isAggregatable': false
                }
              ],
              'labelAttribute': 'label',
              'idAttribute': 'value',
              'lookupAttributes': [
                'value',
                'label'
              ],
              'isAbstract': false,
              'writable': false,
              'languageCode': 'en',
              'permissions': [
                'READ_METADATA',
                'COUNT_DATA',
                'AGGREGATE_DATA',
                'READ_DATA'
              ]
            },
            'auto': false,
            'nillable': true,
            'readOnly': false,
            'labelAttribute': false,
            'unique': false,
            'visible': true,
            'lookupAttribute': false,
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
      mutations.setMetaDataRefLabels(baseAppState, entityMetaData)
      // expect(baseAppState.entityMetaRefLabels).toEqual({'it_emx_datatypes_TypeTestRef': 'label'})
    })
  })
})
