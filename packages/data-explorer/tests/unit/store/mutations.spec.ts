import mutations from '@/store/mutations'
import ApplicationState from '@/types/ApplicationState'

describe('mutations', () => {
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

  let baseAppState: ApplicationState

  beforeEach(() => {
    baseAppState = {
      toast: null,
      tableName: 'root_hospital_patients',
      tableData: null,
      tableMeta: null,
      dataDisplayLayout: 'CardView',
      defaultEntityData: null,
      entityMetaRefs: {},
      showShoppingCart: false,
      shoppedEntityItems: [],
      tableSettings: {
        settingsTable: 'de_dataexplorer_table_settings',
        settingsRowId: null,
        collapseLimit: 5,
        customCardCode: null,
        customCardAttrs: '',
        isShop: false,
        defaultFilters: []
      },
      isSettingsLoaded: false,
      filters: {
        hideSidebar: false,
        definition: [],
        shown: [],
        selections: {}
      }
    }
  })

  describe('setToast', () => {
    it('replace the toast with the passed toast', () => {
      mutations.setToast(baseAppState, { type: 'danger', message: 'message' })
      expect(baseAppState.toast).toEqual({ type: 'danger', message: 'message' })
    })
  })

  describe('clearToast', () => {
    it('clears the toast', () => {
      mutations.setToast(baseAppState, { type: 'danger', message: 'message' })
      mutations.clearToast(baseAppState)
      expect(baseAppState.toast).toEqual(null)
    })
  })

  describe('setDataDisplayLayout', () => {
    it('sets the display layout', () => {
      mutations.setDataDisplayLayout(baseAppState, 'TableView')
      expect(baseAppState.dataDisplayLayout).toEqual('TableView')
    })
  })

  describe('setTableData', () => {
    it('sets the entity data', () => {
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
      mutations.setHideFilters(baseAppState, false)
      expect(baseAppState.filters.hideSidebar).toEqual(false)
    })
  })

  describe('setFiltersShown', () => {
    it('sets the filters to be shown', () => {
      mutations.setFiltersShown(baseAppState, ['filtera', 'filterb'])
      expect(baseAppState.filters.shown).toEqual(['filtera', 'filterb'])
    })
  })

  describe('setTableName', () => {
    it('sets the active entity', () => {
      mutations.setTableName(baseAppState, 'table')
      expect(baseAppState.tableName).toEqual('table')
    })
  })

  describe('setMetaData', () => {
    it('sets the metadata', () => {
      mutations.setMetaData(baseAppState, entityMetaData)
      expect(baseAppState.tableMeta).toEqual(entityMetaData)
    })
  })

  describe('setShowShoppingCart', () => {
    it('sets if the table is a store', () => {
      mutations.setShowShoppingCart(baseAppState, true)
      expect(baseAppState.showShoppingCart).toEqual(true)
    })
  })

  describe('toggleShoppingItems', () => {
    it('adds item to shopping cart', () => {
      mutations.toggleShoppingItems(baseAppState, 'item1')
      expect(baseAppState.shoppedEntityItems).toEqual(['item1'])
    })
    it('adds another item to shopping cart', () => {
      mutations.toggleShoppingItems(baseAppState, 'item1')
      mutations.toggleShoppingItems(baseAppState, 'item2')
      expect(baseAppState.shoppedEntityItems).toEqual(['item1', 'item2'])
    })
    it('removes an existing item from shopping cart', () => {
      mutations.toggleShoppingItems(baseAppState, 'item1')
      mutations.toggleShoppingItems(baseAppState, 'item2')
      mutations.toggleShoppingItems(baseAppState, 'item2')
      expect(baseAppState.shoppedEntityItems).toEqual(['item1'])
    })
  })
  describe('setTableMetaData', () => {
    it('sets the meta data', () => {
      mutations.setTableMetaData(baseAppState, entityMetaData)
      expect(baseAppState.tableMeta).toEqual(entityMetaData)
    })
  })
  describe('setTableSettings', () => {
    it('sets the tableSettings', () => {
      mutations.setTableSettings(baseAppState, { 
        shop: 'true',
        collapse_limit: '5',
        id: 'blaat',
        default_filters: 'df-1, df-2',
        card_template: 'myTemplate',
        template_attrs: 'templateAttrs'
      })
      expect(baseAppState.tableSettings.isShop).toEqual(true)
      expect(baseAppState.tableSettings.collapseLimit).toEqual(5)
      expect(baseAppState.tableSettings.settingsRowId).toEqual('blaat')
      expect(baseAppState.tableSettings.defaultFilters).toEqual(['df-1', 'df-2'])
    })

    it('should keep the defaults if no overrides are passed', () => {
      mutations.setTableSettings(baseAppState, {})
      expect(baseAppState.tableSettings).toEqual({
        settingsTable: 'de_dataexplorer_table_settings',
        settingsRowId: null,
        collapseLimit: 5,
        customCardCode: null,
        customCardAttrs: '',
        isShop: false,
        defaultFilters: []
      })
    })
  })
  describe('setMetaDataRefLabels', () => {
    it('sets the object with the labels for all ref entities', () => {
      mutations.setMetaDataRefLabels(baseAppState, entityMetaData)
      // expect(baseAppState.entityMetaRefLabels).toEqual({'it_emx_datatypes_TypeTestRef': 'label'})
    })
  })
  describe('updateRowData', () => {
    it('throws error on empty table', () => {
      try {
        mutations.updateRowData(baseAppState, { rowId: 'id', rowData: {} })
      } catch (err) {
        expect(err.toString()).toEqual('Error: cannot update empty table data')
      }
    })
  })
  describe('setIsSettingsLoaded', () => {
    it('sets isSettingsLoaded to treu', () => {
      mutations.setIsSettingsLoaded(baseAppState)
      expect(baseAppState.isSettingsLoaded).toEqual(true)
    })
  })
})
