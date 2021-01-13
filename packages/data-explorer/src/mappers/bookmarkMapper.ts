import { TypeEnum } from '@/types/TypeEnum'

export const toFilterValue = (bookmarkValue: any, filterDataType: TypeEnum): any[] | string | boolean | undefined => {
  switch (filterDataType) {
    case 'string':
    case 'text':
    case 'html':
    case 'file':
    case 'hyperlink':
    case 'email':
      return decodeURI(bookmarkValue.toString())
    case 'bool':
      return typeof bookmarkValue === 'boolean' ? [bookmarkValue] : [bookmarkValue === 'true']
    case 'categorical':
    case 'categorical_mref':
    case 'enum':
    case 'mref':
    case 'xref':
    case 'onetomany':
    case 'decimal':
    case 'int':
    case 'long':
      return bookmarkValue.split(',')
    case 'date':
    case 'datetime': // if its a date, we need to parse that.
      return bookmarkValue.split(',').map((isoString: string) => new Date(isoString))
  }
}
