import ApplicationState, { Toast, DataApiResponse, MetaDataApiResponse } from '@/types/ApplicationState'

export default {
  setToast (state: ApplicationState, toast: Toast) {
    state.toast = toast
  },
  clearToast (state: ApplicationState) {
    state.toast = null
  },
  setDataDisplayLayout (state: ApplicationState, layout: string) {
    state.dataDisplayLayout = layout
  },
  setEntityData (state: ApplicationState, data: DataApiResponse) {
    state.entityData = data
  },
  setShowFilters (state: ApplicationState, showFilters: boolean) {
    state.showFilters = showFilters
  },
  setActiveEntity (state: ApplicationState, entity: string) {
    state.activeEntity = entity
  },
  setShoppingFilter (state: ApplicationState, store: boolean) {
    state.shoppingFilter = store
  },
  toggleShoppingItems (state: ApplicationState, id: string) {
    const index = state.shoppedEntityItems.indexOf(id)
    if (index !== -1) {
      state.shoppedEntityItems.splice(index, 1)
    } else {
      state.shoppedEntityItems.push(id)
    }
  },
  setMetaData (state: ApplicationState, meta: MetaDataApiResponse) {
    state.entityMeta = meta
  }
}
