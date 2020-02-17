import { ResponseEntityType, ResponsePackage, ResponseAttribute } from '../types/EntityTypeV3'
import { MetaData, Attribute } from '../types/MetaData'

const toMetaData = (entityType: ResponseEntityType): MetaData => {
  const entityTypeData = entityType.data

  let metadata: MetaData = {
    id: entityTypeData.id,
    package: toPackage(entityTypeData.package), // url
    description: entityTypeData.description || '',
    label: entityTypeData.label || '',
    abstract: entityTypeData.abstract,
    attributes: entityTypeData.attributes && entityTypeData.attributes.items ? entityTypeData.attributes.items.map(toAttribute) : []
  }

  if (entityTypeData.extends) {
    metadata = { ...metadata, extends: toMetaData(entityTypeData.extends) }
  }

  return metadata
}

const toAttribute = (responseAttribute: ResponseAttribute): Attribute => {
  const data = responseAttribute.data

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
    aggregatable: data.aggregatable
  }

  if (data.mappedBy) {
    attribute = { ...attribute, mappedBy: toAttribute(data.mappedBy) }
  }

  if (data.orderBy) {
    // todo
  }

  if (data.lookupAttributeIndex) {
    attribute = { ...attribute, lookupAttributeIndex: data.lookupAttributeIndex }
  }

  if (data.enumOptions) {
    attribute = { ...attribute, enumOptions: data.enumOptions }
  }

  if (data.refEntityTypeId) {
    attribute = { ...attribute, refEntityTypeId: data.refEntityTypeId }
  }

  if (data.categoricalOptions) {
    attribute = { ...attribute, categoricalOptions: { ...data.categoricalOptions } }
  }

  if (data.defaultValue) {
    attribute = { ...attribute, defaultValue: data.defaultValue }
  }

  if (data.parentAttribute) {
    attribute = { ...attribute, parentAttribute: toAttribute(data.parentAttribute) }
  }

  if (data.expression) {
    attribute = { ...attribute, expression: data.expression }
  }

  if (data.nullableExpression) {
    attribute = { ...attribute, nullableExpression: data.nullableExpression }
  }

  if (data.visibleExpression) {
    attribute = { ...attribute, visibleExpression: data.visibleExpression }
  }

  if (data.validationExpression) {
    attribute = { ...attribute, validationExpression: data.validationExpression }
  }

  return attribute
}

const toPackage = (_package: ResponsePackage | undefined):string | null => {
  if (_package) {
    return _package.href.self
  }

  return null
}

export {
  toMetaData
}
