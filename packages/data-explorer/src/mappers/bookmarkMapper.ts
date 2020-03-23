import { FilterDefinition } from '../types/ApplicationState'
import { StringMap } from '@/types/GeneralTypes'
import { MetaData } from '@/types/MetaData'

function convertBookmarkValue (value: any, type: string): any[] | string | undefined {
  switch (type.toString()) {
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
      return value.split(',')
    default:
      return undefined

    //   'decimal': 'range-filter',
    //   'int': 'range-filter',
    //   'long': 'range-filter',

    //   'date': 'date-time-filter',
    //   'datetime': 'date-time-filter',
  }
}

export const decodeBookmark = (metaData: MetaData | null, query: any) => {
  let output: any = {}
  if (Object.keys(query).length >= 1 && metaData !== null) {
    output.selections = {}

    for (let property in query) {
      const propValue = query[property]
      if (property === 'filters') {
        output.shown = propValue.split(',')
      } else {
        const definition = metaData.attributes.filter(fd => {
          return fd.name === property || fd.label === property
        })
        output.selections[property] = convertBookmarkValue(propValue, definition[0].type)
      }
    }
  }
  return output
}

export const createBookmark = (shown: string[], selections: StringMap = {}) => {
  if (Object.keys(selections).length === 0) {
    return { filters: encodeURI(shown.join(',')) }
  } else {
    let output: any = {}
    for (let property in selections) {
      output[property] = encodeURI(selections[property])
    }
    return { filters: encodeURI(shown.join(',')), ...output }
  }
}
