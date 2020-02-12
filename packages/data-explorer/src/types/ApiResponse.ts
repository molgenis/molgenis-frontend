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
  refEntity?: { name: string, labelAttribute: string, href?: string }
}

export type MetaDataApiResponse = {
  links: MetaDataApiResponseLink
  data: {
    id: string,
    label: string,
    description: string,
    package: {
      links: MetaDataApiResponseLink
    },
    extends: {
      links: MetaDataApiResponseLink
    },
    indexingDepth: number,
    abstract: boolean,
    attributes: MetaDataApiResponseAttributes
  }
}

export type MetaDataApiResponseLink = {
  self: string
}

export type MetaDataApiResponseAttributes = {
  links: MetaDataApiResponseLink
  items: [{
    link: MetaDataApiResponseLink
    data: MetaDataApiResponseAttribute
  }]
}

export type MetaDataApiResponseAttribute = {
  id: string
  label: string,
  description: string,
  name: string,
  sequenceNr: number,
  type: string,
  idAttribute: string,
  labelAttribute: string,
  refEntityType: MetaDataApiResponseLink,
  cascadeDelete: boolean,
  nullable: boolean,
  auto: boolean,
  visible: boolean,
  unique: boolean,
  readOnly: boolean,
  aggregatable: boolean
}
