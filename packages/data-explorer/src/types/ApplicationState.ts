import { DataApiResponse, MetaDataApiResponse, DataApiResponseItem } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'
import { MetaData } from './MetaData'

export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export type TableSetting = {
  settingsTable: string,
  customCardCode: string | null,
  customCardAttrs: string
  settingsRowId: string | null,
  collapseLimit: number,
  isShop: boolean,
  defaultFilters: string []
}

export type FilterSelections = {
  [s: string]: string | string[]
}

export type FilterDefinition = {
  name: string,
  label: string,
  type: string,
  description?: string,
  placeholder?: string,
  bulkOperation?: boolean,
  options?: [{ value: string, text: string }],
  collapsable?: boolean,
  collapsed?: boolean
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: 'CardView' | 'TableView'
  tableName: string | null
  tableData: DataApiResponse | null
  tableMeta: MetaData | null
  defaultEntityData: DataApiResponseItem[] | null,
  shoppedEntityItems: string[]
  showShoppingCart: boolean
  tableSettings: TableSetting
  isSettingsLoaded: boolean
  filters: {
    hideSidebar: boolean
    definition: FilterDefinition[]
    shown: string[]
    selections: FilterSelections
  }
}
