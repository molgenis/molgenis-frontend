import axios from 'axios'
import store from '@/store/store'

const client = axios.create({
  baseURL: '/',
  timeout: 1000,
  validateStatus: function (status) {
    if (status === 401) {
      window.location.href = '/login'
      return true
    }
    return status < 500
  }
})

client.interceptors.response.use(function (response) {
  return response
}, function (error) {
  store.dispatch('setToast', { message: error.message, type: 'error' })
  return Promise.reject(error)
})

export default client
