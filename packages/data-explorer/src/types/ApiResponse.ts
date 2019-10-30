import { StringMap } from '@/types/GeneralTypes'

export type DataApiResponseItem = {
  links: { self: string },
  items?: DataApiResponseItem[],
  data?: DataObject
}

export type DataObject = {[key: string]: DataApiResponseItem | string | boolean | number}

type DataApiResponsePage = {
  size: number,
  totalElements: number,
  totalPages: number,
  number: number
}

export type DataApiResponse = {
  links: {
    self: string
  },
  items: DataApiResponseItem[],
  page: DataApiResponsePage
}

export type MetaDataRefEntity = {
  name: string,
  idAttribute: string,
  labelAttribute: string,
  lookupAttributes: string[],
  hrefCollection: string,
  href?: string
}

export type MetaDataCategoricalOption = {
  label: string,
  id: string
}

export type MetaDataAttribute = {
  href: string,
  fieldType: string,
  name: string,
  label: string,
  attributes?: StringMap[],
  auto: boolean,
  nillable: boolean,
  readOnly: boolean,
  labelAttribute: boolean,
  unique: boolean,
  visible: boolean,
  lookupAttribute: boolean,
  isAggregatable: boolean,
  categoricalOptions?: MetaDataCategoricalOption[],
  range?: { max?:number, min?:number },
  refEntity?: MetaDataRefEntity,
  enumOptions?: string[]
}

export type MetaDataApiResponse = {
  attributes: MetaDataAttribute[],
  description: string,
  href: string,
  hrefCollection: string,
  idAttribute: string,
  isAbstract: boolean,
  label: string,
  labelAttribute: string,
  languageCode: string,
  lookupAttributes: string[],
  name: string,
  permissions: string[]
  writable: boolean,
}
