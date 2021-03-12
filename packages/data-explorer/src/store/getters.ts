import ApplicationState, { FilterDefinition } from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'
import { ClipBoardItem } from '@/types/ClipBoardItem'
// @ts-ignore
import * as LZString from 'lz-string'
import { toFilterValue } from '@/mappers/routeFilterMapper'
import { TypeEnum } from '@/types/TypeEnum'

export default {
  filterRsql: (state: ApplicationState): string | null =>
    state.tableMeta && createRSQLQuery(state.filters, state.searchText),
  userRoles: (state: ApplicationState, getters: any, rootState:any): string[] => {
    return rootState.account.context ? rootState.account.context.roles : []
  },
  isUserAuthenticated: (state: ApplicationState, getters: any, rootState:any): boolean => {
    return rootState.account.context ? rootState.account.context.authenticated : false
  },
  hasEditRights: (state: ApplicationState): boolean => {
    return state.tablePermissions.includes('UPDATE_DATA')
  },
  hasAddRights: (state: ApplicationState): boolean => {
    return state.tablePermissions.includes('ADD_DATA')
  },
  hasDeleteRights: (state: ApplicationState): boolean => {
    return state.tablePermissions.includes('DELETE_DATA')
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
  },
  routeFilter: (state: ApplicationState, getters: any): object => {
    const newRouteFilter = {
      shown: encodeURI(state.filters.shown.join(',')),
      searchText: state.searchText
    }

    const selections = state.filters.selections

    if (Object.keys(selections).length > 0) {
      for (const property in selections) {
        const value = selections[property]
        // can't do if(!value) because that would also trigger if value === 0
        if (value === '' || value === null || value === undefined || value.length === 0) {
          break
        }
        const dataType = getters.getDataTypeForFilter(property)

        if (dataType.includes('date')) {
          newRouteFilter[property] = encodeURI(value.map((date: Date) => date.toISOString()).join(','))
        } else {
          newRouteFilter[property] = Array.isArray(value) ? encodeURI(value.join(',')) : encodeURI(value)
        }
      }
    }

    return newRouteFilter
  },
  compressedRouteFilter: (state: ApplicationState, getters: any): string => {
    const routeFilter = getters.routeFilter
    return LZString.compressToBase64(JSON.stringify(routeFilter))
  },
  getDataTypeForFilter: (state: ApplicationState) => (filterIdentifier: string) => {
    const filterDefinitions = state.filters.definition
    const definitionForFilter = filterDefinitions.find((fd: FilterDefinition) => {
      return fd.name === filterIdentifier || fd.label === filterIdentifier
    })

    if (definitionForFilter === undefined) {
      throw new Error(`Missing filter definition for identifier: ${filterIdentifier}`)
    }

    return definitionForFilter.dataType
  },
  parseRouteFilter: (state: ApplicationState, getters: any) => (encodedFilter: string) => {
    const decompressed = LZString.decompressFromBase64(decodeURIComponent(encodedFilter))
    const filterTransferObject = JSON.parse(decompressed)

    const filter = {
      selections: {},
      shown: [],
      searchText: ''
    }

    if (Object.keys(filterTransferObject).length >= 1) {
      for (const property in filterTransferObject) {
        const filterValue = filterTransferObject[property]
        if (property === 'shown') {
          filter.shown = filterValue.split(',')
        } else if (property === 'searchText') {
          filter.searchText = filterValue
        } else {
          const dataType = getters.getDataTypeForFilter(state)(property)
          filter.selections[property] = toFilterValue(filterValue, dataType)
        }
      }
    }
    return filter
  }

}
