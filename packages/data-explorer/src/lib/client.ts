import axios from 'axios'

const client = axios.create({
  baseURL: '/',
  timeout: 1000,
  validateStatus: function (status) {
    if (status === 401) {
      window.location.href = '/login'
    }
    return status >= 200 && status < 300
  }
})

export default client
