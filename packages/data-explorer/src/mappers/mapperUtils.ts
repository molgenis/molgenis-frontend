// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaDataRefEntity, DataApiResponse, MetaDataAttribute, MetaDataCategoricalOption } from '@/types/ApiResponse'
import { FilterOption, FilterOptionsPromise } from '@/types/ApplicationState'
import { encodeRsqlValue, transformToRSQL, Operator, ComparisonOperator } from '@molgenis/rsql'

/**
 * Build a function that returns a Promise of an array containing objects of type FieldOption
 *
 * Simple types like STRING or TEXT do not have input properties, in this case 'null' is returned
 * The returned function returns a Promise of an array consisting of type FieldOption
 *
 * @example Example schema for generating field options
 * const schema = {
    *  fields: [
    *    {
    *      id: 'example',
    *      label: 'Example field',
    *      options: () => Promise.resolve([
    *          {
    *            value: '1',
    *            text: 'Example option 1'
    *          },
    *          {
    *            value: '2',
    *            text: 'Example option 2'
    *          }
    *        ]
    *    }
    *  ]
    * }
    *
    * @param attribute
    * @param options MapperOptions optional object containing options to configure mapper
    * @returns {Function|null} Function which returns a Promise representing an Array of FieldOptions
    */
const getFieldOptions = (attribute: MetaDataAttribute): (() => FilterOptionsPromise) | null => {
  const fetchOptionsFunction = (search?: string | Array<string>): FilterOptionsPromise => {
    return fetchFieldOptions((attribute.refEntity), search).then((response: FilterOption[]) => {
      return response
    })
  }

  switch (attribute.fieldType) {
    case 'CATEGORICAL':
    case 'CATEGORICAL_MREF':
      if (attribute.categoricalOptions) {
        return (): FilterOptionsPromise => Promise.resolve((attribute.categoricalOptions as MetaDataCategoricalOption[]).map(option => {
          return {
            value: option.id
          }
        }))
      } else {
        return fetchOptionsFunction
      }
    case 'ONE_TO_MANY':
    case 'XREF':
    case 'MREF':
      return fetchOptionsFunction
    case 'ENUM':
      if (attribute.enumOptions) {
        const enumOptions = attribute.enumOptions.map(option => {
          return {
            value: option,
            text: option
          }
        })
        return (): FilterOptionsPromise => Promise.resolve(enumOptions)
      } else {
        return null
      }
    case 'BOOL':
      const boolOptions: FilterOption[] = [
        { value: true, text: 'Yes' },
        { value: false, text: 'No' }
      ]
      return (): FilterOptionsPromise => Promise.resolve(boolOptions)
    default:
      return null
  }
}

/**
 * Uses the idAttribute, labelAttribute, and hrefCollection parameters of the refEntity
 * to query a data table. Returns a list of {id, value, label} items as a Promise
 *
 * @param refEntity The refEntity of the attribute.
 * @param search An optional search query used to filter the items of the response
 * @return {Promise} Promise object representing an Array of FieldOption
 */
const fetchFieldOptions = (refEntity: MetaDataRefEntity | undefined, search?: string | Array<string>): FilterOptionsPromise => {
  if (!refEntity) throw new Error('refEntity is undefined, this should not happen')

  const idAttribute = refEntity.idAttribute
  const labelAttribute = refEntity.labelAttribute ? refEntity.labelAttribute : refEntity.idAttribute
  const lookupAttributes = refEntity.lookupAttributes && refEntity.lookupAttributes.length ? refEntity.lookupAttributes : [labelAttribute]

  // map refEntity.hrefCollection v1 URLs to v2 to enable the use of RSQL queries
  const uri = refEntity.hrefCollection.replace('/v1/', '/v2/')
  const href = generateUri(uri, idAttribute, lookupAttributes, search)

  return api.get(href).then((response: DataApiResponse) => {
    return response.items.map((item: any): FilterOption => {
      return {
        value: item[idAttribute],
        text: item[labelAttribute]
      }
    })
  })
}

const generateUri = (
  uri: string, idAttribute: string, lookupAttributes: string[], search?: string | Array<string> | null) => {
  if (search) {
    if (Array.isArray(search) && search.length > 0) {
      const value = search
      const constraint = {
        operator: Operator.Or,
        operands: [
          {
            selector: idAttribute,
            comparison: ComparisonOperator.In,
            arguments: value
          }
        ]
      }
      const q = transformToRSQL(constraint)
      uri = `${uri}?q=${encodeRsqlValue(q)}`
    } else if (typeof search === 'string') {
      const value = search
      const constraint = {
        operator: Operator.Or,
        operands: lookupAttributes.map((lookupAttribute) =>
          ({
            selector: lookupAttribute,
            comparison: ComparisonOperator.Search,
            arguments: value
          }))
      }
      const q = transformToRSQL(constraint)
      uri = `${uri}?q=${encodeRsqlValue(q)}`
    }
  }
  return uri
}

const getCategoricals = (attributes: MetaDataAttribute[]): MetaDataAttribute[] => attributes.filter(item => item.fieldType.includes('CATEGORICAL'))

export {
  getFieldOptions, generateUri, getCategoricals
}
