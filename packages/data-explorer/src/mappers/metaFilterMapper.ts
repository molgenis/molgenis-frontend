// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { MetaDataApiResponse, MetaDataAttribute } from '@/types/ApiResponse'
import { FilterDefinition } from '@/types/ApplicationState'
import { getFieldOptions } from '@/utils/mapperUtils'

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

  const filterDefinitions = await Promise.all(meta.attributes.filter((item: MetaDataAttribute) => {
    // Filter out undefined datatypes
    return fieldTypeToFilterType[item.fieldType]
  }).map(async (item) => {
    const options = getFieldOptions(item)
    // BASE filter configuration
    let filterDefinition: FilterDefinition = {
      name: item.name,
      label: item.label,
      type: fieldTypeToFilterType[item.fieldType],
      collapsable: true,
      collapsed: false
    }

    // DECIMAL
    if (item.fieldType.includes('DECIMAL')) {
      filterDefinition.step = 0.1
    }

    // RANGE
    if (filterDefinition.type === 'range-filter') {
      if (item.range && item.range.max) {
        filterDefinition.max = item.range.max
      }
      if (item.range && item.range.min) {
        filterDefinition.min = item.range.min
      }
      if (item.range && item.range.max && item.range.min) {
        filterDefinition.useSlider = true
      }
    }
    return options ? { ...filterDefinition, options, maxVisibleOptions: MaxVisibleOptions } : filterDefinition
  }))

  return {
    definition: filterDefinitions,
    shown: shownFilters
  }
}

export {
  mapMetaToFilters
}
