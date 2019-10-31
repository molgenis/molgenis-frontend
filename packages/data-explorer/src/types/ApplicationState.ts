import { DataApiResponse, MetaDataApiResponse, DataApiResponseItem } from '@/types/ApiResponse'
import { StringMap } from '@/types/GeneralTypes'

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

export type FilterOptionsPromise = Promise<FilterOption[]>

export type FilterOption = {
  value: string | number | boolean,
  text?: string
}

export type FilterDefinition = {
  name: string,
  label: string,
  type: string,
  description?: string,
  placeholder?: string,
  bulkOperation?: boolean,
  options?: FilterOption[]
  collapsable?: boolean,
  collapsed?: boolean,
  maxVisibleOptions?: number,
  max?: number,
  min?: number,
  step?: number,
  useSlider?: boolean
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: 'CardView' | 'TableView'
  tableName: string | null
  tableData: DataApiResponse | null
  tableMeta: MetaDataApiResponse | null
  defaultEntityData: DataApiResponseItem[] | null,
  entityMetaRefs: EntityMetaRefs,
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
