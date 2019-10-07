import { Operator, ComparisonOperator, Value, Constraint, transformToRSQL } from '@molgenis/rsql'
import { MetaDataAttribute, MetaDataApiResponse } from '@/types/ApiResponse'
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
 * q=country.id=in=(NL,BE)
 * q=materials.id=in=(RNA,DNA)
 * q=diagnosis_available.code=in=(C18,L40)
 * q=standards.id=in=(cen-ts-16835-1-2015,cen-ts-16827-1-2015)
 */
export const createRSQLQuery = (selections: FilterSelections, metaData: MetaDataApiResponse): string | null => {
  const categoricals: MetaDataAttribute[] = getCategoricals(metaData)

  const operands: Constraint[] = categoricals
    .map(cat => cat.name)
    .filter(name => !!selections[name])
    .map(name => createInQuery(name, selections[name] as string[]))

  if (operands === []) return null

  return transformToRSQL({
    operator: Operator.And,
    operands: operands
  })
}
