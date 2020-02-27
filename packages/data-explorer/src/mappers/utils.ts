import { Attribute } from '@/types/MetaData'
import { FilterOption, FilterOptionsPromise } from '@/types/ApplicationState'
import { fetchMetaDataByURL } from '@/repository/metaDataRepository'
import axios from 'axios'

export const getCategoricals = (attributes: Attribute[]) => attributes.filter(attribute => attribute.type.includes('categorical'))

export const getFieldOptions = async (attribute: Attribute) => {
  const getOptions = async (href: string) => {
    let url = href.replace(':443', ':8080') // TODO: issue with double proxy removing port numbers, this is only needed during development, we will need to find a better solution than this
    const metadata = await fetchMetaDataByURL(url)

    return async () => {
      const nameAttr = metadata.labelAttribute ? metadata.labelAttribute.name : ''
      const idAttr = metadata.idAttribute.name

      url = url.replace('/metadata/', '/data/') // TODO: this needs a backend direct link solution
      const data = await axios.get(url)
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
    case 'one_to_many':
    case 'xref':
    case 'mref':
      return attribute.refEntityType ? getOptions(attribute.refEntityType) : null
    case 'enum':
      // TODO: check if enum still gives these results in api v3
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
