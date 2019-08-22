import { DataApiResponse, MetaDataApiResponse } from '@/types/ApiResponse'

export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: 'CardView' | 'TableView'
  tableName: string | null
  tableData: DataApiResponse | null
  tableMeta: MetaDataApiResponse | null
  shoppedEntityItems: string[]
  showFilters: boolean
  showShoppingCart: boolean
  isShop: boolean
  settingsRowId: string | null,
  settingsTable: string
}
