import ApplicationState, { Toast, FilterDefinition } from '@/types/ApplicationState'
import { DataApiResponse } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'
import Vue from 'vue'
import { MetaData } from '@/types/MetaData'
import getters from '@/store/getters'
import { defaultPagination } from '@/store/state'
import { Pagination } from '@molgenis-ui/components-library'

const defaultSettings = {
  settingsRowId: null,
  collapseLimit: 5,
  customCardCode: null,
  customCardAttrs: '',
  isShop: false,
  defaultFilters: []
}

export default {
  addToast (state: ApplicationState, toast: Toast) {
    state.toasts.push(toast)
  },
  setPagination (state: ApplicationState, pagination: Pagination|undefined) {
    if (!pagination) {
      state.tablePagination = defaultPagination
    } else {
      state.tablePagination = pagination
    }
  },
  setToasts (state: ApplicationState, toasts: Toast[]) {
    Vue.set(state, 'toasts', toasts)
  },
  setDataDisplayLayout (state: ApplicationState, layout: ApplicationState['dataDisplayLayout']) {
    state.dataDisplayLayout = layout
  },
  setTableData (state: ApplicationState, data: DataApiResponse) {
    state.tableData = data
  },
  setTableName (state: ApplicationState, entity: string) {
    state.tableName = entity
  },
  setShowSelected (state: ApplicationState, cart: boolean) {
    state.showSelected = cart
  },
  toggleSelectedItems (state: ApplicationState, id: string) {
    const index = state.selectedItemIds.indexOf(id)
    if (index !== -1) {
      state.selectedItemIds.splice(index, 1)
    } else {
      state.selectedItemIds.push(id)
    }
  },
  setSelectedItems (state: ApplicationState, items: Array<string>) {
    state.selectedItemIds = items
  },
  setTableSettings (state: ApplicationState, tableSettings: StringMap) {
    const isPropSet = (prop: string) => typeof tableSettings[prop] !== 'undefined'
    state.tableSettings.isShop = isPropSet('shop') ? Boolean(tableSettings.shop) : defaultSettings.isShop
    state.tableSettings.collapseLimit = isPropSet('collapse_limit') ? parseInt(tableSettings.collapse_limit) : defaultSettings.collapseLimit
    state.tableSettings.settingsRowId = isPropSet('id') ? tableSettings.id : defaultSettings.settingsRowId
    state.tableSettings.customCardCode = isPropSet('card_template') ? tableSettings.card_template : defaultSettings.customCardCode
    state.tableSettings.customCardAttrs = isPropSet('template_attrs') ? tableSettings.template_attrs : defaultSettings.customCardAttrs
    state.tableSettings.defaultFilters = isPropSet('default_filters') ? tableSettings.default_filters.split(',').map(f => f.trim()) : defaultSettings.defaultFilters
  },
  setSortColumn (state: ApplicationState, columnName: string) {
    state.sort.sortColumnName = columnName
  },
  setIsSortOrderReversed (state: ApplicationState, isReversed: boolean) {
    state.sort.isSortOrderReversed = isReversed
  },
  setMetaData (state: ApplicationState, metaData: MetaData) {
    Vue.set(state, 'tableMeta', metaData)
  },
  setFilterDefinition (state: ApplicationState, definition: FilterDefinition[]) {
    Vue.set(state.filters, 'definition', definition)
  },
  setHideFilters (state: ApplicationState, hideFilters: boolean) {
    Vue.set(state.filters, 'hideSidebar', hideFilters)
  },
  setFiltersShown (state: ApplicationState, shown: string[]) {
    Vue.set(state.filters, 'shown', shown)
  },
  setFilterSelection (state: ApplicationState, selections: StringMap) {
    Vue.set(state.filters, 'selections', selections)
  },
  /**
  * Commit the stored bookmark querystring to the store or
  * use a default set of filters.
  */
  applyBookmark (state: ApplicationState, bookmark: string) {
    if (bookmark === '') {
      state.filters.shown = state.tableSettings.defaultFilters
    } else {
      const bookmarkedFilters = getters.parseBookmark(state, getters)(bookmark)
      state.searchText = bookmarkedFilters.searchText
      state.filters.shown = bookmarkedFilters.shown
      state.filters.selections = bookmarkedFilters.selections
    }
  },
  updateRowData (state: ApplicationState, { rowId, rowData }: { rowId: string, rowData: StringMap }) {
    if (!state.tableData) {
      throw new Error('cannot update empty table data')
    }
    // todo need to refacor state.tableData to look up list
    state.tableData.items.forEach((row, index) => {
      // @ts-ignore
      if (rowId && row[state.tableMeta.idAttribute.name].toString() === rowId.toString()) {
        // @ts-ignore
        Vue.set(state.tableData.items, index, rowData)
      }
    })
  },
  removeRow (state: ApplicationState, { rowId }: {rowId: string}) {
    if (!state.tableData) {
      throw new Error('Cannot delete item from empty table')
    }
    // todo need to refacor state.tableData to look up list
    state.tableData.items.forEach((row, index) => {
      // @ts-ignore
      if (rowId && row[state.tableMeta.idAttribute.name].toString() === rowId.toString()) {
        // @ts-ignore
        Vue.delete(state.tableData.items, index)
      }
    })
  },
  setSearchText (state: ApplicationState, searchText: string) {
    state.searchText = searchText
  }
}
