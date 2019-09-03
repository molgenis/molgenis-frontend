import ApplicationState from '@/types/ApplicationState'

const state: ApplicationState = {
  toast: null,
  tableName: 'it_emx_datatypes_TypeTest',
  tableData: null,
  tableMeta: null,
  dataDisplayLayout: 'CardView',
  defaultEntityData: null,
  entityMetaRefs: {},
  hideFilters: false,
  showShoppingCart: false,
  shoppedEntityItems: [],
  tableSettings: {
    settingsTable: 'de_dataexplorer_table_settings',
    settingsRowId: null,
    collapseLimit: 5,
    customCardCode: null,
    isShop: false
  }
}

export default state
