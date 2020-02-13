export type EntityType = {
    href?: Links,
    data?: EntityTypeData
}

type Links = {
    previous?: string, // uri
    self: string, // uri
    next?: string // uri
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
    indexingDepth?: number
    attributes?: Attribute []
}
