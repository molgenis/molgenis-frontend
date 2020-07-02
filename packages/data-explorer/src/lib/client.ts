import axios from 'axios'

const defaultResponse = function (response: any) {
  return response
}

const defaultErrorReponse = function (error: any) {
  if (console && console.error) {
    console.error(error)
  }
  return Promise.reject(error)
}

export function build (settings?:any) {
  const client = axios.create({
    baseURL: settings && settings.baseURL ? settings.baseURL : '/',
    timeout: settings && settings.timeout ? settings.timeout : 5000,
    validateStatus: settings && settings.validateStatus ? settings.validateStatus : function (status) {
      if (status === 401) {
        // window.location.href = '/login'
        console.log(status)
        return true
      }
      return status >= 200 && status < 300
    }
  })

  client.interceptors.response.use(
    settings && settings.responseInterceptor ? settings.responseInterceptor : defaultResponse,
    settings && settings.responseErrorInterceptor ? settings.responseErrorInterceptor : defaultErrorReponse
  )

  return client
}

const client = build()

export default client
