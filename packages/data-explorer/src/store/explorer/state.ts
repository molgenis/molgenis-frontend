import ApplicationState from '@/types/ApplicationState'
import { Pagination } from '@molgenis-ui/components-library'

export const defaultPagination:Pagination = { count: 0, loading: false, page: 1, size: 20 }

const state: ApplicationState = {
  formSettings: {
    addBooleanNullOption: true,
    addCategoricalNullOption: true,
    addEnumNullOption: true
  },
  toasts: [],
  settingsTable: 'sys_ts_DataExplorerEntitySettings',
  tableName: null,
  tableData: null,
  tableMeta: null,
  tablePermissions: [],
  tablePagination: { ...defaultPagination },
  dataDisplayLayout: 'CardView',
  defaultEntityData: null,
  showSelected: false,
  selectedItemIds: [],
  tableSettings: {
    settingsRowId: null,
    collapseLimit: 5,
    customCardCode: null,
    customDetailCode: null,
    customCardAttrs: '',
    isShop: false,
    defaultFilters: []
  },
  sort: {
    sortColumnName: null,
    isSortOrderReversed: false
  },
  filters: {
    hideSidebar: false,
    definition: [],
    shown: [],
    selections: {}
  },
  searchText: '',
  hiddenColumns: [],
  loading: true
}

export default state
