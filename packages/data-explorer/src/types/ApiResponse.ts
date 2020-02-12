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
export type i18nValue = {
  defaultValue: string
  translations: StringMap[]
}

export type MetaDataApiResponse = {
  links: MetaDataApiResponseLink
  data: {
    id: string,
    label: string,
    label_i18n: i18nValue, // ?
    description: string,
    description_i18n: i18nValue, // ?
    package: {
      links: MetaDataApiResponseLink
    },
    extends: {
      links: MetaDataApiResponseLink
    },
    indexingDepth: number,
    abstract: boolean,
    attributes: MetaDataApiResponseAttributes

    idAttribute: MetaDataApiResponseAttribute // ?
    labelAttribute: MetaDataApiResponseAttribute // ?
    lookupAttributes: [MetaDataApiResponseAttribute]
  }
}

export type MetaDataApiResponseLink = {
  self: string
}

export type MetaDataApiResponseAttributes = {
  links: MetaDataApiResponseLink
  items: MetaDataApiResponseAttribute[]
}

export type MetaDataApiResponseAttribute = {
  link: MetaDataApiResponseLink
  data: MetaDataApiResponseAttributeData
}

export type MetaDataApiResponseAttributeData = {
  id: string
  name: string,
  sequenceNr: number,
  type: 'bool' | 'categorical' | 'categorical_mref' | 'compound' | 'date' | 'date_time' | 'decimal' | 'email' | 'enum' | 'file' | 'html' | 'hyperlink' | 'int' | 'long' | 'mref' | 'one_to_many' | 'script' | 'string' | 'text' | 'xref',
  mappedBy: MetaDataApiResponseAttribute, // ?
  lookupAttribute: boolean, // ?
  refEntityTypeId?: string,
  label: string,
  label_i18n: i18nValue, // ?
  description: string,
  description_i18n: i18nValue, // ?

  nullable: boolean,
  auto: boolean,
  visible: boolean,
  unique: boolean,
  readOnly: boolean,
  aggregatable: boolean,

  options: []

  defaultValue?: string,
  cascadeDelete?: boolean,
  parentAttribute?: MetaDataApiResponseAttribute,
  nullableExpression?: string,
  visibleExpression?: string,
  validationExpression?: string,

  idAttribute: string,
  labelAttribute: string,
  refEntityType: MetaDataApiResponseLink,

}
