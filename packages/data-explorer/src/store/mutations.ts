import ApplicationState, { Toast } from '@/types/ApplicationState'
import { DataApiResponse, MetaDataApiResponse } from '@/types/ApiResponse'

export default {
  setToast (state: ApplicationState, toast: Toast) {
    state.toast = toast
  },
  clearToast (state: ApplicationState) {
    state.toast = null
  },
  setDataDisplayLayout (state: ApplicationState, layout: ApplicationState['dataDisplayLayout']) {
    state.dataDisplayLayout = layout
  },
  setTableData (state: ApplicationState, data: DataApiResponse) {
    state.tableData = data
  },
  setShowFilters (state: ApplicationState, showFilters: boolean) {
    state.showFilters = showFilters
  },
  setTableName (state: ApplicationState, entity: string) {
    state.tableName = entity
  },
  setShowShoppingCart (state: ApplicationState, cart: boolean) {
    state.showShoppingCart = cart
  },
  toggleShoppingItems (state: ApplicationState, id: string) {
    const index = state.shoppedEntityItems.indexOf(id)
    if (index !== -1) {
      state.shoppedEntityItems.splice(index, 1)
    } else {
      state.shoppedEntityItems.push(id)
    }
  },
  setTableMetaData (state: ApplicationState, meta: MetaDataApiResponse) {
    state.tableMeta = meta
  },
  setIsShop (state: ApplicationState, isShop: boolean) {
    state.isShop = isShop
  },
  setSettingsRowId (state: ApplicationState, settingsRowId: string) {
    state.settingsRowId = settingsRowId
  }
}
