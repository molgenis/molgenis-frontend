import { DataApiResponse, MetaDataApiResponse, DataApiResponseItem } from '@/types/ApiResponse'

export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export type EntityMetaRefs = {
  [s: string]: {
    refEntity: string,
    fieldType: string,
    labelAttribute: string
  }
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: string
  activeEntity: string | null
  entityData: DataApiResponse | null,
  defaultEntityData: DataApiResponseItem[] | null,
  entityMeta: MetaDataApiResponse | null,
  entityMetaRefs: EntityMetaRefs,
  shoppedEntityItems: string[]
  showFilters: boolean
  shoppingFilter: boolean,
  isShop: boolean,
  settingsRowId: string | null,
  settingsTable: string
}
