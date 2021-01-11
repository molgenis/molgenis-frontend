import ApplicationState, { FilterDefinition } from '@/types/ApplicationState'
import { createRSQLQuery } from '@/mappers/rsqlMapper'
import { ClipBoardItem } from '@/types/ClipBoardItem'
// @ts-ignore
import * as LZString from 'lz-string'
import { toFilterValue } from '@/mappers/bookmarkMapper'
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
  },
  bookmark: (state: ApplicationState, getters: any): object => {
    const newBookmark = {
      shown: encodeURI(state.filters.shown.join(',')),
      searchText: state.searchText
    }

    const selections = state.filters.selections

    if (Object.keys(selections).length > 0) {
      for (let property in selections) {
        const value = selections[property]
        // can't do if(!value) because that would also trigger if value === 0
        if (value === '' || value === null || value === undefined || value.length === 0) {
          break
        }
        const dataType = getters.getDataTypeForFilter(property)

        if (dataType.includes('date')) {
          newBookmark[property] = encodeURI(value.map((date: Date) => date.toISOString()).join(','))
        } else {
          newBookmark[property] = Array.isArray(value) ? encodeURI(value.join(',')) : encodeURI(value)
        }
      }
    }

    return newBookmark
  },
  compressedBookmark: (state: ApplicationState, getters: any): string => {
    const bookmark = getters.bookmark
    return LZString.compressToBase64(JSON.stringify(bookmark))
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
  parseBookmark: (state: ApplicationState, getters: any) => (encodedBookmark: string) => {
    const decompressed = LZString.decompressFromBase64(decodeURIComponent(encodedBookmark))
    const bookmark = JSON.parse(decompressed)

    let bookmarkedFilters = {
      selections: {},
      shown: [],
      searchText: ''
    }

    if (Object.keys(bookmark).length >= 1) {
      for (let property in bookmark) {
        const bookmarkValue = bookmark[property]
        if (property === 'shown') {
          bookmarkedFilters.shown = bookmarkValue.split(',')
        } else if (property === 'searchText') {
          bookmarkedFilters.searchText = bookmarkValue
        } else {
          const dataType = getters.getDataTypeForFilter(state)(property)
          bookmarkedFilters.selections[property] = toFilterValue(bookmarkValue, dataType)
        }
      }
    }
    return bookmarkedFilters
  }

}
