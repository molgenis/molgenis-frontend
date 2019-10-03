import { DataApiResponse, MetaDataApiResponse, DataApiResponseItem } from '@/types/ApiResponse'
import { ResourceCollection } from '@/types/ResourceCollection.ts'

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

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: 'CardView' | 'TableView'
  tableName: string | null
  tableData: DataApiResponse | null
  tableMeta: MetaDataApiResponse | null
  defaultEntityData: ResourceCollection[] | null,
  entityMetaRefs: EntityMetaRefs,
  shoppedEntityItems: string[]
  hideFilters: boolean,
  showShoppingCart: boolean
  tableSettings: TableSetting
}
