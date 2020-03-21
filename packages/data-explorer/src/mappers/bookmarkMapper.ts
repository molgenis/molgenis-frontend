import { FilterDefinition } from '../types/ApplicationState'
import { StringMap } from '@/types/GeneralTypes'

function convertBookmarkValue (value: any, type: string): any[] | string | undefined {
  switch (type) {
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
      return decodeURI(value.split(','))
    default:
      return undefined

    //   'decimal': 'range-filter',
    //   'int': 'range-filter',
    //   'long': 'range-filter',

    //   'date': 'date-time-filter',
    //   'datetime': 'date-time-filter',
  }
}

export const decodeBookmark = (filterDefinitions: FilterDefinition[], query: any) => {
  let output: any = {}

  if (Object.keys(query).length >= 1) {
    output.selections = {}

    for (let property in query) {
      const propValue = query[property]
      if (property === 'filters') {
        output.shown = propValue.split(',')
      } else {
        const definition = filterDefinitions.filter(fd => fd.name === property || fd.label === property)
        output.selections[property] = convertBookmarkValue(propValue, definition[0].dataType)
      }
    }
  }
  return output
}

export const bookmarkShown = (shownFilters: string[]) => {
  if (!shownFilters || shownFilters.length === 0) return {}
  else return { filters: encodeURI(shownFilters.join(',')) }
}

export const bookmarkSelection = (selection: StringMap) => {
  if (!selection || !Object.keys(selection)) return {}
  else {
    let output: any = {}
    let filters = []
    for (let property in selection) {
      filters.push(property)
      output[property] = encodeURI(selection[property])
    }
    return { ...bookmarkShown(filters), ...output }
  }
}
