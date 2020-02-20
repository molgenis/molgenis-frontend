// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { getCategoricals } from './utils'
import { MetaData } from '@/types/MetaData'

const mapMetaToFilters = async (metaData: MetaData) => {
  let shownFilters:string[] = []

  // TODO: map all filters
  const categoricalAttrs = getCategoricals(metaData.attributes)
  const categoricals = await Promise.all(categoricalAttrs.map(async (attribute) => {
    const href = attribute.refEntityType

    if (!href) throw new Error('categorical without href')

    const options = await getOptions(href)
    shownFilters.push(attribute.name)

    return {
      name: attribute.name,
      label: attribute.label,
      type: 'checkbox-filter',
      options: options,
      collapsable: true,
      collapsed: false
    }
  }))

  return {
    definition: categoricals,
    shown: shownFilters
  }
}

const getOptions = async (href: string) => {
  // const resp = await api.get(href)
  return () => {
    // return Promise.resolve(
    //   resp.items.map((item: any) => ({ value: item[resp.meta.idAttribute], text: item[resp.meta.labelAttribute] }))
    // )
    Promise.resolve([])
  }
}

export {
  mapMetaToFilters
}
