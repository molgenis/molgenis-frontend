import build from './clientFactory'
import store from '@/store/store'

const errorReponse = (error:any) => {
  let message = error.message
  if (error.response.data) {
    message = error.response.data.detail
  }
  if (error.response.status === 401) {
    if (!store.getters.isUserAuthenticated) {
      window.location.href = '/login'
    }
  }
  store.commit('setToast', { message, type: 'danger' })
  return Promise.reject(error)
}

// Create the default axios client the data-explorer will use
const client = build({
  responseErrorInterceptor: errorReponse
})

export default client
