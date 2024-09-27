import { TResponse } from "@/utils/response.util"
import { IRestClientUtil } from "@/utils/useRestClient.util"
import { IUserDetailModel } from "../models/userDetail.model"
import { IUserResumeModel } from "../models/userResume.model"

export interface IUserFavoriteService {
    setFavoriteUser: (user: IUserDetailModel | IUserResumeModel) => Promise<TResponse<null,null>>
}

interface IUseFavoriteServiceProps {
    restClientUtil: IRestClientUtil
}

export const useFavoriteService = (props: IUseFavoriteServiceProps): IUserFavoriteService => {

    const setFavoriteUser: IUserFavoriteService['setFavoriteUser'] = async (user) => {
        const response = props.restClientUtil.patch<null, null>('/api/users', {login: user.login, favorite: user.favorite })
        return response
    }
    
    return {
        setFavoriteUser
    }
} 