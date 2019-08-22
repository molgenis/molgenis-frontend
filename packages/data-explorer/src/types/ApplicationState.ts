import { DataApiResponse, MetaDataApiResponse } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'

export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: string
  activeEntity: string | null
  entityData: DataApiResponse | null
  entityMeta: MetaDataApiResponse | null,
  entityMetaRefLabels: StringMap | null,
  shoppedEntityItems: string[]
  showFilters: boolean
  shoppingFilter: boolean,
  isShop: boolean,
  settingsRowId: string | null,
  settingsTable: string
}
