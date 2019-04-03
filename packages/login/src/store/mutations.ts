import State, { Alert } from './types'

export default {
    'setAlert': (state: State, alert: Alert | null) => state.alert = alert
}