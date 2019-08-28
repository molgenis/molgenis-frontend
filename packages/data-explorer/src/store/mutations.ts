import ApplicationState, { Toast, EntityMetaRefs } from '@/types/ApplicationState'
import { DataApiResponse, MetaDataApiResponse, MetaDataAttribute } from '@/types/ApiResponse'

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
  setHideFilters (state: ApplicationState, hideFilters: boolean) {
    state.hideFilters = hideFilters
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
  setMetaDataRefLabels (state: ApplicationState, meta: MetaDataApiResponse) {
    const refItems = meta.attributes.reduce((obj : EntityMetaRefs, attribute : MetaDataAttribute) => {
      if (attribute.refEntity) {
        obj[attribute.name] = {
          refEntity: attribute.refEntity.name.toString(),
          fieldType: attribute.fieldType,
          labelAttribute: attribute.refEntity.labelAttribute.toString()
        }
      }
      return obj
    }, <EntityMetaRefs>{})
    state.entityMetaRefs = refItems
  },
  setIsShop (state: ApplicationState, isShop: boolean) {
    state.isShop = isShop
  },
  setSettingsRowId (state: ApplicationState, settingsRowId: string) {
    state.settingsRowId = settingsRowId
  },
  setMetaData (state: ApplicationState, meta: MetaDataApiResponse) {
    state.tableMeta = meta
  }
}
