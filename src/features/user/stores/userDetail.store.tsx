import { useState } from "react"
import { userDetailFactory } from "../factories/user.factory"
import { IUserDetailModel } from "../models/userDetail.model"
import { IUserFavoriteService } from "../services/userFavorite.service"
import { TResponse } from "@/utils/response.util"

export interface IUserDetailStore {
    userDetail: IUserDetailModel
    preloadUserDetail: (userDetail: IUserDetailModel) => void
    setFavoriteUser: (user: IUserDetailModel) => Promise<TResponse<null, null>> 
}

interface IUseUserDetailStoreProps {
    userFavoriteService: IUserFavoriteService
}

export const useUserDetailStore = (props: IUseUserDetailStoreProps): IUserDetailStore => {
    const [userDetail, setUserDetail] = useState<IUserDetailStore['userDetail']>(userDetailFactory())

    const preloadUserDetail: IUserDetailStore['preloadUserDetail'] = (userDetail) => {
        setUserDetail(userDetail)
    }

    const setFavoriteUser:IUserDetailStore['setFavoriteUser'] = async (user) => {
        const response = await props.userFavoriteService.setFavoriteUser(user)
        if(response.isSuccess) setUserDetail({...userDetail, favorite: !userDetail.favorite})
        return response
    }
    
    return {
        userDetail,
        preloadUserDetail,
        setFavoriteUser
    }
}