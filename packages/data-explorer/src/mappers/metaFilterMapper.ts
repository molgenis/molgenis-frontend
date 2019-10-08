// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaDataApiResponse } from '@/types/ApiResponse'
import { FilterDefinition } from '@/types/ApplicationState'

const MaxVisibleOptions = 10

const fieldTypeToFilterType:any = {
  'STRING': 'string-filter',
  'TEXT': 'string-filter',
  'INT': 'string-filter',
  'LONG': 'string-filter',
  'DECIMAL': 'string-filter',
  'BOOL': 'string-filter',
  'DATE': 'string-filter',
  'EMAIL': 'string-filter',
  'HYPERLINK': 'string-filter',
  'CATEGORICAL': 'checkbox-filter',
  'CATEGORICAL_MREF': 'checkbox-filter',
  'XREF': 'checkbox-filter',
  'MREF': 'checkbox-filter'
}

const mapMetaToFilters = async (meta: MetaDataApiResponse) => {
  let shownFilters:string[] = []

  const categoricals = await Promise.all(meta.attributes.filter(item => {
    // Filter out undefined datatypes
    return fieldTypeToFilterType[item.fieldType]
  }).map(async (item) => {
    // BASE filter configuration
    let filter:FilterDefinition = {
      name: item.name,
      label: item.label,
      type: fieldTypeToFilterType[item.fieldType],
      collapsable: true,
      collapsed: false
    }

    // CATEGORICAL
    if (item.fieldType === 'CATEGORICAL') {
      const href = item && item.refEntity && item.refEntity.href
      filter.maxVisibleOptions = MaxVisibleOptions
      if (href) {
        filter.options = await getOptions(href)
      }
    }

    return filter
  }))

  return {
    definition: categoricals,
    shown: shownFilters
  }
}

const getOptions = async (href: string) => {
  const resp = await api.get(href)

  return resp.items.map((item: any) => ({ value: item.id, text: item[resp.meta.labelAttribute] }))
}

export {
  mapMetaToFilters
}
