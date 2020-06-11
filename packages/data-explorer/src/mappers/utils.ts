import { Attribute } from '@/types/MetaData'
import { FilterOption, FilterOptionsPromise } from '@/types/ApplicationState'
import { fetchMetaDataByURL } from '@/repository/metaDataRepository'
import api from '@/lib/api'
import { toRsqlValue } from '@molgenis/rsql'

export const getCategoricals = (attributes: Attribute[]) => attributes.filter(attribute => attribute.type.includes('categorical'))

export const getFieldOptions = async (attribute: Attribute) => {
  const getOptions = async (href: string) => {
    let url = href
    if (window.location.hostname === 'localhost') {
      url = href.replace(':443', ':8080')
    }
    const metadata = await fetchMetaDataByURL(url)

    return async (nameAttribute:boolean = true, queryType: string = 'like', query?: string) => {
      const nameAttr = metadata.labelAttribute ? metadata.labelAttribute.name : ''
      const idAttr = metadata.idAttribute.name
      let params = {}
      if (query) {
        params = {
          q: `${nameAttribute ? nameAttr : idAttr}=${queryType}=${queryType === 'in' ? `(${query})` : toRsqlValue(query)}`
        }
      }

      url = url.replace('/metadata/', '/data/')
      const data = await api.get(url, { params: { ...params, flattenAttributes: true } })
      return Promise.resolve(
        data.data.items.map((i: any) => {
          // @ts-ignore
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
