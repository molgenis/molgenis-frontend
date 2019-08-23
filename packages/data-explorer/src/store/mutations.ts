import ApplicationState, {Toast} from '@/types/ApplicationState'
import {DataApiResponse, MetaDataApiResponse, MetaDataAttribute} from '@/types/ApiResponse'
import {EntityMetaRefs} from '@/types/ApplicationState'
import {filterQueryGenerator, expandQueryGenerator} from '../utils/QueryBuilder'

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
  setTableData(state: ApplicationState, data: DataApiResponse) {
    state.entityData = data
  },
  // setDefaultEntityData(state: ApplicationState, data: DataApiResponse) {
  //   state.defaultEntityData = data
  // },
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
    const refItems = meta.attributes.reduce((obj : EntityMetaRefs, attribute : MetaDataAttribute) => {
      if (attribute.refEntity) {
        obj[attribute.name] = { refEntity: attribute.refEntity.name.toString(), labelAttribute: attribute.refEntity.labelAttribute.toString() }
      }
      return obj
    }, <EntityMetaRefs>{})
    state.entityMetaRefs = refItems
  },
  setIsShop(state: ApplicationState, isShop: boolean) {
    state.isShop = isShop
  },
  setSettingsRowId(state: ApplicationState, settingsRowId: string) {
    state.settingsRowId = settingsRowId
  }
}
