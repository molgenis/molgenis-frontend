import { EntityType, Package, Attribute as AttributeV3 } from '../types/MetaResponseV3'
import { MetaData, Attribute } from '../types/MetaData'
import { TypeEnum } from '../types/TypeEnum'

const toMetaData = (entityType: EntityType): MetaData => {
  if (!entityType.data) {
    throw new Error(`metadataResponse is missing expected data property`)
  }
  const entityTypeData = entityType.data

  let metadata: MetaData = {
    id: toRequiredString(entityTypeData.id, 'id'),
    package: toPackage(entityTypeData.package), // url
    description: entityTypeData.description || '',
    label: entityTypeData.label || '',
    abstract: toRequiredBool(entityTypeData.abstract, 'abstract'),
    attributes: entityTypeData.attributes && entityTypeData.attributes.items ? entityTypeData.attributes.items.map(toAttribute) : []
  }

  if (entityTypeData.extends) {
    metadata = { ...metadata, extends: toMetaData(entityTypeData.extends) }
  }

  return metadata
}

const toAttribute = (attributeV3: AttributeV3): Attribute => {
  if (!attributeV3.data) {
    throw new Error(`metadataResponse.attribute missing`)
  }

  const data = attributeV3.data

  let attribute: Attribute = {
    id: toRequiredString(data.id, 'id'),
    name: toRequiredString(data.name, 'name'),
    type: toRequiredType(data.type),
    idAttribute: toRequiredBool(data.idAttribute, 'idAttribute'),
    labelAttribute: toRequiredBool(data.labelAttribute, 'labelAttribute'),
    description: data.description || '',
    label: data.label || '',
    nullable: toRequiredBool(data.nullable, 'nullable'),
    auto: toRequiredBool(data.auto, 'auto'),
    visible: toRequiredBool(data.visible, 'nullvisibleable'),
    unique: toRequiredBool(data.unique, 'unique'),
    readOnly: toRequiredBool(data.readOnly, 'readOnly'),
    aggregatable: toRequiredBool(data.aggregatable, 'aggregatable')
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

const toRequiredType = (t: TypeEnum | undefined): TypeEnum => {
  if (t === undefined || t === null) {
    throw new Error(`metadataResponse is missing expected type property`)
  }
  return t
}

const toRequiredString = (s: string | undefined, name: string): string => {
  if (s === undefined || s === null) {
    throw new Error(`metadataResponse is missing expected ${name} property`)
  }
  return s
}

const toRequiredBool = (b: boolean | undefined, name: string) => {
  if (b === undefined || b === null) {
    throw new Error(`metadataResponse is missing expected ${name} property`)
  }
  return b
}

const toPackage = (_package: Package | undefined):string | null => {
  if (_package) {
    if (_package.href === undefined || _package.href === null) {
      throw new Error(`metadataResponse is missing expected package.href property`)
    }

    return _package.href.self
  }

  return null
}

export {
  toMetaData
}
