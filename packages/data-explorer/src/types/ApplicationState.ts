import { DataApiResponse, DataApiResponseItem } from '@/types/ApiResponse'
import { MetaData } from './MetaData'

export type Toast = {
  type: 'danger' | 'success'
  message: string,
  timeout?: number | null
}

export type FilterOptionsPromise = Promise<FilterOption[]>

export type FilterOption = {
  value: string | number | boolean
  text?: string
}

export type TableSetting = {
  customCardCode: string | null
  customCardAttrs: string
  settingsRowId: string | null
  collapseLimit: number
  isShop: boolean
  defaultFilters: string[]
}

export type FilterSelections = {
  [s: string]: any
}

export type FilterDefinition = {
  name: string
  label: string
  type: string // filter type
  dataType: string // molgenis datatype
  description?: string
  placeholder?: string
  bulkOperation?: boolean
  options?: [{ value: string, text: string }]
  collapsable?: boolean
  collapsed?: boolean
  compound?: string
  min?: number
  max?: number
  useSlider?: boolean
  step?: number
  time?: boolean
  appendToBody?: boolean
}

export type FilterGroup = {
  hideSidebar: boolean
  definition: FilterDefinition[]
  shown: string[]
  selections: FilterSelections
}
export default interface ApplicationState {
  toasts: Toast[]
  settingsTable: string
  dataDisplayLayout: 'CardView' | 'TableView'
  dataDisplayLimit: Number
  tableName: string | null
  tableData: DataApiResponse | null
  tableMeta: MetaData | null
  defaultEntityData: DataApiResponseItem[] | null
  selectedItemIds: string[]
  showSelected: boolean
  tableSettings: TableSetting
  sortColumnId: string | null,
  isSortOrderReversed: boolean,
  filters: FilterGroup
  searchText: string
  bookmark: string
  componentRoute: boolean
}
