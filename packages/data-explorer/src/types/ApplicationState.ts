import { DataApiResponse, MetaDataApiResponse } from '@/types/ApiResponse'

export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: 'CardView' | 'TableView'
  activeEntity: string | null
  entityData: DataApiResponse | null
  entityMeta: MetaDataApiResponse | null
  shoppedEntityItems: string[]
  showFilters: boolean
  showShoppingCart: boolean
  isShop: boolean
}
