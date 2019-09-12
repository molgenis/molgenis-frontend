import { StringMap } from '@/types/GeneralTypes'

export type DataApiResponseItem = {
  links: { self: string },
  items?: [],
  data?: { [key: string]: string | any } // Any should be DataApiResponseItem but will not build
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
  attributes?: StringMap[],
  auto: boolean,
  nillable: boolean,
  readOnly: boolean,
  labelAttribute: boolean,
  unique: boolean,
  visible: boolean,
  lookupAttribute: boolean,
  isAggregatable: boolean,
  refEntity?: { name: string, labelAttribute: string }
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
