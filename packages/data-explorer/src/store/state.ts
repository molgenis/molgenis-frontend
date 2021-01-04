import ApplicationState from '@/types/ApplicationState'

const state: ApplicationState = {
  toasts: [],
  settingsTable: 'sys_ts_DataExplorerEntitySettings',
  tableName: null,
  tableData: null,
  tableMeta: null,
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
