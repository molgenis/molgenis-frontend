import { AxiosResponse } from 'axios'

export type ClientSettings = {
  baseURL?: string,
  timeout?: number,
  validateStatus?: (status: number) => boolean,
  responseInterceptor?: (value: AxiosResponse<any>) => AxiosResponse<any>,
  responseErrorInterceptor?: (error: any) => Promise<any>,
}
