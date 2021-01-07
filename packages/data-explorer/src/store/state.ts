import ApplicationState from '@/types/ApplicationState'
import { Pagination } from '@molgenis-ui/components-library/src/types/Pagination'

export const defaultPagination:Pagination = { count: 0, loading: false, page: 1, size: 20 }

const state: ApplicationState = {
  toasts: [],
  settingsTable: 'sys_ts_DataExplorerEntitySettings',
  tableName: null,
  tableData: null,
  tableMeta: null,
  tablePagination: defaultPagination,
  dataDisplayLayout: 'CardView',
  defaultEntityData: null,
  showSelected: false,
  selectedItemIds: [],
  tableSettings: {
    settingsRowId: null,
    collapseLimit: 5,
    customCardCode: null,
    customCardAttrs: '',
    isShop: false,
    defaultFilters: []
  },
  filters: {
    hideSidebar: false,
    definition: [],
    shown: [],
    selections: {}
  },
  searchText: '',
  bookmark: ''
}

export default state
