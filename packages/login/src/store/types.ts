export enum Variant { info = 'info', success = 'success', warning = 'warning', danger = 'danger' }

export interface Alert {
  message: string
  variant?: Variant
}

export interface OidcClient {
  url: string
  name: string
}

export interface State {
  alert: Alert | null
  showCloseButton: boolean
  showRegister: boolean
  oidcClients: OidcClient[]
}

export default State
