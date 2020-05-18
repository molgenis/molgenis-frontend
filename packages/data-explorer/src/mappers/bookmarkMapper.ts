import router from '@/router'
import store from '@/store/store'

// can be name or label
function getDataTypeForFilter (filterIdentifier: string): string {
  const filterDefinitions = store.state.filters.definition
  const definitionForFilter = filterDefinitions.filter(fd => {
    return fd.name === filterIdentifier || fd.label === filterIdentifier
  })[0]

  return definitionForFilter ? definitionForFilter.dataType : ''
}

// function createDateTime (event_date: any, event_timezone_offset: any) {
//   let d = new Date(event_date)
//   let timeCorrection = d.getTimezoneOffset() - event_timezone_offset
//   d.setMinutes(d.getMinutes() + timeCorrection)

//   return d
// }

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
      return value.split(',')
    default:
      return ''
  }
}

function setBookmark (route: any, bookmark: any) {
  router.push(
    {
      name: route.name,
      path: route.path,
      query: bookmark
    },
    // to prevent error, which occurs on routing to same page (Vue issue)
    () => { }
  )
}

function decodeBookmark (query: any) {
  let output: any = {}
  if (Object.keys(query).length >= 1) {
    output.selections = {}

    for (let property in query) {
      const propValue = query[property]
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
  const bookmarkedFilters = decodeBookmark(query)
  if (bookmarkedFilters.shown) {
    store.commit('setFiltersShown', bookmarkedFilters.shown)
  } else if (defaultShownFilters) {
    store.commit('setFiltersShown', defaultShownFilters)
  }

  if (bookmarkedFilters.selections) {
    store.commit('setFilterSelection', bookmarkedFilters.selections)
  }
}
