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
  }

}
