export interface ISuccessResponse<GData> {
    status: number
    isSuccess: true
    isError: false
    data: GData
}

export interface IErrorResponse<GError> {
    status: number
    isSuccess: false
    isError: true
    data: GError | null;
}

export type TResponse<GData, GError> = ISuccessResponse<GData> | IErrorResponse<GError>

interface ICreateResponseUtil {
    success: <GData>(data: GData, status: number)=> ISuccessResponse<GData>
    error:  <GError>(data: GError, status: number )=> IErrorResponse<GError>
}

export const createResponseUtil: ICreateResponseUtil = {
    success: (data, status)=> ({isSuccess: true, isError: false, data: data, status}),
    error: (data, status) => ({isSuccess: false, isError: true, status: status, data: data})
}

