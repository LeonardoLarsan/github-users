import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createResponseUtil, TResponse } from './response.util';


export interface IRestClientUtil {
    get: <GData, GError>(param: { url: string }) => Promise<TResponse<GData, GError>>
    post: <GData, GError>(param: { url: string, payload: any }) => Promise<TResponse<GData, GError>>
    put: <GData, GError>(param: { url: string, payload: any }) => Promise<TResponse<GData, GError>>
    patch: <GData, GError>(param: { url: string, payload: any }) => Promise<TResponse<GData, GError>>
    del: <GError>(param: { url: string }) => Promise<TResponse<null, GError>>
}

export const useRestClientUtil = (): IRestClientUtil => {

    const get: IRestClientUtil['get'] = async <TData, GError>(param: { url: string }) =>
        axios.get<TData>(param.url)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const post: IRestClientUtil['post'] = <TData, GError>(param: { url: string, payload: any }) =>
        axios.post<TData>(param.url, param.payload)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const put: IRestClientUtil['put'] = <TData, GError>(param: { url: string, payload: any }) =>
        axios.put<TData>(param.url, param.payload)
            .then(response => createResponseUtil.success<TData>(response.data, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const del: IRestClientUtil['del'] = <GError>(param: { url: string }) =>
        axios.delete(param.url)
            .then(response => createResponseUtil.success<null>(null, response.status))
            .catch((error: AxiosError<GError>) => {
                return createResponseUtil.error<GError | null>(error.response?.data ?? null, error.status ?? 500)
            })

    const patch: IRestClientUtil['put'] = <TData, GError>(param: { url: string, payload: any }) =>
        axios.patch<TData>(param.url, param.payload)
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