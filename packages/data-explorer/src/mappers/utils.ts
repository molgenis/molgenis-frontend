import { Attribute } from '@/types/MetaData'
import { FilterOption, FilterOptionsPromise } from '@/types/ApplicationState'
import { fetchMetaDataByURL } from '@/repository/metaDataRepository'
import client from '@/lib/client'
import { toRsqlValue } from '@molgenis/rsql'
import { QueryOptions } from '@/types/QueryOptions'

export const getCategoricals = (attributes: Attribute[]) => attributes.filter(attribute => attribute.type.includes('categorical'))

export const getFieldOptions = async (attribute: Attribute) => {
  const getOptions = async (href: string) => {
    let url = href
    if (window.location.hostname === 'localhost') {
      url = href.replace(':443', ':8080')
    }
    const metadata = await fetchMetaDataByURL(url)

    return async (queryOptions? : QueryOptions) => {
      const nameAttr = metadata.labelAttribute ? metadata.labelAttribute.name : ''
      const idAttr = metadata.idAttribute.name
      let params: any = {}

      if (queryOptions && queryOptions.query) {
        const queryAttribute = queryOptions.nameAttribute ? nameAttr : idAttr
        const rsqlQueryType = queryOptions.queryType ? queryOptions.queryType : 'like'
        const queryParameters = queryOptions.queryType === 'in' ? `(${queryOptions.query})` : toRsqlValue(queryOptions.query)

        params = {
          q: `${queryAttribute}=${rsqlQueryType}=${queryParameters}`
        }
      }

      if (queryOptions && queryOptions.count) {
        params.size = queryOptions.count
      }

      url = url.replace('/metadata/', '/data/')
      const data = await client.get(url, { params: { ...params, flattenAttributes: true } })
      return Promise.resolve(
        data.data.items.map((i: any) => {
          return { value: i.data[idAttr], text: i.data[nameAttr] }
        })
      )
    }
  }

  switch (attribute.type) {
    case 'categorical':
    case 'categorical_mref':
    case 'onetomany':
    case 'xref':
    case 'mref':
      return attribute.refEntityType ? getOptions(attribute.refEntityType) : null
    case 'enum':
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
    case 'bool':
      const boolOptions: FilterOption[] = [
        { value: true, text: 'Yes' },
        { value: false, text: 'No' }
      ]
      return (): FilterOptionsPromise => Promise.resolve(boolOptions)
    default:
      return null
  }
}
