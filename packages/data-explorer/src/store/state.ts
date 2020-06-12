import ApplicationState from '@/types/ApplicationState'

const state: ApplicationState = {
  toast: null,
  settingsTable: 'de_dataexplorer_table_settings',
  tableName: null,
  tableData: null,
  tableMeta: null,
  dataDisplayLayout: 'CardView',
  dataDisplayLimit: 100,
  defaultEntityData: null,
  showShoppingCart: false,
  shoppedEntityItems: [],
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
  bookmark: '',
  componentRoute: false
}

export default state
