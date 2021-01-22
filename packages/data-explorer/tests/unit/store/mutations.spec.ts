import mutations from '@/store/mutations'
import mockState from '../mocks/mockState'
import ApplicationState, { Toast } from '@/types/ApplicationState'
import { Attribute, MetaData } from '@/types/MetaData'
import getters from '@/store/getters'

jest.mock('@/store/getters', () => {
  return {
    parseBookmark: () => () => {
      return {
        searchText: 'searchText',
        shown: ['a', 'b'],
        selections: ['c']
      }
    }
  }
})

describe('mutations', () => {
  const IntAttribute: Attribute = {
    id: 'id',
    name: 'id',
    idAttribute: true,
    description: 'the id',
    isReference: false,
    label: 'id',
    nullable: false,
    readOnly: false,
    type: 'int',
    unique: false,
    auto: false,
    labelAttribute: false,
    visible: true,
    lookupAttributeIndex: 1,
    aggregatable: false
  }
  const StringAttribute: Attribute = {
    id: 'label',
    name: 'label',
    idAttribute: false,
    description: 'the label',
    isReference: false,
    label: 'reference',
    nullable: false,
    readOnly: false,
    type: 'string',
    unique: false,
    auto: false,
    labelAttribute: true,
    visible: true,
    lookupAttributeIndex: 2,
    aggregatable: false
  }
  const entityMetaData:MetaData = {
    id: 'id',
    idAttribute: IntAttribute,
    labelAttribute: StringAttribute,
    package: null,
    description: 'description',
    label: 'Test',
    abstract: false,
    attributes: [IntAttribute, StringAttribute]
  }

  let baseAppState: ApplicationState

  beforeEach(() => {
    baseAppState = mockState()
    baseAppState.tableName = 'root_hospital_patients'
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

  describe('setShowSelected', () => {
    it('sets if the table is a store', () => {
      mutations.setShowSelected(baseAppState, true)
      expect(baseAppState.showSelected).toEqual(true)
    })
  })

  describe('toggleSelectedItems', () => {
    it('adds item to shopping cart', () => {
      mutations.toggleSelectedItems(baseAppState, 'item1')
      expect(baseAppState.selectedItemIds).toEqual(['item1'])
    })
    it('adds another item to shopping cart', () => {
      mutations.toggleSelectedItems(baseAppState, 'item1')
      mutations.toggleSelectedItems(baseAppState, 'item2')
      expect(baseAppState.selectedItemIds).toEqual(['item1', 'item2'])
    })
    it('removes an existing item from shopping cart', () => {
      mutations.toggleSelectedItems(baseAppState, 'item1')
      mutations.toggleSelectedItems(baseAppState, 'item2')
      mutations.toggleSelectedItems(baseAppState, 'item2')
      expect(baseAppState.selectedItemIds).toEqual(['item1'])
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
        settingsRowId: null,
        collapseLimit: 5,
        customCardCode: null,
        customCardAttrs: '',
        isShop: false,
        defaultFilters: []
      })
    })
  })
  describe('setSortColumn', () => {
    it('should update the sortColumn', () => {
      mutations.setSortColumn(baseAppState, 'column-to-sort-id')
      expect(baseAppState.sort.sortColumnName).toEqual('column-to-sort-id')
    })
  })
  describe('setIsSortOrderReversed', () => {
    it('should update the isSortOrderReversed', () => {
      mutations.setIsSortOrderReversed(baseAppState, true)
      expect(baseAppState.sort.isSortOrderReversed).toEqual(true)
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

  describe('removeRow', () => {
    it('throws error on when classed on empty dataTable', () => {
      try {
        mutations.removeRow(baseAppState, { rowId: 'id' })
      } catch (err) {
        expect(err.toString()).toEqual('Error: Cannot delete item from empty table')
      }
    })

    it('should remove the item, corresponding to the passed row id, from the dataTable', () => {
      let mockState = {
        tableMeta: { idAttribute: { name: 'idField' } },
        tableData: { items: [{ idField: 'a' }, { idField: 'b' }] }
      }

      // @ts-ignore
      mutations.removeRow(mockState, { rowId: 'b' })
      expect(mockState.tableData.items).toEqual([{ idField: 'a' }])
    })
  })

  describe('setSearchText', () => {
    it('sets searchText to the passes value', () => {
      mutations.setSearchText(baseAppState, 'test123')
      expect(baseAppState.searchText).toEqual('test123')
    })
  })

  describe('setFilterSelection', () => {
    it('sets the filter selection as passed', () => {
      mutations.setFilterSelection(baseAppState, { a: 'a', b: 'b' })
      expect(baseAppState.filters.selections).toEqual({ a: 'a', b: 'b' })
    })
  })
  describe('setFilterDefinition', () => {
    it('sets the filter definition as passed', () => {
      const filterDef: any = { filter: 'def' }
      mutations.setFilterDefinition(baseAppState, filterDef)
      expect(baseAppState.filters.definition).toEqual(filterDef)
    })
  })
  describe('addToast', () => {
    it('pushes a toast', () => {
      const toast:Toast = { message: 'foo', type: 'success' }
      mutations.addToast(baseAppState, toast)
      expect(baseAppState.toasts).toEqual([toast])
    })
  })
  describe('setToasts', () => {
    it('sets the toasts', () => {
      const toasts:Toast[] = [{ message: 'foo', type: 'success' }]
      mutations.setToasts(baseAppState, toasts)
      expect(baseAppState.toasts).toEqual(toasts)
    })
  })

  describe('applyBookmark', () => {
    it('if the bookmark is empty the default from the state is used', () => {
      mutations.applyBookmark(baseAppState, '')
      expect(baseAppState.filters.shown).toEqual([])
    })

    it('if the bookmark is not empty it should be parsed and used to update the state', () => {
      mutations.applyBookmark(baseAppState, 'mock-bookmark')
      expect(baseAppState.searchText).toEqual('searchText')
      expect(baseAppState.filters.shown).toEqual(['a', 'b'])
      expect(baseAppState.filters.selections).toEqual(['c'])
    })
  })
})
