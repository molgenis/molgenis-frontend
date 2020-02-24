import axios, { AxiosResponse } from 'axios'
// @ts-ignore
import { getCategoricals } from './utils'
import { MetaData } from '@/types/MetaData'
import { fetchMetaDataByURL } from '@/repository/metaDataRepository'
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

export {
  mapMetaToFilters
}
