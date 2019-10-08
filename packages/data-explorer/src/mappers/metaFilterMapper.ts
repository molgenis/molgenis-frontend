// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaDataApiResponse, MetaDataAttribute } from '@/types/ApiResponse'
import { getCategoricals } from './utils'
import { FilterDefinition } from '@/types/ApplicationState'

const mapMetaToFilters = async (meta: MetaDataApiResponse) => {
  let shownFilters:string[] = []

  // TODO: map all filters
  const categoricals = await Promise.all(getCategoricals(meta.attributes).map(async (item) => {
    const href = item && item.refEntity && item.refEntity.href

    if (!href) throw new Error('categorical without href')

    const options = await getOptions(href)
    shownFilters.push(item.name)

    return {
      name: item.name,
      label: item.label,
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
  const resp = await api.get(href)
  return resp.items.map((item: any) => ({ value: item[resp.meta.idAttribute], text: item[resp.meta.labelAttribute] }))
}

export {
  mapMetaToFilters
}
