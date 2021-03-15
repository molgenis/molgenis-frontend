export class AlertError extends Error {
  constructor (alerts) {
    super()
    this.alerts = alerts
  }
}
