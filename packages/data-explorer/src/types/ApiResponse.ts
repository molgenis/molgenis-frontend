/* eslint-disable no-use-before-define */
export function isSingleRefValueObject (value: DataObjectValue): value is SingleRefValueObject {
  return (value as SingleRefValueObject).data !== undefined
}

export function isMRefValueObject (value: DataObjectValue): value is MRefValueObject {
  return (value as MRefValueObject).items !== undefined
}

export function isSelfRefValueObject (value: DataObjectValue): value is SelfRefValueObject {
  return (value as MRefValueObject).items === undefined &&
  (value as SingleRefValueObject).data === undefined &&
  (value as SelfRefValueObject).links !== undefined
}

export function isFileValueObject (value: DataObjectValue): value is FileValueObject {
  return (value as FileValueObject).data !== undefined &&
  (value as FileValueObject).data.id !== undefined &&
  (value as FileValueObject).data.contentType !== undefined &&
  (value as FileValueObject).data.filename !== undefined &&
  (value as FileValueObject).data.size !== undefined &&
  (value as FileValueObject).data.url !== undefined
}

export function isRefValue (value: DataObjectValue): value is RefValue {
  return isSingleRefValueObject(value) || isMRefValueObject(value) || isSelfRefValueObject(value)
}

export function isLinkable (value: any): value is Linkable {
  return (value as Linkable).links !== undefined && typeof (value as Linkable).links.self === 'string'
}

interface Linkable {
  links: { self: string },
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseValueObject { }

export interface MRefValueObject extends BaseValueObject, Linkable {
  items: DataApiResponseItem[]
}
export interface SingleRefValueObject extends BaseValueObject, Linkable {
  data: DataObject

}
export interface SelfRefValueObject extends BaseValueObject, Linkable {}

export interface FileValueObject extends BaseValueObject, Linkable {
  data: FileObject
}

export type RefValue = SingleRefValueObject | MRefValueObject | SelfRefValueObject;

export type DataApiResponseItem = Linkable & {
  data: DataObject
}

export type DataObjectValue = RefValue | string | boolean | number

export type DataObject = { [key: string]: DataObjectValue }

export type FileObject = {
  contentType: string
  filename: string
  id: string
  size: number
  url: string
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
