import { Operator, ComparisonOperator, Value, Constraint, transformToRSQL } from '@molgenis/rsql'
import { FilterGroup } from '@/types/ApplicationState'

/**
 * Create an RSQL 'in' query for filters
 *
 * @example in query for a country filter
 * country=in=(NL,BE,DE)
 */
export const createLikeQuery = (attributeName: string, selection: Value): Constraint => ({ selector: attributeName, comparison: ComparisonOperator.Like, arguments: selection })
export const createInQuery = (attributeName: string, selection: Value[]): Constraint => ({ selector: attributeName, comparison: ComparisonOperator.In, arguments: selection })
export const createEqualsQuery = (attributeName: string, selection: Value): Constraint => ({ selector: attributeName, comparison: ComparisonOperator.Equals, arguments: selection })
export const createRangeQuery = (attributeName: string, selection: Value[]): Constraint => ({
  operator: Operator.And,
  operands: [
    { selector: attributeName, comparison: ComparisonOperator.GreaterThanOrEqualTo, arguments: selection[0] },
    { selector: attributeName, comparison: ComparisonOperator.LesserThanOrEqualTo, arguments: selection[1] }
  ]
})
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
        operands.push(createLikeQuery(name, selection))
        break
      case 'range-filter':
        operands.push(createRangeQuery(name, selection))
        break
      case 'multi-filter':
        operands.push(createInQuery(name, selection))
        break
      case 'date-time-filter':
        operands.push(createRangeQuery(name, [selection.startDate.toISOString(), selection.endDate.toISOString()]))
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
