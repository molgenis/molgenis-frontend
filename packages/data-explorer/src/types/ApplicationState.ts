export type Toast = {
  type: 'danger' | 'success',
  message: string
}

type DataApiResponseItem = {
  links: { self: string },
  data: Object
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

type MetaDataAttribute = {
  href: string,
  fieldType: string,
  name: string,
  label: string,
  attributes: Object[],
  auto: boolean,
  nillable: boolean,
  readOnly: boolean,
  labelAttribute: boolean,
  unique: boolean,
  visible: boolean,
  lookupAttribute: boolean,
  isAggregatable: boolean
}

export type MetaDataApiResponse = {
  href: string,
  hrefCollection: string,
  name: string,
  label: string,
  description: string,
  attributes: MetaDataAttribute[],
  labelAttribute: string,
  idAttribute: string,
  lookupAttributes: string[],
  isAbstract: boolean,
  writable: boolean,
  languageCode: string,
  permissions: string[]
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: String
  activeEntity: String | null
  entityData: DataApiResponse | null
  entityMeta: MetaDataApiResponse | null
  shoppedEntityItems: String[]
  showFilters: Boolean
  shoppingFilter: Boolean
}
