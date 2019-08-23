import { StringMap } from '@/types/GeneralTypes'

export type DataApiResponseItem = {
  links: { self: string },
  data: Object
}

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

export type MetaDataAttribute = {
  href: string,
  fieldType: string,
  name: string,
  label: string,
  attributes: StringMap[],
  auto: boolean,
  nillable: boolean,
  readOnly: boolean,
  labelAttribute: boolean,
  unique: boolean,
  visible: boolean,
  lookupAttribute: boolean,
  isAggregatable: boolean,
  refEntity?: {name: string, labelAttribute: string}
}

export type MetaDataApiResponse = {
  href: string,
  hrefCollection: string,
  name: string,
  label: string,
  description: string,
  attributes: MetaDataAttribute[],
  labelAttribute: string,
  idAttribute: string,
  lookupAttributes: string[],
  isAbstract: boolean,
  writable: boolean,
  languageCode: string,
  permissions: string[]
}
