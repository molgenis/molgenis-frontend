import { getFieldOptions } from './utils'
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
  'date': 'date-time-filter',
  'datetime': 'date-time-filter',
  'email': 'string-filter',
  'hyperlink': 'string-filter',
  'categorical': 'checkbox-filter',
  'categorical_mref': 'checkbox-filter',
  'mref': 'multi-filter',
  'xref': 'multi-filter',
  'onetomany': 'multi-filter',
  'enum': 'checkbox-filter',
  'file': 'string-filter',
  'compound': 'compound-title'
}

const mapMetaToFilters = async (metaData: MetaData) => {
  let shownFilters:string[] = []
  function findByID (ID: string):Attribute {
    return metaData.attributes.filter((item) => item.id === ID)[0]
  }

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
      type: fieldTypeToFilterType[attribute.type],
      dataType: attribute.type,
      collapsable: true,
      collapsed: false
    }

    // Compound child
    if (attribute.parentAttributeId) {
      const parent = findByID(attribute.parentAttributeId)
      if (parent.type === 'compound') {
        filterDefinition.compound = findByID(attribute.parentAttributeId).name
      }
    }

    // Decimal
    if (attribute.type.includes('decimal')) {
      filterDefinition.step = 0.1
    }

    // Date
    if (attribute.type.includes('date')) {
      filterDefinition.time = false
    }
    if (attribute.type.includes('datetime')) {
      filterDefinition.time = true
    }

    // Range (number)
    if (filterDefinition.type === 'range-filter' && attribute.range) {
      if (attribute.range.max) {
        filterDefinition.max = attribute.range.max
      }
      if (attribute.range.min) {
        filterDefinition.min = attribute.range.min
      }
      if (attribute.range.max && attribute.range.min) {
        filterDefinition.useSlider = true
      }
    }

    return options ? { ...filterDefinition, options } : filterDefinition
  }))
  return {
    definition: constructedFilters,
    shown: shownFilters
  }
}

export {
  mapMetaToFilters
}
