import { TypeEnum } from './TypeEnum'

export type MetaData = {
  id: string,
  idAttribute: Attribute, // computed by mapper
  labelAttribute: Attribute | undefined // computed by mapper
  package: string | null, // url to package
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
  refEntityType?: string, // url to ref entity
  description: string,
  label: string,
  isReference: boolean, // computed by mapper
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
  validationExpression?: string,
  range?: { min?: number, max?:number }
}

type CategoricalOption = {
  id?: string,
  label?: string
}
