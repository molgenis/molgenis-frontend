export type MetaData = {
  id: string,
  package: string, // url
  extends?: MetaData,
  description: string,
  label: string,
  abstract: boolean,
  attributes: Attribute[]
}

type Attribute = {
  id: string,
  name: string,
  type: 'bool' | 'categorical' | 'categorical_mref' | 'compound' | 'date' | 'date_time' | 'decimal' | 'email' | 'enum' | 'file' | 'html' | 'hyperlink' | 'int' | 'long' | 'mref' | 'one_to_many' | 'script' | 'string' | 'text' | 'xref',
  mappedBy?: Attribute,
  orderBy?: 'ASC' | 'DESC'
  idAttribute: boolean,
  labelAttribute: boolean,
  lookupAttributeIndex?: number,
  refEntityTypeId?: string,
  description: string,
  label: string,
  nullable: boolean,
  auto: boolean,
  visible: boolean,
  unique: boolean,
  readOnly: boolean,
  aggregatable: boolean,
  enumOptions?: string[],
  categoricalOptions?: CategoricalOption[],
  defaultValue?: string,
  parentAttribute?: Attribute,
  expression?: string,
  nullableExpression?: string,
  visibleExpression?: string,
  validationExpression?: string
}

type CategoricalOption = {
  id?: string,
  label?: string
}
