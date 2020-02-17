import { TypeEnum } from './TypeEnum'

export type MetaData = {
  id: string,
  package: string | null, // url
  extends?: string, // ref url to parent
  description: string,
  label: string,
  abstract: boolean,
  attributes: Attribute[]
}

export type Attribute = {
  id: string,
  name: string,
  type: TypeEnum,
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
