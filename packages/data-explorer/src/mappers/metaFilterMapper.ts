import axios, { AxiosResponse } from 'axios'
// @ts-ignore
import { getCategoricals, getFieldOptions } from './utils'
import { fetchMetaDataByURL } from '@/repository/metaDataRepository'
import { StringMap } from '@/types/GeneralTypes'
import { MetaData, Attribute } from '../types/MetaData'
import { FilterDefinition } from '@/types/ApplicationState'

const fieldTypeToFilterType:StringMap = {
  'string': 'string-filter',
  'text': 'string-filter',
  'html': 'string-filter',
  'int': 'range-filter',
  'long': 'range-filter',
  'decimal': 'range-filter',
  'bool': 'checkbox-filter',
  'data': 'string-filter', // TODO: create time filter
  'datatime': 'string-filter', // TODO: create time filter
  'email': 'string-filter',
  'hyperlink': 'string-filter',
  'categorical': 'checkbox-filter',
  'categorical_mref': 'checkbox-filter',
  'mref': 'checkbox-filter', // TODO: create multiselect filter
  'xref': 'checkbox-filter', // TODO: create multiselect filter
  'one_to_many': 'checkbox-filter', // TODO: create multiselect filter
  'enum': 'checkbox-filter',
  'file': 'string-filter'
}

const mapMetaToFilters = async (metaData: MetaData) => {
  let shownFilters:string[] = []

  const filterDefinitions = metaData.attributes.filter((item: Attribute) => {
    // Filter out undefined datatypes
    return fieldTypeToFilterType[item.type]
  })
  const constructedFilters = await Promise.all(filterDefinitions.map(async (attribute: Attribute) => {
    const options = await getFieldOptions(attribute)
    // Base filter template
    let filterDefinition: FilterDefinition = {
      name: attribute.name,
      label: attribute.label,
      // @ts-ignore
      options: options,
      type: fieldTypeToFilterType[attribute.type],
      collapsable: true,
      collapsed: false
    }
    return filterDefinition
  }))
  console.log(constructedFilters)
  return {
    definition: constructedFilters,
    shown: shownFilters
  }
}

/*
const getOptions = async (href: string) => {
  let url = href;
  if(window.location.hostname === "localhost") // DEV
     url = href.replace(':443', ':8080')
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
*/
export {
  mapMetaToFilters
}
