import ApplicationState, {Toast} from '@/types/ApplicationState'
import {DataApiResponse, MetaDataApiResponse, MetaDataAttribute} from '@/types/ApiResponse'
import {StringMap} from '@/types/GeneralTypes'

export default {
  setToast(state: ApplicationState, toast: Toast) {
    state.toast = toast
  },
  clearToast(state: ApplicationState) {
    state.toast = null
  },
  setDataDisplayLayout(state: ApplicationState, layout: string) {
    state.dataDisplayLayout = layout
  },
  setEntityData(state: ApplicationState, data: DataApiResponse) {
    state.entityData = data
  },
  setShowFilters(state: ApplicationState, showFilters: boolean) {
    state.showFilters = showFilters
  },
  setActiveEntity(state: ApplicationState, entity: string) {
    state.activeEntity = entity
  },
  setShoppingFilter(state: ApplicationState, store: boolean) {
    state.shoppingFilter = store
  },
  toggleShoppingItems(state: ApplicationState, id: string) {
    const index = state.shoppedEntityItems.indexOf(id)
    if (index !== -1) {
      state.shoppedEntityItems.splice(index, 1)
    } else {
      state.shoppedEntityItems.push(id)
    }
  },
  setMetaData(state: ApplicationState, meta: MetaDataApiResponse) {
    state.entityMeta = meta
  },
  setMetaDataRefLabels(state: ApplicationState, meta: MetaDataApiResponse) {
    const labels = meta.attributes.reduce((obj : StringMap, attribute : MetaDataAttribute) => {
      if (attribute.refEntity && !obj[attribute.refEntity.name]) {
        obj[attribute.refEntity.name] = attribute.refEntity.labelAttribute.toString()
      }
      return obj
    }, <StringMap>{})
    state.entityMetaRefLabels = labels
  },
  setIsShop(state: ApplicationState, isShop: boolean) {
    state.isShop = isShop
  },
  setSettingsRowId(state: ApplicationState, settingsRowId: string) {
    state.settingsRowId = settingsRowId
  }
}
