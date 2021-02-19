export function isSingleRefValueObject (value: DataObjectValue): value is SingleRefValueObject {
  return (value as SingleRefValueObject).data !== undefined
}

export function isMRefValueObject (value: DataObjectValue): value is MRefValueObject {
  return (value as MRefValueObject).items !== undefined
}

export function isRefValue (value: DataObjectValue): value is RefValue {
  return isSingleRefValueObject(value) || isMRefValueObject(value)
}

export function isLinkable (value: any): value is Linkable {
  return (value as Linkable).links !== undefined && typeof (value as Linkable).links.self === 'string'
}

interface Linkable {
  links: { self: string },
}

interface BaseValueObject { }

export interface MRefValueObject extends BaseValueObject, Linkable {
  items: DataApiResponseItem[]
}
export interface SingleRefValueObject extends BaseValueObject, Linkable {
  data: DataObject
}

export type RefValue = SingleRefValueObject | MRefValueObject;

export type DataApiResponseItem = Linkable & {
  data: DataObject
}

export type DataObjectValue = RefValue | string | boolean | number

export type DataObject = { [key: string]: DataObjectValue }

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
  attributes?: Record<string, string>[],
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
