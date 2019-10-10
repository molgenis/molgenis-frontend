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
  'CATEGORICAL_MREF': 'checkbox-filter',
  'MREF': 'checkbox-filter',
  'XREF': 'checkbox-filter',
  'ONE_TO_MANY': 'checkbox-filter',
  'ENUM': 'checkbox-filter'
}

const mapMetaToFilters = async (meta: MetaDataApiResponse) => {
  let shownFilters:string[] = []

  const filterDefinitions = await Promise.all(meta.attributes.filter((item: MetaDataAttribute) => {
    // Filter out undefined datatypes
    return fieldTypeToFilterType[item.fieldType]
  }).map(async (item) => {
    // Handle all filters that have options
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
    if (filterDefinition.type === 'range-filter' && 'range' in item) {
      // @ts-ignore
      if ('max' in item.range) {
        filterDefinition.max = item.range.max
      }
      // @ts-ignore
      if ('min' in item.range) {
        filterDefinition.min = item.range.min
      }
      // @ts-ignore
      if ('max' in item.range && 'min' in item.range) {
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
