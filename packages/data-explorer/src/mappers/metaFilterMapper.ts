// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaDataApiResponse } from '@/types/ApiResponse'
import { FilterDefinition } from '@/types/ApplicationState'

const MaxVisibleOptions = 10

const fieldTypeToFilterType:any = {
  'STRING': 'string-filter',
  'TEXT': 'string-filter',
  'INT': 'range-filter',
  'LONG': 'range-filter',
  'DECIMAL': 'range-filter',
  'BOOL': 'checkbox-filter',
  'EMAIL': 'string-filter',
  'HYPERLINK': 'string-filter',
  'CATEGORICAL': 'checkbox-filter',
  'CATEGORICAL_MREF': 'checkbox-filter'
}

const mapMetaToFilters = async (meta: MetaDataApiResponse) => {
  let shownFilters:string[] = []

  const categoricals = await Promise.all(meta.attributes.filter(item => {
    // Filter out undefined datatypes
    return fieldTypeToFilterType[item.fieldType]
  }).map(async (item) => {
    console.log(item)
    // BASE filter configuration
    let filter: FilterDefinition = {
      name: item.name,
      label: item.label,
      type: fieldTypeToFilterType[item.fieldType],
      collapsable: true,
      collapsed: false
    }

    // CATEGORICAL
    if (item.fieldType.includes('CATEGORICAL') || item.fieldType.includes('CATEGORICAL_MREF')) {
      const href = item && item.refEntity && item.refEntity.href
      filter.maxVisibleOptions = MaxVisibleOptions
      if (href) {
        filter.options = await getOptions(href)
      }
    }

    // BOOL
    if (item.fieldType.includes('BOOL')) {
      filter.options = [{ value: 'TRUE', text: 'Yes' }, { value: 'False', text: 'No' }]
    }

    // DECIMAL
    if (item.fieldType.includes('DECIMAL')) {
      filter.step = 0.1
    }

    // RANGE
    if (filter.type === 'range-filter') {
      if (item.range && item.range.max) {
        filter.max = item.range.max
      }
      if (item.range && item.range.min) {
        filter.min = item.range.min
      }
      if (item.range && item.range.max && item.range.min) {
        filter.useSlider = true
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

  return resp.items.map((item: any) => ({ value: item[resp.meta.idAttribute], text: item[resp.meta.labelAttribute] }))
}

export {
  mapMetaToFilters
}
