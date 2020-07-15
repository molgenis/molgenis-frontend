import build from './clientFactory'
import store from '@/store/store'
import { AxiosInstance } from 'axios'

export const errorReponse = (error: any) => {
  let message = error.message
  if (error.response && error.response.data && error.response.data.detail) {
    message = error.response.data.detail
  }
  if (error.response && error.response.status === 401) {
    if (!store.getters.isUserAuthenticated) {
      window.location.href = '/login'
    }
  }
  store.commit('setToast', { message, type: 'danger' })
  return Promise.reject(error)
}

// Create the default axios client the data-explorer will use
const client:AxiosInstance = build({
  responseErrorInterceptor: errorReponse
})

export default client
