export type EntityType = {
  href?: Links,
  data?: EntityTypeData
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

type Package = {
  href?: Links
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
  attributes?: Attribute []
}

type Attribute = {
  links?: Links,
  data?: AttributeData
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
  id?: string,
  name?: string,
  sequenceNr?: number,
  type?: 'bool' | 'categorical' | 'categorical_mref' | 'compound' | 'date' | 'date_time' | 'decimal' | 'email' | 'enum' | 'file' | 'html' | 'hyperlink' | 'int' | 'long' | 'mref' | 'one_to_many' | 'script' | 'string' | 'text' | 'xref',
  mappedBy?: Attribute,
  orderBy?: AttributeSort[],
  idAttribute?: boolean,
  labelAttribute?: boolean,
  lookupAttributeIndex?: number,
  refEntityTypeId?: string,
  description?: string,
  description_i18n?: I18nValue,
  label?: string,
  label_i18n: I18nValue,
  nullable?: boolean,
  auto?: boolean,
  visible?: boolean,
  unique?: boolean,
  readOnly?: boolean,
  aggregatable?: boolean,
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
