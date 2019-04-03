// @ts-ignore
import api from '@molgenis/molgenis-api-client'
import { Alert, Variant } from './types';

const passwordResetAlert: Alert = { message: 'Password reset', variant: Variant.success }
const passwordNotResetAlert: Alert = { message: 'Password could not be reset', variant: Variant.warning }

export default {
    reset({ commit }: any, email: string) {
        const params = new URLSearchParams()
        params.append('email', email)
        return api.post('/account/password/reset', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        })
        .then((response: any) => {
                console.log('success', response)
                commit('setAlert', passwordResetAlert)
            })
            .catch((response: any) => {
                console.log('catch', response)
                commit('setAlert', {message: response.errors[0].message, variant: Variant.danger})
            })
    }
}