// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { StringMap } from '../types/GeneralTypes'
import { MetaDataApiResponse } from '@/types/ApiResponse'

const metaDataCache:StringMap = {}

// Todo placeholder until we have a metadataApi
const fetchMetaData = async (entityId: string) => {
  if (metaDataCache[entityId]) {
    return metaDataCache[entityId]
  }

  const resp = await api.get(`/api/v2/${entityId}?num=0`)
  metaDataCache[entityId] = resp.meta
  return resp.meta
}

const mapMetaToFilters = async (meta: MetaDataApiResponse) => {
  // console.log(meta)
  // map string to string filter
  // map something to checkboxes

  const categoricals = meta.attributes.filter(item => item.fieldType.includes('CATEGORICAL')).map(item => {
    console.log(item)

    const href = item && item.refEntity && item.refEntity.href

    if (!href) return

    const options = getOptions(href)

    return {
      definition: {
        name: item.name,
        label: item.label,
        type: 'checkbox-filter',
        options: options
      },
      shown: ['search']
    }
  })
  return categoricals
}

const getOptions = async (href: String) => {
  const resp = await api.get(href)
  return resp.items.map((item: any) => ({ id: item.id, label: item.label }))
}

/*
[ {
        name: 'search',
        label: 'Search',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: false
      }, {
        name: 'color',
        label: 'Color',
        collapsed: false,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }, {
        name: 'name',
        label: 'Name',
        description: 'Name of object',
        type: 'string-filter',
        collapsed: false
      }, {
        name: 'price',
        label: 'Price',
        type: 'string-filter'
      }, {
        name: 'string',
        label: 'String',
        description: 'search by string',
        placeholder: 'placeholder',
        type: 'string-filter',
        collapsable: true,
        collapsed: false
      }, {
        name: 'checkbox',
        label: 'Checkbox',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'red', text: 'Red' }, { value: 'green', text: 'Green' }, { value: 'blue', text: 'Blue' }],
        type: 'checkbox-filter'
      }, {
        name: 'long-name',
        label: 'Way too long name to really fit in the user interface',
        collapsed: true,
        bulkOperation: true,
        options: [{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }],
        type: 'checkbox-filter'
      }]
 */
export {
  fetchMetaData, mapMetaToFilters
}
