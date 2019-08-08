import ApplicationState, { Toast } from '@/types/ApplicationState'
import Vue from 'vue'

export default {
  setToast (state: ApplicationState, toast: Toast) {
    state.toast = toast
  },
  clearToast (state: ApplicationState) {
    state.toast = null
  },
  setDataDisplayLayout (state: ApplicationState, layout: String) {
    state.dataDisplayLayout = layout
  },
  setEntityData (state: ApplicationState, data: any) {
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
  setMetaData (state: ApplicationState, meta: any) {
    state.entityMeta = meta
  }
}
