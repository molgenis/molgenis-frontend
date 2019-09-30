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

export type TableSetting = {
  settingsTable: string,
  customCardCode: string | null,
  customCardAttrs: string
  settingsRowId: string | null,
  collapseLimit: number,
  isShop: boolean,
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
  tableMeta: MetaDataApiResponse | null
  defaultEntityData: DataApiResponseItem[] | null,
  entityMetaRefs: EntityMetaRefs,
  shoppedEntityItems: string[]
  showShoppingCart: boolean
  tableSettings: TableSetting
  filters: {
    hideSidebar: boolean
    definition: FilterDefinition[]
    shown: string[]
  }
}
