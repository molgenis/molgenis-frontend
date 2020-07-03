import axios, { AxiosResponse } from 'axios'
import { ProblemResponse } from '@/types/ApiResponse'
import { ClientSettings } from '@/types/ClientSettings'

const defaultResponse = function (response: AxiosResponse<any>) {
  return response
}

const defaultErrorReponse = function (error: ProblemResponse) {
  if (console && console.error) {
    console.error(error)
  }
  return Promise.reject(error)
}

export function build (settings?: ClientSettings) {
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
