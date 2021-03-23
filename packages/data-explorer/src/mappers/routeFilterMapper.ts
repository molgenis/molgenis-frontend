import { TypeEnum } from '@/types/TypeEnum'

export const toFilterValue = (routeFilterValue: any, filterDataType: TypeEnum): any[] | string | boolean | undefined => {
  switch (filterDataType) {
  case 'string':
  case 'text':
  case 'html':
  case 'file':
  case 'hyperlink':
  case 'email':
    return decodeURI(routeFilterValue.toString())
  case 'bool':
    return typeof routeFilterValue === 'boolean' ? [ routeFilterValue ] : [ routeFilterValue === 'true' ]
  case 'categorical':
  case 'categorical_mref':
  case 'enum':
  case 'mref':
  case 'xref':
  case 'onetomany':
  case 'decimal':
  case 'int':
  case 'long':
    return routeFilterValue.split(',')
  case 'date':
  case 'datetime': // if its a date, we need to parse that.
    return routeFilterValue.split(',').map((isoString: string) => new Date(isoString))
  }
}
