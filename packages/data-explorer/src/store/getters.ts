import ApplicationState from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'
import { ClipBoardItem } from '@/types/ClipBoardItem'

export default {
  filterRsql: (state: ApplicationState): string | null =>
    state.tableMeta && createRSQLQuery(state.filters, state.searchText),
  userRoles: (state: ApplicationState, getters: any, rootState:any): string[] => {
    return rootState.account.context ? rootState.account.context.roles : []
  },
  isUserAuthenticated: (state: ApplicationState, getters: any, rootState:any): boolean => {
    return rootState.account.context ? rootState.account.context.authenticated : false
  },
  hasEditRights: (state: ApplicationState, getters: any): boolean => {
    return getters.isUserAuthenticated && getters.userRoles.some((role: string) => {
      return ['ROLE_EDITOR', 'ROLE_MANAGER', 'ROLE_SU'].includes(role)
    })
  },
  hasEditSettingsRights: (state: ApplicationState, getters: any): boolean => {
    return getters.isUserAuthenticated && getters.userRoles.includes('ROLE_SU')
  },
  tableIdAttributeName: (state: ApplicationState): string | undefined => {
    return state.tableMeta && state.tableMeta.idAttribute ? state.tableMeta.idAttribute.name : undefined
  },
  tableLabelAttributeName: (state: ApplicationState): string | undefined => {
    return state.tableMeta && state.tableMeta.labelAttribute && state.tableMeta.labelAttribute.name ? state.tableMeta.labelAttribute.name : undefined
  },
  clipBoardItems: (state: ApplicationState, getters: any): ClipBoardItem[] => {
    if (!state.tableData || !state.tableData.items) {
      return []
    }

    const tableIdAttributeName = getters.tableIdAttributeName
    const tableLabelAttributeName = getters.tableLabelAttributeName

    return state.tableData.items
      .filter(item => state.selectedItemIds.includes(item[tableIdAttributeName]))
      .map(selectedItem => {
        const clipBoardItem:any = {
          id: selectedItem[tableIdAttributeName]
        }
        if (tableLabelAttributeName) {
          clipBoardItem.name = selectedItem[tableLabelAttributeName]
        }
        return clipBoardItem
      })
  }
}
