import { TResponse } from "@/utils/response.util"
import { IRestClientUtil } from "@/utils/useRestClient.util"
import { IUserResumeModel } from "../models/userResume.model"


export interface IUserListService {
    searchUserList: (search: string) => Promise<TResponse<Array<IUserResumeModel>, null>>
}

export interface IUserListServiceProps {
    restClientUtil: IRestClientUtil
}

export const useUserListService = (props: IUserListServiceProps): IUserListService => {

    const searchUserList: IUserListService['searchUserList'] = async (search) => {
        const response = await props.restClientUtil.get<Array<IUserResumeModel>, null>({
            url: `/api/users?search=${search}`})
        return response
    }

    return {
        searchUserList,
    }
}