import axios, { AxiosResponse } from 'axios'
import { ClientSettings } from '@/types/ClientSettings'

const defaultResponse = function (response: AxiosResponse<any>) {
  return response
}

const defaultErrorReponse = function (error: any) {
  if (console && console.error) {
    console.error(`${error.errorCode}: ${error.title}`)
    console.error(`${error.detail}`)
  }
  return Promise.reject(error)
}

const defaultStatusValidation = function (status: number) {
  return status >= 200 && status < 300
}

export function build (settings?: ClientSettings) {
  const client = axios.create({
    baseURL: settings && settings.baseURL ? settings.baseURL : '/',
    timeout: settings && settings.timeout ? settings.timeout : 5000,
    validateStatus: settings && settings.validateStatus ? settings.validateStatus : defaultStatusValidation
  })

  client.interceptors.response.use(
    settings && settings.responseInterceptor ? settings.responseInterceptor : defaultResponse,
    settings && settings.responseErrorInterceptor ? settings.responseErrorInterceptor : defaultErrorReponse
  )

  return client
}

export default build
