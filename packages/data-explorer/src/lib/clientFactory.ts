/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ClientSettings } from '@/types/ClientSettings'

export const defaultResponse = function (response: AxiosResponse<any>) {
  return response
}

export const defaultErrorReponse = function (error: any) {
  if (console && console.error) {
    console.error(`${error.errorCode}: ${error.title}`)
    console.error(`${error.detail}`)
  }
  return Promise.reject(error)
}

export const defaultStatusValidation = function (status: number) {
  return status >= 200 && status < 300
}

export function build (settings?: ClientSettings):AxiosInstance {
  const client:AxiosInstance = axios.create({
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
