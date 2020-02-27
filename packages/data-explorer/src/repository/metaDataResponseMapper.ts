import { ResponseEntityType, ResponsePackage, ResponseAttribute } from '../types/EntityTypeV3'
import { MetaData, Attribute } from '../types/MetaData'

const toMetaData = (entityType: ResponseEntityType): MetaData => {
  const data = entityType.data
  const attributes = data.attributes && data.attributes.items ? data.attributes.items.map(toAttribute) : []

  const idAttribute = attributes.find(a => a.idAttribute)
  if (idAttribute === undefined) {
    throw Error('Invalid metadata, metaData must contain a id attribute')
  }

  const labelAttribute = attributes.find(a => a.labelAttribute)

  let metadata: MetaData = {
    id: data.id,
    labelAttribute: labelAttribute === undefined ? undefined : labelAttribute,
    idAttribute: idAttribute,
    package: toPackage(data.package), // url
    description: data.description || '',
    label: data.label || '',
    abstract: data.abstract,
    attributes: attributes
  }

  if (data.extends) {
    metadata = { ...metadata, extends: data.extends.links.self }
  }

  return metadata
}

const toAttribute = (responseAttribute: ResponseAttribute): Attribute => {
  const data = responseAttribute.data

  const isReference = responseAttribute.data.refEntityType !== undefined

  let attribute: Attribute = {
    id: data.id,
    name: data.name,
    type: data.type,
    idAttribute: data.idAttribute,
    labelAttribute: data.labelAttribute,
    description: data.description || '',
    label: data.label || '',
    nullable: data.nullable,
    auto: data.auto,
    visible: data.visible,
    unique: data.unique,
    readOnly: data.readOnly,
    aggregatable: data.aggregatable,
    isReference
  }

  if (data.mappedBy) {
    attribute = { ...attribute, mappedBy: toAttribute(data.mappedBy) }
  }

  if (data.orderBy) {
    // Todo
    throw new Error('Unhandled metadata Attribute orderBy')
  }

  attribute = addOptional(attribute, 'lookupAttributeIndex', data.lookupAttributeIndex)

  attribute = addOptional(attribute, 'enumOptions', data.enumOptions)

  if (data.refEntityType) {
    attribute = { ...attribute, refEntityType: data.refEntityType.self }
  }

  attribute = addOptional(attribute, 'categoricalOptions', data.categoricalOptions)

  attribute = addOptional(attribute, 'defaultValue', data.defaultValue)

  attribute = addOptional(attribute, 'range', data.range)

  if (data.parentAttribute) {
    attribute = { ...attribute, parentAttribute: toAttribute(data.parentAttribute) }
  }

  attribute = addOptional(attribute, 'expression', data.expression)

  attribute = addOptional(attribute, 'nullableExpression', data.nullableExpression)

  attribute = addOptional(attribute, 'visibleExpression', data.visibleExpression)

  attribute = addOptional(attribute, 'validationExpression', data.validationExpression)

  return attribute
}

const addOptional = <T> (base: T, prop: string, value: number | string | boolean | object | null | undefined): T => {
  return value ? { ...base, [prop]: value } : base
}

const toPackage = (_package: ResponsePackage | undefined):string | null => {
  if (_package) {
    return _package.links.self
  }

  return null
}

export {
  toMetaData
}
