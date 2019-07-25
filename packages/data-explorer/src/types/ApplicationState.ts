export type Toast = {
  type: 'danger' | 'success',
  message: string
}

export default interface ApplicationState {
  toast: Toast | null,
  dataDisplayLayout: String
  activeEntity: String | null
  entityData: any
  entityMeta: any
  showFilters: boolean,
}
