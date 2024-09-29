import { createResponseUtil, TResponse } from "./response.util"
import { IRestClientUtil } from "./useRestClient.util"

interface IRestMock {
    toMachWithURL: string
    toMatchWithMethod: 'GET' | 'POST' | 'DEL' | 'PUT' | 'PATCH'
    response: any
    payload: any
}

interface IRestClientMock extends IRestClientUtil {
    setMockList: (mockList: Array<IRestMock>)=> void
}

export const useRestClientMock = (): IRestClientMock => {
    
    let mockList: Array<IRestMock> = []

    const setMockList: IRestClientMock['setMockList'] = (mockListParam)=> {
        mockList= mockListParam
    }

    const get: IRestClientMock['get'] = async <GData, GError>(param: {url: string}): Promise<TResponse<GData, GError>> => {

        const mockFound = mockList.find(mock => mock.toMachWithURL === param.url && mock.toMatchWithMethod === 'GET')

        if (mockFound === undefined) {
            console.error(`toMachWithRestQuery Failed !! ${'GET'} ${param.url}`)
            throw `toMachWithRestQuery Failed !! ${'GET'} ${param.url}`
        }

        const mockFoundUpdated: IRestMock = {
            ...mockFound,
            payload: null
        }

        mockList = mockList.map(mock =>
            mock.toMachWithURL === mockFoundUpdated.toMachWithURL && mockFound.toMatchWithMethod === 'GET' ?
                mockFoundUpdated :
                mock
        )

        return createResponseUtil.success<GData>(mockFound.response, 200)
    }


    const post: IRestClientMock['post'] = async <GData, GError>(param: {url: string, payload: any}): Promise<TResponse<GData, GError>> => {
        
        const mockFound = mockList.find(mock => mock.toMachWithURL === param.url && mock.toMatchWithMethod === 'POST')

        if (mockFound === undefined) {
            console.error(`toMachWithRestQuery Failed !! ${'POST'} ${param.url}`)
            throw `toMachWithRestQuery Failed !! ${'POST'} ${param.url}`
        }

        const mockFoundUpdated: IRestMock = {
            ...mockFound,
            payload: param.payload
        }

        mockList = mockList.map(mock =>
            mock.toMachWithURL === mockFoundUpdated.toMachWithURL && mockFound.toMatchWithMethod === 'POST' ?
                mockFoundUpdated :
                mock
        )

        return createResponseUtil.success<GData>(mockFound.response, 200)
    }

    const put: IRestClientMock['put'] = async <GData, GError>(param: {url: string, payload: any }): Promise<TResponse<GData, GError>> => {

        const mockFound = mockList.find(mock => mock.toMachWithURL === param.url && mock.toMatchWithMethod === 'PUT')

        if (mockFound === undefined) {
            console.error(`toMachWithRestQuery Failed !! ${'PUT'} ${param.url}`)
            throw `toMachWithRestQuery Failed !! ${'PUT'} ${param.url}`
        }

        const mockFoundUpdated: IRestMock = {
            ...mockFound,
            payload: param.payload
        }

        mockList = mockList.map(mock =>
            mock.toMachWithURL === mockFoundUpdated.toMachWithURL && mockFound.toMatchWithMethod === 'PUT' ?
                mockFoundUpdated :
                mock
        )

        return createResponseUtil.success<GData>(mockFound.response, 200)
    }

    
    const patch: IRestClientMock['patch'] = async <GData, GError>(param: {url: string, payload: any }): Promise<TResponse<GData, GError>> => {

        const mockFound = mockList.find(mock => mock.toMachWithURL === param.url && mock.toMatchWithMethod === 'PATCH')

        if (mockFound === undefined) {
            console.error(`toMachWithRestQuery Failed !! ${'PATCH'} ${param.url}`)
            throw `toMachWithRestQuery Failed !! ${'PATCH'} ${param.url}`
        }

        const mockFoundUpdated: IRestMock = {
            ...mockFound,
            payload: param.payload
        }

        mockList = mockList.map(mock =>
            mock.toMachWithURL === mockFoundUpdated.toMachWithURL && mockFound.toMatchWithMethod === 'PUT' ?
                mockFoundUpdated :
                mock
        )

        return createResponseUtil.success<GData>(mockFound.response, 200)
    }

    const del: IRestClientMock['del'] = async <GError>(param: {url: string}): Promise<TResponse<null, GError>> => {

        const mockFound = mockList.find(mock => mock.toMachWithURL === param.url && mock.toMatchWithMethod === 'DEL')

        if (mockFound === undefined) {
            console.error(`toMachWithRestQuery Failed !! ${'DEL'} ${param.url}`)
            throw `toMachWithRestQuery Failed !! ${'DEL'} ${param.url}`
        }

        const mockFoundUpdated: IRestMock = {
            ...mockFound,
            payload: null
        }

        mockList = mockList.map(mock =>
            mock.toMachWithURL === mockFoundUpdated.toMachWithURL && mockFound.toMatchWithMethod === 'DEL' ?
                mockFoundUpdated :
                mock
        )

        return createResponseUtil.success(null, 200)
    }

    return {
        setMockList,
        get,
        post,
        put,
        del,
        patch
    }
}


////////////


