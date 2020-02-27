import { TypeEnum } from './TypeEnum'

export type EntityType = {
  href?: Links,
  data?: EntityTypeData
}

export type ResponseEntityType = EntityType & {
  data: ResponseEntityTypeData
}

type Links = {
  previous?: string, // uri
  self: string, // uri
  next?: string // uri
}

type I18nValue = {
  defaultValue?: string,
  translations?: {}
}

export type Package = {
  links?: Links
}

export type ResponsePackage = Package & {
  links: Links
}

export type ParentRef = {
  links: Links
}

type EntityTypeData = {
  id?: string,
  package?: Package,
  extends?: EntityType,
  description?: string,
  // eslint-disable-next-line camelcase
  description_i18n?: I18nValue,
  label?: string,
  // eslint-disable-next-line camelcase
  label_i18n?: I18nValue,
  abstract?: boolean,
  indexingDepth?: number,
  attributes?: AttributeItems
}

type ResponseEntityTypeData = EntityTypeData & {
  id: string,
  package?: ResponsePackage,
  extends?: ParentRef,
  abstract: boolean,
  attributes?: ResponseAttributeItems
}

type AttributeItems = {
  links?: Links,
  items?: Attribute[]
}

type ResponseAttributeItems = {
  links?: Links,
  items?: ResponseAttribute[]
}

export type Attribute = {
  link?: Links,
  data?: AttributeData
}

export type ResponseAttribute = Attribute & {
  data: ResponseAttributeData
}

type CategoricalOption = {
  id?: string,
  label?: string
}

type AttributeSort = {
  id?: string,
  type?: 'ASC' | 'DESC'
}

type AttributeData = {
  id: string,
  name?: string,
  sequenceNr?: number,
  type?: TypeEnum,
  mappedBy?: Attribute,
  orderBy?: AttributeSort[],
  idAttribute?: boolean,
  labelAttribute?: boolean,
  lookupAttributeIndex?: number,
  refEntityType?: Links,
  description?: string,
  // eslint-disable-next-line camelcase
  description_i18n?: I18nValue,
  label?: string,
  // eslint-disable-next-line camelcase
  label_i18n?: I18nValue,
  nullable?: boolean,
  auto?: boolean,
  visible?: boolean,
  unique?: boolean,
  readOnly?: boolean,
  aggregatable?: boolean,
  range?: { min?: number, max?:number },
  enumOptions?: string[],
  categoricalOptions?: CategoricalOption[],
  defaultValue?: string,
  cascadeDelete?: boolean,
  parentAttribute?: Attribute,
  expression?: string,
  nullableExpression?: string,
  visibleExpression?: string,
  validationExpression?: string
}

type ResponseAttributeData = AttributeData & {
  name: string,
  type: TypeEnum,
  mappedBy?: ResponseAttribute,
  orderBy?: AttributeSort[],
  idAttribute: boolean,
  labelAttribute: boolean,
  nullable: boolean,
  auto: boolean,
  visible: boolean,
  unique: boolean,
  readOnly: boolean,
  aggregatable: boolean,
  parentAttribute?: ResponseAttribute,
}
