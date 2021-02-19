import ApplicationState, { Toast, FilterDefinition } from '@/types/ApplicationState'
import { DataApiResponse } from '@/types/ApiResponse'
import Vue from 'vue'
import { MetaData } from '@/types/MetaData'
import getters from '@/store/getters'
import { defaultPagination } from '@/store/state'
import { RouteQuery } from '@/types/RouteQuery'

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
  setPaginationCount (state: ApplicationState, count: number) {
    state.tablePagination.count = count
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
  setLoading (state: ApplicationState, isLoading: boolean) {
    state.loading = isLoading
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
  setTableSettings (state: ApplicationState, tableSettings: Record<string, string>) {
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
  setFilterSelection (state: ApplicationState, selections: Record<string, string>) {
    Vue.set(state.filters, 'selections', selections)
  },
  setRouteQuery (state: ApplicationState, routeQuery: RouteQuery) {
    state.tablePagination.page = routeQuery.page !== undefined ? parseInt(routeQuery.page, 10) : defaultPagination.page
    state.tablePagination.size = routeQuery.size !== undefined ? parseInt(routeQuery.size, 10) : defaultPagination.size

    if (routeQuery.sort !== undefined) {
      if (routeQuery.sort.charAt(0) === '-') {
        state.sort.isSortOrderReversed = true
        state.sort.sortColumnName = routeQuery.sort.substring(1)
      } else {
        state.sort.isSortOrderReversed = false
        state.sort.sortColumnName = routeQuery.sort
      }
    } else {
      state.sort.isSortOrderReversed = false
      state.sort.sortColumnName = null
    }

    if (routeQuery.filter !== undefined) {
      const routeFilters = getters.parseRouteFilter(state, getters)(routeQuery.filter)
      state.searchText = routeFilters.searchText
      Vue.set(state.filters, 'shown', routeFilters.shown)
      Vue.set(state.filters, 'selections', routeFilters.selections)
    } else {
      Vue.set(state.filters, 'shown', state.tableSettings.defaultFilters)
    }

    state.hiddenColumns = routeQuery.hide !== undefined ? routeQuery.hide.split(',') : []
  },
  updateRowData (state: ApplicationState, { rowId, rowData }: { rowId: string, rowData: Record<string, string> }) {
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
  removeRow (state: ApplicationState, { rowId }: { rowId: string }) {
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
  },
  persistToRoute (_ : any, routeObject: { router: any, query: any }) {
    // we have to pass this.$router, if we import it directly in mutations, jest breaks.
    const { router, query } = routeObject

    let mergedRouterObject = {
      ...router.currentRoute.query,
      ...query
    }

    let routerObjectToPersist = {}

    // remove empty parameters
    for (const key in mergedRouterObject) {
      if (mergedRouterObject[key]) {
        routerObjectToPersist[key] = mergedRouterObject[key]
      }
    }

    router.push({
      name: router.currentRoute.name,
      query: routerObjectToPersist
    }, () => { }) // fix for duplicate route.
  }
}
