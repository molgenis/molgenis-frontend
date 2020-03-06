import { Operator, ComparisonOperator, Value, Constraint, transformToRSQL } from '@molgenis/rsql'
import { Attribute } from '@/types/MetaData'
import { getCategoricals } from './utils'
import { FilterGroup, FilterOption, FilterOptionsPromise, FilterSelections } from '@/types/ApplicationState'

/**
 * Create an RSQL 'in' query for filters
 *
 * @example in query for a country filter
 * country=in=(NL,BE,DE)
 */
export const createInQuery = (attributeName: string, selection: Value[]): Constraint => ({ selector: attributeName, comparison: ComparisonOperator.In, arguments: selection })
export const createEqualsQuery = (attributeName: string, selection: Value): Constraint => ({ selector: attributeName, comparison: ComparisonOperator.Equals, arguments: selection })

/**
 *
 * Transform to RSQL
 *
 * @example queries
 * country=in=(NL,BE)
 */

export const createRSQLQuery = (filters: FilterGroup): string | null => {
  const operands: Constraint[] = []

  Object.keys(filters.selections).forEach((name: string) => {
    const selection = filters.selections[name]
    if (selection === undefined) return
    const definition = filters.definition.filter((filter) => filter.name === name)[0]

    switch (definition.type) {
      case 'checkbox-filter':
        if (definition.dataType === 'bool') {
          operands.push(createEqualsQuery(name, selection))
        } else {
          operands.push(createInQuery(name, selection as Value[]))
        }
        break
      case 'string-filter':
        operands.push({ selector: name, comparison: ComparisonOperator.Like, arguments: selection })
        break
      case 'range-filter':
        operands.push({ selector: name, comparison: ComparisonOperator.RangeFromTo, arguments: selection })
        break
      default:
        return null
    }
  })

  if (operands.length === 0) return null

  const result = transformToRSQL({
    operator: Operator.And,
    operands: operands
  })
  return result
}
