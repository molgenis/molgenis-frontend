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
  dataDisplayLayout: 'CardView' | 'TableView'
  tableName: string | null
  tableData: DataApiResponse | null
  tableMeta: MetaDataApiResponse | null
  defaultEntityData: DataApiResponseItem[] | null,
  entityMetaRefs: EntityMetaRefs,
  shoppedEntityItems: string[]
  hideFilters: boolean,
  showShoppingCart: boolean
  tableSettings: {
    settingsTable: string,
    settingsRowId: string | null,
    collapseLimit: number,
    isShop: boolean
  }
}
