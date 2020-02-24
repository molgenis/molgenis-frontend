import { Operator, ComparisonOperator, Value, Constraint, transformToRSQL } from '@molgenis/rsql'
import { Attribute } from '@/types/MetaData'
import { getCategoricals } from './utils'
import { FilterSelections } from '@/types/ApplicationState'

/**
 * Create an RSQL 'in' query for filters
 *
 * @example in query for a country filter
 * country=in=(NL,BE,DE)
 */
export const createInQuery = (attributeName: string, selection: Value[]): Constraint => ({ selector: attributeName, comparison: ComparisonOperator.In, arguments: selection })

/**
 *
 * Transform to RSQL
 *
 * @example queries
 * country=in=(NL,BE)
 */
export const createRSQLQuery = (selections: FilterSelections, metaData: Attribute[]): string | null => {
  const categoricals: Attribute[] = getCategoricals(metaData)

  const operands: Constraint[] = categoricals
    .map(cat => cat.name)
    .filter(name => !!selections[name])
    .map(name => createInQuery(name, selections[name] as string[]))

  if (operands.length === 0) return null

  return transformToRSQL({
    operator: Operator.And,
    operands: operands
  })
}
