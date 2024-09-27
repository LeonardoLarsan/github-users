import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createResponseUtil, TResponse } from './response.util';

export interface IRestClientUtil {
    get: <GData, GError>(url: string) => Promise<TResponse<GData, GError>>
    post: <GData, GError>(url: string, body: any) => Promise<TResponse<GData, GError>>
    put: <GData, GError>(url: string, body: any) => Promise<TResponse<GData, GError>>
    del: <GError>(url: string) => Promise<TResponse<null, GError>>
    patch: <GData, GError>(url: string, body: any) => Promise<TResponse<GData, GError>>

}

export const useRestClientUtil = (): IRestClientUtil => {

    const get: IRestClientUtil['get'] = <TData, GError>(url: string) =>
        axios.get<TData>(url)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const post: IRestClientUtil['post'] = <TData, GError>(url: string, body: any) =>
        axios.post<TData>(url, body)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {

                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const put: IRestClientUtil['put'] = <TData, GError>(url: string, body: any) =>
        axios.put<TData>(url, body)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const del: IRestClientUtil['del'] = <GError>(url: string) =>
        axios.delete(url)
            .then(response => createResponseUtil.success<null>(null, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const patch: IRestClientUtil['patch'] = <TData, GError>(url: string, body: any) =>
        axios.patch<TData>(url, body)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    return {
        get,
        post,
        put,
        del,
        patch
    }
}