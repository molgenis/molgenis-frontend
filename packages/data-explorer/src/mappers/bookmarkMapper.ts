import router from '@/router'
import store from '@/store/store'
// @ts-ignore
import * as LZString from 'lz-string'

// can be name or label
function getDataTypeForFilter (filterIdentifier: string): string {
  const filterDefinitions = store.state.filters.definition
  const definitionForFilter = filterDefinitions.filter((fd: any) => {
    return fd.name === filterIdentifier || fd.label === filterIdentifier
  })[0]

  return definitionForFilter ? definitionForFilter.dataType : ''
}

function encodeBookmark (object: any) {
  if (object === null) return null // to clear the routing completely.

  const jsonString = JSON.stringify(object)
  const compressed = LZString.compressToBase64(jsonString)
  return { bookmark: compressed }
}

function decodeBookmark (encodedBookmark: string) {
  const decompressed = LZString.decompressFromBase64(encodedBookmark)
  return JSON.parse(decompressed)
}

function convertBookmarkValue (value: any, dataType: string): any[] | string | undefined {
  switch (dataType) {
    case 'string':
    case 'text':
    case 'html':
    case 'file':
    case 'hyperlink':
    case 'email':
      return decodeURI(value.toString())
    case 'bool':
    case 'categorical':
    case 'categorical_mref':
    case 'enum':
    case 'mref':
    case 'xref':
    case 'onetomany':
    case 'decimal':
    case 'int':
    case 'long':
      return value.split(',')
    case 'date':
    case 'datetime': // if its a date, we need to parse that.
      return value.split(',').map((isoString: string) => new Date(isoString))
    default:
      return ''
  }
}

function setBookmark (route: any, bookmark: any) {
  router.push(
    {
      name: route.name,
      path: route.path,
      query: encodeBookmark(bookmark)
    },
    // to prevent error, which occurs on routing to same page (Vue issue)
    () => { }
  )
}

function parseBookmark (encodedBookmark: string) {
  if (encodedBookmark === '') return

  const bookmark = decodeBookmark(encodedBookmark)
  let output: any = {}

  if (Object.keys(bookmark).length >= 1) {
    output.selections = {}

    for (let property in bookmark) {
      const propValue = bookmark[property]
      if (property === 'filters') {
        output.shown = propValue.split(',')
      } else {
        const dataType = getDataTypeForFilter(property)
        output.selections[property] = convertBookmarkValue(propValue, dataType)
      }
    }
  }
  return output
}

export const createBookmark = (router: any, shown: string[], selections: any = {}) => {
  if (shown.length === 0) {
    setBookmark(router, null)
    return
  }
  const bookmark: any = {}

  bookmark.filters = encodeURI(shown.join(','))

  if (Object.keys(selections).length > 0) {
    for (let property in selections) {
      const value = selections[property]

      if (value === '' || value === null || value === undefined || value.length === 0) { break } // can't do if(!value) because that would also trigger if value === 0

      const dataType = getDataTypeForFilter(property)

      if (dataType.includes('date')) {
        bookmark[property] = encodeURI(value.map((date: Date) => date.toISOString()).join(','))
      } else {
        if (Array.isArray(value)) {
          bookmark[property] = encodeURI(value.join(','))
        } else {
          bookmark[property] = encodeURI(value)
        }
      }
    }
  }
  setBookmark(router, bookmark)
}

// Bookmark is the source of truth. If no bookmark, then default.
export const applyFilters = (query?: any, defaultShownFilters?: string[]) => {
  const bookmarkedFilters = parseBookmark(query)
  if (bookmarkedFilters.shown) {
    store.commit('setFiltersShown', bookmarkedFilters.shown)
  } else if (defaultShownFilters) {
    store.commit('setFiltersShown', defaultShownFilters)
  }

  if (bookmarkedFilters.selections) {
    store.commit('setFilterSelection', bookmarkedFilters.selections)
  }
}
